// src/pages/Users.tsx
import { useUsers } from "../hooks/useUsers";

export const Users = () => {
  const { data, isPending, error } = useUsers();

  if (isPending) return <p className="text-center text-gray-500">Loading...</p>;
  if (error)
    return <p className="text-center text-red-500">Error loading users</p>;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Brugere</h1>
      <ul className="space-y-2">
        {data?.map((user) => (
          <li key={user.id} className="p-2 bg-gray-100 rounded shadow">
            <div className="font-semibold">{user.username}</div>
            <div className="text-sm text-gray-600">{user.email}</div>
            <div className="text-xs text-gray-400">
              {new Date(user.createdAt).toLocaleString()}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};
