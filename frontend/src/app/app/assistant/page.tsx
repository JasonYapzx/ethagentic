"use client";

import type React from "react";
import { useState, useEffect, useRef } from "react";
import io from "socket.io-client";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Bot, Send, User, Activity } from "lucide-react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { atomDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import ReactMarkdown from "react-markdown";
import { atomOneLight } from "react-syntax-highlighter/dist/esm/styles/hljs";
import { useTheme } from "next-themes";

const socket = io("http://localhost:5001");

interface Message {
  text: string;
  isUser: boolean;
  isStreaming?: boolean;
}

const ChatPage: React.FC = () => {
  const [input, setInput] = useState("");
  const [showAnalysis, setShowAnalysis] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const { theme } = useTheme();

  useEffect(() => {
    socket.on("agent-response", (data: string) => {
      setMessages((prev) => {
        const lastMessage = prev[prev.length - 1];
        if (lastMessage && lastMessage.isStreaming) {
          const updatedMessages = [...prev.slice(0, -1)];
          updatedMessages.push({
            ...lastMessage,
            text: lastMessage.text + data,
            isStreaming: false,
          });
          return updatedMessages;
        } else {
          return [...prev, { text: data, isUser: false, isStreaming: false }];
        }
      });
    });

    socket.on("agent-stream", (data: string) => {
      setMessages((prev) => {
        const lastMessage = prev[prev.length - 1];
        if (lastMessage && lastMessage.isStreaming) {
          const updatedMessages = [...prev.slice(0, -1)];
          updatedMessages.push({
            ...lastMessage,
            text: lastMessage.text + data,
          });
          return updatedMessages;
        } else {
          return [...prev, { text: data, isUser: false, isStreaming: true }];
        }
      });
    });

    socket.on("agent-error", (error: string) => {
      setMessages((prev) => [...prev, { text: error, isUser: false }]);
    });

    return () => {
      socket.off("agent-response");
      socket.off("agent-stream");
      socket.off("agent-error");
    };
  }, []);

  const handleShowAnalysis = () => {
    setShowAnalysis(!showAnalysis);
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []); // Removed unnecessary dependency: [messages]

  const sendMessage = () => {
    if (input.trim()) {
      setMessages((prev) => [...prev, { text: input, isUser: true }]);
      socket.emit("user-message", input);
      setInput("");
      if (textareaRef.current) {
        textareaRef.current.style.height = "auto";
      }
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInput(e.target.value);
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  };

  const isJSON = (str: string) => {
    try {
      JSON.parse(str);
      return true;
    } catch (e) {
      return false;
    }
  };

  const formatMessage = (message: Message) => {
    if (isJSON(message.text)) {
      return showAnalysis ? (
        <SyntaxHighlighter
          language="json"
          style={atomDark}
          wrapLines={true}
          wrapLongLines={true}
        >
          {JSON.stringify(JSON.parse(message.text), null, 2)}
        </SyntaxHighlighter>
      ) : (
        "..."
      );
    } else {
      return (
        <ReactMarkdown
          className={`prose ${
            theme === "dark" ? "prose-invert text-white" : "text-gray-900"
          }`}
          components={{
            h1: ({ node, ...props }) => (
              <h1 className="text-lg font-bold my-2" {...props} />
            ),
            h2: ({ node, ...props }) => (
              <h2 className="text-base font-semibold my-1" {...props} />
            ),
            p: ({ node, ...props }) => (
              <p className="my-1 leading-normal" {...props} />
            ),
            ul: ({ node, ...props }) => (
              <ul className="list-disc ml-4 my-1" {...props} />
            ),
            li: ({ node, ...props }) => <li className="my-0.5" {...props} />,
          }}
        >
          {message.text}
        </ReactMarkdown>
      );
    }
  };
  // const formatMessage = (message: Message) => {
  //   return (
  //     <ReactMarkdown
  //       className={`prose ${
  //         theme === "dark" ? "prose-invert text-white" : "text-gray-900"
  //       }`}
  //       components={{
  //         h1: ({ node, ...props }) => (
  //           <h1 className="text-lg font-bold my-2" {...props} />
  //         ),
  //         h2: ({ node, ...props }) => (
  //           <h2 className="text-base font-semibold my-1" {...props} />
  //         ),
  //         p: ({ node, ...props }) => (
  //           <p className="my-1 leading-normal" {...props} />
  //         ),
  //         ul: ({ node, ...props }) => (
  //           <ul className="list-disc ml-4 my-1" {...props} />
  //         ),
  //         li: ({ node, ...props }) => (
  //           <li className="my-0.5" {...props} />
  //         ),
  //       }}
  //     >
  //       {message.text}
  //     </ReactMarkdown>
  //   );
  // };

  return (
    <div className="flex flex-col h-screen bg-background">
      <div className="flex-1 overflow-hidden">
        <div className="h-full overflow-y-auto p-4 max-w-3xl mx-auto">
          <div className="space-y-4 pb-36">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`flex ${
                  msg.isUser ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`flex gap-3 max-w-[85%] ${
                    msg.isUser ? "flex-row-reverse" : "flex-row"
                  }`}
                >
                  <div
                    className={`w-8 h-8 flex items-center justify-center flex-shrink-0 ${
                      msg.isUser
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted text-muted-foreground"
                    }`}
                  >
                    {msg.isUser ? (
                      <div className="text-sm font-semibold">
                        <User className="w-5 h-5" />
                      </div>
                    ) : (
                      <Bot className="w-5 h-5" />
                    )}
                  </div>
                  <div
                    className={`px-4 py-2 text-sm overflow-hidden ${
                      msg.isUser
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted text-foreground"
                    }`}
                  >
                    <div className="break-words whitespace-pre-wrap">
                      {formatMessage(msg)}
                      {/* {msg.text} */}
                      {msg.isStreaming && (
                        <span className="animate-pulse">▊</span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
        </div>
      </div>
      <div className="fixed bottom-0 left-0 right-0 bg-gradient-to-t from-background to-background/80 p-6">
        <div className="max-w-3xl mx-auto">
          <div className="bg-gray-800 rounded-lg px-4 py-3 border border-gray-700">
            <div className="relative flex items-center gap-2">
              <Textarea
                ref={textareaRef}
                value={input}
                placeholder="What would you like to check?"
                onChange={handleInputChange}
                onKeyDown={handleKeyDown}
                className="flex-1 px-3 py-2 text-base bg-gray-900 text-white border-none rounded-md focus:outline-none focus:ring-0 resize-none"
                rows={1}
              />
              <Button
                onClick={sendMessage}
                size="icon"
                variant="ghost"
                className={`hover:cursor-pointer ${
                  !input.trim() ? "text-gray-400" : "text-white"
                }`}
                disabled={!input.trim()}
              >
                <Send className="w-5 h-5" />
                <span className="sr-only">Send message</span>
              </Button>
            </div>
            <div className="mt-3 flex justify-start">
              <Button
                onClick={handleShowAnalysis}
                className={`flex items-center gap-2 px-2 py-1 rounded-lg transition ${
                  showAnalysis
                    ? "bg-blue-500 text-white hover:bg-blue-400"
                    : "bg-gray-800 text-gray-500 hover:bg-gray-700 hover:text-white"
                }`}
              >
                <Activity
                  className={`${showAnalysis ? "text-white" : "text-gray-500"}`}
                />
                {showAnalysis && <span className="text-sm">Analysis</span>}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatPage;
