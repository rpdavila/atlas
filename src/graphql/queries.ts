/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

import * as APITypes from "../API";
type GeneratedQuery<InputType, OutputType> = string & {
  __generatedQueryInput: InputType;
  __generatedQueryOutput: OutputType;
};

export const getInstrument = /* GraphQL */ `query GetInstrument($id: ID!) {
  getInstrument(id: $id) {
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
` as GeneratedQuery<
  APITypes.GetInstrumentQueryVariables,
  APITypes.GetInstrumentQuery
>;
export const listInstruments = /* GraphQL */ `query ListInstruments(
  $filter: ModelInstrumentFilterInput
  $limit: Int
  $nextToken: String
) {
  listInstruments(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
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
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ListInstrumentsQueryVariables,
  APITypes.ListInstrumentsQuery
>;
export const getStudent = /* GraphQL */ `query GetStudent($id: ID!) {
  getStudent(id: $id) {
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
` as GeneratedQuery<
  APITypes.GetStudentQueryVariables,
  APITypes.GetStudentQuery
>;
export const listStudents = /* GraphQL */ `query ListStudents(
  $filter: ModelStudentFilterInput
  $limit: Int
  $nextToken: String
) {
  listStudents(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      lastName
      firstName
      studentIdNumber
      createdAt
      updatedAt
      studentInstrumentId
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ListStudentsQueryVariables,
  APITypes.ListStudentsQuery
>;
