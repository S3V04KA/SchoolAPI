import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver } from '@nestjs/apollo';
import { ApolloDriverConfig } from '@nestjs/apollo/dist/interfaces';
import { ClassModule } from './class/class.module';
import { AuthModule } from './auth/auth.module';
import { TokenModule } from './token/token.module';
import { ComplexModule } from './complex/complex.module';
import { GraphQlModule } from './graph-ql/graph-ql.module';
import { RolesModule } from './roles/roles.module';

@Module({
  imports: [
    AuthModule,
    UserModule,
    ClassModule,
    GraphQLModule.forRoot<ApolloDriverConfig>({
      typePaths: ['./**/*.graphql'],
      driver: ApolloDriver,
      playground: true,
      context: ({ req }) => ({ headers: req.headers }),
    }),
    TokenModule,
    ComplexModule,
    GraphQlModule,
    RolesModule,
  ],
})
export class AppModule {}
