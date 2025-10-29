import userAvatarPlaceholder from "../../../assets/images/AvatarPlaceholder.png";

export type UserProps = {
  userId: number;
  userName: string;
  email: string;
  createdAt: string;
  profilePhoto?: string;
};

export const PersonalBanner = ({
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

const ProfileImage = ({ src }: { src: string }) => (
  <div className="w-full md:w-5/12 flex justify-center md:justify-end">
    <img
      src={src}
      alt="User Avatar"
      className="max-w-xs md:max-w-sm lg:max-w-md aspect-[3/4] object-scale-down rounded-lg shadow-lg"
    />
  </div>
);

const UserInfo = ({
  userName,
  email,
  createdAt,
}: Pick<UserProps, "userName" | "email" | "createdAt">) => (
  <div className="w-full text-center md:text-left">
    <dl className="space-y-2 text-sm md:text-base text-indigo-200">
      <div>
        <dt className="font-semibold text-indigo-400">Brugernavn</dt>
        <dd>{userName || "N/A"}</dd>
      </div>
      <div>
        <dt className="font-semibold text-indigo-400">Email</dt>
        <dd>{email || "N/A"}</dd>
      </div>
      <div>
        <dt className="font-semibold text-indigo-400">Oprettet</dt>
        <dd>{createdAt || "N/A"}</dd>
      </div>
    </dl>
  </div>
);
