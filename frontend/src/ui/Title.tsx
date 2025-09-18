interface TitleProps {
  title: string;
}

export const Title = ({ title }: TitleProps) => {
  return <h1 className="m-5 text-center font-sans text-5xl">{title}</h1>;
};
