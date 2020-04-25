import { gql } from 'apollo-server';

export default gql`

  type Query {
    getCourse(id: String!): Course
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
    id: String! # id specific to PI (i.e. course number if it's CMU)
    name: String!
    instructor: String!
    info: String # IPFS hash
  }

  type Course {
    id: ID!
    courseId: String! # id specific to PI (i.e. course number if it's CMU)
    certs: [Cert!]!
    name: String!
    instructor: String!
    info: String # IPFS hash
  }

  type Cert {
    nftId: String! # oracle contract NFT id
    course: Course!
    holder: String! # student's ethereum address
  }

  type Student {
    name: String!
    address: String! # student's ethereum address
    pub: String! # student's compressed public key
  }
`;