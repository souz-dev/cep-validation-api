import { Controller } from "../protocols/controller";
import { HttpRequest, HttpResponse } from "../protocols/http";
import { badRequest, ok, serverError } from "../helpers/http-helper";
import { z } from "zod";
import { ValidateCep } from "@/domain/usecases/validate-cep";

export class ValidateCepController implements Controller {
  constructor(private readonly validateCep: ValidateCep) {}

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

      const address = await this.validateCep.validate({
        name: httpRequest.body.name,
        email: httpRequest.body.email,
        cep: httpRequest.body.cep,
      });

      return ok(address);
    } catch (error) {
      return serverError(error as Error);
    }
  }
}
