"use client";

import { URL } from "@/utils/config";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";

interface Note {
  title: string;
  content: string;
}

export default function EditForm({ id }: { id: string }) {
  const [note, setNote] = useState<Note>({ title: "", content: "" });
  const router = useRouter();


  useEffect(() => {
    const getNote = async () => {
      try {
        const res = await fetch(`${URL}/notes/${id}`);
        const data = await res.json();
        setNote(data);
      } catch (error) {
        console.log(error);
      }
    };
    getNote();
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);

    const title = String(formData.get("title"));
    const content = String(formData.get("content"));

    if (!title) return toast.error("Title is required.");
    if (!content) return toast.error("Content is required.");

    async function editNote() {
      try {
        await fetch(`${URL}/notes/${id}`, {
          method: "PUT",
          body: JSON.stringify({ title, content }),
        });

        toast.success("Note updated successfully!");
        router.push("/");
      } catch (error) {
        toast.error("Failed to update note. Please try again.");
        console.log(error);
      }
    }
    editNote();
  };

  return (
    <div className="max-w-7xl mx-auto px-4">
      <form onSubmit={handleSubmit} className="max-w-3xl mt-80 space-y-4">
        <div className="flex flex-col">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            name="title"
            id="title"
            defaultValue={note?.title}
            className="outline w-full rounded-sm py-2.5 pl-4"
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="content">Content</label>
          <textarea
            name="content"
            id="content"
            rows={10}
            defaultValue={note?.content}
            className="outline w-full rounded-sm py-2.5 pl-4"
          />
        </div>
        <button
          type="submit"
          className="bg-teal-500 hover:bg-teal-700 hover:-translate-0.5 text-teal-50 block w-full py-2 font-semibold rounded-sm duration-300 cursor-pointer"
        >
          Submit
        </button>
      </form>
    </div>
  );
}
