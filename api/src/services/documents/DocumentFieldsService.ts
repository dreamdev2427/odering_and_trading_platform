// import { Documentfields } from 'DBSchema';
// import SqlQuery, { QueryFactory, SQLConnection } from '../../core/SqlQuery';
// import DocumentFieldsSqlService from './data/documents/DocumentFieldsSqlService';

// export const documentFieldsAdapter = (val: Documentfields): any => ({
//   ...val,
//   title: val.title ?? '',
//   ID: val.fieldid ?? '',
//   documentID: val.documentid ?? 0,
//   type: val.fieldtype ?? 0,
//   helperText: val.fieldhelpertext ?? '',
// });

// export class DocumentFieldsService {
//   queryFactory: QueryFactory;

//   constructor(connection: SQLConnection) {
//     this.queryFactory = SqlQuery.getQueryFactory(connection);
//   }

//   async findOne(documentID: number): Promise<any[]> {
//     const documentsService = new DocumentFieldsSqlService(this.queryFactory);
//     const fields = await documentsService.findOne(documentID);
//     return fields.map(documentFieldsAdapter);
//   }
// }
