import { Length } from "class-validator";
import { Field, InputType } from "type-graphql";
import { User } from "../../../entity/User";

@InputType()
export class UpdateUserInput implements Partial<User> {
    @Field()
    @Length(2, 255)
    firstName?: string;

    @Field()
    @Length(2, 255)
    lastName?: string;


    @Field()
    @Length(4, 10)
    password?: string;
}
