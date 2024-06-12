import { z } from 'zod';

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
