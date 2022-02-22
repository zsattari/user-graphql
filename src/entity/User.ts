import { Field, ObjectType } from "type-graphql";
import { Column, Entity } from "typeorm";
import { Thing } from "./Thing";

@ObjectType({ description: "user" })
@Entity()
export class User extends Thing {
    @Field()
    @Column("varchar", { length: 255, nullable: true })
    firstName?: string;

    @Field()
    @Column("varchar", { length: 255, nullable: true })
    lastName?: string;

    @Field()
    @Column("varchar", { length: 255 , unique:true })
    phoneNumber: string;

    @Field()
    @Column("varchar", { length: 255 })
    password: string;
}
