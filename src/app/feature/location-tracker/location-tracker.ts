import { Component, inject, OnInit, AfterViewInit, PLATFORM_ID, NgZone } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { FormsModule } from '@angular/forms';

import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import VectorLayer from 'ol/layer/Vector';
import OSM from 'ol/source/OSM';
import VectorSource from 'ol/source/Vector';
import Feature from 'ol/Feature';
import Point from 'ol/geom/Point';
import CircleGeom from 'ol/geom/Circle';
import { fromLonLat } from 'ol/proj';
import { Style, Icon, Stroke, Fill } from 'ol/style';
import Overlay from 'ol/Overlay';
import 'ol/ol.css';

import { ViewSuspectDetails } from '../view-suspect-details/view-suspect-details';
import { ViewCallLogs } from '../view-call-logs/view-call-logs';
import { OpenStreetMapFacade } from '../../core/facade/open-street-map.facade';
import {
  LocationPoint,
  SuspectLocation,
} from '../../core/interface/suspect-location-history.interface';
import { Suspect } from '../../core/interface/suspect.interface';
import { SuspectCallLogs } from '../../core/interface/suspects-call-log.interface';

@Component({
  selector: 'app-location-tracker',
  standalone: true,
  imports: [CommonModule, FormsModule, ViewSuspectDetails, ViewCallLogs],
  templateUrl: './location-tracker.html',
  styleUrl: './location-tracker.scss',
})
export class LocationTracker implements OnInit, AfterViewInit {
  private readonly ngZone = inject(NgZone);
  private readonly platformId = inject(PLATFORM_ID);
  readonly openStreetMapFacade = inject(OpenStreetMapFacade);

  map!: Map;
  popup!: Overlay;
  vectorSource = new VectorSource();
  vectorLayer = new VectorLayer({
    source: this.vectorSource,
    // Ensure markers always render above the circle
    zIndex: 10,
  });

  searchLocation = '';
  searchDate = '';
  searchTime = '';
  radius = 5;

  suspectLocations: SuspectLocation[] = [];
  suspects: Suspect[] = [];
  allSuspectsCallLogs: SuspectCallLogs[] = [];

  selectedSuspectForPopup: Suspect | null = null;
  selectedSuspect?: any;
  suspectCallLog?: any;
  showDetailsModal = false;
  showCallLogsModal = false;

  ngOnInit() {
    this.openStreetMapFacade.suspectLocationDetails$.subscribe(
      (locations) => (this.suspectLocations = locations),
    );
    this.openStreetMapFacade.suspectList$.subscribe((list) => (this.suspects = list));
    this.openStreetMapFacade.suspectCallLogs$.subscribe(
      (logs) => (this.allSuspectsCallLogs = logs),
    );
  }

  ngAfterViewInit() {
    if (isPlatformBrowser(this.platformId)) {
      // Delay slightly to ensure DOM element 'map' is ready
      setTimeout(() => this.initMap(), 300);
    }
  }

  initMap() {
    this.map = new Map({
      target: 'map',
      layers: [new TileLayer({ source: new OSM() }), this.vectorLayer],
      view: new View({ center: fromLonLat([72.8777, 19.076]), zoom: 12 }),
    });

    const popupElement = document.getElementById('popup');
    if (popupElement) {
      this.popup = new Overlay({
        element: popupElement,
        positioning: 'bottom-center',
        stopEvent: true,
        offset: [0, -15],
        autoPan: {
          animation: {
            duration: 250,
          },
        },
      });
      this.map.addOverlay(this.popup);
    }

    this.map.on('singleclick', (evt) => {
      // Find feature and ensure it's a marker, not the radius circle
      const feature = this.map.forEachFeatureAtPixel(evt.pixel, (f) => f, {
        hitTolerance: 5,
        layerFilter: (layer) => layer === this.vectorLayer,
      });

      this.ngZone.run(() => {
        if (feature && feature.get('type') === 'marker') {
          const suspectId = feature.get('suspectId');
          const found = this.suspects.find((s) => s.suspectId === suspectId);

          if (found) {
            this.selectedSuspectForPopup = found;
            console.log('Selected Suspect:', this.selectedSuspectForPopup);
            const geometry = feature.getGeometry() as Point;
            this.popup.setPosition(geometry.getCoordinates());
          }
        } else {
          this.selectedSuspectForPopup = null;
          this.popup.setPosition(undefined);
        }
      });
    });

    setTimeout(() => this.map.updateSize(), 500);
  }

