import { createAction, createActionGroup, props } from '@ngrx/store';
import { User } from '../interface/userdata.interface';
import { Suspect } from '../interface/suspect.interface';
import { SuspectLocation } from '../interface/suspect-location-history.interface';
import { SuspectCallLogs } from '../interface/suspects-call-log.interface';

export const init = createAction('[Open Street Map] Init');

export const GetLoginActions = createActionGroup({
  source: 'Open Street Map login',
  events: {
    login: props<{ email: string; password: string }>(),
    loginSuccess: props<{ isAuthenticated: boolean }>(),
    loginFailure: props<{ error: string }>(),
  },
});

export const GetSucpectsAction = createActionGroup({
  source: 'Open Street Map Suspects',
  events: {
    getSuspects: props<{ query?: string }>(),
    getSuspectsSuccess: props<{ suspects: Suspect[] }>(),
    getSuspectsFailure: props<{ error: string }>(),
  },
});

export const getSuspectLocationDetails = createAction(
  '[Open Street Map] Get Suspect Location Details',
);
export const GetSuspectLocationDetailsAction = createActionGroup({
  source: 'Open Street Map Suspect Location Details',
  events: {
    getSuspectLocationDetailsSuccess: props<{ locationDetails: SuspectLocation[] }>(),
    getSuspectLocationDetailsFailure: props<{ error: string }>(),
  },
});

export const getSuspectCallLogs = createAction(
  '[Open Street Map] Get Suspect Call Logs',
);

export const GetSuspectCallLogsAction = createActionGroup({
  source: 'Open Street Map Suspect Call Logs',
  events: {
    getSuspectCallLogsSuccess: props<{ callLogs: SuspectCallLogs[] }>(),
    getSuspectCallLogsFailure: props<{ error: string }>()
  },
});

export const logout = createAction('[Open Street Map] Logout', props<{ isAuthenticated: boolean }>());
