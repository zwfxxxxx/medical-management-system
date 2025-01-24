import Markdown from "react-markdown";
import Image from "next/image";

const ChatCard = ({ role, content }: { role: string; content: string }) => {
  const isHuman = role === "user";
  return (
    <div
      className={`flex gap-4 items-start p-3 ${isHuman && "flex-row-reverse max-w-[75%] self-end"}`}
    >
      <Image
        src={isHuman ? "/assets/icons/human.svg" : "/assets/icons/gpt.svg"}
        alt="head"
        width={40}
        height={40}
      />
      <div className={`${isHuman && "bg-gray-600 p-3 rounded-lg"}`}>
        <Markdown>{content}</Markdown>
      </div>
    </div>
  );
};

export default ChatCard;
