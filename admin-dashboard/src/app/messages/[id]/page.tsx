"use client";

import ChatInterface from "@/components/chatInterface";
import { useParams } from "next/navigation";

const MessageDetail = () => {
  const { id } = useParams();

  // Ensure id is a valid number
  const clientID = typeof id === "string" ? parseInt(id, 10) : null;
  if (clientID === null || isNaN(clientID)) {
    return <div>Error: Invalid Client ID</div>;
  }
  return (
    <>
      <ChatInterface ClientID={clientID} />
    </>
  );
};

export default MessageDetail;
