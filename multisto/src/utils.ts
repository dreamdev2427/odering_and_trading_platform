
export const head = <A>(arr: A[]): A => {
    if (arr.length === 0) throw new Error("empty array");
    return arr[0];
};

export const unsafeHead = <A>(arr: A[]): A | undefined => arr[0];

export const stringLengthPredicate = (max: number, min?: number) => (
    s: string
): boolean => s.length <= max && s.length >= (min || 0);


export type DeepPartial<T> = {
    [P in keyof T]?: DeepPartial<T[P]>;
};
