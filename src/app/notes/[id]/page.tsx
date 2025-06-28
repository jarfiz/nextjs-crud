import ButtonCard from "@/components/button/button-card";
import { URL } from "@/utils/config";
import dateFormat from "@/utils/dateFormat";
import React from "react";

export default async function page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const id = (await params).id;

  const res = await fetch(`${URL}/notes/${id}`);
  const note = await res.json();

  return (
    <div className="max-w-7xl mx-auto px-4 mt-20">
      <div className="outline p-6 space-y-2 relative">
        <time className="text-gray-950 text-sm block">
          {dateFormat(note.createdAt)}
        </time>
        <div className="space-y-4">
          <h1 className="text-2xl font-semibold text-gray-800">{note.title}</h1>
          <p className="text-lg text-gray-700">{note.content}</p>
        </div>

        <ButtonCard id={id} />
      </div>
    </div>
  );
}
