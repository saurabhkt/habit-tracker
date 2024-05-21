import LoginForm from "../ui/auth/login-form";
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Login',
}

export default function LoginPage() {
  return (
    <main className="bg-neutral-50 h-screen">
      <div className="flex h-full">
        <div className="max-sm:w-screen max-sm:mx-5 w-96 m-auto">
          <LoginForm/>
        </div>
      </div>
    </main>
  );
}
