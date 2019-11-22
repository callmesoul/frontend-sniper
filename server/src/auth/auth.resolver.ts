import { Resolver, Mutation, Args, Query } from '@nestjs/graphql';
import { CreateUserDto } from '../dtos/create-user.dto';
import { UserInput } from '../inputs/user.input';
import { LoginInput } from '../inputs/login.input';
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

    // 登陆
    @Mutation(() => tokenDto)
    async login(
        @Args('input') input: LoginInput,
    ) {
        return await this.authService.login(input);
    }
}
