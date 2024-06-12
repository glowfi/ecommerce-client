import { boolean, z } from 'zod';
import { isValidPhoneNumber } from 'react-phone-number-input';

export const streetAddressSchema = z
    .string()
    .min(5, { message: 'No street address provided!' });

export const countrySchema = z
    .string()
    .min(1, { message: 'No country provided!' });

export const stateSchema = z.string().min(3, { message: 'No state provided!' });

export const citySchema = z.string().min(3, 'No city provided!');

export const zipCodeSchema = z
    .string()
    .min(4, { message: 'No zipcode provided!' });

export const phoneNumbeSchema = z
    .string()
    .refine(isValidPhoneNumber, { message: 'Invalid phone number' });

export const dobSchema = z.string().or(z.literal(''));

export const updateAddressSchema = z.boolean().or(z.literal(false));
