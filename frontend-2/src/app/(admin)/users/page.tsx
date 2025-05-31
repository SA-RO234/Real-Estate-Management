"use client"
import React, { useEffect, useState } from "react";
import UserTable from "@/components/common/admin/user-table";
import axios from "axios";
interface User {
  id: number;
  name: string;
  avatar: string;
  email: string;
  phone: number;
  status: boolean;
  create_at: string;
}

const UsersPage = () => {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(()=>{
      const fetchuser = async ()=>{
        try {
          const response = await axios.get(
            "http://localhost:3000/app/api/users.php?role=buyer"
          );
          setUsers(response.data);
        } catch (error) {
          console.error("Failed to fetch users: ",error);
        }
      }
      fetchuser();
  },[]);
  return (
    <div>
      <h2 className="text-3xl font-semibold pb-[20px] tracking-tight transition-colors">
        Customer Management
      </h2>
      <UserTable users={users} />
    </div>
  );
};

export default UsersPage;
