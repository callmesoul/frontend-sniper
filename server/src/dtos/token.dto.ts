import { ObjectType, Field, Int } from "type-graphql";


@ObjectType()
export class tokenDto {
    @Field()
    readonly token: string;
}