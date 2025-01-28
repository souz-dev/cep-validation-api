import { AddressModel } from "./models/address";

export interface ValidateCepParams {
  name: string;
  email: string;
  cep: string;
}

export interface ValidateCep {
  validate: (params: ValidateCepParams) => Promise<AddressModel>;
}
