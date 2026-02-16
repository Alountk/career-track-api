import { ApiProperty } from "@nestjs/swagger";
import { UserDto } from "./user.dto";

export class RegisterUserDto extends UserDto {
    @ApiProperty({ example: 'John' })
    name: string;

    @ApiProperty({ example: 'Doe' })
    lastName: string;

    @ApiProperty({ example: 'user' })
    role: string;
}