import { Router } from "express";
import { makeValidateCepController } from "../factories/validate-cep";
import { adaptRoute } from "../adapters/express-routes-adapter";
import { makeListAddressesController } from "../factories/list-addresses";

export const setupCepRoutes = (router: Router): void => {
  router.post("/cep", adaptRoute(makeValidateCepController()));
  router.get("/addresses", adaptRoute(makeListAddressesController()));
};
