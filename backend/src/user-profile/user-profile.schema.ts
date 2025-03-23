import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
// Defining the Courses, Tests, Job Role, Experience, Notification, Education, and Skills as nested schemas
class Course {
  @Prop()
  courseId: string; // course ID

  @Prop()
  code: string; // course code

  @Prop()
  name: string; // course name

  @Prop()
  result: string; // result

  @Prop()
  mark: string; //  mark
}
class Experience {
  @Prop()
  jobId: string; // job ID

  @Prop()
  jobName: string; // job name

  @Prop()
  companyName: string; // company name

  @Prop()
  startDate: string; // start date

  @Prop()
  endDate: string; // end date

  @Prop()
  description: string; // description
}
class Education {
  @Prop()
  eduId: string; // education ID

  @Prop()
  courseName: string; // course name

  @Prop()
  schoolName: string; // school name

  @Prop()
  startDate: string; // start date

  @Prop()
  endDate: string; // end date

  @Prop()
  description: string; // description
}

class Notifications {
  @Prop()
  jobId: string; // Job ID

  @Prop()
  jobTitle: string; // job title

  @Prop()
  jobType: string; // job type

  @Prop()
  companyName: string; // company name

  @Prop()
  companyEmail: string; // company email

  @Prop()
  recruiterNote: string; // recruiter note

  @Prop()
  isSelected: boolean; // job selected boolean

  @Prop()
  approved: boolean; // job approved boolean

}

class Test {
  @Prop()
  jobId: string; // Job ID

  @Prop()
  testId: string; // Test ID

  @Prop()
  testLevel: string; // Test level

  @Prop()
  mark: string; // Test mark
}

class SelectedJob {
  @Prop()
  jobTitle: string; // Job Title
  @Prop()
  jobId:string; // Job ID
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
  cvSummary: string; // User's CV summary

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
  portfolio: string; // User's portfolio

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
