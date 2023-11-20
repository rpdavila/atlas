/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

import * as APITypes from "../API";
type GeneratedMutation<InputType, OutputType> = string & {
  __generatedMutationInput: InputType;
  __generatedMutationOutput: OutputType;
};

export const createInstrument = /* GraphQL */ `mutation CreateInstrument(
  $input: CreateInstrumentInput!
  $condition: ModelInstrumentConditionInput
) {
  createInstrument(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.CreateInstrumentMutationVariables,
  APITypes.CreateInstrumentMutation
>;
export const updateInstrument = /* GraphQL */ `mutation UpdateInstrument(
  $input: UpdateInstrumentInput!
  $condition: ModelInstrumentConditionInput
) {
  updateInstrument(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.UpdateInstrumentMutationVariables,
  APITypes.UpdateInstrumentMutation
>;
export const deleteInstrument = /* GraphQL */ `mutation DeleteInstrument(
  $input: DeleteInstrumentInput!
  $condition: ModelInstrumentConditionInput
) {
  deleteInstrument(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.DeleteInstrumentMutationVariables,
  APITypes.DeleteInstrumentMutation
>;
export const createStudent = /* GraphQL */ `mutation CreateStudent(
  $input: CreateStudentInput!
  $condition: ModelStudentConditionInput
) {
  createStudent(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.CreateStudentMutationVariables,
  APITypes.CreateStudentMutation
>;
export const updateStudent = /* GraphQL */ `mutation UpdateStudent(
  $input: UpdateStudentInput!
  $condition: ModelStudentConditionInput
) {
  updateStudent(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.UpdateStudentMutationVariables,
  APITypes.UpdateStudentMutation
>;
export const deleteStudent = /* GraphQL */ `mutation DeleteStudent(
  $input: DeleteStudentInput!
  $condition: ModelStudentConditionInput
) {
  deleteStudent(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.DeleteStudentMutationVariables,
  APITypes.DeleteStudentMutation
>;
