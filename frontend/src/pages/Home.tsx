import { Title } from "../ui/Title";
import { SpinnerWithText } from "../ui/SpinnerWithText";
import { Banner } from "../ui/Banner";

//User probs -- edit, reset,
// definer default værdier
// Get user, (kig på conversation page)
// definer typerne  ()
// implementeret specifik hook : useUserById  (inpiration useUsers), usePostUserInformation (profilbillede + fun fact)
// refactor
import type { User } from "../types/user";
import { useUserById } from "../hooks/useUserById";
const dummyId = Math.floor(Math.random() * (18 - 1 + 1)) + 1;

export const Home = () => {
  const { data: current, isLoading, error } = useUserById(dummyId);
  if (isLoading) return <p>Henter bruger...</p>;
  if (error) return <p>Der opstod en fejl: {(error as Error).message}</p>;
  if (!current) return <p>Ingen bruger fundet</p>;

  return (
    <>
      <Banner
        userId={current.id}
        userName={current.username}
        email={current.email}
        createdAt={current.createdAt}
        profilePhoto={"../public/Images/user.png"}
        totalMessages={2}
        level={0}
        aboutMe={"Jeg elsker pølser, og er DannyBoy"}
      ></Banner>
    </>
  );
};
