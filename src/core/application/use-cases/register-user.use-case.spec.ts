import { IUserRepository } from '../ports/user.repository';
import { RegisterUserUseCase } from './register-user.use-case';

describe('RegisterUserUseCase', () => {
  let useCase: RegisterUserUseCase;
  let userRepository: jest.Mocked<IUserRepository>;

  beforeEach(() => {
    userRepository = {
      save: jest.fn(),
    } as any;
    useCase = new RegisterUserUseCase(userRepository);
  });

  it('should register a user', async () => {
    // GIVEN
    const data = {
      email: 'john@example.com',
      password: 'Password123!',
      name: 'John',
      lastName: 'Doe',
      role: 'user',
    };

    // WHEN
    await useCase.execute(data);

    // THEN
    expect(userRepository.save).toHaveBeenCalledWith(data);
  });
});
