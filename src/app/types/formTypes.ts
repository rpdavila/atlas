import { School } from "@prisma/client";


export type RentStatus = "Rented" | "Available";

export type UserInformation = {
  schools: { id: string, name: string }[]
  district: string
};

export enum UpdateUserData {
  name = "Name",
  school = "School",
  role = "Role",
  district = "District",
}

export enum UserRole {
  Administrator = "Administrator",
  Teacher = "Teacher",
  Recruiter = "Recruiter",
}

export type Instrument = {
  id: string;
  userId: string | null;
  classification: string;
  brand: string;
  serialNumber: string;
  rentStatus: RentStatus;
  assignedTo: OnlyStudentData | null;
  school: {
    name: string
  } | null;
}

export type InstrumentWithoutUserId = Omit<Instrument, "userId">
export type InstrumentListWithoutUserId = Array<InstrumentWithoutUserId>
export type InstrumentList = Array<Instrument>
export type DistrictInstrumentsWithouUserId = Omit<Instrument, "userId" | "rentStatus" | "assignedTo">
export type DistrictList = Array<DistrictInstrumentsWithouUserId>
export type Student = {
  id: string;
  userId: string;
  instrumentId: string | null;
  firstName: string;
  lastName: string;
  studentIdNumber: string;
  instrument: OnlyInstrumentData | null;
  school: {
    name: string;
  } | null;
};

export type StudentWithoutUserId = Omit<Student, "userId" | "instrumentId">
export type StudentListWithoutUserId = Array<StudentWithoutUserId>
export type StudentWithoutUserIdAndInstrument = Omit<StudentWithoutUserId, "instrument">
export type StudentListWithoutUserIdAndInstrument = Array<StudentWithoutUserIdAndInstrument>
export type StudentList = Array<Student>;

export type OnlyStudentData = Omit<Student, "userId" | "instrumentId" | "instrument">

export type OnlyInstrumentData = Omit<
  Instrument,
  "rentStatus" | "assignedTo" | "id" | "instrumentList" | "teacherId" | "userId">

export type Getinfo = {
  studentInfo: OnlyStudentData;
  instrumentInfo: OnlyInstrumentId;
};

export type AssignStudentToInstrument = {
  studentInfo: OnlyStudentId | undefined;
  instrumentInfo: OnlyInstrumentData | undefined;
};

export type OnlyInstrumentType = Omit<
  Instrument,
  "id" | "brand" | "serialNumber" | "rentStatus" | "assignedTo"
>;

export type OnlyInstrumentId = Omit<
  Instrument,
  "serialNumber" | "brand" | "rentStatus" | "assignedTo" | "classification"
>;

export type OnlyStudentId = Omit<
  Student,
  "instrument" | "id" | "firstName" | "lastName"
>;

export type WithoutId = Omit<Instrument, "id">;
