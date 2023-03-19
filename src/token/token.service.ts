import { Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import * as jwt from 'jsonwebtoken';
import { User } from '@prisma/client';

@Injectable()
export class TokenService {
  constructor(private readonly repo: UserService) {}

  async createToken(user: User) {
    const payload = { id: user.id, role: 'ADMIN' };

    return jwt.sign(payload, process.env.SECRET);
  }
}
