"use client";

import { URL } from "@/utils/config";
import { useRouter } from "next/navigation";
import React from "react";
import { toast } from "sonner";

export function DeleteButton({
  children,
  id,
}: {
  children: React.ReactNode;
  id: string;
}) {
  const router = useRouter();

  const handleDelete = async () => {
    try {
      await fetch(`${URL}/notes/${id}`, {
        method: "DELETE",
        cache: "no-cache",
      });

      toast.success("Note deleted successfully");
      router.push("/");
    } catch (error) {
      toast.success("Failed to delete note");
      console.log(error);
    }
  };

  return <button onClick={handleDelete}>{children}</button>;
}

export function EditButton({
  children,
  id,
}: {
  children: React.ReactNode;
  id: string;
}) {
  const router = useRouter();

  const handleEdit = async () => {
    router.push(`/notes/edit/${id}`);
  };

  return (
    <button onClick={handleEdit} type="submit">
      {children}
    </button>
  );
}
