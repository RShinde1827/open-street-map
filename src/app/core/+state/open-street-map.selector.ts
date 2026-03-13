import { createFeatureSelector, createSelector } from "@ngrx/store";
import { OpenStreetMapState } from "./open-street-map.state";
import { create } from "domain";
import e from "express";

export const featureState = createFeatureSelector<OpenStreetMapState>('openStreetMapFeature');

export const selectIsAuthenticated = createSelector(
    featureState,
    (state: OpenStreetMapState) => state.isAuthenticated
);

export const selectLoggedOutUser = createSelector(
    featureState,
    (state: OpenStreetMapState) => !state.isAuthenticated
);

export const selectSuspectList = createSelector(
    featureState,
    (state: OpenStreetMapState) => state.suspects
);

export const selectSuspectLocationDetails = createSelector(
    featureState,
    (state: OpenStreetMapState) => state.suspectLocationDetails
);

export const selectSuspectCallLogs = createSelector(
    featureState,
    (state: OpenStreetMapState) => state.suspectCallLogs
);
