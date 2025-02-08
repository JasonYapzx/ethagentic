"use client";

import type React from "react";
import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Bot, Send, User, Activity } from "lucide-react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { atomDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import ReactMarkdown from "react-markdown";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { createClient } from "@supabase/supabase-js";
import { getUserId } from "./utils";
import MqttPublisher from "./mqtt";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || "",
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ""
);

const userId = getUserId();

interface Message {
  text: string;
  isUser: boolean;
  isStreaming?: boolean;
  isAggregated?: boolean;
}

const ChatPage: React.FC = () => {
  const [input, setInput] = useState("");
  const [showAnalysis, setShowAnalysis] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const { theme } = useTheme();

  useEffect(() => {
    const fetchMessages = async () => {
      // 1. Fetch the user-sent messages
      const { data: userMessages, error: userError } = await supabase
        .from("ai_messages")
        .select("content, created_at")
        .eq("user_id", userId)
        .order("created_at", { ascending: true });

      // 2. Fetch the AI replies
      const { data: aiMessages, error: aiError } = await supabase
        .from("ai_messages_replies")
        .select("content, created_at")
        .eq("user_id", userId)
        .order("created_at", { ascending: true });

      // Handle any errors
      if (userError) {
        console.error("Error fetching user messages:", userError.message);
      }
      if (aiError) {
        console.error("Error fetching AI messages:", aiError.message);
      }

      // 3. Combine and sort
      if (userMessages && aiMessages) {
        // Mark each message with who sent it
        const userMessagesMarked = userMessages.map((msg) => ({
          text: msg.content,
          createdAt: new Date(msg.created_at),
          isUser: true,
        }));

        const aiMessagesMarked = aiMessages.map((msg) => ({
          text: msg.content,
          createdAt: new Date(msg.created_at),
          isUser: false,
        }));

        // Combine in a single array
        const combined = [...userMessagesMarked, ...aiMessagesMarked];

        // Sort by `createdAt`
        combined.sort((a: any, b: any) => a.createdAt - b.createdAt);

        // 4. Update state
        setMessages(combined);
      }
    };

    fetchMessages();
  }, [userId]);
  const isAggregatableMessage = (text: string) => {
    try {
      return (
        text.startsWith("400") || text.startsWith("Error") || JSON.parse(text)
      );
    } catch {
      return false;
    }
  };

  useEffect(() => {
    const channel = supabase
      .channel("ai_messages")
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "ai_messages_replies",
          filter: `user_id=eq.${userId}`,
        },
        (payload) => {
          const { new: newMessage } = payload;
          setMessages((prev) => {
            if (isAggregatableMessage(newMessage.content)) {
              const nonAggregatedMessages = prev.filter(
                (msg) => !msg.isAggregated
              );
              return [
                ...nonAggregatedMessages,
                { text: "Thinking...", isUser: false, isAggregated: true },
              ];
            }
            return [...prev, { text: newMessage.content, isUser: false }];
          });
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [userId]);

  const handleShowAnalysis = () => {
    setShowAnalysis(!showAnalysis);
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = async () => {
    if (input.trim()) {
      setMessages((prev) => [...prev, { text: input, isUser: true }]);

      // Insert the message into Supabase
      const result = await supabase
        .from("ai_messages")
        .insert({ content: input, user_id: userId });

      console.log(result);

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

  const handleProceedWithRestock = () => {
    console.log("Proceeding with restock...");
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
    if (
      isJSON(message.text) ||
      message.text.startsWith("Error") ||
      message.text.startsWith("400") ||
      message.text.startsWith("409")
    ) {
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

  return (
    <div className="flex flex-col h-screen bg-background">
      <div className="flex-1 overflow-hidden">
        <div className="h-full overflow-y-auto p-4 max-w-3xl mx-auto">
          <div className="space-y-4 pb-36 w-full">
            {messages.map((msg, idx) => {
              if (msg.text === "restock-confirmation") {
                return (
                  <div
                    key={idx}
                    className="flex items-center space-x-2 text-muted-foreground"
                  >
                    <Bot className="h-6 w-6" />
                    <MqttPublisher />
                  </div>
                );
              }
              return (
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
                          <User
                            className={`w-5 h-5 ${
                              theme === "dark" ? "text-white" : "text-black"
                            } `}
                          />
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
                        {msg.isStreaming && (
                          <span className="animate-pulse">▊</span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
            <div ref={messagesEndRef} />
          </div>
        </div>
      </div>
      <div className="fixed bottom-0 left-0 right-0 bg-gradient-to-t from-background to-background/80 p-6">
        <div className="max-w-3xl mx-auto border border-gray-300 focus:ring-0 focus:outline-none">
          <div className="relative border-gray-300 focus:ring-0 focus:outline-none">
            <Textarea
              ref={textareaRef}
              value={input}
              placeholder="What would you like to check?"
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
              className="min-h-[100px] rounded-none max-h-[200px] w-full resize-none border-0 bg-transparent px-3 py-2 pb-10 text-base focus:outline-none focus:ring-0"
              rows={1}
            />
            <div className="absolute bottom-0 pb-2 flex w-full justify-between px-3 z-50 bg-gradient-to-t from-background to-background/80">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      onClick={handleShowAnalysis}
                      variant="ghost"
                      size="icon"
                      className={`h-8 w-8 ${
                        showAnalysis ? "text-primary" : "text-muted-foreground"
                      }`}
                    >
                      <Activity className="h-4 w-4" />
                      <span className="sr-only">Toggle analysis</span>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent side="top">
                    <p>Toggle analysis view</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
              <Button
                onClick={sendMessage}
                size="icon"
                variant={input ? "default" : "ghost"}
                className={cn(
                  "h-8 w-8",
                  input
                    ? "hover:text-white"
                    : "text-muted-foreground hover:text-primary"
                )}
                disabled={!input.trim()}
              >
                <Send className="h-4 w-4" />
                <span className="sr-only">Send message</span>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatPage;
