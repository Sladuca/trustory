

interface getCourseArgs {
  id: string
}

interface CreateCourseArgs {
  course: any
}

interface UpdateCourseArgs {
  course: any
}

interface issueCertArgs {
  courseId: string
  recipient: string
  recipientKey: string
}

export default {
  Query: {
    getCourse: (obj: any, { id }: getCourseArgs, context: any) => {
      return "unimplemented";
    }
  },
  Mutation: {
    createCourse: (obj: any, { course }: CreateCourseArgs, context: any) => {
      return "unimplemented";
    },
    updateCourse: (obj: any, { course }: UpdateCourseArgs, context: any) => {
      return "unimplemented";
    } ,
    issueCert: (obj: any, { courseId, recipient, recipientKey }: issueCertArgs, context: any) => {
      return "unimplemented";
    }
  }
};