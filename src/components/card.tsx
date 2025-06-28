"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { toast } from "sonner";

import Note from "@/types/Note";
import { URL } from "@/utils/config";
import dateFormat from "@/utils/dateFormat";
import ButtonCard from "@/components/button/button-card";

export default function Card({}) {
  const [notes, SetNotes] = useState([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const getNote = async () => {
    try {
      setIsLoading(true);
      const res = await fetch(`${URL}/notes`, {
        cache: "reload",
      });
      const data = await res.json();
      SetNotes(data);
    } catch (error) {
      toast.error("Unable to load notes. Please try again.");
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
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
          <div onClick={handleClick}>
            <ButtonCard id={note.id} onDelete={getNote} />
          </div>
        </Link>
      ))}
    </>
  );
}
