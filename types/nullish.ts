export type Nullish = null | undefined;
export const isNullish = (val: unknown): val is Nullish => val == null;
