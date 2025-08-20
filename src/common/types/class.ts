export type Class = {
  _id: string;
  subjectId: string;
  majorId: string;
  name: string;
  teacherId: string;
  studentIds: string;
  startDate: string | Date;
  totalSessions: number;
  shift: string;
  room: string;
  deletedAt: string;
  maxStudents: number;
  updatedAt: string;
  createdAt: string;
};
