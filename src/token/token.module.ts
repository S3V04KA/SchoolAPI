import { Module } from "@nestjs/common";
import { TokenService } from "./token.service";
import { UserModule } from "src/user/user.module";

@Module({
  providers: [TokenService],
  imports: [UserModule],
  exports: [TokenService],
})
export class TokenModule {}
