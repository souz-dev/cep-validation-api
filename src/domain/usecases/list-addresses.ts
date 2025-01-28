import { AddressModel } from "./models/address";

export interface ListAddresses {
  list: () => Promise<AddressModel[]>;
}
