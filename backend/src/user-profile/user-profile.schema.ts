import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
// Defining the Courses, Tests, Job Role, Experience, Education, and Skills as nested schemas
class Course {
  @Prop()
  courseId: string;

  @Prop()
  code: string;

  @Prop()
  name: string;

  @Prop()
  result: string;

  @Prop()
  mark: string;
}
class Experience {
  @Prop()
  jobId: string;

  @Prop()
  jobName: string;

  @Prop()
  companyName: string;

  @Prop()
  startDate: string;

  @Prop()
  endDate: string;

  @Prop()
  description: string;
}
class Education {
  @Prop()
  eduId: string;

  @Prop()
  courseName: string;

  @Prop()
  schoolName: string;

  @Prop()
  startDate: string;

  @Prop()
  endDate: string;

  @Prop()
  description: string;
}

class Notifications {
  @Prop()
  jobId: string;

  @Prop()
  jobTitle: string;

  @Prop()
  jobType: string;

  @Prop()
  companyName: string;

  @Prop()
  companyEmail: string;

  @Prop()
  recruiterNote: string;

  @Prop()
  isSelected: boolean;

  @Prop()
  approved: boolean;

}

class Test {
  @Prop()
  jobId: string;

  @Prop()
  testId: string;

  @Prop()
  testLevel: string;

  @Prop()
  mark: string;
}

class SelectedJob {
  @Prop()
  jobTitle: string;
  @Prop()
  jobId:string;
}


@Schema()
export class User {
  @Prop()
  email: string; // User's email address

  @Prop()
  contact: string; // User's number

  @Prop()
  userName: string; // User's display name

  @Prop()
  fullName: string; // User's full name

  @Prop()
  avatar: string; // Profile picture URL

  @Prop()
  cvSummary: string;

  @Prop()
  gitHub: string; // User gitHub URL

  @Prop()
  linkedIn: string; // User linkedin URL

  @Prop()
  gender: string; // User's gender

  @Prop()
  language: string; // User's language

  @Prop()
  city: string; // User's city

  @Prop()
  country: string; // User's country

  @Prop()
  portfolio: string; // User's timezone

  @Prop([Course])
  courses: Course[]; // Array of courses

  @Prop([Test])
  tests: Test[]; // Array of tests

  @Prop({type: SelectedJob})
  selectedJob: SelectedJob; // selected job object

  @Prop({ type: [Experience] })
  experience: Experience[];

  @Prop({ type: [Education] })
  education: Education[];

  @Prop({ type: [Notifications] })
  notifications: Notifications[];

  @Prop({ type: [String] })
  skills: string[];
}

export const UserSchema = SchemaFactory.createForClass(User);
