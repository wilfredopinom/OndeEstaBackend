import { Router } from "express";
import {AuthController} from '../src/controllers/auth.controller'
import { loginValidation, registerValidation } from "@/middlewares/validators.middleware";
import { ValidationMiddleware } from "../src/middlewares/validation.middleware";
const router = Router()




export default router