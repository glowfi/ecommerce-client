import { boolean, z } from 'zod';
import { isValidPhoneNumber } from 'react-phone-number-input';

export const nameSchema = z
    .string()
    .min(2, { message: 'Please provide a valid name!' });
export const emailSchema = z
    .string()
    .email({ message: 'Please provide a valid email!' });

export const streetAddressSchema = z
    .string()
    .min(5, { message: 'No street address provided!' });

export const countrySchema = z
    .string()
    .min(1, { message: 'No country provided!' });

export const stateSchema = z.string().min(3, { message: 'No state provided!' });

export const citySchema = z.string().min(3, 'No city provided!');

export const zipCodeSchema = z
    .number()
    .min(4, { message: 'No zipcode provided!' });

export const phoneNumbeSchema = z
    .string()
    .refine(isValidPhoneNumber, { message: 'Invalid phone number' });

export const dobSchema = z.string().or(z.literal(''));

export const passwordSchema = z.string().refine(
    (password) => {
        // Regex pattern for:
        // - At least one uppercase letter (^.*[A-Z].*)
        // - At least one lowercase letter (^.*[a-z].*)
        // - At least one digit (^.*\d.*)
        // - At least one special character (e.g.,!@#$%^&*(),.?":{}|<>)(^.*[\W_].*)
        // - Minimum length of 8 characters (.{8,})
        return /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[\W_]).{8,}$/.test(
            password
        );
    },
    {
        message:
            'Password must contain at least one uppercase letter, one lowercase letter, one number, one special character, and be at least 8 characters long.'
    }
);

export const confirmpasswordSchema = z.string();
