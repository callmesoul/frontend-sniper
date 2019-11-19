import { Resolver, Mutation, Args, Query } from '@nestjs/graphql';
import { UsersService } from './users.service';
import { CreateUserDto } from 'src/dtos/create-user.dto';
import { UserInput } from 'src/inputs/cat.input';

@Resolver('Users')
export class UsersResolver {
    constructor(
        private readonly usersService: UsersService
    ){}

    @Query(() => String)
    async hello(){
        return 'hello';
    }
}
