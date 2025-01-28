import { PrismaClient } from "@prisma/client";
import {
  AddressRepository,
  AddressData,
} from "@/data/protocols/address-repository";
import { AddressModel } from "@/domain/usecases/models/addres";

export class PrismaAddressRepository implements AddressRepository {
  constructor(private readonly prisma: PrismaClient) {}

  async create(data: AddressData): Promise<AddressModel> {
    return await this.prisma.address.create({
      data: {
        name: data.name,
        email: data.email,
        cep: data.cep,
        state: data.state,
        city: data.city,
        street: data.street,
        district: data.district,
      },
    });
  }

  async findAll(): Promise<AddressModel[]> {
    return await this.prisma.address.findMany();
  }

  async findById(id: string): Promise<AddressModel | null> {
    return await this.prisma.address.findUnique({
      where: { id },
    });
  }

  async findByEmail(email: string): Promise<AddressModel | null> {
    return await this.prisma.address.findUnique({
      where: { email },
    });
  }

  async update(id: string, data: AddressData): Promise<AddressModel> {
    return await this.prisma.address.update({
      where: { id },
      data: {
        name: data.name,
        email: data.email,
        cep: data.cep,
        state: data.state,
        city: data.city,
        street: data.street,
        district: data.district,
      },
    });
  }
}
