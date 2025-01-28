import {
  UpdateAddress,
  UpdateAddressParams,
} from "@/domain/usecases/update-address";
import { AddressRepository } from "../protocols/address-repository";
import { CepValidator } from "../protocols/cep-validator";
import { AddressModel } from "@/domain/usecases/models/addres";

export class DbUpdateAddress implements UpdateAddress {
  constructor(
    private readonly cepValidator: CepValidator,
    private readonly addressRepository: AddressRepository
  ) {}

  async update(params: UpdateAddressParams): Promise<AddressModel> {
    const address = await this.addressRepository.findById(params.id);
    if (!address) {
      throw new Error("Address not found");
    }

    const existingAddress = await this.addressRepository.findByEmail(
      params.email
    );
    if (existingAddress && existingAddress.id !== params.id) {
      throw new Error("Email already in use");
    }

    const validatedAddress = await this.cepValidator.validate(params.cep);
    return await this.addressRepository.update(params.id, {
      name: params.name,
      email: params.email,
      ...validatedAddress,
    });
  }
}
