"use client"
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import MessagesProfile from "./messagesProfile";
import { useEffect, useState } from "react";
import axios from "axios";

const receiver_id = 12;
const sender_id = 13;
export interface Message {
  id: string;
  sender_name: string;
  admin_ID : Number;
  avatar: string;
  preview: string;
  send_at: string;
  is_read: boolean;
  receiver_id : Number;
  sender_id : Number;
  // online: 0;
}

export default function Messages() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [groupedMessages, setGroupedMessages] = useState<Message[]>([]);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await axios.get(
          `http://localhost/Real-Estate-Management/Backend/app/api/messages.php?action=admin-get-messages&sender_id=${sender_id}&receiver_id=${receiver_id}`
        );
        setMessages(response.data);

        // Group messages by sender and keep the latest message
        const grouped = Object.values(
          response.data.reduce(
            (acc: Record<string, Message>, message: Message) => {
              if (
                !acc[message.sender_name] ||
                new Date(message.send_at) >
                  new Date(acc[message.sender_name].send_at)
              ) {
                acc[message.sender_name] = message;
              }
              return acc;
            },
            {}
          )
        ) as Message[];
        setGroupedMessages(grouped);
      } catch (error) {
        console.error("Failed to fetch messages:", error);
      }
    };
    fetchMessages();
  }, [receiver_id, sender_id]);
   console.log("Data : "+messages);
  return (
    <div className="w-[30%] bg-white border-black border-5 rounded-lg shadow-sm p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-[30px] font-bold text-gray-800">New Messages</h2>
        <Link
          href="/messages"
          className="text-gray-500 hover:text-gray-700 text-sm flex items-center"
        >
          View all <ArrowUpRight className="ml-1 h-3 w-3" />
        </Link>
      </div>
      <div className="space-y-4">
        {groupedMessages.map((message) => (
          <Link
          key={message.id}
          className="flex flex-col gap-5"
          href={`/messages/${message.sender_id}`}
          >
            <MessagesProfile message={message}  />
          </Link>
        ))}
      </div>
    </div>
  );
}
