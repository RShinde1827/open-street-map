import { Action, createFeature, createReducer, on } from '@ngrx/store';
import { defaultState, OpenStreetMapState } from './open-street-map.state';
import { GetLoginActions, GetSucpectsAction, GetSuspectCallLogsAction, GetSuspectLocationDetailsAction, logout } from './open-street-map.action';
import { produce } from 'immer';

export const reducer = createReducer(
  defaultState,
  on(GetLoginActions.loginSuccess, (state: OpenStreetMapState, { isAuthenticated }) =>
    produce(state, (draft: OpenStreetMapState) => {
      draft.isAuthenticated = isAuthenticated;
      draft.error = '';
    }),
  ),
    on(GetLoginActions.loginFailure, (state: OpenStreetMapState, { error }) =>
      produce(state, (draft: OpenStreetMapState) => {
        draft.error = error;
      })
    ),
    on(logout, (state: OpenStreetMapState, { isAuthenticated }) =>
      produce(state, (draft: OpenStreetMapState) => {
        draft.isAuthenticated = isAuthenticated;
      })
    ),
    on(GetSucpectsAction.getSuspectsSuccess, (state: OpenStreetMapState, { suspects }) =>
      produce(state, (draft: OpenStreetMapState) => {
        draft.suspects = suspects;
      })
    ),
    on(GetSucpectsAction.getSuspectsFailure, (state: OpenStreetMapState, { error }) =>
      produce(state, (draft: OpenStreetMapState) => {
        draft.error = error;
      })
    ),
    on(GetSuspectLocationDetailsAction.getSuspectLocationDetailsSuccess, (state: OpenStreetMapState, { locationDetails }) =>
      produce(state, (draft: OpenStreetMapState) => {
        draft.suspectLocationDetails = locationDetails;
      })
    ),
    on(GetSuspectLocationDetailsAction.getSuspectLocationDetailsFailure, (state: OpenStreetMapState, { error }) =>
      produce(state, (draft: OpenStreetMapState) => {
        draft.error = error;
      })
    ),
    on(GetSuspectCallLogsAction.getSuspectCallLogsSuccess, (state: OpenStreetMapState, { callLogs }) =>
      produce(state, (draft: OpenStreetMapState) => {
        draft.suspectCallLogs = callLogs;
      })
    ),
    on(GetSuspectCallLogsAction.getSuspectCallLogsFailure, (state: OpenStreetMapState, { error }) =>
      produce(state, (draft: OpenStreetMapState) => {
        draft.error = error;
      })
    )
);

export function openStreetMapReducer(
  state: OpenStreetMapState = defaultState,
  action: Action,
): OpenStreetMapState {
  return reducer(state, action);
}

export const openStreetMapFeature = createFeature({
  name: 'openStreetMapFeature',
  reducer: openStreetMapReducer,
});
