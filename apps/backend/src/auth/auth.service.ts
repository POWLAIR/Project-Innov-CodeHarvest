import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import * as bcrypt from 'bcrypt';
import { RegisterInput } from './dto/register.input';
import { LoginInput } from './dto/login.input';
import { AuthPayload } from './models/auth-payload.model';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  async register(data: RegisterInput): Promise<AuthPayload> {
    const hashedPassword = await bcrypt.hash(data.password, 10);

    const user = await this.prisma.user.create({
      data: {
        email: data.email,
        password_hash: hashedPassword,
      },
    });

    const token = this.jwtService.sign({ userId: user.id });

    return { userId: user.id, token };
  }

  async login(data: LoginInput): Promise<AuthPayload> {
    const user = await this.prisma.user.findUnique({
      where: { email: data.email },
    });

    if (!user || !(await bcrypt.compare(data.password, user.password_hash))) {
      throw new Error('Invalid credentials');
    }

    const token = this.jwtService.sign({ userId: user.id });

    return { userId: user.id, token };
  }
}
