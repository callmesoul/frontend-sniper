import { ObjectType, Field, Int } from "type-graphql";


@ObjectType()
export class AppDto {
    @Field()
    readonly id: string;
    @Field()
    readonly appScrect: string;
    @Field()
    readonly domain: string;
    @Field()
    readonly name: string;
    @Field()
    readonly userId: string;
    @Field()
    readonly isNotify: Boolean;
    @Field()
    readonly createdAt: Date;
}