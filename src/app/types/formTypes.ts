export type InstrumentDetails = {
  id: number | undefined;
  type: string | undefined;
  brand: string | undefined;
  serialNumber: string | undefined;
  rentStatus: RentStatus;
  assignedTo: OnlyStudentData | null;
};

export type InstrumentList = Array<InstrumentDetails>;

export enum RentStatus {
  Rented = "Rented",
  Available = "Available",
}

export type StudentInfo = {
  id: number;
  firstName: string | undefined;
  lastName: string | undefined;
  studentIdNumber: string | undefined;
  instrument: OnlyInstrumentData | undefined;
};

export type StudentList = Array<StudentInfo>;

export type OnlyStudentData = Omit<StudentInfo, "instrument" | "id">;

export type OnlyInstrumentData = Omit<
  InstrumentDetails,
  "rentStatus" | "assignedTo" | "id" | "instrumentList"
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
  "id" | "brand" | "serialNumber" | "rentStatus" | "assignedTo"
>;

export type OnlyInstrumentId = Omit<
  InstrumentDetails,
  "serialNumber" | "brand" | "rentStatus" | "assignedTo" | "type"
>;

export type OnlyStudentId = Omit<
  StudentInfo,
  "instrument" | "id" | "firstName" | "lastName"
>;
