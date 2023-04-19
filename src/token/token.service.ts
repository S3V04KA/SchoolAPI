import { Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import * as jwt from 'jsonwebtoken';
import { User } from '@prisma/client';
import { SecureUser } from 'src/graphql';

@Injectable()
export class TokenService {
  constructor(private readonly repo: UserService) {}

  async createToken(user: SecureUser) {
    return jwt.sign(user, process.env.SECRET);
  }
}
