import { Injectable, CanActivate, ExecutionContext, HttpException, HttpStatus } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class AuthGuard implements CanActivate {
  async canActivate(context: ExecutionContext) {
    const ctx = GqlExecutionContext.create(context).getContext();
    if (!ctx.headers.auth) return false;

    ctx.user = await this.validateToken(ctx.headers.auth);
    if (ctx.user) return true;
    return false;
  }

  async validateToken(auth: string) {
    if (auth.split(' ')[0] !== 'Bearer') return new HttpException('Invalid token', HttpStatus.UNAUTHORIZED);

    const token = auth.split(' ')[1];

    try {
      return await jwt.verify(token, process.env.SECRET);
    } catch (e) {
      return new HttpException('Invalid token', HttpStatus.UNAUTHORIZED);
    }
  }
}
