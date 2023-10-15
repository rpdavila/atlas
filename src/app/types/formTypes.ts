export type InstrumentDetails = {
  id: number;
  type: string;
  brand: string;
  serialNumber: string;
  rentStatus: RentStatus;
  assignedTo: OnlyStudentData | null;
};

export type InstrumentList = Array<basicInstrumentData>;

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
  studentList: StudentList;
};

export type StudentList = Array<StudentInfo>;
export type OnlyStudentData = Omit<
  StudentInfo,
  "instrument" | "id" | "studentList"
>;
export type OnlyInstrumentData = Omit<
  InstrumentDetails,
  "rentStatus" | "assignedTo" | "id" | "instrumentList"
>;
export type basicInstrumentData = Omit<InstrumentDetails, "instrumentList">;
