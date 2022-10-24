type Opaque<T, K> = T & { __opaque__: K };

declare type Int = Opaque<number, 'Int'>;
declare type Float = Opaque<number, 'Float'>;
declare type ID = Opaque<number, 'ID'>;
