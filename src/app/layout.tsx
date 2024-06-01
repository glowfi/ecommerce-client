import CustomProvider from '@/lib/graphqlclient';
import type { Metadata } from 'next';
import './globals.css';
import Navbar from '@/components/navbar/navbar';
import { ThemeProvider } from 'next-themes';
import { Toaster } from '@/components/ui/toaster';

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
        <html lang="en">
            <CustomProvider>
                <body>
                    <ThemeProvider
                        attribute="class"
                        defaultTheme="dark"
                        enableSystem
                        disableTransitionOnChange
                    >
                        <Toaster />
                        <Navbar />

                        {children}
                    </ThemeProvider>
                </body>
            </CustomProvider>
        </html>
    );
}
