import type { PropsWithChildren } from "react";

export const Title = ({ children }: PropsWithChildren) => {
  return <h1 className="m-5 text-center font-sans text-5xl">{children}</h1>;
};
