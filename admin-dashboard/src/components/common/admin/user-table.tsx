"use client";

import { useState } from "react";
import { Pencil, Trash2 } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export default function UserTable({users}:any) {
     
  const handleEdit = (id: number) => {
    // Implement edit functionality
    console.log(`Edit user with ID: ${id}`);
  };

  const handleDelete = (id: number) => {
    // Implement delete functionality
  };

  return (
    <Card className="shadow-md">
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[80px] text-center text-[15px] font-bold">
                ID
              </TableHead>
              <TableHead className="text-center text-[15px] font-bold">
                Name
              </TableHead>
              <TableHead className="text-center text-[15px] font-bold">
                Profile
              </TableHead>
              <TableHead className="text-center text-[15px] font-bold">
                Email
              </TableHead>
              <TableHead className="text-center text-[15px] font-bold">
                Phone
              </TableHead>
              <TableHead className="text-center text-[15px] font-bold">
                Status
              </TableHead>
              <TableHead className="text-center text-[15px] font-bold">
                Create At
              </TableHead>
              <TableHead className="text-center text-[15px] font-bold">
                Action
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.map((user: any) => (
              <TableRow key={user.id} className="border-t border-gray-200">
                <TableCell className="text-center">{user.id}</TableCell>
                <TableCell className="text-center">{user.name}</TableCell>
                <TableCell className="text-center flex justify-center">
                  <img
                    src={user.avatar}
                    className="w-[50px]  h-[50px] object-cover rounded-full"
                    alt=""
                  />
                </TableCell>
                <TableCell className="text-center">{user.email}</TableCell>
                <TableCell className="text-center">{user.phone}</TableCell>
                <TableCell className="text-center">{user.online}</TableCell>
                <TableCell className="text-center">{user.created_at}</TableCell>
                <TableCell>
                  <div className="flex justify-center gap-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleEdit(user.id)}
                      aria-label="Edit"
                    >
                      <Pencil className="h-4 w-4 text-gray-500" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleDelete(user.id)}
                      aria-label="Delete"
                    >
                      <Trash2 className="h-4 w-4 text-gray-500" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </Card>
  );
}
