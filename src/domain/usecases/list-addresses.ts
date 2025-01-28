import { AddressModel } from "./models/addres";

export interface ListAddresses {
  list: () => Promise<AddressModel[]>;
}
