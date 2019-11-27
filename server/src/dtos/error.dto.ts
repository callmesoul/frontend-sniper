import { ObjectType, Field, Int } from "type-graphql";


@ObjectType()
export class ErrorDto {
    @Field()
    readonly id: string;
    @Field()
    readonly title: string;
    @Field()
    readonly msg: string;
    @Field()
    readonly category: string;
    @Field()
    level: string;
    @Field(() => Int)
    readonly col: number
    @Field(() => Int)
    readonly line: number;
    @Field()
    readonly appId: string;
    @Field()
    readonly user: string;
    @Field()
    readonly isNotify: boolean;
}