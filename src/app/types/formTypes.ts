export type InstrumentDetails = {
  id: number;
  type: string;
  brand: string;
  serialNumber: string;
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
  firstName: string;
  lastName: string;
  studentIdNumber: string;
  instrument: OnlyInstrumentData | null;
};

export type StudentList = Array<StudentInfo>;
export type OnlyStudentData = Omit<StudentInfo, "instrument" | "id">;
export type OnlyInstrumentData = Omit<
  InstrumentDetails,
  "rentStatus" | "assignedTo" | "id" | "instrumentList"
>;
