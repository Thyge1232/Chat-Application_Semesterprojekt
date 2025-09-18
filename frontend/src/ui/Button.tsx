import type { ButtonHTMLAttributes, PropsWithChildren } from "react";
import { twMerge } from "tailwind-merge";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
}

export const Button = ({
  className,
  children,
  ...props
}: PropsWithChildren<ButtonProps>) => {
  return (
    <button
      {...props}
      className={twMerge(
        `bg-green-700 hover:bg-green-300 disabled:bg-green-300 flex w-full cursor-pointer justify-center rounded-md px-3 py-1.5 text-sm/6 font-semibold text-white shadow-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:cursor-not-allowed`,
        className
      )}
    >
      {children}
    </button>
  );
};
