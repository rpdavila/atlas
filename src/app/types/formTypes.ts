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
  _id?: string | number;
  classification: string;
  brand: string;
  serialNumber: string;
  rentStatus: RentStatus;
  assignedTo?: OnlyStudentData;
};

export type InstrumentList = Array<InstrumentDetails>;

export enum RentStatus {
  Rented = "Rented",
  Available = "Available",
}

export type StudentInfo = {
  _id?: string | number;
  firstName: string;
  lastName: string;
  studentIdNumber: string;
  instrument?: OnlyInstrumentData;
};

export type StudentList = Array<StudentInfo>;

export type OnlyStudentData = Omit<StudentInfo, "instrument" | "_id">;

export type OnlyInstrumentData = Omit<
  InstrumentDetails,
  "rentStatus" | "assignedTo" | "_id" | "instrumentList"
>;
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
  "_id" | "brand" | "serialNumber" | "rentStatus" | "assignedTo"
>;

export type OnlyInstrumentId = Omit<
  InstrumentDetails,
  "serialNumber" | "brand" | "rentStatus" | "assignedTo" | "classification"
>;

export type OnlyStudentId = Omit<
  StudentInfo,
  "instrument" | "_id" | "firstName" | "lastName"
>;

export type WithoutId = Omit<InstrumentDetails, "_id">;
