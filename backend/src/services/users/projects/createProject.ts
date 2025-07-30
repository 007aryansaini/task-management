import prisma from "../../../config/prismaClient";
import redisClient from "../../../redis/redisClient";
import { CACHE_KEY, KAFKA_PROJECT_EVENTS, PROJECT_STATUS } from "../../../config/types";
import { Response } from "express";
import { emitProjectEvent } from "../../../kafka/producer";
import { AuthRequest } from "../../../middlewares/auth";



export const createProject = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user?.id;
    if (!userId) {
      return res.status(401).json({ error: "Unauthorized: No user id" });
    }

   

    const { name, description, deadline, priority, clientName, status } = req.body;

    const project = await prisma.project.create({
      data: {
        name,
        description,
        deadline: deadline ? new Date(deadline) : undefined,
        priority,
        clientName,
        status: status || PROJECT_STATUS.IN_PROGRESS,
        userId,
      },
    });

    // Clear cache
    try {
      await redisClient.del(CACHE_KEY);
    } catch (cacheError) {
      console.log("Cache clear failed:", cacheError);
    }

    // Send Kafka event (optional - don't fail if Kafka is down)
    try {
      await emitProjectEvent(KAFKA_PROJECT_EVENTS.CREATED, project);
    } catch (kafkaError) {
      console.log("Kafka event failed:", kafkaError);
      // Don't fail the request if Kafka is down
    }

    res.status(201).json(project);
  } catch (error) {
    console.log("Project creation error:", error);
    res.status(500).json({ error: "Internal Server Error: createProject" });
  }
};
