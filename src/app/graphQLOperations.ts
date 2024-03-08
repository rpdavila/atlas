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
  mutation updateUserCustomData(
    $set: UserUpdateInput!
    $query: UserQueryInput!
  ) {
    updateOneUser(query: $query, set: $set) {
      firstName
      lastName
      role
      school
      district
    }
  }
`;
//________
// DONTUSE
//________
// export const GET_INSTRUMENTS_BY_SCHOOL = gql`
//   query getInstrumentsBySchool($data: [InstrumentInfoInsertInput!]!) {
//     instrumentsInfos(query: $data, limit: Int = 100, sortBy: SCHOOL_ASC ) {
//       classification
//       brand
//       serialNumber
//       rentStatus
//       assignedTo
//     }
//   }
// `;

//________
// DONTUSE
//________
// export const GET_INSTRUMENTS_BY_DISTRICT = gql`
//   query getInstrumentsByDistrict($data: String!) {
//     instrumentsByDistrict(district: $data) {
//       classification
//       brand
//       serialNumber
//     }
//   }
// `;

export const ADD_MANY_INSTRUMENTS = gql`
  mutation addManyInstruments($data: [InstrumentInfoInsertInput!]!) {
    insertManyInstrumentInfos(data: $data) {
      classification
      brand
      serialNumber
      rentStatus
      school
      district
    }
  }
`;
