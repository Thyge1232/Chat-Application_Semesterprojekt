import { useForm } from "react-hook-form";

export type UserProps = {
  userId: number;
  userName: string;
  email: string;
  createdAt: string;
  profilePhoto?: string; //Ikke i DB
  totalMessages: number; //Ikke i DB
  aboutMe: string; //Ikke i DB
};

export const Banner = ({
  userName,
  email,
  createdAt,
  profilePhoto,
  totalMessages,
  aboutMe,
}: UserProps) => {
  const { register } = useForm<UserProps>();

  const level = totalMessages / 10;
  return (
    <section className="min-h-screen bg-primary text-white py-16 px-6 flex flex-col md:flex-row items-center justify-between gap-8">
      <div className="w-full md:w-5/12 flex flex-col items-center md:items-end h-full">
        <img
          src={profilePhoto}
          alt="Profile Photo"
          className="w-72 h-96 md:w-80 lg:w-96 object-contain rounded-lg shadow-lg"
        />
        <div className="chat-bubble__actions">
          <button
          // onClick={() => handleDelete(messageId)}
          >
            <img src="/Images/delete_icon.png" alt="delete" />
          </button>

          <button
          // onClick={() => handleEdit(messageId)}
          >
            <img src="/Images/edit_icon.png" alt="edit" />
          </button>
        </div>
      </div>
      <div className="w-full text-center md:text-left relative">
        <p className="text-indigo-600 mb-6 text-sm md:text-base leading-relaxed mx-auto md:mx-0 whitespace-pre-line">
          {`Brugernavn: ${userName}
            Email: ${email}
            Oprettet: ${createdAt}
            Antal afsendte beskeder: ${totalMessages}
            Level: ${level} 
            Fun fact:`}
        </p>
        <textarea
          id="aboutMe"
          defaultValue={aboutMe}
          rows={7}
          className="text-indigo-600 min-w-3xl"
          {...register("aboutMe")}
        />
      </div>
    </section>
  );
};
