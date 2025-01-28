import { Controller } from "../protocols/controller";
import { HttpRequest, HttpResponse } from "../protocols/http";
import {
  badRequest,
  noContent,
  serverError,
  notFound,
} from "../helpers/http-helper";
import { DeleteAddress } from "@/domain/usecases/delete-addresses";

export class DeleteAddressController implements Controller {
  constructor(private readonly deleteAddress: DeleteAddress) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const id = httpRequest.params?.id;
      if (!id) {
        return badRequest(new Error("Missing address id"));
      }

      try {
        await this.deleteAddress.delete(id);
        return noContent();
      } catch (error) {
        if ((error as Error).message === "Address not found") {
          return notFound(new Error("Address not found"));
        }
        return serverError(new Error("Internal server error"));
      }
    } catch (error) {
      return serverError(new Error("Internal server error"));
    }
  }
}
