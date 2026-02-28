import { HttpStatus } from '@nestjs/common';
import { DomainException } from './domain.exception';

export class InvalidCredentialsException extends DomainException {
  constructor() {
    super(
      'Invalid email or password',
      'INVALID_CREDENTIALS',
      HttpStatus.UNAUTHORIZED,
    );
  }
}
