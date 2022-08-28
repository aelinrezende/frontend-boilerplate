export const parseDynamicType = <ReturnType = unknown>(
  data: unknown,
  ...args: unknown[]
): ReturnType => {
  if (typeof data === "function") {
    return data(...args);
  }

  return data as ReturnType;
};
