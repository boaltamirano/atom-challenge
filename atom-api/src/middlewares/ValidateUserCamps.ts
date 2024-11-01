import { Request, Response, NextFunction } from 'express';
import { validationResult, check } from 'express-validator'
import { UserRepository } from '../repositories';

const userRepository = new UserRepository();

const ValidateCamps = (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if ( !errors.isEmpty() ) {
        return res.status(400).json({
            ok: false,
            errors: errors.mapped()
        })
    }
    return next();
}

export const validateCreate = [
    check('name')
        .exists()
        .trim()
        .withMessage('El nombre es requerido')
        .bail()
        .notEmpty()
        .withMessage('El nombre no puede estar vacío')
        .bail(),
    check('lastname')
        .exists()
        .trim()
        .withMessage('El apellido es requerido')
        .bail()
        .notEmpty()
        .withMessage('El apellido no puede estar vacío')
        .bail(),
    check('email')
        .exists()
        .trim()
        .withMessage('El email es requerido')
        .bail()
        .notEmpty()
        .withMessage('El email no puede estar vacío')
        .bail()
        .isEmail()
        .withMessage('No tiene formato de email')
        .bail()
        .toLowerCase()
        .custom(async (value, { req }) => {
            const emailExiste =  await userRepository.getUserByEmail(value);
            if (emailExiste) {
                throw new Error('El email ya está en uso');
            }
            return true;
        })
        .bail(),
    ValidateCamps
];

export const validateCreateTask = [
    check('title')
        .exists()
        .trim()
        .withMessage('El título es requerido')
        .bail()
        .notEmpty()
        .withMessage('El título no puede estar vacío')
        .bail(),
    check('description')
        .exists()
        .trim()
        .withMessage('La descripción es requerida')
        .bail()
        .notEmpty()
        .withMessage('La descripción no puede estar vacía')
        .bail(),
    check('statusComplete')
        .exists()
        .trim()
        .withMessage('El estado de completado es requerido')
        .bail()
        .isBoolean()
        .withMessage('El estado de completado debe ser verdadero o falso')
        .bail(),
    ValidateCamps
];