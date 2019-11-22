import { Resolver, Query, Mutation, Args, } from '@nestjs/graphql';
import { AppsService } from './apps.service';
import { AppDto } from '../dtos/app.dto';
import { GqlAuthGuard } from '../guards/gql-auth.guard';
import { CurrentUser } from '../decorators/CurrentUser';
import { UseGuards } from '@nestjs/common';
import { User } from '../interfaces/user.interface';
import { CreateAppInput, UpdateAppInput } from '../inputs/app.input';
import { ObjectIdScalar } from '../scalars/object-id.scalar';
import { IDDTO } from '../dtos/id.dto';
import { RemoveInput } from '../inputs/remove.input';

@Resolver('Apps')
export class AppsResolver {
    constructor(
        private readonly appsService: AppsService
    ){}

    
    @Query(() => [AppDto])
    @UseGuards(GqlAuthGuard)
    async userApps(@CurrentUser() user: User){
        return await this.appsService.findUserApps({userId: user.id})
    }

    @Mutation(() => AppDto)
    @UseGuards(GqlAuthGuard)
    async createApp(
        @CurrentUser() user: User,
        @Args('input') input: CreateAppInput
    ){  
        console.log(user)
        return await this.appsService.create({...input,userId: user.id, createdAt: new Date()})
    }

    @Mutation(() => AppDto)
    @UseGuards(GqlAuthGuard)
    async updateApp(
        @CurrentUser() user: User,
        @Args('input') input: UpdateAppInput
    ){  
        return await this.appsService.update(input,user);
    }

    @Mutation(() => Boolean)
    @UseGuards(GqlAuthGuard)
    async removeApp(@Args('text') text: String){  
        return true;
        // return await this.appsService.remove(id,user)
    }
}
