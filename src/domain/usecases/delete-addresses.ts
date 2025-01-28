import { AddressModel } from "./models/address";

export interface DeleteAddress {
  delete: (id: string) => Promise<AddressModel>;
}
