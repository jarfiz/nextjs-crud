"use client";

import { URL } from "@/utils/config";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export function DeleteButton({
  children,
  id,
  onDelete,
}: {
  children: React.ReactNode;
  id: string;
  onDelete?: () => Promise<void>;
}) {
  const router = useRouter();

  const handleDelete = async () => {
    try {
      const confirmed = confirm(
        "Are you sure you want to delete this note? This action cannot be undone."
      );

      if (confirmed) {
        await fetch(`${URL}/notes/${id}`, {
          method: "DELETE",
        });
        toast.success("Note deleted successfully");

        if (onDelete) {
          await onDelete();
        } else {
          router.prefetch("/");
        }
      }
    } catch (error) {
      toast.error("Failed to delete note");
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
