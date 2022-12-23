import { Resolver, Args, Query, Mutation } from '@nestjs/graphql';
import { ClassService } from './class.service';
import { NewClass } from 'src/graphql';

@Resolver('Class')
export class ClassResolver {
  constructor(private readonly classService: ClassService) {}

  @Query('classes')
  async classes() {
    return this.classService.classes();
  }

  @Query('class')
  async class(@Args('id') id: string) {
    return this.classService.class(id);
  }

  @Mutation('createClass')
  async createClass(@Args('input') args: NewClass) {
    return this.classService.createClass(args);
  }
}
