export const _handleErrorMessage = (
  statusCode: number,
  defaultMessage: string
): string => {
  switch (statusCode) {
    case 409:
      return "Registro duplicado.";

    default:
      return defaultMessage;
  }
};
