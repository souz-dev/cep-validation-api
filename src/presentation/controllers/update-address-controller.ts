import { Controller } from "../protocols/controller";
import { HttpRequest, HttpResponse } from "../protocols/http";
import { badRequest, ok, serverError, notFound } from "../helpers/http-helper";
import { z } from "zod";
import { UpdateAddress } from "@/domain/usecases/update-address";

export class UpdateAddressController implements Controller {
  constructor(private readonly updateAddress: UpdateAddress) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const schema = z.object({
        name: z.string().min(1, "Name is required"),
        email: z.string().email("Invalid email"),
        cep: z.string().length(8, "CEP must be 8 characters"),
      });

      const validation = schema.safeParse(httpRequest.body);

      if (!validation.success) {
        return badRequest(validation.error);
      }

      const id = httpRequest.params?.id;
      if (!id) {
        return badRequest(new Error("Missing address id"));
      }

      try {
        const address = await this.updateAddress.update({
          id,
          name: httpRequest.body.name,
          email: httpRequest.body.email,
          cep: httpRequest.body.cep,
        });
        return ok(address);
      } catch (error) {
        return notFound(new Error("Address not found"));
      }
    } catch (error) {
      return serverError(new Error("Internal server error"));
    }
  }
}
