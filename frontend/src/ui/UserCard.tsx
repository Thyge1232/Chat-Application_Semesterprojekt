import "./UserCardStyle.css";
import { twMerge } from "tailwind-merge";

interface UserCardProps {
  username: string;
  email: string;
  createdAt: string;
  className?: string;
  userId?: number;
  img?: string;
}

//placeholder til brugerens billede for now:
const placeholder = "Images/user.png";

export const UserCard = ({
  username,
  email,
  createdAt,
  className,
  userId,
}: // img,
UserCardProps) => {
  return (
    <li className={twMerge("user-card", className)}>
      <div className="user-card__layout">
        <div className="user-card__info">
          <span>Brugernavn:</span>
          <br />
          <strong>{username}</strong>
          <br />
          <span className="text-xs">Email:</span>
          <br />
          <span className="user-card__email">{email}</span>
          <br />
          <span className="text-xs">Oprettet:</span>
          <br />
          <span className="user-card__created">
            {new Date(createdAt).toLocaleString()}
          </span>
          <br />
          <span className="text-xs">
            UserId: <div className="user-card__userId">{userId}</div>
          </span>
        </div>
        <img
          src={placeholder}
          alt={`${username}'s avatar`}
          className="user-card__avatar"
        />
      </div>
    </li>
  );
};
