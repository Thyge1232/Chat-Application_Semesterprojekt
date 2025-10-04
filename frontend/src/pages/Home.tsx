import { Title } from "../ui/Title";
import { SpinnerWithText } from "../ui/SpinnerWithText";

export const Home = () => {
  return (
    <>
      {" "}
      <Title>her er der info om dig!!!</Title>
      <div className="text-red-500 bg text-9xl">blabblabla</div>
      <SpinnerWithText />
      <img src="/public/Images/Error.png" alt="error" className="h-160 w-160" />
    </>
  );
};
