/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

import * as APITypes from "../API";
type GeneratedSubscription<InputType, OutputType> = string & {
  __generatedSubscriptionInput: InputType;
  __generatedSubscriptionOutput: OutputType;
};

export const onCreateInstrument = /* GraphQL */ `subscription OnCreateInstrument(
  $filter: ModelSubscriptionInstrumentFilterInput
) {
  onCreateInstrument(filter: $filter) {
    id
    type
    brand
    serialNumber
    rentStatus
    assignedTo {
      id
      lastName
      firstName
      studentIdNumber
      createdAt
      updatedAt
      studentInstrumentId
      __typename
    }
    createdAt
    updatedAt
    instrumentAssignedToId
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnCreateInstrumentSubscriptionVariables,
  APITypes.OnCreateInstrumentSubscription
>;
export const onUpdateInstrument = /* GraphQL */ `subscription OnUpdateInstrument(
  $filter: ModelSubscriptionInstrumentFilterInput
) {
  onUpdateInstrument(filter: $filter) {
    id
    type
    brand
    serialNumber
    rentStatus
    assignedTo {
      id
      lastName
      firstName
      studentIdNumber
      createdAt
      updatedAt
      studentInstrumentId
      __typename
    }
    createdAt
    updatedAt
    instrumentAssignedToId
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnUpdateInstrumentSubscriptionVariables,
  APITypes.OnUpdateInstrumentSubscription
>;
export const onDeleteInstrument = /* GraphQL */ `subscription OnDeleteInstrument(
  $filter: ModelSubscriptionInstrumentFilterInput
) {
  onDeleteInstrument(filter: $filter) {
    id
    type
    brand
    serialNumber
    rentStatus
    assignedTo {
      id
      lastName
      firstName
      studentIdNumber
      createdAt
      updatedAt
      studentInstrumentId
      __typename
    }
    createdAt
    updatedAt
    instrumentAssignedToId
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnDeleteInstrumentSubscriptionVariables,
  APITypes.OnDeleteInstrumentSubscription
>;
export const onCreateStudent = /* GraphQL */ `subscription OnCreateStudent($filter: ModelSubscriptionStudentFilterInput) {
  onCreateStudent(filter: $filter) {
    id
    lastName
    firstName
    studentIdNumber
    instrument {
      id
      type
      brand
      serialNumber
      rentStatus
      createdAt
      updatedAt
      instrumentAssignedToId
      __typename
    }
    createdAt
    updatedAt
    studentInstrumentId
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnCreateStudentSubscriptionVariables,
  APITypes.OnCreateStudentSubscription
>;
export const onUpdateStudent = /* GraphQL */ `subscription OnUpdateStudent($filter: ModelSubscriptionStudentFilterInput) {
  onUpdateStudent(filter: $filter) {
    id
    lastName
    firstName
    studentIdNumber
    instrument {
      id
      type
      brand
      serialNumber
      rentStatus
      createdAt
      updatedAt
      instrumentAssignedToId
      __typename
    }
    createdAt
    updatedAt
    studentInstrumentId
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnUpdateStudentSubscriptionVariables,
  APITypes.OnUpdateStudentSubscription
>;
export const onDeleteStudent = /* GraphQL */ `subscription OnDeleteStudent($filter: ModelSubscriptionStudentFilterInput) {
  onDeleteStudent(filter: $filter) {
    id
    lastName
    firstName
    studentIdNumber
    instrument {
      id
      type
      brand
      serialNumber
      rentStatus
      createdAt
      updatedAt
      instrumentAssignedToId
      __typename
    }
    createdAt
    updatedAt
    studentInstrumentId
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnDeleteStudentSubscriptionVariables,
  APITypes.OnDeleteStudentSubscription
>;
