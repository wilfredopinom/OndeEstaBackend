import {Response, Request, NextFunction} from 'express'

export const isAdmin = (req:Request, res:Response, next:NextFunction):any => {
    const role = req.user?.role
    try{
        if(role === 'admin'){
            next()
        }else{
            res.status(401).json({error:'Acceso denegado'}) // el mensaje original decia, no eres admin. prefiero no comunicar mucha informacion.
        }
    }catch(error){
        res.status(401).json({error:'Token invalido'})
    }
}