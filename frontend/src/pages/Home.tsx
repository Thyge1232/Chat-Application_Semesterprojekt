import { Banner } from "../ui/Banner";
import { useAuth } from "../features/authentication/hooks/useAuth";
import { SpinnerWithText } from "../ui/SpinnerWithText";
//User probs -- edit, reset,
// definer default værdier
// Get user, (kig på conversation page)
// definer typerne  ()
// implementeret specifik hook : useUserById  (inpiration useUsers), usePostUserInformation (profilbillede + fun fact)
// refactor
import { useUserById } from "../features/authentication/hooks/useUserById";

export const Home = () => {
  const { currentUser } = useAuth();

  const { data: current, isLoading, error } = useUserById(currentUser?.userId);

  if (!currentUser) return <SpinnerWithText />;
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
        aboutMe={"Jeg elsker pølser, og er DannyBoy"}
      />
    </>
  );
};
