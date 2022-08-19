import type { AxiosError, AxiosResponse } from "axios";
import { api } from "config/axios";
import theme from "config/theme";
import type { DTO, NextPaginateResponse } from "interface/_crud";
import { _handleErrorMessage } from "utils/error";

import type { UseToastOptions } from "@chakra-ui/react";
import { createStandaloneToast } from "@chakra-ui/react";

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

export class Crud<Entity extends Record<string, unknown>> {
  constructor(private controller: string) {}

  async createOne(payload: Entity): Promise<Entity> {
    try {
      const { data: response } = await api.post<Entity, AxiosResponse<Entity>>(
        this.controller,
        payload
      );

      toast({
        ..._baseSuccessToastProps,
        description: "Criação realizada com sucesso.",
      });

      return response;
    } catch (err) {
      console.error(err);
      toast({
        ..._baseErrorToastProps,
        description: _handleErrorMessage(
          (err as AxiosError).response?.status as number,
          "Falha ao criar."
        ),
      });

      throw new Error("Falha ao criar.");
    }
  }

  async patchOne({ id, data }: DTO<Entity>) {
    try {
      await api.patch<Entity>(`${this.controller}/${id}`, data);

      toast({
        ..._baseSuccessToastProps,
        description: "Atualização realizada com sucesso.",
      });
    } catch (err) {
      console.error(err);

      toast({
        ..._baseErrorToastProps,
        description: "Falha ao atualizar conteúdo.",
      });

      throw new Error("Falha ao atualizar conteúdo.");
    }
  }

  async getOne({ id }: DTO<Entity>): Promise<Entity> {
    try {
      return (await api.get<Entity>(`${this.controller}/${id}`)).data;
    } catch (err) {
      console.error(err);

      toast({
        ..._baseErrorToastProps,
        description: "Falha ao obter conteúdo.",
      });

      throw new Error("Falha ao obter conteúdo.");
    }
  }

  async getMany({
    requestQuery,
  }: DTO<Entity>): Promise<NextPaginateResponse<Entity>> {
    try {
      const { data: response } = await api.get<
        Entity[],
        AxiosResponse<NextPaginateResponse<Entity>>
      >(this.controller, {
        params: requestQuery,
      });

      return response;
    } catch (err) {
      console.error(err);

      toast({
        ..._baseErrorToastProps,
        description: "Falha ao obter conteúdo.",
      });

      throw new Error("Falha ao obter conteúdo.");
    }
  }

  async deleteOne({ id }: DTO<Entity>) {
    try {
      await api.delete<Entity>(`${this.controller}/${id}`);

      toast({
        ..._baseSuccessToastProps,
        description: "Deleção realizada com sucesso.",
      });
    } catch (err) {
      console.error(err);

      toast({
        ..._baseErrorToastProps,
        description: "Falha ao deletar conteúdo.",
      });

      throw new Error("Falha ao deletar conteúdo.");
    }
  }

  async deleteAll() {
    try {
      await api.delete<Entity>(this.controller);

      toast({
        ..._baseSuccessToastProps,
        description: "Deleção realizada com sucesso.",
      });
    } catch (err) {
      console.error(err);

      toast({
        ..._baseErrorToastProps,
        description: "Falha ao deletar conteúdo.",
      });

      throw new Error("Falha ao deletar conteúdo.");
    }
  }
}
