export const head = <A>(arr: A[]): A => {
  if (arr.length === 0) throw new Error('empty array');
  return arr[0];
};

export const unsafeHead = <A>(arr: A[]): A | undefined => arr[0];

export const stringLengthPredicate =
  (max: number, min?: number) =>
  (s: string): boolean =>
    s.length <= max && s.length >= (min || 0);

export const fMap =
  <A, B>(iterator: (a: A, index: number) => B) =>
  (arr: A[]): B[] =>
    arr.map(iterator);

export const fFilter =
  <A>(predicate: (a: A, index: number) => boolean) =>
  (arr: A[]): A[] =>
    arr.filter(predicate);

export const tapLog =
  (loc: string) =>
  <A>(message: A): A => {
    // eslint-disable-next-line no-console
    console.log(loc, message);
    return message;
  };
export const trigger =
  <A, B>(func: (a: A) => B) =>
  (arg: A) =>
  (): B =>
    func(arg);
export const effect = (func: () => any) => (): void => {
  func();
};

export type DeepPartial<T> = {
  [P in keyof T]?: DeepPartial<T[P]>;
};
