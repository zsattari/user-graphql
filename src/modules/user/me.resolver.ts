import { Arg, Query, Resolver} from "type-graphql";
import { User } from "../../entity/User";
import { jwtVerify } from "../../utils/jwt";

@Resolver()
export class MeResolver {
    @Query(() => User, { nullable: true })
    async me(@Arg("token") token:string): Promise<User | undefined> {
        const { device, id, iat /*,eat*/ } = jwtVerify(token);
        console.log(device,id,iat)
        return await User.findOne(id)
    }
}
