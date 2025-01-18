import React, { useEffect } from "react";
import { useChatStore } from "../store/useChatStore";
import ChatHeader from "./ChatHeader";
import MessageInput from "./MessageInput";
import MessageSkeleton from "./skaletons/MessageSkeleton";
import { useAuthStore } from "../store/useAuthStore";

export default function ChatContainer() {
  const { authUser } = useAuthStore();
  const { messages, getMessages, isMessageLoading, selectedUser } =
    useChatStore();
  console.log(messages);

  useEffect(() => {
    getMessages(selectedUser._id);
  }, [selectedUser._id, getMessages]);
  console.log(selectedUser._id);

  if (isMessageLoading)
    return (
      <div className="flex flex-1 flex-col overflow-auto">
        <ChatHeader />
        <MessageSkeleton />
        <MessageInput />
      </div>
    );

  return (
    <div className="flex flex-1 flex-col overflow-auto">
      <ChatHeader />
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message._id}
            className={`chat ${
              message.senderId === authUser._id ? "chat-end" : "chat-start"
            }`}
          >
            <div className="avatar chat-image">
              <div className="size-10 rounded-full border">
                <img
                  src={
                    message.senderId === authUser._id
                      ? authUser.profilePic ||
                        "https://thumbs.dreamstime.com/b/tashkent-uzbekistan-september-super-mario-world-bros-pixelated-retro-video-game-characters-pixel-art-vector-illustration-old-239815848.jpg"
                      : selectedUser.profilePic ||
                        "https://thumbs.dreamstime.com/b/tashkent-uzbekistan-september-super-mario-world-bros-pixelated-retro-video-game-characters-pixel-art-vector-illustration-old-239815848.jpg"
                  }
                  alt="profile pic"
                />
              </div>
            </div>
            <div className="chat-header mb-1">
              <time className="text-xs opacity-50 ml-1">
                {message.createdAt}
              </time>
            </div>
            <div className="flex flex-col chat-bubble">
              {message.image && (
                <img
                  src={message.image}
                  alt="Attachment"
                  className="sm:max-w-[200] rounded-md mb-2"
                />
              )}
              {message.text && <p>{message.text}</p>}
            </div>
          </div>
        ))}
      </div>
      <MessageInput />
    </div>
  );
}
