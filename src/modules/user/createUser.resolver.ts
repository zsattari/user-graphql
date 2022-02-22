import { Arg, Mutation, Resolver } from "type-graphql";
import { User } from "../../entity/User";
import { BadCreateError } from "../../errors/BadCreateError";
import { CreateUserInput } from "./domains/CreateUserInput";

@Resolver(() => User)
export class CreateUserResolver {
    @Mutation(() => User)
    async createUser(@Arg("data") createUserInput: CreateUserInput) {
        try {
            const user = await User.create({
                ...createUserInput
            }).save();

            return user;
        } catch (error) {
            throw new BadCreateError()+error.message;
        }
    }
}
