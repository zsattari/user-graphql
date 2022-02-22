import { PaginationInput } from './PaginationInput';
import { SelectQueryBuilder } from "typeorm";
export const paginateQuery = (query: SelectQueryBuilder<any>, paginationInput: PaginationInput) =>
    query.skip((paginationInput.page - 1) * paginationInput.take).take(paginationInput.take);



export const getResultWithOptionalTotal = async (
    query: SelectQueryBuilder<any>,
    getTotal?: boolean,
    justGetTotal?: boolean
) => {
    let result, count;
    result = [];
    getTotal
        ? ([result, count] = await query.getManyAndCount())
        : justGetTotal
        ? (count = await query.getCount())
        : (result = await query.getMany());

    return { items: result, total: count };
};
