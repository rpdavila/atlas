/* tslint:disable */
/* eslint-disable */
//  This file was automatically generated and should not be edited.

export type CreateInstrumentInput = {
  id?: string | null,
  type: string,
  brand: string,
  serialNumber: string,
  rentStatus: string,
  instrumentAssignedToId?: string | null,
};

export type ModelInstrumentConditionInput = {
  type?: ModelStringInput | null,
  brand?: ModelStringInput | null,
  serialNumber?: ModelStringInput | null,
  rentStatus?: ModelStringInput | null,
  and?: Array< ModelInstrumentConditionInput | null > | null,
  or?: Array< ModelInstrumentConditionInput | null > | null,
  not?: ModelInstrumentConditionInput | null,
  instrumentAssignedToId?: ModelIDInput | null,
};

export type ModelStringInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
  size?: ModelSizeInput | null,
};

export enum ModelAttributeTypes {
  binary = "binary",
  binarySet = "binarySet",
  bool = "bool",
  list = "list",
  map = "map",
  number = "number",
  numberSet = "numberSet",
  string = "string",
  stringSet = "stringSet",
  _null = "_null",
}


export type ModelSizeInput = {
  ne?: number | null,
  eq?: number | null,
  le?: number | null,
  lt?: number | null,
  ge?: number | null,
  gt?: number | null,
  between?: Array< number | null > | null,
};

export type ModelIDInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
  size?: ModelSizeInput | null,
};

export type Instrument = {
  __typename: "Instrument",
  id: string,
  type: string,
  brand: string,
  serialNumber: string,
  rentStatus: string,
  assignedTo?: Student | null,
  createdAt: string,
  updatedAt: string,
  instrumentAssignedToId?: string | null,
};

export type Student = {
  __typename: "Student",
  id: string,
  lastName: string,
  firstName: string,
  studentIdNumber: string,
  instrument?: Instrument | null,
  createdAt: string,
  updatedAt: string,
  studentInstrumentId?: string | null,
};

export type UpdateInstrumentInput = {
  id: string,
  type?: string | null,
  brand?: string | null,
  serialNumber?: string | null,
  rentStatus?: string | null,
  instrumentAssignedToId?: string | null,
};

export type DeleteInstrumentInput = {
  id: string,
};

export type CreateStudentInput = {
  id?: string | null,
  lastName: string,
  firstName: string,
  studentIdNumber: string,
  studentInstrumentId?: string | null,
};

export type ModelStudentConditionInput = {
  lastName?: ModelStringInput | null,
  firstName?: ModelStringInput | null,
  studentIdNumber?: ModelStringInput | null,
  and?: Array< ModelStudentConditionInput | null > | null,
  or?: Array< ModelStudentConditionInput | null > | null,
  not?: ModelStudentConditionInput | null,
  studentInstrumentId?: ModelIDInput | null,
};

export type UpdateStudentInput = {
  id: string,
  lastName?: string | null,
  firstName?: string | null,
  studentIdNumber?: string | null,
  studentInstrumentId?: string | null,
};

export type DeleteStudentInput = {
  id: string,
};

export type ModelInstrumentFilterInput = {
  id?: ModelIDInput | null,
  type?: ModelStringInput | null,
  brand?: ModelStringInput | null,
  serialNumber?: ModelStringInput | null,
  rentStatus?: ModelStringInput | null,
  and?: Array< ModelInstrumentFilterInput | null > | null,
  or?: Array< ModelInstrumentFilterInput | null > | null,
  not?: ModelInstrumentFilterInput | null,
  instrumentAssignedToId?: ModelIDInput | null,
};

export type ModelInstrumentConnection = {
  __typename: "ModelInstrumentConnection",
  items:  Array<Instrument | null >,
  nextToken?: string | null,
};

export type ModelStudentFilterInput = {
  id?: ModelIDInput | null,
  lastName?: ModelStringInput | null,
  firstName?: ModelStringInput | null,
  studentIdNumber?: ModelStringInput | null,
  and?: Array< ModelStudentFilterInput | null > | null,
  or?: Array< ModelStudentFilterInput | null > | null,
  not?: ModelStudentFilterInput | null,
  studentInstrumentId?: ModelIDInput | null,
};

export type ModelStudentConnection = {
  __typename: "ModelStudentConnection",
  items:  Array<Student | null >,
  nextToken?: string | null,
};

export type ModelSubscriptionInstrumentFilterInput = {
  id?: ModelSubscriptionIDInput | null,
  type?: ModelSubscriptionStringInput | null,
  brand?: ModelSubscriptionStringInput | null,
  serialNumber?: ModelSubscriptionStringInput | null,
  rentStatus?: ModelSubscriptionStringInput | null,
  and?: Array< ModelSubscriptionInstrumentFilterInput | null > | null,
  or?: Array< ModelSubscriptionInstrumentFilterInput | null > | null,
};

export type ModelSubscriptionIDInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  in?: Array< string | null > | null,
  notIn?: Array< string | null > | null,
};

