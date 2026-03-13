export interface SuspectLocationHistory {
  suspectLocation: SuspectLocation[];
}

export interface SuspectLocation {
    suspectId: string;
    locations: LocationPoint[];
}

export interface LocationPoint {
  timestamp: string; 
  latitude: number;
  longitude: number;
}