import { Request, Response } from "express";
import prisma from "../../../config/prismaClient";
import { emitProjectTaskEvent } from "../../../kafka/producer";
import {
  CACHE_KEY_TASKS,
  KAFKA_PROJECT_TASKS_EVENTS,
} from "../../../config/types";
import redisClient from "../../../redis/redisClient";
export const createTask = async (req: Request, res: Response) => {
  try {
    const { projectId } = req.params;

    const { name, status } = req.body;

    if (!projectId) {
      res.status(400).json({ error: "Project id is required" });
      return;
    }


    const ProjectIdExists = await prisma.project.findUnique({
      where: { id:projectId },
    });


    if (!ProjectIdExists) {
      res.status(404).json({ error: "Project not found" });
      return;
    }


    const task = await prisma.task.create({
      data: {
        name,
        status,
        projectId: projectId,
      },
    });

    // Clear cache
    try {
      await redisClient.del(CACHE_KEY_TASKS);
    } catch (cacheError) {
      console.log("Cache clear failed:", cacheError);
    }

    // Send Kafka event (optional - don't fail if Kafka is down)
    try {
      await emitProjectTaskEvent(KAFKA_PROJECT_TASKS_EVENTS.CREATED, task);
    } catch (kafkaError) {
      console.log("Kafka event failed:", kafkaError);
      // Don't fail the request if Kafka is down
    }

    res.status(201).json(task);
  } catch (error) {
    console.log("Task creation error:", error);
    res.status(500).json({ error: "Internal Server Error: createTask" });
  }
};
