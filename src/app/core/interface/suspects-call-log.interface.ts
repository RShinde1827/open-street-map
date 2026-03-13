export interface Location {
  latitude: number;
  longitude: number;
}

export type CallDirection = "Incoming" | "Outgoing";

export type CallType = "Voice" | "Video" | "Missed";

export interface CallLog {
  callId: string;
  timestamp: string; // ISO timestamp e.g. 2026-03-07T09:12:25.000Z
  direction: CallDirection;
  fromNumber: string;
  toNumber: string;
  contactName: string;
  durationSeconds: number;
  callType: CallType;
  location: Location;
}

export interface SuspectCallLogs {
  suspectId: string;
  callLogs: CallLog[];
}

export interface SuspectCallLogResponse {
    suspectsCallLog: SuspectCallLogs[];
}