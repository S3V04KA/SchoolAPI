import { Module } from '@nestjs/common';
import { GraphQLAuthResolver } from '../auth/auth.resolver';
import { GraphQLUserResolver } from '../user/user.resolver';
import { UserModule } from 'src/user/user.module';
import { AuthModule } from 'src/auth/auth.module';
import { RolesModule } from 'src/roles/roles.module';
import { GraphQLRoleResolver } from '../roles/role.resolver';
import { CategoryResolver } from 'src/category/category.resolver';
import { CategoryModule } from 'src/category/category.module';

@Module({
  imports: [UserModule, AuthModule, RolesModule, CategoryModule],
  providers: [GraphQLAuthResolver, GraphQLUserResolver, GraphQLRoleResolver, CategoryResolver],
})
export class GraphQlModule {}
