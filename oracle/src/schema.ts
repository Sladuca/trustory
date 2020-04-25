import { gql } from 'apollo-server';

export default gql`

  type Query {
    getCourse(id: String!): Course
  }

  type Mutation {
    createCourse(course: CourseInput!): Course
    updateCourse(course: CourseUpdate!): Course
    issueCert(courseId: String!, recipient: String!, recipientKey: String!): Cert
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
    info: String # IPFS hash or URL
  }

  input CourseUpdate {
    id: String # id specific to PI (i.e. course number if it's CMU)
    name: String
    instructor: String
    info: String # IPFS hash or URL
  }

  type Course {
    id: String! # id specific to PI (i.e. course number if it's CMU)
    certs: [Cert!]!
    name: String!
    instructor: String!
    info: String # IPFS hash or URL
  }

  type Cert {
    id: String! # oracle contract NFT id
    course: Course!
    holder: String! # student's ethereum address
  }
`;