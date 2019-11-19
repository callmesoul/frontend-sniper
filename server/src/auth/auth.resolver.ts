import { Resolver, Mutation, Args, Query } from '@nestjs/graphql';
import { CreateUserDto } from '../dtos/create-user.dto';
import { UserInput } from '../inputs/cat.input';
import { AuthService } from './auth.service';
import { tokenDto } from '../dtos/token.dto';

@Resolver('Auth')
export class AuthResolver {
    constructor(
        private readonly authService: AuthService
    ){}

    @Query(() => String)
    async hello(){
        return 'hello';
    }

    // 注册
    @Mutation(() => tokenDto)
    async register(
        @Args('input') input: UserInput,
    ) {
        return await this.authService.register(input);
    }
}
