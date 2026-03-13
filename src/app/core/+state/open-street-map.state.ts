import { SuspectLocation } from "../interface/suspect-location-history.interface";
import { Suspect } from "../interface/suspect.interface";
import { SuspectCallLogs } from "../interface/suspects-call-log.interface";

export interface OpenStreetMapState {
    isAuthenticated: boolean;
    error: string;
    suspects: Suspect[];
    suspectLocationDetails: SuspectLocation[];
    suspectCallLogs: SuspectCallLogs[];
}

export const defaultState: OpenStreetMapState = {
    isAuthenticated: false,
    error: '',
    suspects: [],
    suspectLocationDetails: [],
    suspectCallLogs: [], 
};