import { Resolver, Query } from '@nestjs/graphql';
import { ErrorsService } from './errors.service';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from '../guards/gql-auth.guard';
import { CurrentUser } from '../decorators/CurrentUser';
import { User } from '../interfaces/user.interface';
import { ErrorDto } from '../dtos/error.dto';

@Resolver('Errors')
export class ErrorsResolver {
    constructor(
        private readonly errorsService: ErrorsService
    ){}

    @Query(() => [ErrorDto])
    @UseGuards(GqlAuthGuard)
    async userAppsErros(@CurrentUser() user: User){
        return await this.errorsService.findUserApps(user.id)
    }
}
