export const serializeForJson = <T>(input: T): T => {
  return JSON.parse(
    JSON.stringify(input, (_key, value) =>
      typeof value === 'bigint' ? value.toString() : value,
    ),
  ) as T;
};
