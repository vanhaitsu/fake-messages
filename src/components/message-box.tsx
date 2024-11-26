import { Message } from "@/types";
import { FC } from "react";

interface MessageBoxProps {
  message: Message;
  isFirst: boolean;
  isLast: boolean;
}

const MessageBox: FC<MessageBoxProps> = ({ message, isFirst, isLast }) => {
  return (
    <>
      {!message.content.startsWith("http") ? (
        <div
          className={`${
            message.sender === "Right"
              ? `bg-primary text-white ml-auto rounded-l-2xl rounded-r ${isFirst ? "rounded-tr-2xl" : ""} ${isLast ? "rounded-br-2xl" : ""}`
              : `bg-muted rounded-r-2xl rounded-l ${isFirst ? "rounded-tl-2xl" : ""} ${isLast ? "rounded-bl-2xl" : ""}`
          } ${isLast ? " mb-4" : ""} py-1.5 px-3 text-sm w-fit max-w-72`}
        >
          {message.content.trim()}
        </div>
      ) : (
        <img
          src={message.content}
          alt="image"
          className={`${
            message.sender === "Right"
              ? `ml-auto rounded-l-2xl rounded-r ${isFirst ? "rounded-tr-2xl" : ""} ${isLast ? "rounded-br-2xl" : ""}`
              : `rounded-r-2xl rounded-l ${isFirst ? "rounded-tl-2xl" : ""} ${isLast ? "rounded-bl-2xl" : ""}`
          } text-sm w-fit max-w-60 h-auto`}
        />
      )}
    </>
  );
};

export default MessageBox;
