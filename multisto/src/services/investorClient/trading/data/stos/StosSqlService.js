import AbstractSqlService from '../AbstractSqlService';

class StosService extends AbstractSqlService {
    constructor(doChaining) {
        super(doChaining);
        this.fetchExchangeOpenDateQuery = `
            select
                DATE_FORMAT(exchangeOpenDate,'%M %d %Y')
                as exchangeOpenDate from stos where id = ?
            ;`;
    }

    fetchExchangeOpenDate(stoId) {
        return this.executeSql(this.fetchExchangeOpenDateQuery, [stoId]);
    }

    async findById(stoId) {
        const result = await this.executeSql(`SELECT * FROM stos WHERE id = ?`, [stoId]);
        return result[0];
    }
}

export default StosService;
