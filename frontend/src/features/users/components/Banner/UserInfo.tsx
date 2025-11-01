export type UserProps = {
  userId: number;
  userName: string;
  email: string;
  createdAt: string;
  profilePhoto?: string;
};

export const UserInfo = ({
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
