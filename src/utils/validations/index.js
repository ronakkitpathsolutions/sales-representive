import z from 'zod';
import { VALIDATION_MESSAGES as msg } from '../constants';

export const profileSchema = z.object({
  first_name: z
    .string()
    .trim()
    .min(1, msg.required('first name'))
    .min(2, msg.minLength('first name', 2))
    .max(50, msg.maxLength('first name', 50)),
  last_name: z
    .string()
    .trim()
    .min(1, msg.required('last name'))
    .min(2, msg.minLength('last name', 2))
    .max(50, msg.maxLength('last name', 50)),
  email: z
    .string()
    .trim()
    .min(1, msg.required('email'))
    .email(msg.invalid('email'))
    .max(255, msg.maxLength('email', 255)),
  company_name: z
    .string()
    .trim()
    .max(100, msg.maxLength('company name', 100))
    .optional(),
});
