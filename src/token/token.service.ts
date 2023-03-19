import { Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import * as jwt from 'jsonwebtoken';
import { SecureUser } from 'src/Types/userTypes';

@Injectable()
export class TokenService {
  constructor(private readonly repo: UserService) {}

  async createToken(user: SecureUser) {
    const payload = { id: user.id, role: 'ADMIN' };

    return jwt.sign(payload, process.env.SECRET);
  }
}
