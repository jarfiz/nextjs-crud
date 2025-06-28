import Note from "@/types/Note";
import dateFormat from "@/utils/dateFormat";
import { SquarePen, Trash } from "lucide-react";

export default async function Card({}) {
  const res = await fetch("http://localhost:3000/api/notes");
  const notes = await res.json();

  return (
    <>
      {notes?.map((note: Note) => (
        <div key={note.id} className="outline p-4 space-y-0.5 relative">
          <time className="text-xs text-gray-600 block">
            {dateFormat(note.createdAt)}
          </time>
          <div className="space-y-2.5 pb-8">
            <h1 className="text-xl font-semibold text-gray-800">
              {note.title}
            </h1>
            <p className="text-sm text-gray-700 line-clamp-10">
              {note.content}
            </p>
          </div>
          <div className="flex items-center absolute right-3 bottom-1 space-x-1">
            <Trash className="size-5 cursor-pointer hover:text-red-500 duration-200 hover:-translate-y-0.5 hover:scale-110" />
            <span className="text-2xl text-gray-400 select-none">|</span>
            <SquarePen className="size-5 cursor-pointer hover:text-green-500 duration-200 hover:-translate-y-0.5 hover:scale-110" />
          </div>
        </div>
      ))}
    </>
  );
}
