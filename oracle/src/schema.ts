import { gql } from 'apollo-server';

export default gql`

  type Query {
    getCourse(id: String!): Course
  }

  type Mutation {
    createCourse(course: CourseInput!): Course
    updateCourse(course: CourseUpdate!): Course
    issueCert(courseId: String!, recipient: String!): Cert
  }

  type Institution {
    id: String! # ethereum address
    name: String! # name of institution
    oracle: String! # oracle contract's ethereum address
  }

  input CourseInput {
    id: int! # id specific to PI (i.e. course number if it's CMU)
    name: String!
    instructor: String!
    info: String # IPFS hash or URL
  }

  input CourseUpdate {
    id: Int # id specific to PI (i.e. course number if it's CMU)
    name: String
    instructor: String
    info: String # IPFS hash or URL
  }

  type Course {
    id: Int! # id specific to PI (i.e. course number if it's CMU)
    nftId: String! # oracle contract NFT variety ID
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