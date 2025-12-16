import { NextResponse } from "next/server";
import Task from "@/models/Task";
import dbConnect from "@/lib/db";

export async function GET() {
  try {
    await dbConnect();
    const tasks = await Task.find().sort({ createdAt: -1 });
    return NextResponse.json(tasks);
  } catch (err) {
    return NextResponse.json(
      { error: "Failed to load tasks" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    await dbConnect();
    const body = await req.json();

    const newTask = await Task.create({
      title: body.title,
      description: body.description || "",
      status: body.status || "pending",
      priority: body.priority || "medium",
      dueDate: body.dueDate || null,
    });

    return NextResponse.json(newTask, { status: 201 });
  } catch (err) {
    return NextResponse.json(
      { error: "Failed to create task" },
      { status: 500 }
    );
  }
}
