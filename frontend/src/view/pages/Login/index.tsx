import { Link } from "react-router-dom";
import { Input } from "../../components/Input";
import { Button } from "../../components/Button";
import { useLoginController } from "./useLoginController";

export function Login() {
  const { handleSubmit, register, errors, isPending } = useLoginController();

  return (
    <>
      <header className="flex flex-col items-center gap-4">
        <h1 className="text-2xl font-bold text-gray-900 tracking-[-1px]">
          Entre em sua conta
        </h1>

        <p className="space-x-2 tracking-[-0.5px]">
          <span className="text-gray-700">
            Novo por aqui?
          </span>

          <Link
            to="/register"
            className="text-[#087F5B] font-[500]"
          >
            Crie uma conta
          </Link>
        </p>
      </header>

      <form
        className="mt-[60px] flex flex-col gap-4"
        onSubmit={handleSubmit}
      >
        <Input
          type="email"
          placeholder="email"
          error={errors.email?.message}
          {...register("email")}
        />
        {errors.email && <span>{errors.email?.message}</span>}

        <Input
          type="password"
          placeholder="password"
          error={errors.password?.message}
          {...register("password")}
        />
        {errors.password && <span>{errors.password?.message}</span>}

        <Button className="mt-2" isPending={isPending}>
          Entrar
        </Button>
      </form>
    </>
  );
}
