import { z } from 'zod';

export const fullnameSchema = z.string().min(2, {
    message: 'Fullname must be at least 2 characters.'
});

export const emailSchema = z
    .string()
    .email({ message: 'Invalid Email address!' });

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

export const streetAddressSchema = z.string().or(z.literal(''));
export const countrySchema = z.string().or(z.literal(''));
export const stateSchema = z.string().or(z.literal(''));
export const citySchema = z.string().or(z.literal(''));
export const zipCodeSchema = z.string().or(z.literal(''));
export const phoneNumbeSchema = z
    .string()
    .refine(
        (value) => {
            // E.164 format: +[country code][phone number]
            const e164Pattern =
                /^\+\d{1,3}\s?\-\s?(\d{1,4}\)|\d{1,4})[\s\-]?[\d]{1,14}$/;

            // National format: [country code][phone number] without the plussign
            const nationalPattern =
                /^\d{1,4}[\s\-]?(\d{1,4}\)|\d{1,4})[\s\-]?[\d]{1,14}$/;

            // International format without the plus sign: [country code][phonenumber]
            const internationalPattern =
                /^\d{1,3}[\s\-]?(\d{1,4}\)|\d{1,4})[\s\-]?[\d]{1,14}$/;

            return (
                e164Pattern.test(value) ||
                nationalPattern.test(value) ||
                internationalPattern.test(value)
            );
        },
        {
            message: 'Invalid phone number format'
        }
    )
    .or(z.literal(''));
export const dobSchema = z.string().or(z.literal(''));
