import { Spinner } from "../ui/Spinner";
import { useAuth } from "../features/authentication/hooks/useAuth";
import { Title } from "../ui/Title";

//To do: Knapper/dropdown (?) til at vælge brugerspecifik ConversationColorTheme --> put til database

export const Settings = () => {
  const { currentUser } = useAuth();
  if (!currentUser) return <Spinner />;

  return (
    <>
      <Title> evt tilføj localization setting her....</Title>
      <Spinner />
      <img src="/public/Images/Error.png" alt="error" className="h-160 w-160" />
    </>
  );
};
