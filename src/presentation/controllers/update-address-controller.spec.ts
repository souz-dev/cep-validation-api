import { badRequest, ok, serverError, notFound } from "../helpers/http-helper";
import {
  UpdateAddress,
  UpdateAddressParams,
} from "@/domain/usecases/update-address";
import { UpdateAddressController } from "./update-address-controller";
import { AddressModel } from "@/domain/usecases/models/address";
import { mockAddressModel } from "./mock-address";

// Factory para criar um mock de UpdateAddress
const makeUpdateAddress = (): UpdateAddress => {
  class UpdateAddressStub implements UpdateAddress {
    update = jest.fn(
      async (params: UpdateAddressParams): Promise<AddressModel> => {
        return Promise.resolve(mockAddressModel());
      }
    );
  }
  return new UpdateAddressStub();
};

// Helper para configurar o sistema sob teste
interface SutTypes {
  sut: UpdateAddressController;
  updateAddressStub: UpdateAddress;
}

const makeSut = (): SutTypes => {
  const updateAddressStub = makeUpdateAddress();
  const sut = new UpdateAddressController(updateAddressStub);
  return {
    sut,
    updateAddressStub,
  };
};

describe("UpdateAddressController", () => {
  it("should return 400 if no ID is provided", async () => {
    const { sut } = makeSut();

    const httpRequest = {
      body: { name: "John", email: "john@example.com", cep: "12345678" },
      params: {},
    };

    const httpResponse = await sut.handle(httpRequest);
    expect(httpResponse).toEqual(badRequest(new Error("Missing address id")));
  });

  it("should return 400 if validation fails", async () => {
    const { sut } = makeSut();

    const httpRequest = {
      body: { name: "", email: "invalid-email", cep: "1234" },
      params: { id: "1" },
    };

    const httpResponse = await sut.handle(httpRequest);
    expect(httpResponse.statusCode).toBe(400);
    expect(httpResponse.body.errors).toBeDefined();
  });

  it("should return 404 if address is not found", async () => {
    const { sut, updateAddressStub } = makeSut();
    jest.spyOn(updateAddressStub, "update").mockRejectedValueOnce(new Error());

    const httpRequest = {
      body: { name: "John", email: "john@example.com", cep: "12345678" },
      params: { id: "1" },
    };

    const httpResponse = await sut.handle(httpRequest);
    expect(httpResponse).toEqual(notFound(new Error("Address not found")));
  });

  it("should return 500 if an internal error occurs", async () => {
    const { sut } = makeSut();
    const httpRequest = null as any;

    const httpResponse = await sut.handle(httpRequest);
    expect(httpResponse).toEqual(
      serverError(new Error("Internal server error"))
    );
  });

  it("should call UpdateAddress with correct values", async () => {
    const { sut, updateAddressStub } = makeSut();

    const httpRequest = {
      body: { name: "John", email: "john@example.com", cep: "12345678" },
      params: { id: "1" },
    };

    await sut.handle(httpRequest);

    expect(updateAddressStub.update).toHaveBeenCalledWith({
      id: "1",
      name: "John",
      email: "john@example.com",
      cep: "12345678",
    });
  });

  it("should return 200 with updated address", async () => {
    const { sut } = makeSut();

    const httpRequest = {
      body: { name: "John", email: "john@example.com", cep: "12345678" },
      params: { id: "1" },
    };

    const httpResponse = await sut.handle(httpRequest);
    expect(httpResponse).toEqual(
      ok({
        id: "any_id",
        name: "John Doe",
        email: "john@example.com",
        cep: "88040600",
        street: "Rua Example",
        district: "Centro",
        city: "Florianópolis",
        state: "SC",
        createdAt: expect.any(Date),
        updatedAt: expect.any(Date),
      })
    );
  });
});
