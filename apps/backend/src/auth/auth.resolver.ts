import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { RegisterInput } from './dto/register.input';
import { LoginInput } from './dto/login.input';
import { AuthPayload } from './models/auth-payload.model';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from './jwt-auth.guard';

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => AuthPayload)
  async registerUser(@Args('data') data: RegisterInput) {
    return this.authService.register(data);
  }

  @Mutation(() => AuthPayload)
  async login(@Args('data') data: LoginInput) {
    return this.authService.login(data);
  }

  @Mutation(() => String)
  @UseGuards(JwtAuthGuard)
  secureAction(): string {
  return 'Only authenticated users can see this';
  }
}
