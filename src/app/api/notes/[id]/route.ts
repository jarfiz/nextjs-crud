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

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const id = (await params).id;

  try {
    const note = await prisma.note.findUnique({
      where: {
        id,
      },
    });

    if (!note) {
      return new NextResponse(
        boilerplate({ message: "Note not found!" }),
        headers
      );
    }

    return new NextResponse(boilerplate(note), headers);
  } catch {
    return new NextResponse(
      boilerplate({ message: "Note not found!" }),
      headers
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const id = (await params).id;
  const { title, content } = await request.json();

  try {
    const note = await prisma.note.update({
      where: {
        id,
      },
      data: { title, content },
    });

    if (!note) {
      return new NextResponse(
        boilerplate({ message: "Note not found!" }),
        headers
      );
    }

    return new NextResponse(boilerplate(note), headers);
  } catch {
    return new NextResponse(
      boilerplate({ message: "Note not found!" }),
      headers
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const id = (await params).id;

  try {
    const deletedNote = await prisma.note.delete({
      where: {
        id,
      },
    });

    if (!deletedNote) {
      return new NextResponse(
        boilerplate({ message: "Note not found!" }),
        headers
      );
    }

    return new NextResponse(boilerplate(deletedNote), headers);
  } catch {
    return new NextResponse(
      boilerplate({ message: "Note not found!" }),
      headers
    );
  }
}
