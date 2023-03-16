import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { UserService } from 'src/user/user.service';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class TokenService {
  constructor(private readonly repo: UserService) {}

  async createToken(user: User) {
    const payload = { id: user.id, role: 'ADMIN' };

    return jwt.sign(payload, process.env.SECRET);
  }
}
