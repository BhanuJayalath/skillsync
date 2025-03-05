import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
// Defining the Courses, Tests, Job Role, Experience, Education, and Skills as nested schemas
class Course {
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

class Test {
  @Prop()
  testId: string;

  @Prop()
  testLevel: string;

  @Prop()
  mark: string;

  @Prop()
  xAxis: string;
}

class JobRole {
  @Prop()
  jobName: string;
}

@Schema()
export class User {
  @Prop()
  email: string; // User's email address

  @Prop()
  number: string; // User's number

  @Prop()
  displayName: string; // User's display name

  @Prop()
  fullName: string; // User's full name

  @Prop()
  avatar: string; // Profile picture URL

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
  timeZone: string; // User's timezone

  @Prop([Course])
  courses: Course[]; // Array of courses

  @Prop([Test])
  tests: Test[]; // Array of tests

  @Prop([JobRole])
  jobRole: JobRole[]; // Array of job roles

  @Prop({ type: [Experience] })
  experience: Experience[];

  @Prop({ type: [Education] })
  education: Education[];

  @Prop({ type: [String] })
  skills: string[];
}

export const UserSchema = SchemaFactory.createForClass(User);
