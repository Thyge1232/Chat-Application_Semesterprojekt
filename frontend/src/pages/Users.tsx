import { useUsers } from "../hooks/useUsers";
import { UserCard } from "../ui/UserCard";

export const Users = () => {
  const { data, isPending, error } = useUsers();

  if (isPending) return <p className="text-center text-gray-500">Loading...</p>;
  if (error)
    return <p className="text-center text-red-500">Error loading users</p>;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Brugere</h1>
      <ul className="user-grid">
        {data?.map((user) => (
          <UserCard
            key={user.id}
            username={user.username}
            email={user.email}
            createdAt={user.createdAt}
          />
        ))}
      </ul>
    </div>
  );
};
