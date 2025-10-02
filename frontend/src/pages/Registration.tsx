import type { UserRegistration } from "../types/userregistration";
// import { useForm } from "react-hook-form";
// import type { SubmitHandler } from "react-hook-form";
// import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

type FormValues = UserRegistration & { confirmPassword: string };

export const Registration = () => {
  
  return (
  <>
    <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
            Opret en bruger
          </h2>
        </div>

        <div className="mt-10 sm;mx-auto sm:w-full sm:max-w-sm">
         
            <div>
              <label 
              htmlFor="username"
              className="block text-sm/6 font-medium text-gray-900"
              >
                Brugernavn:
              </label>
              <div className="mt-2">
                <input 
                  id="username"
                  type="text"
                  placeholder="Skriv dit ønskede brugernavn"
                  className ="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                  />
              </div>
            </div>

            <div>
              <label 
              htmlFor="email"
              className="block text-sm/6 font-medium text-gray-900"
              >
                Email:
              </label>
              <div className="mt-2">
                <input 
                  id="username"
                  type="text"
                  placeholder="Hvad er din email?"
                  className ="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                  />
              </div>
            </div>

            <div>
              <label 
              htmlFor="pasword"
              className="block text-sm/6 font-medium text-gray-900"
              >
                Kodeord:
              </label>
              <div className="mt-2">
                <input 
                  id="pasword"
                  type="text"
                  placeholder="Hvad skal dit kodeord være?"
                  className ="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                  />
              </div>
            </div>

            <div>
              <label 
              htmlFor="confirmpasword"
              className="block text-sm/6 font-medium text-gray-900"
              >
                Gentag kodeord:
              </label>
              <div className="mt-2">
                <input 
                  id="confirmpassword"
                  type="text"
                  placeholder="Bekræft kodeord"
                  className ="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                  />
              </div>
              </div>

              <div>
                <button
                type = "submit"
                className = "flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold text-white shadow hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-indigo-600"
                >
                  Opret bruger
                </button>
              
            </div>


          


        </div>
          <p className="mt-10 text-center text-sm text-gray-500">
            <Link to="/">Tilbage til log ind</Link>
          </p>

    </div>
  </> 
  )
};
