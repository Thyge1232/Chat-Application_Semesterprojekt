import type { UserSignup } from "../types/usersignup";
import { Link } from "react-router-dom";
import { useForm, SubmitHandler } from "react-hook-form";
import { usePostData } from "../hooks/usePostData";
import { useNavigate } from "react-router-dom";

interface FormInputs extends UserSignup {
    confirmPassword: string;
  }

export const Registration = () => {
  const { register, handleSubmit, watch, formState: { errors } } = useForm<FormInputs>();
  const navigate = useNavigate();

  const createUserMutation = usePostData<UserSignup, unknown>("/api/users"); //tjek denne

  const onSubmit: SubmitHandler<FormInputs> = (data) => {
    const {confirmPassword, ...userData } = data;


    createUserMutation.mutate(userData, {
      onSuccess: (res) => {
        console.log("Response fra backend: ", res);
        //navigate("/personalpage")
      },
      onError: (err: Error) => {
        alert("Noget gik galt: " + err.message);
        console.log(err);
      },
     });
   console.log("Form data:", data);
   console.log("Json-String:", userData);
  };

 
  return (
    <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="mt-10 text-center text-2xl font-bold tracking-tight text-gray-900">
          Opret en bruger
        </h2>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm space-y-6">
        <div>
          <label htmlFor="username" className="block text-sm font-medium text-gray-900">
            Brugernavn:
          </label>
          <div className="mt-2">
            <input
              id="username"
              type="text"
              placeholder="Skriv dit ønskede brugernavn"
              className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:outline-indigo-600 sm:text-sm"
              {...register("username", { required: "Oprettelse kræver et brugernavn" })}
            />
            {errors.username && <p className="text-red-500">{errors.username.message}</p>}
          </div>
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-900">
            Email:
          </label>
          <div className="mt-2">
            <input
              id="email"
              type="text"
              placeholder="Hvad er din email?"
              className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:outline-indigo-600 sm:text-sm"
              {...register("email", {
                required: "Email er påkrævet for oprettelse",
                validate: (value) => value.includes("@") || "Email skal indeholde @"
              })}
            />
            {errors.email && <p className="text-red-500">{errors.email.message}</p>}
          </div>
        </div>

        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-900">
            Kodeord:
          </label>
          <div className="mt-2">
            <input
              id="password"
              type="password"
              placeholder="Hvad skal dit kodeord være?"
              className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:outline-indigo-600 sm:text-sm"
              {...register("password", {
                required: "Kodeord er påkrævet for oprettelse",
                validate: (value) => value.length >= 6 || "Kodeordet skal være mindst 6 tegn"
              })}
            />
            {errors.password && <p className="text-red-500">{errors.password.message}</p>}
          </div>
        </div>

        <div>
          <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-900">
            Gentag kodeord:
          </label>
          <div className="mt-2">
            <input
              id="confirmPassword"
              type="password"
              placeholder="Bekræft kodeord"
              className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:outline-indigo-600 sm:text-sm"
              {...register("confirmPassword", {
                required: "Kodeord er påkrævet for oprettelse",
                validate: (value) => value === watch("password", "") || "Kodeord matcher ikke hinanden."
              })}
            />
            {errors.confirmPassword && <p className="text-red-500">{errors.confirmPassword.message}</p>}
          </div>
        </div>

        <button
          type="submit"
          className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold text-white shadow hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-indigo-600"
        >
          Opret bruger
        </button>
      </form>

      <p className="mt-10 text-center text-sm text-gray-500">
        <Link to="/">Tilbage til log ind</Link>
      </p>
    </div>
  );
};
