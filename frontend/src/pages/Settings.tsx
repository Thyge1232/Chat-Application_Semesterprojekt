import { Spinner } from "../ui/Spinner";
import { useAuth } from "../hooks/useAuth";

export const Settings = () => {
  const { currentUser } = useAuth();
  if (!currentUser) return <Spinner />;

  return (
    <>
      <div> HER ER SETTINGS</div>
      <Spinner />
      <img src="/public/Images/Error.png" alt="error" className="h-160 w-160" />
    </>
  );
};
