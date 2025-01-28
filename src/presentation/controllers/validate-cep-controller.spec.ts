import { ValidateCepController } from "@/presentation/controllers/validate-cep-controller";
import { ValidateCep, ValidateCepParams } from "@/domain/usecases/validate-cep";
import {
  ok,
  serverError,
  badRequest,
} from "@/presentation/helpers/http-helper";
import { AddressModel } from "@/domain/usecases/models/address";
import { mockAddressModel } from "./mock-address";
import { HttpRequest } from "../protocols/http";
import { AddressRepository } from "@/data/protocols/address-repository";

const makeValidateCep = (): ValidateCep => {
  class ValidateCepStub implements ValidateCep {
    async validate(params: ValidateCepParams): Promise<AddressModel> {
      return Promise.resolve(mockAddressModel());
    }
  }
  return new ValidateCepStub();
};

interface SutTypes {
  sut: ValidateCepController;
  validateCepStub: ValidateCep;
  addressRepositoryStub: AddressRepository;
}

const makeSut = (): SutTypes => {
  const validateCepStub = {
    validate: jest.fn().mockResolvedValue({
      id: "any_id",
      name: "John Doe",
      email: "john@example.com",
      cep: "88040600",
      state: "SC",
      city: "Florianópolis",
      street: "Rua Example",
      district: "Centro",
      createdAt: new Date("2025-01-27T23:08:10.216Z"),
      updatedAt: new Date("2025-01-27T23:08:10.216Z"),
    }),
  };

  const addressRepositoryStub = {
    findByEmail: jest.fn().mockResolvedValue(null),
    create: jest.fn(),
    findAll: jest.fn(),
    findById: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  };

  const sut = new ValidateCepController(validateCepStub, addressRepositoryStub);
  return { sut, validateCepStub, addressRepositoryStub };
};

describe("ValidateCep Controller", () => {
  test("Should return 400 if no name is provided", async () => {
    const { sut } = makeSut();
    const httpRequest = {
      body: {
        email: "john@example.com",
        cep: "88040600",
      },
    };
    const httpResponse = await sut.handle(httpRequest);
    expect(httpResponse.statusCode).toBe(400);
  });

  test("Should return 400 if no email is provided", async () => {
    const { sut } = makeSut();
    const httpRequest = {
      body: {
        name: "John Doe",
        cep: "88040600",
      },
    };
    const httpResponse = await sut.handle(httpRequest);
    expect(httpResponse.statusCode).toBe(400);
  });

  test("Should return 400 if invalid email is provided", async () => {
    const { sut } = makeSut();
    const httpRequest = {
      body: {
        name: "John Doe",
        email: "invalid_email",
        cep: "88040600",
      },
    };
    const httpResponse = await sut.handle(httpRequest);
    expect(httpResponse.statusCode).toBe(400);
  });

  test("Should return 400 if email is already in use", async () => {
    const { sut, addressRepositoryStub } = makeSut();
    jest.spyOn(addressRepositoryStub, "findByEmail").mockResolvedValueOnce({
      id: "any_id",
      name: "John Doe",
      email: "existing@example.com",
      cep: "88040600",
      state: "SC",
      city: "Florianópolis",
      street: "Rua Example",
      district: "Centro",
      createdAt: new Date("2025-01-27T23:08:10.216Z"),
      updatedAt: new Date("2025-01-27T23:08:10.216Z"),
    });

    const httpRequest: HttpRequest = {
      body: {
        name: "John Doe",
        email: "existing@example.com",
        cep: "88040600",
      },
    };

    const httpResponse = await sut.handle(httpRequest);
    expect(httpResponse).toEqual(badRequest(new Error("Email already in use")));
  });

  test("Should return 400 if no cep is provided", async () => {
    const { sut } = makeSut();
    const httpRequest = {
      body: {
        name: "John Doe",
        email: "john@example.com",
      },
    };
    const httpResponse = await sut.handle(httpRequest);
    expect(httpResponse.statusCode).toBe(400);
  });

  test("Should return 400 if invalid cep is provided", async () => {
    const { sut } = makeSut();
    const httpRequest = {
      body: {
        name: "John Doe",
        email: "john@example.com",
        cep: "123",
      },
    };
    const httpResponse = await sut.handle(httpRequest);
    expect(httpResponse.statusCode).toBe(400);
  });

  test("Should call ValidateCep with correct values", async () => {
    const { sut, validateCepStub } = makeSut();
    const validateSpy = jest.spyOn(validateCepStub, "validate");
    const httpRequest = {
      body: {
        name: "John Doe",
        email: "john@example.com",
        cep: "88040600",
      },
    };
    await sut.handle(httpRequest);
    expect(validateSpy).toHaveBeenCalledWith({
      name: "John Doe",
      email: "john@example.com",
      cep: "88040600",
    });
  });

  test("Should return 500 if ValidateCep throws", async () => {
    const { sut, validateCepStub } = makeSut();
    jest.spyOn(validateCepStub, "validate").mockImplementationOnce(() => {
      throw new Error();
    });
    const httpRequest = {
      body: {
        name: "John Doe",
        email: "john@example.com",
        cep: "88040600",
      },
    };
    const httpResponse = await sut.handle(httpRequest);
    expect(httpResponse).toEqual(serverError(new Error()));
  });

  test("Should return 200 if valid data is provided", async () => {
    const { sut } = makeSut();
    const httpRequest = {
      body: {
        name: "John Doe",
        email: "john@example.com",
        cep: "88040600",
      },
    };
    const httpResponse = await sut.handle(httpRequest);
    expect(httpResponse).toEqual(ok(mockAddressModel()));
  });
});
