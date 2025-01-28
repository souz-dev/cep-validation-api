import { DeleteAddress } from "@/domain/usecases/delete-addresses";
import { AddressRepository } from "../protocols/address-repository";
import { AddressModel } from "@/domain/usecases/models/addres";

export class DbDeleteAddress implements DeleteAddress {
  constructor(private readonly addressRepository: AddressRepository) {}

  async delete(id: string): Promise<AddressModel> {
    const address = await this.addressRepository.findById(id);
    if (!address) {
      throw new Error("Address not found");
    }

    return await this.addressRepository.delete(id);
  }
}
