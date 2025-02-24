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
  @Prop({ type: String, unique: true })
  id: string; // Unique user ID

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

  @Prop([Number])
  experience: number[]; // Array of experience

  @Prop([Number])
  education: number[]; // Array of education

  @Prop([Number])
  skills: number[]; // Array of skills
}

export const UserSchema = SchemaFactory.createForClass(User);
