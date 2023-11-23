import React, { useContext, useRef } from "react";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import { Send } from "lucide-react";
import { ChatContext } from "./ChatContext";

interface Props {
  isDisabled?: boolean;
}

const ChatInput = ({ isDisabled }: Props) => {
  const { addMessage, handleInputChange, isLoading, message } =
    useContext(ChatContext);

  const textareaRef = useRef<HTMLTextAreaElement>(null);

  return (
    <div className="absolute bottom-0 left-0 w-full">
      <div className="mx-2 flex flow-row gap-3 md:mx-4 md:last:mb-6 lg:mx-auto lg:max-w-2xl xl:max-w-3xl">
        <div className="relative flex h-full flex-1 items-stretch md:flex-col">
          <div className="flex relative flex-col w-full flex-grow p-4">
            <div className="relative">
              <Textarea
                ref={textareaRef}
                className="resize-none pr-12 text-base py-3 scroll-thumb-blue scrollbar-thumb-rounded scrollbar-track-blue-lighter scrollbar-w-2 scrolling-touch"
                placeholder="Enter your question..."
                rows={1}
                maxRows={4}
                autoFocus
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    addMessage();
                    textareaRef.current?.focus();
                  }
                }}
                onChange={handleInputChange}
                value={message}
              />

              <Button
                disabled={isLoading || isDisabled}
                aria-label="send message"
                className="absolute bottom-1.5 right-[8px]"
                onClick={() => {
                  addMessage();
                  textareaRef.current?.focus();
                }}
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatInput;