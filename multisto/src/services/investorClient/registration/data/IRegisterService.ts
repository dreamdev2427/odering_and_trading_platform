import QueryObjectDto from "../../investor/dto/QueryObjectDto";

export default interface IRegisterService {
    getUnfinishedRegisters(recordsPage?: number, searchQueryObjects?: QueryObjectDto[],
                              orderQueryObjects?: QueryObjectDto[]): Promise<any>;

    countUnfinishedRegisters(searchQueryObjects?: QueryObjectDto[]): Promise<number>;
}