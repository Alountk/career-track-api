import { Inject, Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import * as bcrypt from 'bcrypt';
import type { IUserRepository } from "../ports/user.repository";
import { USER_REPOSITORY } from "../ports/user.repository";

export interface LoginUserCommand {
    email: string;
    password: string;
}

@Injectable()
export class LoginUserUseCase {
    constructor(
        @Inject(USER_REPOSITORY)
        private readonly userRepository: IUserRepository,
        private readonly jwtService: JwtService,
    ) {}

    async execute(data: LoginUserCommand): Promise<{ accessToken: string }> {
        const user = await this.userRepository.findByEmail(data.email);
        
        if (!user) {
            throw new UnauthorizedException('Invalid credentials');
        }

        const isPasswordValid = await bcrypt.compare(data.password, user.password);

        if(!isPasswordValid) {
            throw new UnauthorizedException('Invalid credentials');
        }

        const payload = { sub: user.id, email: user.email, role: user.role }

        return {
            accessToken: await this.jwtService.signAsync(payload),
        }
    }
}