const queryStringReducer = (acc: string, val: SqlQuery<any>): string =>
  acc + val.query + (val.query.endsWith(';') ? '' : ';');
const queryParamsReducer = (acc: any[], val: SqlQuery<any>): any[] => [...acc, ...val.params];
const getIndex =
  (index: number) =>
  <A>(arr: A[]): A =>
    arr[index];
type ExtractQueryTypes<T> = {
  [P in keyof T]: T[P] extends SqlQuery<infer U> ? U[] : never;
};

export type SQLConnection = <A>(query: string, params: any[]) => Promise<A[]>;
export type QueryFactory = <A>(query: string, params: any[]) => SqlQuery<A>;

export default class SqlQuery<A> implements PromiseLike<A[]> {
  query: string;

  params: any[];

  connection: SQLConnection;

  private _result?: Promise<A[]>;

  setResult(result: Promise<A[]>): void {
    this._result = result;
  }

  constructor(connection: SQLConnection, query: string, params: any[] = []) {
    this.connection = connection;
    this.query = query;
    this.params = params;
  }

  then<TResult1 = A[], TResult2 = never>(
    onfulfilled?: ((value: A[]) => TResult1 | PromiseLike<TResult1>) | null,
    onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | null,
  ): PromiseLike<TResult1 | TResult2> {
    if (!this._result) this._result = this.connection<A>(this.query, this.params);
    return this._result.then(onfulfilled).catch(onrejected);
  }

  execute(): Promise<A[]> {
    return this.connection(this.query, this.params);
  }

  /**
   * assumes all queries are using the same connection and uses the first one
   */
  static all = async <B extends SqlQuery<any>[]>(...args: B): Promise<ExtractQueryTypes<B>> => {
    if (args.length === 0) return [] as unknown as Promise<ExtractQueryTypes<B>>;
    const query = args.reduce(queryStringReducer, '');
    const params = args.reduce(queryParamsReducer, []);
    const chainResultP = args[0].connection(query, params) as Promise<ExtractQueryTypes<B>>;

    // set result in separate queries in case queries
    args.forEach((q, index) => q.setResult(chainResultP.then(getIndex(index))));
    return chainResultP;
  };

  static getQueryFactory =
    (connection: SQLConnection): QueryFactory =>
    <B>(query: string, params: any[] = []): SqlQuery<B> =>
      new SqlQuery<B>(connection, query, params);
}

// export const getQueryFactory = (connection: SQLConnection): QueryFactory => <A>(
//   query: string,
//   params: any[] = [],
// ): SqlQuery<A> => new SqlQuery<A>(connection, query, params);
