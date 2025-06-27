import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

const boilerplate = (values: object) => {
  return JSON.stringify(values);
};

const headers = {
  headers: {
    "Content-Type": "application/json",
  },
};

export async function GET() {
  const notes = await prisma.note.findMany();

  return new NextResponse(boilerplate(notes), headers);
}

export async function POST(request: NextRequest) {
  const { title, content } = await request.json();

  const newNote = await prisma.note.create({
    data: {
      title,
      content,
    },
  });

  return new NextResponse(boilerplate(newNote), headers);
}
