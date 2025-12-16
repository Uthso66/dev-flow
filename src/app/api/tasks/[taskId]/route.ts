import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { prisma } from "@/lib/prisma";

/**
 * GET /api/tasks/:taskId
 */
export async function GET(
  _req: Request,
  { params }: { params: { taskId: string } }
) {
  try {
    const task = await prisma.task.findUnique({
      where: { id: params.taskId },
    });

    if (!task) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    return NextResponse.json(task);
  } catch (err) {
    return NextResponse.json({ error: "Failed" }, { status: 500 });
  }
}

/**
 * PATCH /api/tasks/:taskId
 */
export async function PATCH(
  req: Request,
  { params }: { params: { taskId: string } }
) {
  try {
    const body = await req.json();

    const task = await prisma.task.update({
      where: { id: params.taskId },
      data: body,
    });

    return NextResponse.json(task);
  } catch (err) {
    return NextResponse.json({ error: "Failed to update" }, { status: 500 });
  }
}

/**
 * DELETE /api/tasks/:taskId
 */
export async function DELETE(
  _req: Request,
  { params }: { params: { taskId: string } }
) {
  try {
    await prisma.task.delete({
      where: { id: params.taskId },
    });

    return NextResponse.json({ message: "Deleted" });
  } catch (err) {
    return NextResponse.json({ error: "Failed to delete" }, { status: 500 });
  }
}
