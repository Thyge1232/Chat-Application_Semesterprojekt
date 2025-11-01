import { twMerge } from "tailwind-merge";
import AvatarPlaceholder from "../../../assets/Images/avatarPlaceHolder.png";

interface UserCardProps {
  username: string;
  email: string;
  createdAt: string;
  className?: string;
  userId?: number;
  img?: string;
}

const placeholder = AvatarPlaceholder;

export const UserCard = ({
  username,
  email,
  createdAt,
  className,
  userId,
}: UserCardProps) => {
  return (
    <li
      className={twMerge(
        "flex-[1_1_250px] max-w-[300px] box-border",
        className
      )}
    >
      <div className="flex flex-row items-center rounded-xl border border-[#5271af] shadow-[0_2px_4px_rgba(0,0,0,0.6)] bg-[antiquewhite] p-[5px] w-full box-border">
        <div className="flex-[0_0_80%] text-[1.4rem] text-gray-700 min-w-0">
          <span>Brugernavn:</span>
          <br />
          <strong>{username}</strong>
          <br />
          <span className="text-xs">Email:</span>
          <br />
          <span className="text-[1rem] text-[#4971c0]">{email}</span>
          <br />
          <span className="text-xs">Oprettet:</span>
          <br />
          <span className="text-lg text-[#3c414b]">
            {new Date(createdAt).toLocaleString()}
          </span>
          <br />
          <span className="text-xs">
            UserId:{" "}
            <div className="text-[15px] text-[#259225] inline">{userId}</div>
          </span>
        </div>

        <img
          src={placeholder}
          alt={`${username}'s avatar`}
          className="flex-[0_0_20%] relative -top-[70px] w-[60px] h-[60px] rounded-full object-cover border border-[#5271af] shadow-[0_2px_4px_rgba(0,0,0,0.2)]"
        />
      </div>
    </li>
  );
};
