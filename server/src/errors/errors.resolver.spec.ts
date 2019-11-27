import { Test, TestingModule } from '@nestjs/testing';
import { ErrorsResolver } from './errors.resolver';

describe('ErrorsResolver', () => {
  let resolver: ErrorsResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ErrorsResolver],
    }).compile();

    resolver = module.get<ErrorsResolver>(ErrorsResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
