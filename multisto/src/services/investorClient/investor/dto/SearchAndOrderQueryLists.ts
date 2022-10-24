import { Request } from "express";
import QueryObjectDto from "./QueryObjectDto";

export default interface SearchAndOrderLists {
    searchQueryProperties: QueryObjectDto[],
    orderQueryProperties: QueryObjectDto[],
    selectQueryProperties: QueryObjectDto[]
}

/**
   iterates over the req.query object and  two types of parameters: search and order
   Returns an object containing two lists of those query parameters
 */
export const extractQueryProperties = (req:Request): SearchAndOrderLists => {
    const searchQueryProperties:QueryObjectDto[] = [];
    const orderQueryProperties:QueryObjectDto[] = [];
    const selectQueryProperties: QueryObjectDto[] = [];
    for (const propName in req.query) {
        // eslint-disable-next-line no-prototype-builtins
        if (req.query.hasOwnProperty(propName)) {
            const queryObject = {
                name: propName,
                data: req.query[propName]
            };
            if (propName.includes('order')) {
                if (queryObject.data === 'asc' || queryObject.data === 'desc') {
                    orderQueryProperties.push(queryObject);
                }
            } else if (propName.includes('search')) {
                searchQueryProperties.push(queryObject);
            } else if (propName.includes('export')) {
                selectQueryProperties.push(queryObject);
            }
        }
    }
    return {searchQueryProperties, orderQueryProperties, selectQueryProperties};
}