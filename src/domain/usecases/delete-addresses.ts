import { AddressModel } from "./models/addres";

export interface DeleteAddress {
  delete: (id: string) => Promise<AddressModel>;
}
