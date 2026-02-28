import { HttpStatus } from "@nestjs/common";

export abstract class DomainException extends Error {
  constructor(
    public readonly message: string,
    public readonly errorCode: string,
    public readonly status: HttpStatus = HttpStatus.BAD_REQUEST,
  ){
    super(message);
    this.name = this.constructor.name;
  }
}