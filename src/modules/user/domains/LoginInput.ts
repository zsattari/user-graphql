import { Length } from "class-validator";
import { Field, InputType } from "type-graphql";

@InputType()
export class LoginInput {

    @Field()
    @Length(4, 10)
    password: string;


    @Field()
    @Length(4, 20)
    phoneNumber: string;

    @Field()
    @Length(4, 20)
    device:string;
}
