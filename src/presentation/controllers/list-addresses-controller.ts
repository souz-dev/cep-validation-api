import { Controller } from "../protocols/controller";
import { HttpRequest, HttpResponse } from "../protocols/http";
import { ok, serverError } from "../helpers/http-helper";
import { ListAddresses } from "@/domain/usecases/list-addresses";

export class ListAddressesController implements Controller {
  constructor(private readonly listAddresses: ListAddresses) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const addresses = await this.listAddresses.list();
      return ok(addresses);
    } catch (error) {
      return serverError(new Error("Internal server error"));
    }
  }
}
