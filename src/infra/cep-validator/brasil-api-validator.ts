import {
  CepValidator,
  CepValidatorResult,
} from "@/data/protocols/cep-validator";
import { serverError } from "@/presentation/helpers/http-helper";
import axios from "axios";

export class BrasilApiValidator implements CepValidator {
  async validate(
    cep: string
  ): Promise<CepValidatorResult | { statusCode: number; body: Error }> {
    try {
      const response = await axios.get(
        `https://brasilapi.com.br/api/cep/v1/${cep}`
      );
      return {
        cep: response.data.cep,
        state: response.data.state,
        city: response.data.city,
        street: response.data.street,
        district: response.data.neighborhood,
      };
    } catch (error) {
      return serverError(error as Error);
    }
  }
}
