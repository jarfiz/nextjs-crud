"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { toast } from "sonner";
import { SquarePen, Trash } from "lucide-react";

import Note from "@/types/Note";
import { URL } from "@/utils/config";
import dateFormat from "@/utils/dateFormat";

export default function Card({}) {
  const [notes, SetNotes] = useState([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    const getNote = async () => {
      try {
        setIsLoading(true);
        const res = await fetch(`${URL}/notes`, { cache: "force-cache" });
        const data = await res.json();
        SetNotes(data);
      } catch (error) {
        toast.error("Unable to load notes. Please try again.");
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };
    getNote();
  }, []);

  if (isLoading)
    return (
      <h1 className="text-3xl text-center mt-40">Fetching all notes...</h1>
    );

  const handleClick = (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <>
      {notes?.map((note: Note) => (
        <Link
          href={`/notes/${note.id}`}
          key={note.id}
          className="outline p-4 space-y-0.5 relative"
        >
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
          <div
            className="flex items-center absolute right-3 bottom-1 space-x-1"
            onClick={handleClick}
          >
            <Trash className="size-5 cursor-pointer hover:text-red-500 duration-200 hover:-translate-y-0.5 hover:scale-110" />
            <span className="text-2xl text-gray-400 select-none">|</span>
            <SquarePen className="size-5 cursor-pointer hover:text-green-500 duration-200 hover:-translate-y-0.5 hover:scale-110" />
          </div>
        </Link>
      ))}
    </>
  );
}
