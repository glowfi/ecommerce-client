import CustomProvider from '@/lib/graphqlclient';
import type { Metadata } from 'next';
import './globals.css';
import Navbar from '@/components/navbar/navbar';
import { ThemeProvider } from 'next-themes';
import { Toaster } from '@/components/ui/toaster';
import { GoogleOAuthProvider } from '@react-oauth/google';

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

                            {children}
                        </GoogleOAuthProvider>
                    </ThemeProvider>
                </body>
            </CustomProvider>
        </html>
    );
}
