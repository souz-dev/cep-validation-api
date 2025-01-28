import { Router } from "express";
import { makeValidateCepController } from "../factories/validate-cep";
import { adaptRoute } from "../adapters/express-routes-adapter";
import { makeListAddressesController } from "../factories/list-addresses";
import { makeUpdateAddressController } from "../factories/update-address";

export const setupCepRoutes = (router: Router): void => {
  router.post("/cep", adaptRoute(makeValidateCepController()));
  router.get("/addresses", adaptRoute(makeListAddressesController()));
  router.put("/addresses/:id", adaptRoute(makeUpdateAddressController()));
};
