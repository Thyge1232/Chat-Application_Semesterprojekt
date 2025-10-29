import userAvatarPlaceholder from "../../../../assets/images/avatarPlaceHolder.png";
import { ProfileImage } from "./ProfileImage";
import { UserInfo, type UserProps } from "./UserInfo";

export const Banner = ({
  userName,
  email,
  createdAt,
  profilePhoto = userAvatarPlaceholder,
}: UserProps) => {
  return (
    <section className="min-h-screen bg-primary text-white py-16 px-6 flex flex-col md:flex-row items-center justify-between gap-12">
      <ProfileImage src={profilePhoto} />
      <UserInfo userName={userName} email={email} createdAt={createdAt} />
    </section>
  );
};
