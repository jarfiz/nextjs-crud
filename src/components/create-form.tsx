"use client";

import { URL } from "@/utils/config";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function CreateForm() {
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);

    const title = String(formData.get("title"));
    const content = String(formData.get("content"));

    if (!title) return toast.error("Title is required.");
    if (!content) return toast.error("Content is required.");

    async function newNote() {
      try {
        await fetch(`${URL}/notes`, {
          method: "POST",
          body: JSON.stringify({ title, content }),
        });
        toast.success("Note created successfully!");
        router.push("/");
      } catch (error) {
        toast.error("Failed to create note. Please try again.");
        console.log(error);
      }
    }
    newNote();
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
            className="outline w-full rounded-sm py-2.5 pl-4"
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="content">Content</label>
          <textarea
            name="content"
            id="content"
            rows={10}
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
