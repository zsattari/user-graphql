import { NotFoundError } from './../../errors/NotFoundError';
import { GetUserInput } from './domains/GetUserInput';
import { PaginationInput } from "./../utils/PaginationInput";
import { UsersResponse } from "./boards/UsersResponse";
import { User } from "../../entity/User";
import { Arg, Query, Resolver } from "type-graphql";
import { getRepository} from "typeorm";
import { paginateQuery ,getResultWithOptionalTotal} from '../utils/queryHelper';

@Resolver(() => User)
export class GetUser {
    @Query(() => UsersResponse,{nullable:true})
    async getUsers(
        @Arg("pagination", { defaultValue: new PaginationInput() })
        paginationInput: PaginationInput,
        @Arg("data", { nullable: true }) getUserInput: GetUserInput
    ) {
        try{


        let query = getRepository(User).createQueryBuilder("user");

        
        console.log(getUserInput)
        
        getUserInput.lastName && query.where("user.lastName = :lastName" , {lastName:getUserInput.lastName})

        paginateQuery(query, paginationInput);


        const users=await getResultWithOptionalTotal(query,true)
        return users;
        }catch (error){
            throw new NotFoundError()+error.message

        }
    }
}


