import { RentStatus } from '@prisma/client';

export  { RentStatus as PrismaRentStatus } from 'c:/Users/rafae/nodeProjects/atlas/node_modules/.prisma/client/index';


export type UserInformation = {
  id: string | undefined;
  isLoggedIn: boolean | undefined;
  accessToken: string | null | undefined;
  customUserData: SimpleObject | undefined;
  email: string | undefined;
  loading: boolean;
};

export enum UpdateUserData {
  firstName = "First Name",
  lastName = "Last Name",
  school = "School",
  role = "Role",
  district = "District",
}

export enum UserRole {
  Administrator = "Administrator",
  Teacher = "Teacher",
  Recruiter = "Recruiter",
}

export type InstrumentDetails = {
  id: string;
  classification: string;
  brand: string;
  serialNumber: string;
  rentStatus: RentStatus;
  assignedTo?: OnlyStudentData | null | undefined;
}

export type InstrumentList = Array<InstrumentDetails> 

// export enum RentStatus {
//   Rented = "Rented",
//   Available = "Available",
// }

export type StudentInfo = {
  id: string 
  firstName: string;
  lastName: string;
  studentIdNumber: string;
  instrument: OnlyInstrumentData | null;
};

export type StudentList = Array<StudentInfo>;

export type OnlyStudentData = Omit<StudentInfo, "instrument" | "id"
> & {
  brand: string | null;
  classification: string | null;
  serialNumber: string | null;
};

export type OnlyInstrumentData = Omit<
  InstrumentDetails,
  "rentStatus" | "assignedTo" | "id" | "instrumentList" | "teacherId"
> & {
  brand: string | null;
  classification: string | null;
  serialNumber: string | null;
}

export type Getinfo = {
  studentInfo: OnlyStudentData;
  instrumentInfo: OnlyInstrumentId;
};

export type AssignStudentToInstrument = {
  studentInfo: OnlyStudentId | undefined;
  instrumentInfo: OnlyInstrumentData | undefined;
};

export type OnlyInstrumentType = Omit<
  InstrumentDetails,
  "id" | "brand" | "serialNumber" | "rentStatus" | "assignedTo"
>;

export type OnlyInstrumentId = Omit<
  InstrumentDetails,
  "serialNumber" | "brand" | "rentStatus" | "assignedTo" | "classification"
>;

export type OnlyStudentId = Omit<
  StudentInfo,
  "instrument" | "id" | "firstName" | "lastName"
>;

export type WithoutId = Omit<InstrumentDetails, "id">;
