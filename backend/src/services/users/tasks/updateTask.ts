import { Request, Response } from "express";
import prisma from "../../../config/prismaClient";
import { emitProjectTaskEvent } from "../../../kafka/producer";
import { CACHE_KEY_TASKS, KAFKA_PROJECT_TASKS_EVENTS } from "../../../config/types";
import redisClient from "../../../redis/redisClient";

export const updateTask = async (req: Request, res: Response) => {
  try {
    const { projectId, taskId } = req.params;

    const {  status } = req.body;

    const project = await prisma.project.findUnique({
      where: { id: projectId },
    });

    if (!project) {
      return res.status(404).json({ error: "Project not found" });
    }

    const taskExists = await prisma.task.findUnique({
      where: { id: taskId },
    });

    if (!taskExists || taskExists.projectId !== projectId) {
      return res.status(404).json({ error: "Task not found for the given project" });
    }

    const updatedTask = await prisma.task.update({
      where: { id: taskId },
      data: { status },
    });

    // Clear cache
    try {
      await redisClient.del(CACHE_KEY_TASKS);
    } catch (cacheError) {
      console.log("Cache clear failed:", cacheError);
    }

    // Send Kafka event (optional - don't fail if Kafka is down)
    try {
      await emitProjectTaskEvent(KAFKA_PROJECT_TASKS_EVENTS.UPDATED, updatedTask);
    } catch (kafkaError) {
      console.log("Kafka event failed:", kafkaError);
      // Don't fail the request if Kafka is down
    }

    return res.status(200).json(updatedTask);
  } catch (error) {
    console.error("Error updating task:", error);
    return res.status(500).json({ error: "Internal Server Error: updateTask" });
  }
};
