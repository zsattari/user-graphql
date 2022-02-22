import { NotFoundError } from './../../errors/NotFoundError';
import { BadUpdateError } from './../../errors/BadUpdateError';
import { Resolver, Mutation, Arg } from "type-graphql";
import { User } from "../../entity/User";
import { UpdateUserInput } from "./domains/UpdateUserInput";

@Resolver(() => User)
export class UpdateUserResolver {
    @Mutation(() => User)
    async updateUser(@Arg("id") id: string, @Arg("data") updateUserInput: UpdateUserInput) {
        try {

            const user = await User.findOne(id);
            if (!user) {
                throw new NotFoundError();

            }

            await User.update(id, {
                firstName: updateUserInput.firstName ? updateUserInput.firstName : user!.firstName,
                lastName: updateUserInput.lastName ? updateUserInput.lastName : user!.lastName,
                password: updateUserInput.password ? updateUserInput.password : user!.password,
                phoneNumber: user!.phoneNumber
            });
        } catch (error) {
            throw new BadUpdateError()+error.message;
            
        }
        return await User.findOne(id);

    }
}
