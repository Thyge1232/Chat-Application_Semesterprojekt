import "./UserCardStyle.css";
import { twMerge } from "tailwind-merge";

interface UserCardProps {
  username: string;
  email: string;
  createdAt: string;
  className?: string;
}

export const UserCard = ({
  username,
  email,
  createdAt,
  className,
}: UserCardProps) => {
  return (
    <li className={twMerge("user-card", className)}>
      <p className="user-card__info">
        <text>Brugernavn: </text>
        <br />
        <strong>{username}</strong>
        <br />
        <text className="text-xs">Email: </text>
        <br />
        <span className="user-card__email">{email}</span>
        <br />
        <text className="text-xs">Oprettet: </text>
        <br />
        <span className="user-card__created">
          {new Date(createdAt).toLocaleString()}
        </span>
      </p>
    </li>
  );
};
