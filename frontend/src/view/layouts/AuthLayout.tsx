import { Outlet } from 'react-router-dom';

import illustration from '../../assets/illustration.svg';
import logo from '../../assets/logo.svg';
import logoGray from '../../assets/logoGray.svg';

export function AuthLayout() {
  return (
    <main className="flex w-full h-full bg-gray-50">
      <section className="w-full h-full flex justify-center items-center flex-col gap-16">
        <img src={logoGray} className="h-6" alt="Logo Fincheck Cinza" />

        <div className="w-full max-w-[504px] px-8">
          <Outlet />
        </div>
      </section>

      <section className="max-h-[960px] pr-4 py-4 justify-center items-center hidden lg:flex flex-col relative">
        <img
          src={illustration}
          className="object-cover w-full h-full max-w-[656px] select-none rounded-[32px]"
          alt="Ilustração de finanças pessoais"
        />

        <div className="max-w-[656px] bottom-8 bg-white px-8 py-12 flex-col justify-between rounded-b-[32px] relative">
          <img src={logo} alt="Logo Fincheck Verde" className="h-6" />
          <p className="text-gray-700 font-medium text-xl mt-6">
            Gerencie suas finanças pessoais de uma forma simples com o fincheck, e o melhor: totalmente de graça!
          </p>
        </div>
      </section>
    </main>
  );
}
