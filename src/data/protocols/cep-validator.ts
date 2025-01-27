export interface CepValidatorResult {
  cep: string;
  state: string;
  city: string;
  street: string;
  district: string;
}

export interface CepValidator {
  validate: (cep: string) => Promise<CepValidatorResult>;
}
