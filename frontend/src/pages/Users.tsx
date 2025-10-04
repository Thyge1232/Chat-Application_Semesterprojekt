import { useUsers } from "../hooks/useUsers";
import { SpinnerWithText } from "../ui/SpinnerWithText";
import { UserCard } from "../ui/UserCard";

export const Users = () => {
  const { data, isPending, error } = useUsers();

  if (isPending) return <SpinnerWithText />;
  if (error)
    return <p className="text-center text-red-500">Error loading users</p>;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Brugere</h1>
      <ul className="user-grid">
        {data?.map((user) => (
          <UserCard
            key={user.id}
            username={user.userName}
            email={user.email}
            createdAt={user.createdAt}
            userId={user.id}
          />
        ))}
      </ul>
    </div>
  );
};
