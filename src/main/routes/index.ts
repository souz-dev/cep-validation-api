import { Router } from "express";
import { setupCepRoutes } from "./cep-routes";

const router = Router();

setupCepRoutes(router);

export default router;
