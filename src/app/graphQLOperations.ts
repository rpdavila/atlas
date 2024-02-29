import { gql } from "graphql-tag";

export const ADD_STUDENT = gql`
  mutation addStudent($data: StudentInfoInsertInput!) {
    insertOneStudentInfo(data: $data) {
      firstName
      lastName
      studentIdNumber
    }
  }
`;

export const ADD_INSTRUMENT = gql`
  mutation addInstrument($data: InstrumentInfoInsertInput!) {
    insertOneInstrumentInfo(data: $data) {
      classification
      brand
      serialNumber
      rentStatus
    }
  }
`;

export const ADD_USER_CUSTOM_DATA = gql`
  mutation addUserCustomData($data: UserInsertInput!) {
    insertOneUser(data: $data) {
      userId
      firstName
      lastName
      role
      school
      district
    }
  }
`;

export const UPDATE_USER_CUSTOM_DATA = gql`
  mutation updateUserCustomData($set: UserUpdateInput!, $query: UserQueryInput!) {
    updateOneUser(query: $query, set: $set) {
      firstName
      lastName
      role
      school
      district
    }
  }
`;

export const GET_USER = gql`
  query getUser($id: ID!) {
    user(id: $id) {
      firstName
      lastName
    }
  }
`;
