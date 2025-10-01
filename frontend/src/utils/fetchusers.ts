import { useQuery } from "@tanstack/react-query";

export const fetchUsers = () => {
  const { data, isPending, error } = useQuery({
    queryKey: ["users"],
    queryFn: () => fetch("api.venner.nu/users").then((r) => r.json()),
  });

  if (isPending) return <span>Loading...</span>;
  if (error) return <span>Oops!</span>;

  return (
    <ul>
      {data.map((t) => (
        <li key={t.id}>{t.title}</li>
      ))}
    </ul>
  );
};
