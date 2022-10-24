export enum DividendsPeriod {
    Unknown = 0, // Because of the DB structure, this may be the case sometimes
    Quarterly = 1,
    Yearly = 2,
}
export default DividendsPeriod;
