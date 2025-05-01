import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { GqlExecutionContext } from '@nestjs/graphql';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}

  canActivate(context: ExecutionContext): boolean {
    const ctx = GqlExecutionContext.create(context).getContext();
    const authHeader = ctx.req.headers.authorization;

    if (!authHeader) return false;

    const token = authHeader.replace('Bearer ', '');
    try {
      const payload = this.jwtService.verify(token, { secret: 'SECRET_KEY' });
      ctx.user = payload;
      return true;
    } catch {
      return false;
    }
  }
}
