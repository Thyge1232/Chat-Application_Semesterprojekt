import { useUserById } from "../hooks/useUserById.ts";

export type UserProps = {
  userId: number;
  userName: string;
  email: string;
  profilePhoto?: string;
  totalMessages: number;
  level: number;
  aboutMe: string;
};

export const Banner = ({
  userId,
  userName,
  email,
  profilePhoto,
  totalMessages,
  level,
  aboutMe,
}: UserProps) => {
  profilePhoto = "../public/Images/user.png";
  return (
    <>
      <section className="min-h-screen bg-primary text-white py-16 px-6 flex flex-col md:flex-row items-center justify-between gap-8">
        {/* <!-- Left Side: Image --> */}
        <div className="w-full md:w-5/12 flex justify-center h-full md:justify-end">
          <img
            src={profilePhoto}
            alt="About Me"
            className="w-72 h-96 md:w-80 lg:w-96 object-cover rounded-lg shadow-lg"
          />
        </div>

        {/* <!-- Right Side: Text Content --> */}
        <div className="w-full md:w-7/12 text-center md:text-left relative">
          {/* <!-- Vertical Text --> */}
          <div className="absolute left-[40%] -top-6 md:-left-16  lg:top-0 md:top-6 rotate-0 md:rotate-[-90deg] text-sm tracking-widest">
            <div className="flex items-center justify-center gap-2">
              <div className="w-16 h-[2px] bg-white"></div>
              <p>MORE ABOUT</p>
            </div>
          </div>

          {/* <!-- Main Heading --> */}
          <h2 className="text-3xl md:text-5xl font-bold leading-tight mb-4 pl-10">
            A Passionate Software Developer
          </h2>

          {/* <!-- Description --> */}
          <p className="text-amber-400 mb-6 text-sm md:text-base leading-relaxed max-w-2xl mx-auto md:mx-0">
            {aboutMe}. Min email er {email} og mit brugernavn er {userName}. Jeg
            har skrevet {totalMessages} beskeder, og derfor er jeg i level{" "}
            {level}
          </p>

          {/* <!-- Buttons --> */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
            <a
              href="#"
              className="bg-tertiary text-white font-semibold py-2 px-4 rounded-lg hover:bg-tertiary/80 text-center"
            >
              See Projects
            </a>
            <a
              href="#"
              className="border border-tertiary text-white font-semibold py-2 px-4 rounded-lg hover:bg-tertiary/10 text-center"
            >
              More Details
            </a>
          </div>
        </div>
      </section>
    </>
  );
};
