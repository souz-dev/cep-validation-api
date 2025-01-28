import { AddressModel } from "./models/address";

export interface UpdateAddressParams {
  id: string;
  name: string;
  email: string;
  cep: string;
}

export interface UpdateAddress {
  update: (params: UpdateAddressParams) => Promise<AddressModel>;
}
