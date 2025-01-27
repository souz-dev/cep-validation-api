import { ValidateCep, ValidateCepParams } from "@/domain/usecases/validate-cep";
import { CepValidator } from "../protocols/cep-validator";
import { AddressRepository } from "../protocols/address-repository";
import { AddressModel } from "@/domain/usecases/models/addres";

export class DbValidateCep implements ValidateCep {
  constructor(
    private readonly cepValidator: CepValidator,
    private readonly addressRepository: AddressRepository
  ) {}

  async validate(params: ValidateCepParams): Promise<AddressModel> {
    const validatedAddress = await this.cepValidator.validate(params.cep);
    return await this.addressRepository.create({
      name: params.name,
      email: params.email,
      ...validatedAddress,
    });
  }
}
