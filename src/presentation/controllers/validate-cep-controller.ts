import { Controller } from "../protocols/controller";
import { HttpRequest, HttpResponse } from "../protocols/http";

export class ValidateCepController implements Controller {
  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {}
}
