import { ObjectType, Field, Int } from "type-graphql";


@ObjectType()
export class CreateAppDto {
    @Field()
    readonly domain: String;
    @Field(() => Boolean)
    readonly isNotify: Boolean;
    @Field()
    readonly name: String;
    @Field(()=> String)
    readonly userId: String;
    @Field()
    readonly createdAt: Date;
}