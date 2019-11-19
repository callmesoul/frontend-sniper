import { ObjectType, Field, Int } from "type-graphql";


@ObjectType()
export class CreateUserDto {
    @Field()
    readonly username: string;
    @Field()
    readonly password: string;
    @Field()
    readonly email: string;
}