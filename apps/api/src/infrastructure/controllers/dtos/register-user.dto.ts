import { ApiProperty } from "@nestjs/swagger";
import { UserDto } from "./user.dto";
import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class RegisterUserDto extends UserDto {
    @ApiProperty({ example: 'John' })
    @IsString()
    @IsNotEmpty()
    name: string;

    @ApiProperty({ example: 'Doe' })
    @IsString()
    @IsNotEmpty()
    lastName: string;
    
    @ApiProperty({ example: 'user' })
    @IsString()
    @IsNotEmpty()
    role: string;
}