import type { AxiosResponse } from "axios";
import { api } from "config/axios";
import type { CrudDTO, NextPaginateResponse } from "interface/crud";
import { apiToastHandler } from "utils";

export class Crud<Entity extends Record<string, unknown>> {
  constructor(private controller: string) {}

  async createOne({
    payload,
    onError,
    shouldToast = true,
    onSuccess,
  }: CrudDTO<Entity>): Promise<Entity> {
    try {
      const { data: response } = await api.post<Entity, AxiosResponse<Entity>>(
        this.controller,
        payload
      );

      if (shouldToast) {
        apiToastHandler({
          callback: onSuccess,
          defaultMessage: "Criação realizada com sucesso.",
        });
      }

      return response;
    } catch (error) {
      if (shouldToast) {
        apiToastHandler({
          behavior: "error",
          callback: onError,
          defaultMessage: "Falha ao criar.",
          error,
        });
      }

      throw error;
    }
  }

  async patchOne({
    id,
    payload,
    shouldToast = true,
    onSuccess,
    onError,
  }: CrudDTO<Entity>) {
    try {
      await api.patch<Entity>(`${this.controller}/${id}`, payload);

      if (shouldToast) {
        apiToastHandler({
          callback: onSuccess,
          defaultMessage: "Atualização realizada com sucesso.",
        });
      }
    } catch (error) {
      if (shouldToast) {
        apiToastHandler({
          behavior: "error",
          callback: onError,
          defaultMessage: "Falha ao atualizar conteúdo",
          error,
        });
      }

      throw error;
    }
  }

  async getOne({
    id,
    shouldToast = true,
    onError,
  }: Omit<CrudDTO<Entity>, "onSuccess">): Promise<Entity> {
    try {
      return (await api.get<Entity>(`${this.controller}/${id}`)).data;
    } catch (error) {
      if (shouldToast) {
        apiToastHandler({
          behavior: "error",
          callback: onError,
          defaultMessage: "Falha ao obter conteúdo.",
          error,
        });
      }

      throw error;
    }
  }

  async getMany({
    requestQuery,
    shouldToast = true,
    onError,
  }: Omit<CrudDTO<Entity>, "onSuccess">): Promise<
    NextPaginateResponse<Entity>
  > {
    try {
      const { data: response } = await api.get<
        Entity[],
        AxiosResponse<NextPaginateResponse<Entity>>
      >(this.controller, {
        params: requestQuery,
      });

      return response;
    } catch (error) {
      if (shouldToast) {
        apiToastHandler({
          behavior: "error",
          callback: onError,
          defaultMessage: "Falha ao obter conteúdo.",
          error,
        });
      }

      throw error;
    }
  }

  async deleteOne({
    id,
    shouldToast = true,
    onSuccess,
    onError,
  }: CrudDTO<Entity>): Promise<void> {
    try {
      await api.delete<Entity>(`${this.controller}/${id}`);

      if (shouldToast) {
        apiToastHandler({
          callback: onSuccess,
          defaultMessage: "Deleção realizada com sucesso.",
        });
      }
    } catch (error) {
      if (shouldToast) {
        apiToastHandler({
          behavior: "error",
          callback: onError,
          defaultMessage: "Falha ao deletar conteúdo.",
          error,
        });
      }

      throw error;
    }
  }

  async deleteAll({ shouldToast = true, onSuccess, onError }: CrudDTO<Entity>) {
    try {
      await api.delete<Entity>(this.controller);

      if (shouldToast) {
        apiToastHandler({
          callback: onSuccess,
          defaultMessage: "Deleção realizada com sucesso.",
        });
      }
    } catch (error) {
      if (shouldToast) {
        apiToastHandler({
          behavior: "error",
          callback: onError,
          defaultMessage: "Falha ao deletar conteúdo.",
          error,
        });
      }

      throw error;
    }
  }
}
