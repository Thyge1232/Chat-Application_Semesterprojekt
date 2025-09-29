import { Button } from "../ui/Button";
import { Title } from "../ui/Title";

export const Demo = () => {
  const list = [1,2]

  const newList = list.map(item => item + 1)


  return (
    <>
      <Title>WhoseApp</Title>
      <div className="flex flex-col items-center space-y-4">
        <h1 className="text-xl">biggertext AGAIN again</h1>
        <p className="font-mono text-red-600">
          velkommen til vores CHAT APP hehehe 😝
          {newList}
        </p>
        <Button className="w-4">en SEJ KNAP</Button>
      </div>
    </>
  );
};
