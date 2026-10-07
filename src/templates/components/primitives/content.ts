/** Match the registry's existing string/array length semantics. */
export const hasContent = (value: unknown): boolean =>
  (typeof value === 'string' || Array.isArray(value)) && value.length > 0;
