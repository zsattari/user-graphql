import { Arg, Mutation, Resolver ,Query} from "type-graphql";
import { LoginResponse } from "./boards/LoginResponse";
import { LoginInput } from "./domains/LoginInput";
import { User } from "../../entity/User";
import { jwtSign } from "../../utils/jwt";
import { NotFoundError } from './../../errors/NotFoundError';

@Resolver()
export class LoginUserResolver {
    @Query(() => String)
    async hello() {
        //keep this Query as a memory of the first days of satek's birth.
        //even the useless await...
        return await "hello word";
    }
    @Mutation(() => LoginResponse)
    async login(
        @Arg("data") { phoneNumber, password, device }: LoginInput
    ): Promise<LoginResponse> {

        const user = await User.findOne({ phoneNumber,password });


        if (!user || user.password!=password) {
             throw new NotFoundError();
        }


        return {
            token: jwtSign(user!.id, device),
            user: user
        };
    }
}
