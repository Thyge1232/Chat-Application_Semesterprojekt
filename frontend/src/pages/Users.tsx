import { useUsers } from "../api/userAPi";
import { SpinnerWithText } from "../ui/SpinnerWithText";
import { Title } from "../ui/Title";
import { UserCard } from "../ui/UserCard";

export const Users = () => {
  const { data, isPending, error } = useUsers();

  if (isPending) return <SpinnerWithText />;
  if (error)
    return <p className="text-center text-red-500">Error loading users</p>;

  return (
    <div className="p-4">
      <Title>Brugere</Title>
      <ul className="user-grid">
        {data?.map((user) => (
          <UserCard
            key={user.id}
            username={user.username}
            email={user.email}
            createdAt={user.createdAt}
            userId={user.id}
          />
        ))}
      </ul>
    </div>
  );
};
