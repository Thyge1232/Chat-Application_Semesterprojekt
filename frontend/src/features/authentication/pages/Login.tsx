import { useNavigate, Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useLogin } from "../hooks/useLogin";

type Inputs = {
  loginCredentials: string;
  password: string;
};

export const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();
  const navigate = useNavigate();

  const { mutateAsync: login, isPending, error } = useLogin();

  const onSubmit = async (data: Inputs) => {
    try {
      const user = await login({
        username: data.loginCredentials,
        password: data.password,
      });
      console.log("Logged in as", user?.userName);
      navigate("/home");
    } catch (err) {
      alert("Noget gik galt: " + (err as Error).message);
    }
  };

  return (
    <>
      <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
            Log ind
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div>
              <label
                htmlFor="loginCredentials"
                className="block text-sm/6 font-medium text-gray-900"
              >
                Skriv brugernavnet her!
              </label>
              <div className="mt-2">
                <input
                  id="loginCredentials"
                  type="text"
                  {...register("loginCredentials", { required: true })}
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                />
                {errors.loginCredentials && (
                  <span className="text-red-500 text-sm">
                    Dette felt er påkrævet
                  </span>
                )}
              </div>
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-900"
              >
                Skriv koden til dit brugernavn!
              </label>
              <div className="mt-2">
                <input
                  id="password"
                  type="password"
                  {...register("password", { required: true })}
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:outline-indigo-600 sm:text-sm"
                />
                {errors.password && (
                  <span className="text-red-500 text-sm">
                    Dette felt er påkrævet
                  </span>
                )}
              </div>
            </div>

            <div>
              <button
                disabled={isPending}
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold text-white shadow hover:bg-indigo-500 disabled:opacity-50"
              >
                {isPending ? "Logger ind…" : "Kom videre"}
              </button>

              {error && <p className="text-red-500 mt-2">{error.message}</p>}
            </div>
          </form>

          <p className="mt-2.5 text-center text-[#5170aa] bg-white border border-black rounded-md inline-block px-2 py-1">
            <Link to="/signup">Er du ny her?</Link>
          </p>
        </div>
      </div>
    </>
  );
};