export const ProfileImage = ({ src }: { src: string }) => (
  <div className="w-full md:w-5/12 flex justify-center md:justify-end">
    <img
      src={src}
      alt="User Avatar"
      className="max-w-xs md:max-w-sm lg:max-w-md aspect-[3/4] object-scale-down rounded-lg shadow-lg"
    />
  </div>
);
