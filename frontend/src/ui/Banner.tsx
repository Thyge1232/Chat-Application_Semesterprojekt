export type UserProps = {
  userId: number;
  userName: string;
  email: string;
  createdAt: string;
  profilePhoto?: string; //Ikke i DB
  totalMessages: number; //Ikke i DB
  level: number; //Ikke i DB
  aboutMe: string; //Ikke i DB
};

export const Banner = ({
  userId,
  userName,
  email,
  createdAt,
  profilePhoto,
  totalMessages,
  level,
  aboutMe,
}: UserProps) => {
  return (
    <section className="min-h-screen bg-primary text-white py-16 px-6 flex flex-col md:flex-row items-center justify-between gap-8">
      <div className="w-full md:w-5/12 flex flex-col items-center md:items-end h-full">
        <img
          src={profilePhoto}
          alt="About Me"
          className="w-72 h-96 md:w-80 lg:w-96 object-cover rounded-lg shadow-lg"
        />
      </div>

      {/* Højre: Tekst */}
      <div className="w-full md:w-7/12 text-center md:text-left relative">
        <h2 className="text-3xl md:text-5xl font-bold leading-tight mb-4 pl-10">
          A Passionate Software Developer
        </h2>

        <p className="text-amber-400 mb-6 text-sm md:text-base leading-relaxed max-w-2xl mx-auto md:mx-0 whitespace-pre-line">
          {`Brugernavn: ${userName}
            Email: ${email}
            Oprettet: ${createdAt}
            Antal afsendte beskeder: ${totalMessages}
            Level: ${level}
            Fun fact: ${aboutMe}`}
        </p>
      </div>

      <div className="absolute bottom-8 right-8 flex gap-4">
        <button type="submit" className="custom-info-button">
          Opdater profilbillede
        </button>
        <div className="flex flex-col items-start">
          <button type="submit" className="custom-info-button">
            Opdater dit fun fact
          </button>
        </div>
      </div>
    </section>
  );
};
