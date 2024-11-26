import { useState } from "react";
import { Message } from "./types";
import MessageBox from "./components/message-box.tsx";
import Menu from "./components/menu.tsx";
import { ThemeProvider } from "@/components/theme-provider.tsx";

function App() {
  const [messages, setMessages] = useState<Message[]>([]);

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <main className="bg-muted/40 min-h-svh flex justify-center antialiased">
        <Menu setMessages={setMessages} />

        <div className="sm:w-96 w-full sm:border-x p-2 bg-background min-h-full flex flex-col gap-0.5">
          {messages.map((item, index) => (
            <>
              {item.content.length > 0 && (
                <MessageBox
                  key={index}
                  message={item}
                  isFirst={
                    index === 0 || messages[index - 1]?.sender !== item.sender
                  }
                  isLast={
                    index === messages.length - 1 ||
                    messages[index + 1]?.sender !== item.sender
                  }
                />
              )}
            </>
          ))}
        </div>
      </main>
    </ThemeProvider>
  );
}

export default App;
