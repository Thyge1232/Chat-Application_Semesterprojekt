import { Banner } from "../components/Banner/Banner";
import { useAuth } from "../../authentication/hooks/useAuth";
import { SpinnerWithText } from "../../../sharedComponents/SpinnerWithText";
import { useUserById } from "../../authentication/hooks/useUserById";

export const Home = () => {
  const { currentUser } = useAuth();

  const { data: current, isLoading, error } = useUserById(currentUser?.userId);

  if (!currentUser) return <SpinnerWithText />;
  if (isLoading) return <p>Henter bruger...</p>;
  if (error) return <p>Der opstod en fejl: {(error as Error).message}</p>;
  if (!current) return <p>Ingen bruger fundet</p>;

  return (
    <Banner
      userId={current.id}
      userName={current.username}
      email={current.email}
      createdAt={current.createdAt}
    />
  );
};