export type ModelSubscriptionStringInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  in?: Array< string | null > | null,
  notIn?: Array< string | null > | null,
};

export type ModelSubscriptionStudentFilterInput = {
  id?: ModelSubscriptionIDInput | null,
  lastName?: ModelSubscriptionStringInput | null,
  firstName?: ModelSubscriptionStringInput | null,
  studentIdNumber?: ModelSubscriptionStringInput | null,
  and?: Array< ModelSubscriptionStudentFilterInput | null > | null,
  or?: Array< ModelSubscriptionStudentFilterInput | null > | null,
};

export type CreateInstrumentMutationVariables = {
  input: CreateInstrumentInput,
  condition?: ModelInstrumentConditionInput | null,
};

export type CreateInstrumentMutation = {
  createInstrument?:  {
    __typename: "Instrument",
    id: string,
    type: string,
    brand: string,
    serialNumber: string,
    rentStatus: string,
    assignedTo?:  {
      __typename: "Student",
      id: string,
      lastName: string,
      firstName: string,
      studentIdNumber: string,
      createdAt: string,
      updatedAt: string,
      studentInstrumentId?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
    instrumentAssignedToId?: string | null,
  } | null,
};

export type UpdateInstrumentMutationVariables = {
  input: UpdateInstrumentInput,
  condition?: ModelInstrumentConditionInput | null,
};

export type UpdateInstrumentMutation = {
  updateInstrument?:  {
    __typename: "Instrument",
    id: string,
    type: string,
    brand: string,
    serialNumber: string,
    rentStatus: string,
    assignedTo?:  {
      __typename: "Student",
      id: string,
      lastName: string,
      firstName: string,
      studentIdNumber: string,
      createdAt: string,
      updatedAt: string,
      studentInstrumentId?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
    instrumentAssignedToId?: string | null,
  } | null,
};

export type DeleteInstrumentMutationVariables = {
  input: DeleteInstrumentInput,
  condition?: ModelInstrumentConditionInput | null,
};

export type DeleteInstrumentMutation = {
  deleteInstrument?:  {
    __typename: "Instrument",
    id: string,
    type: string,
    brand: string,
    serialNumber: string,
    rentStatus: string,
    assignedTo?:  {
      __typename: "Student",
      id: string,
      lastName: string,
      firstName: string,
      studentIdNumber: string,
      createdAt: string,
      updatedAt: string,
      studentInstrumentId?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
    instrumentAssignedToId?: string | null,
  } | null,
};

export type CreateStudentMutationVariables = {
  input: CreateStudentInput,
  condition?: ModelStudentConditionInput | null,
};

export type CreateStudentMutation = {
  createStudent?:  {
    __typename: "Student",
    id: string,
    lastName: string,
    firstName: string,
    studentIdNumber: string,
    instrument?:  {
      __typename: "Instrument",
      id: string,
      type: string,
      brand: string,
      serialNumber: string,
      rentStatus: string,
      createdAt: string,
      updatedAt: string,
      instrumentAssignedToId?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
    studentInstrumentId?: string | null,
  } | null,
};

export type UpdateStudentMutationVariables = {
  input: UpdateStudentInput,
  condition?: ModelStudentConditionInput | null,
};

export type UpdateStudentMutation = {
  updateStudent?:  {
    __typename: "Student",
    id: string,
    lastName: string,
    firstName: string,
    studentIdNumber: string,
    instrument?:  {
      __typename: "Instrument",
      id: string,
      type: string,
      brand: string,
      serialNumber: string,
      rentStatus: string,
      createdAt: string,
      updatedAt: string,
      instrumentAssignedToId?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
    studentInstrumentId?: string | null,
  } | null,
};

export type DeleteStudentMutationVariables = {
  input: DeleteStudentInput,
  condition?: ModelStudentConditionInput | null,
};

export type DeleteStudentMutation = {
  deleteStudent?:  {
    __typename: "Student",
    id: string,
    lastName: string,
    firstName: string,
    studentIdNumber: string,
    instrument?:  {
      __typename: "Instrument",
      id: string,
      type: string,
      brand: string,
      serialNumber: string,
      rentStatus: string,
      createdAt: string,
      updatedAt: string,
      instrumentAssignedToId?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
    studentInstrumentId?: string | null,
  } | null,
};

export type GetInstrumentQueryVariables = {
  id: string,
};

export type GetInstrumentQuery = {
  getInstrument?:  {
    __typename: "Instrument",
    id: string,
    type: string,
    brand: string,
    serialNumber: string,
    rentStatus: string,
    assignedTo?:  {
      __typename: "Student",
      id: string,
      lastName: string,
      firstName: string,
      studentIdNumber: string,
      createdAt: string,
      updatedAt: string,
      studentInstrumentId?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
    instrumentAssignedToId?: string | null,
  } | null,
};

export type ListInstrumentsQueryVariables = {
  filter?: ModelInstrumentFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListInstrumentsQuery = {
  listInstruments?:  {
    __typename: "ModelInstrumentConnection",
    items:  Array< {
      __typename: "Instrument",
      id: string,
      type: string,
      brand: string,
      serialNumber: string,
      rentStatus: string,
      createdAt: string,
      updatedAt: string,
      instrumentAssignedToId?: string | null,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type GetStudentQueryVariables = {
  id: string,
};

export type GetStudentQuery = {
  getStudent?:  {
    __typename: "Student",
    id: string,
    lastName: string,
    firstName: string,
    studentIdNumber: string,
    instrument?:  {
      __typename: "Instrument",
      id: string,
      type: string,
      brand: string,
      serialNumber: string,
      rentStatus: string,
      createdAt: string,
      updatedAt: string,
      instrumentAssignedToId?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
    studentInstrumentId?: string | null,
  } | null,
};

export type ListStudentsQueryVariables = {
  filter?: ModelStudentFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListStudentsQuery = {
  listStudents?:  {
    __typename: "ModelStudentConnection",
    items:  Array< {
      __typename: "Student",
      id: string,
      lastName: string,
      firstName: string,
      studentIdNumber: string,
      createdAt: string,
      updatedAt: string,
      studentInstrumentId?: string | null,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type OnCreateInstrumentSubscriptionVariables = {
  filter?: ModelSubscriptionInstrumentFilterInput | null,
};

export type OnCreateInstrumentSubscription = {
  onCreateInstrument?:  {
    __typename: "Instrument",
    id: string,
    type: string,
    brand: string,
    serialNumber: string,
    rentStatus: string,
    assignedTo?:  {
      __typename: "Student",
      id: string,
      lastName: string,
      firstName: string,
      studentIdNumber: string,
      createdAt: string,
      updatedAt: string,
      studentInstrumentId?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
    instrumentAssignedToId?: string | null,
  } | null,
};

export type OnUpdateInstrumentSubscriptionVariables = {
  filter?: ModelSubscriptionInstrumentFilterInput | null,
};

export type OnUpdateInstrumentSubscription = {
  onUpdateInstrument?:  {
    __typename: "Instrument",
    id: string,
    type: string,
    brand: string,
    serialNumber: string,
    rentStatus: string,
    assignedTo?:  {
      __typename: "Student",
      id: string,
      lastName: string,
      firstName: string,
      studentIdNumber: string,
      createdAt: string,
      updatedAt: string,
      studentInstrumentId?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
    instrumentAssignedToId?: string | null,
  } | null,
};

export type OnDeleteInstrumentSubscriptionVariables = {
  filter?: ModelSubscriptionInstrumentFilterInput | null,
};

export type OnDeleteInstrumentSubscription = {
  onDeleteInstrument?:  {
    __typename: "Instrument",
    id: string,
    type: string,
    brand: string,
    serialNumber: string,
    rentStatus: string,
    assignedTo?:  {
      __typename: "Student",
      id: string,
      lastName: string,
      firstName: string,
      studentIdNumber: string,
      createdAt: string,
      updatedAt: string,
      studentInstrumentId?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
    instrumentAssignedToId?: string | null,
  } | null,
};

export type OnCreateStudentSubscriptionVariables = {
  filter?: ModelSubscriptionStudentFilterInput | null,
};

export type OnCreateStudentSubscription = {
  onCreateStudent?:  {
    __typename: "Student",
    id: string,
    lastName: string,
    firstName: string,
    studentIdNumber: string,
    instrument?:  {
      __typename: "Instrument",
      id: string,
      type: string,
      brand: string,
      serialNumber: string,
      rentStatus: string,
      createdAt: string,
      updatedAt: string,
      instrumentAssignedToId?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
    studentInstrumentId?: string | null,
  } | null,
};

export type OnUpdateStudentSubscriptionVariables = {
  filter?: ModelSubscriptionStudentFilterInput | null,
};

export type OnUpdateStudentSubscription = {
  onUpdateStudent?:  {
    __typename: "Student",
    id: string,
    lastName: string,
    firstName: string,
    studentIdNumber: string,
    instrument?:  {
      __typename: "Instrument",
      id: string,
      type: string,
      brand: string,
      serialNumber: string,
      rentStatus: string,
      createdAt: string,
      updatedAt: string,
      instrumentAssignedToId?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
    studentInstrumentId?: string | null,
  } | null,
};

export type OnDeleteStudentSubscriptionVariables = {
  filter?: ModelSubscriptionStudentFilterInput | null,
};

export type OnDeleteStudentSubscription = {
  onDeleteStudent?:  {
    __typename: "Student",
    id: string,
    lastName: string,
    firstName: string,
    studentIdNumber: string,
    instrument?:  {
      __typename: "Instrument",
      id: string,
      type: string,
      brand: string,
      serialNumber: string,
      rentStatus: string,
      createdAt: string,
      updatedAt: string,
      instrumentAssignedToId?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
    studentInstrumentId?: string | null,
  } | null,
};
