import { HttpException } from "../exceptions/httpException";
import { UserService } from "../services/user.service";
import { Response, Request, NextFunction } from 'express'

export class UserController {
    static async profile(req: Request, res: Response, next: NextFunction) {
        try {
            const email = req.user?.email
            if (!email) throw new HttpException(404, 'Email not found')
            const user = await UserService.getByEmail(email)
            res.status(200).json(user)
        } catch (error) {
            next(error)
        }
    }

    static async getAll(req: Request, res: Response, next: NextFunction) {
        try {
            const user = await UserService.getAll()
            res.status(200).json(user)
        } catch (error) {
            next(error)
        }
    }


        static async updateProfile(req: Request, res: Response, next: NextFunction): Promise<void> {
            try {
                const email = req.user?.email;
                const userId = req.user?.id;
                const { phone, bio, location } = req.body;  // Los nuevos datos a actualizar
    
                // Verifica si el email del usuario está presente en la solicitud
                if (!email) throw new HttpException(404, 'Email not found');
    
                // Obtiene el usuario desde la base de datos por su email
                const user = await UserService.getByEmail(email);
    
                // Si no se encuentra al usuario, lanza un error
                if (!user) throw new HttpException(404, 'User  not found');
    
                // Verifica si el usuario tiene permisos para actualizar su perfil
                if (userId !== user.id && req.user?.role !== 'admin') {
                    res.status(403).json({ error: 'Access denied' });
                    return; // Asegúrate de salir de la función después de enviar la respuesta
                }
    
                // Validaciones adicionales para los campos
                if (phone && !/^\+?[1-9]\d{1,14}$/.test(phone)) {  // Validación simple de teléfono (formato E.164)
                    res.status(400).json({ error: 'Invalid phone number format' });
                    return; // Asegúrate de salir de la función después de enviar la respuesta
                }
                if (bio && bio.length > 300) {
                    res.status(400).json({ error: 'El tamaño de la biografía debe ser menor de 300 caracteres' });
                    return; // Asegúrate de salir de la función después de enviar la respuesta
                }
    
                if (location && location.length > 150) {
                    res.status(400).json({ error: 'El tamaño de la ubicación debe ser menor de 150 caracteres' });
                    return; // Asegúrate de salir de la función después de enviar la respuesta
                }
    
                const updateUser  = await UserService.updateProfile(String(user.id), { phone, bio, location });
                res.status(200).json(updateUser );
            } catch (error) {
                next(error); // Pasa el error al siguiente middleware
            }
        }
    }