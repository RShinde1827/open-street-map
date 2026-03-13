import { Component, inject } from '@angular/core';
import { OpenStreetMapFacade } from '../../core/facade/open-street-map.facade';
import { BehaviorSubject, combineLatest, map, Observable } from 'rxjs';
import { Suspect } from '../../core/interface/suspect.interface';
import { AsyncPipe, CommonModule } from '@angular/common';
import { ViewSuspectDetails } from '../view-suspect-details/view-suspect-details';

@Component({
  selector: 'app-suspect-list',
  imports: [CommonModule, AsyncPipe, ViewSuspectDetails],
  templateUrl: './suspect-list.html',
  styleUrl: './suspect-list.scss',
})
export class SuspectList {
  readonly openStreetMapFacade = inject(OpenStreetMapFacade);

  suspectList$: Observable<Suspect[]> = this.openStreetMapFacade.suspectList$;
  private searchTerm$ = new BehaviorSubject<string>('');

  selectedSuspect: Suspect | null = null;

  filteredSuspects$: Observable<Suspect[]> = combineLatest([
    this.suspectList$,
    this.searchTerm$,
  ]).pipe(
    map(
      ([suspects, term]) =>
        suspects?.filter((s) =>
          s.personalInfo.fullName?.toLowerCase().includes(term.toLowerCase()),
        ) ?? [],
    ),
  );

  openDetails(suspect: Suspect) {
    this.selectedSuspect = suspect;
  }

  closePopup() {
    this.selectedSuspect = null;
  }

  onSearch(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    this.searchTerm$.next(value);
  }
}
