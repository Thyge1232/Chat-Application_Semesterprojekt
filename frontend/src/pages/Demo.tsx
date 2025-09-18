import { Button } from "../ui/Button";
import { Title } from "../ui/Title";

export const DemoComponent = () => {
  return (
    <>
      <Title>WhoseApp</Title>
      <div className="flex flex-col items-center space-y-4">
        <h1 className="text-xl">bigger text AGAIN again</h1>
        <p className="font-mono text-orange-500">
          velkommen til vores CHAT APP hehehe 😝
        </p>
        <Button className="w-40">en SEJ KNAP</Button>
      </div>
    </>
  );
};
