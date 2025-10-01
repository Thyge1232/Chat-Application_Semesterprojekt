import type { UserRegistration } from "../types/userregistration";
import { useForm } from "react-hook-form";
import type { SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router-dom";

type FormValues = UserRegistration & { confirmPassword: string };

export const Registration = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();

  const navigate = useNavigate();

  const onSubmit: SubmitHandler<FormValues> = () => {
    console.log();
    //TODO: validate against database - does this user exist?
    navigate("/conversations");
  };

  return <div> HELLO REG </div>;
};
