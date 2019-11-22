import { ObjectType, Field, Int } from "type-graphql";


@ObjectType()
export class IDDTO {
    @Field()
    public id: string;
}