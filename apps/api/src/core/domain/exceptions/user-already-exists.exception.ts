import { HttpStatus } from '@nestjs/common';
import { DomainException } from './domain.exception';

export class UserAlreadyExistsException extends DomainException {
  constructor(email: string) {
    super(
      `User with email ${email} already exists`,
      'USER_ALREADY_EXISTS',
      HttpStatus.CONFLICT,
    );
  }
}
