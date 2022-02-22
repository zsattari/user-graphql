import { Field, InputType } from "type-graphql";
import { User } from "../../../entity/User";

@InputType()
export class GetUserInput implements Partial<User> {
    @Field({ nullable: true })
    firstName?: string;

    @Field({ nullable: true })
    lastName?: string;

    @Field({ nullable: true })
    phoneNumber?: string;
}
