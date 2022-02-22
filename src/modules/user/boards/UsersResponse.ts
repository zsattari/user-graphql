import { User } from "../../../entity/User";
import PaginatedResponse from "../../utils/PaginatedResponse";

export const UsersResponse = PaginatedResponse(User);
type UsersResponse = InstanceType<typeof UsersResponse>