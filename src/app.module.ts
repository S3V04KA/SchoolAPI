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
import { GeneralResolversModule } from './general-resolvers/general-resolvers.module';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      typePaths: ['./**/*.graphql'],
      driver: ApolloDriver,
      playground: true,
      context: ({ req }) => ({ headers: req.headers }),
      cors: {
        origin: 'http://front/',
        credentials: true,
      }
    }),
    AuthModule,
    UserModule,
    ClassModule,
    TokenModule,
    ComplexModule,
    GraphQlModule,
    RolesModule,
    GeneralResolversModule,
  ],
})
export class AppModule {}
