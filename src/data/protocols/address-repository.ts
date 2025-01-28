import { AddressModel } from "@/domain/usecases/models/addres";

export type AddressData = {
  name: string;
  email: string;
  cep: string;
  state: string;
  city: string;
  street: string;
  district: string;
};

export interface AddressRepository {
  create: (data: AddressData) => Promise<AddressModel>;
  findAll: () => Promise<AddressModel[]>;
  findById: (id: string) => Promise<AddressModel | null>;
  findByEmail: (email: string) => Promise<AddressModel | null>;
  update: (id: string, data: AddressData) => Promise<AddressModel>;
  delete: (id: string) => Promise<AddressModel>;
}
