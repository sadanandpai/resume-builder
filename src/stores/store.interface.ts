export type SetState<T> = (
  partial: T | Partial<T> | ((state: T) => T | Partial<T>),
  replace?: false
) => void;

export type GetState<T> = () => T;
