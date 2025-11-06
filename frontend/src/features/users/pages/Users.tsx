import { useUsers } from "../../authentication/hooks/useUsers";
import { SpinnerWithText } from "../../../sharedComponents/SpinnerWithText";
import { Title } from "../../../sharedComponents/Title";
import { UserCard } from "../components/UserCard";

export const Users = () => {
  const { data: allUsers, isPending, error } = useUsers();
  const users = allUsers ?? [];

  if (isPending) return <SpinnerWithText />;
  if (error)
    return (
      <p className="text-center text-red-500">Fejl med at loade brugere</p>
    );

  return (
    <div className="p-4 max-w-[1200px] mx-auto">
      <Title>Brugere</Title>

      <div className="h-[70vh] overflow-y-auto pr-2">
        <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
          {users.map((user) => (
            <UserCard key={user.id} {...user} />
          ))}
        </ul>
      </div>
    </div>
  );
};
