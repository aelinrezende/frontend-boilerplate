import type { AxiosError } from "axios";
import theme from "config/theme";
import type { ApiToastHandlerParams } from "interface/crud";

import type { UseToastOptions } from "@chakra-ui/react";
import { createStandaloneToast } from "@chakra-ui/react";

import { parseDynamicType } from "./helpers";

const { toast } = createStandaloneToast({
  theme,
});

const _baseErrorToastProps: UseToastOptions = {
  title: "Erro.",
  position: "bottom-right",
  status: "error",
  duration: 9000,
  isClosable: true,
};

const _baseSuccessToastProps: UseToastOptions = {
  title: "Sucesso.",
  position: "bottom-right",
  status: "success",
  duration: 9000,
  isClosable: true,
};

const _handleErrorMessage = (
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

export const apiToastHandler = ({
  error,
  callback,
  defaultMessage,
  behavior = "success",
}: ApiToastHandlerParams): void => {
  const handler = callback ?? _handleErrorMessage;

  const description = parseDynamicType<string>(
    handler,
    (error as AxiosError).response?.status as number,
    defaultMessage
  );

  const baseToastProps =
    behavior === "success" ? _baseSuccessToastProps : _baseErrorToastProps;

  toast({
    ...baseToastProps,
    description,
  });
};
