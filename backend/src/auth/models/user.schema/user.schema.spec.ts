import { User, UserSchema } from './user.schema';

describe('UserSchema', () => {
  it('should be defined', () => {
    expect(UserSchema).toBeDefined(); // ✅ Correct way to test Mongoose Schema
  });
});
