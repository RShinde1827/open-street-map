export interface SuspectDatabase {
  suspects: Suspect[];
}
export interface Suspect {
  suspectId: string;
  personalInfo: PersonalInfo;
  identification?: Identification;
  contactDetails: ContactDetails;
  physicalDescription?: PhysicalDescription;
  familyDetails?: FamilyDetails;
  occupation?: Occupation;
  vehicles?: Vehicle[];
  devices?: Devices;
  socialMedia?: SocialMedia;
  criminalHistory?: CriminalRecord[];
  knownAssociates?: string[];
  habits?: Habits;
  riskLevel?: 'Low' | 'Medium' | 'High';
  lastKnownLocation?: string;
  surveillanceNotes?: string;
}
export interface PersonalInfo {
  fullName: string;
  aliases?: string[];
  gender?: string;
  dateOfBirth?: string;
  age?: number;
  nationality?: string;
  maritalStatus?: string;
  bloodGroup?: string;
}
export interface Identification {
  aadhaarNumber?: string;
  passportNumber?: string;
  drivingLicense?: string;
  voterId?: string;
}
export interface ContactDetails {
  phoneNumbers?: string[];
  emails?: string[];
  currentAddress?: string;
  permanentAddress?: string;
}
export interface PhysicalDescription {
  heightCm?: number;
  weightKg?: number;
  eyeColor?: string;
  hairColor?: string;
  bodyType?: string;
  identifyingMarks?: string[];
  fingerprintsOnRecord?: boolean;
  dnaOnRecord?: boolean;
}
export interface FamilyDetails {
  fatherName?: string;
  motherName?: string;
  spouseName?: string;
  children?: string[];
}
export interface Occupation {
  jobTitle?: string;
  workplace?: string;
  company?: string;
  monthlyIncome?: number;
}
export interface Vehicle {
  type: string;
  model: string;
  color?: string;
  licensePlate: string;
}
export interface Devices {
  mobileIMEI?: string[];
  laptopSerial?: string;
}
export interface SocialMedia {
  facebook?: string;
  instagram?: string;
  twitter?: string;
}
export interface CriminalRecord {
  caseId?: string;
  crime: string;
  year?: number;
  status?: string;
}
export interface Habits {
  smoking?: boolean;
  alcohol?: boolean;
  drugs?: boolean;
}
