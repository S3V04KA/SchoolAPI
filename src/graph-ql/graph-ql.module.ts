import { Module } from '@nestjs/common';
import { GraphQLAuthResolver } from './resolvers/graph-ql-auth.resolver';
import { GraphQLUserResolver } from './resolvers/graph-ql-user.resolver';
import { GraphQLComplexResolver } from './resolvers/graph-ql-complex.resolver';
import { UserModule } from 'src/user/user.module';
import { AuthModule } from 'src/auth/auth.module';
import { ComplexModule } from 'src/complex/complex.module';
import { RolesModule } from 'src/roles/roles.module';
import { GraphQLRoleResolver } from './resolvers/graph-ql-role.resolver';

@Module({
  imports: [UserModule, AuthModule, ComplexModule, RolesModule],
  providers: [GraphQLAuthResolver, GraphQLUserResolver, GraphQLComplexResolver, GraphQLRoleResolver],
})
export class GraphQlModule {}
