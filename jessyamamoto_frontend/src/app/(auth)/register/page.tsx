import { Suspense } from "react";
import RegisterForm from "./_components/register-form";

export default function Register() {
  return (
    <div className="bg-[#ffffff7e] p-5 rounded-lg w-[400px] lg:w-[600px] border shadow-lg">
      <div className="text-center">
        <h1 className="text-2xl font-medium text-primary">Create Account</h1>
      </div>

      <div className="mt-6">
        <Suspense fallback={<div>Loading...</div>}>
          <RegisterForm />
        </Suspense>
      </div>
    </div>
  );
}
