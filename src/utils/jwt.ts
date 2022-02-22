import { sign, verify } from "jsonwebtoken";

import { DecodedJwt } from "../types/DecodedJwt";

/**
 * @param id id of the user that logged in
 * @param device device of the user
 * @var iat issued at time
 * @var eat expire a time
 * @returns signed string as token
 */
export function jwtSign(id: string, device: string) {
    return sign({ id, device, iat: Math.floor(Date.now() / 1000),
                  eat: Math.floor(Date.now() / 1000) }, "justSimpleText");
}

export function jwtSing_updateEat(id: string, device: string, iat: number){
    return sign({id, device, iat, eat:Math.floor(Date.now() / 1000) }, "justSimpleText")
}

export function jwtVerify(token: string): DecodedJwt {
    return verify(token, "justSimpleText") as DecodedJwt;
}