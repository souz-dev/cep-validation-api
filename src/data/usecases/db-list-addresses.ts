import { ListAddresses } from "@/domain/usecases/list-addresses";
import { AddressRepository } from "../protocols/address-repository";
import { AddressModel } from "@/domain/usecases/models/addres";

export class DbListAddresses implements ListAddresses {
  constructor(private readonly addressRepository: AddressRepository) {}

  async list(): Promise<AddressModel[]> {
    return await this.addressRepository.findAll();
  }
}
