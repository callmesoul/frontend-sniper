import { InputType, Field, } from "type-graphql";

@InputType()
export class CreateAppInput {
    @Field()
    readonly name: string;
    @Field()
    readonly domain: string;
    @Field()
    readonly isNotify: boolean;
}


@InputType()
export class UpdateAppInput {
    @Field()
    readonly id: string;
    @Field()
    readonly name: string;
    @Field()
    readonly domain: string;
    @Field()
    readonly isNotify: boolean;
}

