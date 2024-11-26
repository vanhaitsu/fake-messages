import { FC, useEffect, useRef, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog.tsx";
import { Button } from "@/components/ui/button.tsx";
import {
  ArrowUpDown,
  Info,
  Lightbulb,
  MessageCircle,
  Pencil,
  Trash,
} from "lucide-react";
import { Textarea } from "@/components/ui/textarea.tsx";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert.tsx";
import { Message } from "@/types";
import { ModeToggle } from "@/components/mode-toggle.tsx";

interface EditMessagesDialogProps {
  setMessages: (messages: Message[]) => void;
}

const template = "Left: Hey, long time no see!\n" + "Right: How are you, bro?";

const Menu: FC<EditMessagesDialogProps> = ({ setMessages }) => {
  const [messagesString, setMessagesString] = useState<string>(template);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const addMessage = (sender: "Left" | "Right") => {
    setMessagesString((prev) => `${prev}\n${sender}: `.trimStart());
    inputRef.current?.focus();
  };

  useEffect(() => {
    const data: Message[] = messagesString
      .trim()
      .split("\n")
      .map((line) => {
        const [sender, ...contentArr] = line.split(":");
        const content = contentArr.join(":").trim();

        return {
          sender: sender.trim() === "Right" ? "Right" : "Left",
          content,
        };
      });

    setMessages(data);
  }, [messagesString, setMessages]);

  return (
    <div className="grid gap-2 absolute right-2 bottom-2 sm:right-6 sm:bottom-6">
      <Dialog>
        <DialogTrigger asChild>
          <Button size="icon">
            <Pencil className="size-4" />
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit messages</DialogTitle>
          </DialogHeader>

          <Alert>
            <Lightbulb className="size-4" />
            <AlertTitle>How to use?</AlertTitle>
            <AlertDescription className="whitespace-pre-wrap">
              Left: Hey, long time no see!&#10;Right: How are you,
              bro?&#10;Right: https://image-url.com{" "}
              <span className="font-medium">(image must start with http)</span>
              <p
                onClick={() => setMessagesString(template)}
                className="text-primary cursor-pointer hover:underline flex gap-1 items-center w-fit"
              >
                Try this template
                <ArrowUpDown className="size-3" />
              </p>
            </AlertDescription>
          </Alert>

          <Textarea
            placeholder="Enter your messages"
            ref={inputRef}
            value={messagesString}
            onChange={(e) => setMessagesString(e.target.value)}
            className="h-80 resize-none"
          />

          <div className="flex gap-2">
            <Button
              variant="secondary"
              onClick={() => addMessage("Left")}
              className="w-full"
            >
              <MessageCircle className="size-4" /> Left
            </Button>

            <Button onClick={() => addMessage("Right")} className="w-full">
              <MessageCircle className="size-4 scale-x-[-1]" /> Right
            </Button>
          </div>

          <DialogFooter>
            <Button
              variant="destructive"
              onClick={() => setMessagesString("")}
              className="w-full"
            >
              <Trash className="size-4" /> Clear
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <ModeToggle />

      <Dialog>
        <DialogTrigger asChild>
          <Button size="icon" variant="outline">
            <Info className="size-4" />
          </Button>
        </DialogTrigger>

        <DialogContent>
          <DialogHeader>
            <DialogTitle>Fake Messages - About</DialogTitle>
            <DialogDescription>Made by vanhaiツ</DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Menu;
