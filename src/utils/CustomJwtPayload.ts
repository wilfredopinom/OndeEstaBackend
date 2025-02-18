import { JwtPayload } from "jsonwebtoken";

export interface CustomJwtPayload extends JwtPayload {
  email: string;
  id: number;
  role?: string; // Propiedad opcional
}