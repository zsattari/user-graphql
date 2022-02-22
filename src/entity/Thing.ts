import { Field, ObjectType } from "type-graphql";
import {
    PrimaryGeneratedColumn,
    BaseEntity
} from "typeorm";

@ObjectType({ description: "thing" })
export class Thing extends BaseEntity {
    @Field({description:"thing Id"})
    @PrimaryGeneratedColumn()
    id: string;
}
