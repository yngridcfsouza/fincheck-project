import { Link } from "react-router-dom";
import { Input } from "../../components/Input";
import { Button } from "../../components/Button";
import { useRegisterController } from "./useRegisterController";

export function Register() {
  const { handleSubmit, register, errors, isPending } = useRegisterController();

  return (
    <>
      <header className="flex flex-col items-center gap-4">
        <h1 className="text-2xl font-bold text-gray-900 tracking-[-1px]">
          Crie sua conta
        </h1>

        <p className="space-x-2 tracking-[-0.5px]">
          <span className="text-gray-700">
            Já tem uma conta?
          </span>

          <Link
            to="/login"
            className="text-[#087F5B] font-[500]"
          >
            Faça login
          </Link>
        </p>
      </header>

      <form
        onSubmit={handleSubmit}
        className="mt-[60px] flex flex-col gap-4"
      >
        <Input
          placeholder="Nome"
          error={errors.name?.message}
          {...register('name')}
        />

        <Input
          placeholder="E-mail"
          error={errors.email?.message}
          {...register('email')}
        />

        <Input
          placeholder="Senha"
          error={errors.password?.message}
          {...register('password')}
        />

        <Button type="submit" className="mt-2" isPending={isPending}>
          Criar Conta
        </Button>
      </form>
    </>
  );
}
