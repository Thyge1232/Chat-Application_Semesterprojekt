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
    <button {...props} className={twMerge("button", className)}>
      {children}
    </button>
  );
};