  async search() {
    const coords = await this.getCoordinates(this.searchLocation);
    if (!coords) return;

    this.vectorSource.clear();
    this.selectedSuspectForPopup = null;
    this.popup.setPosition(undefined);

    const center = fromLonLat([coords.lng, coords.lat]);

    // 1. Add Radius Circle (type: 'area')
    const circleFeature = new Feature({
      geometry: new CircleGeom(center, this.radius * 1000),
    });
    circleFeature.set('type', 'area');
    circleFeature.setStyle(
      new Style({
        fill: new Fill({ color: 'rgba(52, 152, 219, 0.1)' }),
        stroke: new Stroke({ color: '#3498db', width: 2, lineDash: [10, 10] }),
      }),
    );
    this.vectorSource.addFeature(circleFeature);

    this.map.getView().animate({ center, zoom: 13, duration: 800 });

    const searchTimestamp = new Date(`${this.searchDate}T${this.searchTime}`).getTime();

    this.suspectLocations.forEach((suspect: SuspectLocation) => {
      if (!suspect.locations?.length) return;

      const validLocation = suspect.locations
        .map((loc: LocationPoint) => ({
          ...loc,
          timediff: Math.abs(new Date(loc.timestamp).getTime() - searchTimestamp),
        }))
        .filter((loc: any) => loc.timediff <= 15 * 60 * 1000)
        .sort((a: any, b: any) => a.timediff - b.timediff)[0];

      if (validLocation) {
        const distance = this.calculateDistance(
          coords.lat,
          coords.lng,
          validLocation.latitude,
          validLocation.longitude,
        );

        if (distance <= this.radius) {
          const marker = new Feature({
            geometry: new Point(fromLonLat([validLocation.longitude, validLocation.latitude])),
          });

          // Tag this feature as a marker for the click handler
          marker.set('type', 'marker');
          marker.set('suspectId', suspect.suspectId);

          marker.setStyle(
            new Style({
              image: new Icon({
                src: 'assets/image/user.png',
                scale: 0.02, // Slightly larger for better clickability
                anchor: [0.5, 1],
              }),
            }),
          );

          this.vectorSource.addFeature(marker);
        }
      }
    });
  }

  async getCoordinates(address: string) {
    try {
      const res = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${address}`,
      );
      const data = await res.json();
      if (data.length) {
        return { lat: parseFloat(data[0].lat), lng: parseFloat(data[0].lon) };
      }
      alert('Location not found');
      return null;
    } catch (error) {
      console.error('Geocoding error:', error);
      return null;
    }
  }

  calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number) {
    const R = 6371;
    const dLat = ((lat2 - lat1) * Math.PI) / 180;
    const dLon = ((lon2 - lon1) * Math.PI) / 180;
    const a =
      Math.sin(dLat / 2) ** 2 +
      Math.cos((lat1 * Math.PI) / 180) * Math.cos((lat2 * Math.PI) / 180) * Math.sin(dLon / 2) ** 2;
    return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  }

  openSuspectDetails(id?: string) {
    this.selectedSuspect = this.suspects.find((s) => s.suspectId === id);
    if (this.selectedSuspect) {
      this.showDetailsModal = true;
      this.popup.setPosition(undefined); // Hide popup when modal opens
    }
  }

  openCallLogs(id?: string) {
    this.suspectCallLog = this.allSuspectsCallLogs.find((s) => s.suspectId === id);
    this.selectedSuspect = this.suspects.find((s) => s.suspectId === id);
    if (this.suspectCallLog) {
      this.showCallLogsModal = true;
      this.popup.setPosition(undefined);
    }
  }

  closePopup() {
    this.showDetailsModal = false;
    this.showCallLogsModal = false;
  }
}
