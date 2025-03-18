import { JwtStrategy } from './jwt.strategy';
import { ConfigService } from '@nestjs/config';

describe('JwtStrategy', () => {
  let jwtStrategy: JwtStrategy;

  beforeEach(() => {
    const configService = { get: jest.fn().mockReturnValue('test-secret') } as unknown as ConfigService;
    jwtStrategy = new JwtStrategy(configService);
  });

  it('should be defined', () => {
    expect(jwtStrategy).toBeDefined();
  });
});
