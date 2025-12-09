
import LoginForm from '@/components/modules/auth/LoginForm';
import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';

export const metadata: Metadata = {
    title: 'Login page',
    description: 'Put the credentials to login'
}

const LoginPage = () => {
    return (
        <div>
            <div className="grid min-h-svh lg:grid-cols-2">
                <div className="flex flex-col gap-4 p-6 md:p-10">
                    <div className="flex justify-center gap-2 md:justify-start">
                        <Link href="/" className="flex items-center gap-2 font-medium">
                            <Image src="/images/logo.png" width={120} height={120} alt="Logo" />
                        </Link>
                    </div>
                    <div className="flex flex-1 items-center justify-center">
                        <div className="w-full max-w-md">
                            <LoginForm />
                        </div>
                    </div>
                </div>
                <div className="relative hidden lg:block">
                    <Image
                        src="/images/login.jpg"
                        alt="Background"
                        fill
                        priority
                        className="fixed top-0 right-0 object-cover object-top"
                    />
                </div>
            </div>
        </div>
    );
};

export default LoginPage;