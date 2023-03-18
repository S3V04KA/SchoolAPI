import { Resolver, Args, Query, Mutation, Context } from "@nestjs/graphql";
import { ClassService } from "./class.service";
import { NewClass, SecureUser } from "src/graphql";
import { UseGuards } from "@nestjs/common";
import { AuthGuard } from "src/auth/auth.guard";

@Resolver("Class")
export class ClassResolver {
  constructor(private readonly classService: ClassService) {}

  @Query("classes")
  async classes() {
    return this.classService.classes();
  }

  @Query("class")
  async class(@Args("id") id: string) {
    return this.classService.class(id);
  }

  @UseGuards(new AuthGuard())
  @Query("myClass")
  async myClass(@Context("user") user: SecureUser) {
    return await this.classService.myClass(user);
  }

  @Mutation("createClass")
  async createClass(
    @Context("user") user: SecureUser,
    @Args("input") args: NewClass
  ) {
    return this.classService.createClass(args);
  }
}
