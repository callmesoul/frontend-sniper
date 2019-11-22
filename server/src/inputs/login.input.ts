import { InputType, Field } from "type-graphql";

@InputType()
export class LoginInput {
    @Field()
    readonly username: string;
    @Field()
    readonly password: string;
}