import prisma from "@/lib/prisma";
import { NotFoundError } from "../utils/customError";


// src/model/boardModel.ts

const DEFAULT_TASKS = [
  {
    name: "Set up project",
    description: "Initialize repo and configuration",
    status: "IN_PROGRESS" as const,  // TaskStatus.IN_PROGRESS
  },
  {
    name: "Invite team members",
    description: "Share this board with your team",
    status: "IN_PROGRESS" as const,
  },
  {
    name: "Create your first real task",
    description: "Replace this with something you actually need to do",
    status: "IN_PROGRESS" as const,
  },
];

const tasksData = DEFAULT_TASKS.map((task) => ({
  name: task.name,
  description: task.description,
  status: task.status,
}));




export const createBoardService = async (
  name: string,
  description?: string
) => {
  const board = await prisma.board.create({
    data: {
      name,
      description,
      tasks: {
        create: tasksData
      }
    },

    include: {
      tasks: true
    }
  });

  return board;
};

export const getBoardByIdService = async (boardId: string) => {
  const board = await prisma.board.findUnique({
    where: { id: boardId },
    include: { tasks: true },
  });

  if (!board) {
    throw new NotFoundError("Board not found");
  }

  return board;
};

export const updateBoardService = async (
  boardId: string,
  name?: string,
  description?: string
) => {
  const updateData: {
    name?: string;
    description?: string | null;
  } = {};
  
  if (name !== undefined) updateData.name = name;
  if (description !== undefined) updateData.description = description;

  const board = await prisma.board.update({
    where: { id: boardId },
    data: updateData,
    include: { tasks: true }
  });

  return board;
};

export const deleteBoardService = async (boardId: string) => {
  await prisma.board.delete({
    where: { id: boardId }
  });

  return { message: 'Board deleted successfully' };
};