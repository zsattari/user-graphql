import { Field, Int, InputType } from "type-graphql";

@InputType({
    description :"All items that are queried are returned. when the ui expects a special number of results, we take `page` and `number` to return the items in ordered chunks."
})
export class PaginationInput {
    @Field(() => Int, { defaultValue: 1,description:"The page number that is expected to be read from result of query." })
    page: number = 1;

    @Field(() => Int, { defaultValue: 25, description:"The number of item to return from all readed items." })
    take: number = 25;
}
