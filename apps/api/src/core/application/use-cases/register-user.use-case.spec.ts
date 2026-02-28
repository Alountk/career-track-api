import { IUserRepository } from '../ports/user.repository';
import { RegisterUserUseCase } from './register-user.use-case';

describe('RegisterUserUseCase', () => {
  let useCase: RegisterUserUseCase;
  let userRepository: jest.Mocked<IUserRepository>;

  beforeEach(() => {
    userRepository = {
      save: jest.fn(),
      findByEmail: jest.fn(),
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

    // Configure the mock to return a user when findByEmail is called
    userRepository.findByEmail.mockResolvedValue(null);

    // WHEN
    await useCase.execute(data);

    // THEN
    expect(userRepository.save).toHaveBeenCalled();
    const savedUser = userRepository.save.mock.calls[0][0];
    expect(savedUser.email).toBe(data.email);
    expect(savedUser.password).not.toBe(data.password);
  });
});
