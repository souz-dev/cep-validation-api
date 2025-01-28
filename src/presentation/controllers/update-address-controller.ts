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
        id: z.string().uuid("Invalid ID"),
        name: z.string().min(1, "Name is required"),
        email: z.string().email("Invalid email"),
        cep: z.string().length(8, "CEP must be 8 characters"),
        state: z.string().min(1, "State is required"),
        city: z.string().min(1, "City is required"),
        street: z.string().min(1, "Street is required"),
        district: z.string().min(1, "District is required"),
      });

      const validation = schema.safeParse({
        ...httpRequest.body,
        id: httpRequest.params?.id,
      });

      if (!validation.success) {
        return badRequest(validation.error);
      }

      const address = await this.updateAddress.update(validation.data);

      if (!address) {
        return notFound(new Error("Address not found"));
      }

      return ok(address);
    } catch (error) {
      return serverError(new Error("Internal server error"));
    }
  }
}
