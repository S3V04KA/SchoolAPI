import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver } from '@nestjs/apollo';
import { ApolloDriverConfig } from '@nestjs/apollo/dist/interfaces';
import { ClassModule } from './class/class.module';
import { AuthModule } from './auth/auth.module';
import { TokenModule } from './token/token.module';
import { GraphQlModule } from './graph-ql/graph-ql.module';
import { RolesModule } from './roles/roles.module';
import { NewComplexModule } from './new-complex/new-complex.module';
import { ProductModule } from './product/product.module';
import { ComplexModelModule } from './complex-model/complex-model.module';
import { CategoryModule } from './category/category.module';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      typePaths: ['./**/*.graphql'],
      driver: ApolloDriver,
      playground: true,
      context: ({ req }) => ({ headers: req.headers }),
    }),
    AuthModule,
    UserModule,
    ClassModule,
    TokenModule,
    GraphQlModule,
    RolesModule,
    NewComplexModule,
    ProductModule,
    ComplexModelModule,
    CategoryModule,
  ],
})
export class AppModule {}
