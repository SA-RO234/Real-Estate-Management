"use client";
import { useEffect, useState } from "react";
import { Search, Settings, Send } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar } from "@/components/ui/avatar";
import { cn } from "@/app/lib/utils/utils";
import axios from "axios";
const AdminID = 13;
const ChatInterface = ({ ClientID }: { ClientID: number }) => {
  const [conversations, setConversations] = useState<any[]>([]); // Ensure initial state is an array
  const [activeChat, setActiveChat] = useState<any>(null);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchConversations = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/app/api/messages.php?admin_id=${AdminID}&client_id=${ClientID}`
        );
        // console.log("API Response:", response.data);

        if (response.data.success && response.data.data) {
          const conversation = response.data.data;

          // Convert messages object to an array
          const messagesArray = Object.values(conversation.messages);

          // Update the conversation object with the messages array
          const updatedConversation = {
            ...conversation,
            messages: messagesArray,
          };

          setConversations([updatedConversation]); // Wrap in an array
          setActiveChat(updatedConversation); // Set as the active chat
        } else {
          console.error("Unexpected API response format:", response.data);
        }
      } catch (error) {
        console.error("Error fetching conversations:", error);
      }
    };
    fetchConversations();
  }, [ClientID]);
  const handleConversationClick = (conversation: any) => {
    setActiveChat(conversation);
  };
  const handleSendMessage = async () => {
    if (!message.trim()) return;

    try {
      const newMessage = {
        id: Date.now(),
        sender_role: "admin",
        content: message,
        time: new Date().toLocaleTimeString(),
        avatar: activeChat?.avatar,
      };

      setActiveChat((prev: any) => ({
        ...prev,
        messages: [...(prev?.messages || []), newMessage], // Ensure messages array exists
      }));

      setMessage("");

      await axios.post("http://localhost:3000/app/api/sendMessage.php", {
        admin_id: AdminID,
        client_id: ClientID,
        content: message,
      });
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  // console.log(activeChat);

  return (
    <div className="flex w-full h-full bg-white">
      {/* Left sidebar - Conversation list */}
      <div className="w-80 border-r flex flex-col">
        <div className="p-3 border-b">
          <div className="relative">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search..."
              className="pl-8 bg-gray-100 border-0"
            />
          </div>
        </div>
        <div className="flex-1 overflow-auto">
          {Array.isArray(conversations) && conversations.length > 0 ? (
            conversations.map((conversation: any) => (
              <div
                key={conversation.id}
                className={cn(
                  "flex items-center gap-3 p-3 cursor-pointer hover:bg-gray-50",
                  activeChat?.id === conversation.id && "bg-gray-50"
                )}
                onClick={() => handleConversationClick(conversation)}
              >
                <Avatar className="h-10 w-10">
                  <img
                    src={conversation.avatar}
                    alt={conversation.name}
                    className="h-full w-full object-cover"
                  />
                </Avatar>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-center">
                    <span className="font-medium text-sm">
                      {conversation.name}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {conversation.time}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground truncate">
                    {conversation.lastMessage}
                  </p>
                </div>
              </div>
            ))
          ) : (
            <p className="p-3 text-sm text-muted-foreground">
              No conversations available.
            </p>
          )}
        </div>
      </div>

      {/* Right side - Chat area */}
      <div className="flex-1 flex flex-col">
        {/* Chat header */}
        {activeChat && (
          <div className="p-3 border-b flex justify-between items-center">
            <div className="flex items-center gap-3">
              <Avatar className="h-10 w-10">
                <img
                  src={activeChat.avatar}
                  alt={activeChat.name}
                  className="h-full w-full object-cover"
                />
              </Avatar>
              <div>
                <div className="font-medium">{activeChat.name}</div>
                <div className="text-xs text-muted-foreground">
                  {activeChat.isActive ? "Online" : "Offline"}
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="icon" className="rounded-full">
                <Search className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" className="rounded-full">
                <Settings className="h-5 w-5" />
              </Button>
            </div>
          </div>
        )}

        {/* Messages area */}
        <div className="flex-1 overflow-auto p-4 space-y-4">
          {activeChat?.messages?.map((msg: any) => (
            <div
              key={msg.id}
              className={cn(
                "flex gap-3",
                msg.sender_role === "admin" && "justify-end" // Admin messages on the right
              )}
            >
              {msg.sender_role === "buyer" && ( // Client avatar on the left
                <Avatar className="h-8 w-8 mt-1">
                  <img
                    src={msg.avatar}
                    alt="Client"
                    className="h-full w-full object-cover"
                  />
                </Avatar>
              )}
              <div
                className={cn(
                  "max-w-[70%] space-y-1",
                  msg.sender_role === "admin" && "order-1" // Admin messages on the right
                )}
              >
                <div
                  className={cn(
                    "p-3 rounded-lg",
                    msg.sender_role === "admin"
                      ? "bg-blue-100 text-gray-800" // Admin message styling
                      : "bg-gray-100 text-gray-800" // Client message styling
                  )}
                >
                  <p>{msg.content}</p>
                </div>
                <div
                  className={cn(
                    "text-xs text-muted-foreground",
                    msg.sender_role === "admin" ? "text-right" : "text-left" // Adjust timestamp alignment
                  )}
                >
                  {msg.time}
                </div>
              </div>
              {msg.sender_role === "admin" && ( // Admin avatar on the right
                <Avatar className="h-8 w-8 mt-1">
                  <img
                    src={msg.avatar}
                    alt="Admin"
                    className="h-full w-full object-cover"
                  />
                </Avatar>
              )}
            </div>
          ))}
        </div>
        {/* Message input */}
        <div className="p-3 border-t flex items-center gap-2">
          <Input
            placeholder="Type a message"
            className="flex-1"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <Button
            className="rounded-full bg-blue-500 hover:bg-blue-600"
            onClick={handleSendMessage}
          >
            <Send className="h-5 w-5" />
            <span className="ml-1">Send</span>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ChatInterface;
