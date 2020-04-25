import { Context } from './index';
import { prismaVersion } from '@prisma/client';
import * as crypto from 'eth-crypto';

interface getCourseArgs {
  id: string;
}

interface CreateCourseArgs {
  course: any;
}

interface CreateStudentArgs {
  name: string;
  address: string;
  pub: string;
}

interface issueCertArgs {
  courseId: string;
  studentId: string;
}

export default {
  Query: {
    getCourse: (obj: any, { id }: getCourseArgs, { prisma }: Context) => {
      return prisma.course.findOne({
        where: { id }
      })
    }
  },
  Mutation: {
    createCourse: async (obj: any, { course }: CreateCourseArgs, { prisma, ipfs, ethereum }: Context) => {
      const createCourse = prisma.course.create({
        data: {
          courseId: course.id,
          name: course.name,
          instructor: course.instructor,
          info: course.info || undefined
        }
      });
      const upload = await ipfs.upload(JSON.stringify(course));

      try {
        const [newCourse, ipfsHash] = await Promise.all([createCourse, upload]);
        if (await ethereum.createCourse(newCourse.courseId, ipfsHash)) {
          return newCourse;
        } else {
          throw new Error('call to oracle contract failed!')
        }
      } catch (err) {
        console.error(err.message);
        return null;
      }
    },
    issueCert: async (obj: any, { courseId, studentId }: issueCertArgs, { prisma, ipfs, ethereum }: Context) => {
      const getCourse = prisma.course.findOne({
        where: { id: courseId }
      });
      const getStudent = prisma.student.findOne({
        where: {
          id: studentId
        }
      });

      const [course, student] = await Promise.all([getCourse, getStudent]);
      if (course === null) {
        console.error('course DNE!');
        return null;
      } else if (student === null) {
        console.error('student DNE!');
        return null;
      }

      const courseData = JSON.stringify(course);
      const key = crypto.publicKey.decompress(student.pub);
      const encrypted = crypto.encryptWithPublicKey(key, courseData);

      const uri = await ipfs.upload(encrypted);
      const nftId = await ethereum.issueCert(student.address, course.info, uri);
      
      const cert = await prisma.cert.create({
        data: {
          nftId,
          course: {
            connect: {
              id: course.id
            }
          },
          holder: {
            connect: {
              id: student.id
            }
          }
        }
      });
      return cert;
    }
  }
};