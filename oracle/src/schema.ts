import { gql } from 'apollo-server';

export default gql`

  type Query {
    getCourse(id: String!): Course
    getStudent(name: String!): Student
  }

  type Mutation {
    createCourse(course: CourseInput!): Course
    createStudent(name: String!, address: String!, pub: String!): Student
    issueCert(courseId: String!, studentId: String!): Cert
  }

  type Institution {
    id: String! # ethereum address
    name: String! # name of institution
    oracle: String! # oracle contract's ethereum address
  }

  input CourseInput {
    id: Int! # id specific to PI (i.e. course number if it's CMU)
    name: String!
    instructor: String!
    info: String # IPFS hash
  }

  type Course {
    id: ID!
    courseId: Int! # id specific to PI (i.e. course number if it's CMU)
    certs: [Cert!]!
    name: String!
    instructor: String!
    info: String # IPFS hash
  }

  type Cert {
    id: ID!
    course: Course!
    holder: Student! # student's ethereum address
    info: String! # IPFS Hash of encrypted data
  }

  type Student {
    id: String!
    name: String!
    address: String! # student's ethereum address
    pub: String! # student's compressed public key
  }
`;