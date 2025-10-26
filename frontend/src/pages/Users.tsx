import { useUsers } from "../features/users/hooks/useUsers";
import { SpinnerWithText } from "../ui/SpinnerWithText";
import { Title } from "../ui/Title";
import { UserCard } from "../ui/UserCard";

export const Users = () => {
  const { data: allUsers, isPending, error } = useUsers();
  const users = allUsers ?? [];
  console.log("allUsers length:", allUsers?.length);

  if (isPending) return <SpinnerWithText />;
  if (error)
    return <p className="text-center text-red-500">Error loading users</p>;

  return (
    <div className="p-4">
      <Title>Brugere</Title>

      <div className="h-[70vh] overflow-y-auto">
        {" "}
        {/* scroll container */}
        <ul className="grid [grid-template-columns:repeat(auto-fill,minmax(220px,1fr))] gap-3">
          {users.map((user) => (
            <UserCard key={user.id} {...user} />
          ))}
        </ul>
      </div>
    </div>
  );
};
