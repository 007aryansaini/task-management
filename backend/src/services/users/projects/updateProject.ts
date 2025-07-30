import prisma from "../../../config/prismaClient";
import { CACHE_KEY, KAFKA_PROJECT_EVENTS } from "../../../config/types";
import { emitProjectEvent } from "../../../kafka/producer";
import redisClient from "../../../redis/redisClient";
import { Request, Response } from "express";

export const updateProject = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    if (req.body.deadline) {
      req.body.deadline = new Date(req.body.deadline);
    }

    const updatedProject = await prisma.project.update({
      where: { id },
      data: req.body,
    });

    // Clear cache
    try {
      await redisClient.del(CACHE_KEY);
    } catch (cacheError) {
      console.log("Cache clear failed:", cacheError);
    }

    // Send Kafka event (optional - don't fail if Kafka is down)
    try {
      await emitProjectEvent(KAFKA_PROJECT_EVENTS.UPDATED, updatedProject);
    } catch (kafkaError) {
      console.log("Kafka event failed:", kafkaError);
      // Don't fail the request if Kafka is down
    }

    res.status(200).json(updatedProject);
  } catch (error) {
    console.log("Project update error:", error);
    res.status(500).json({ error: "Internal Server Error: updateProject" });
  }
};
