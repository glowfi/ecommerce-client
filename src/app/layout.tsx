import Navbar from '@/components/navbar/navbar';
import { Toaster } from '@/components/ui/toaster';
import CustomProvider from '@/lib/graphqlclient';
import { GoogleOAuthProvider } from '@react-oauth/google';
import type { Metadata } from 'next';
import { ThemeProvider } from 'next-themes';
import './globals.css';
import { Greet } from '@/lib/greet';

export const metadata: Metadata = {
    title: 'Nimbus Store',
    description:
        'Ecommerce Webiste using FastAPI,MongoDB,GraphQL,NextJS,Redis,Apache Kafka'
};

export default function RootLayout({
    children
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" suppressHydrationWarning>
            <CustomProvider>
                <body>
                    <ThemeProvider
                        attribute="class"
                        defaultTheme="system"
                        enableSystem
                        disableTransitionOnChange
                    >
                        <GoogleOAuthProvider
                            clientId={`${process.env.GOOGLE_CLIENT_ID}`}
                        >
                            <Toaster />
                            <Navbar />
                            <Greet />

                            {children}
                        </GoogleOAuthProvider>
                    </ThemeProvider>
                </body>
            </CustomProvider>
        </html>
    );
}
