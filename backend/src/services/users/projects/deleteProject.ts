
import { Request, Response } from "express";
import prisma from "../../../config/prismaClient";
import redisClient from "../../../redis/redisClient";
import { CACHE_KEY, KAFKA_PROJECT_EVENTS, PROJECT_STATUS } from "../../../config/types";
import { emitProjectEvent } from "../../../kafka/producer";   



// soft delete
export const deleteProject = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

        // add zod validation

        
    const deletedProject = await prisma.project.update({
      where: { id },
      data: { status: PROJECT_STATUS.INACTIVE },
    });

    // Clear cache
    try {
      await redisClient.del(CACHE_KEY);
    } catch (cacheError) {
      console.log("Cache clear failed:", cacheError);
    }

    // Send Kafka event (optional - don't fail if Kafka is down)
    try {
      await emitProjectEvent(KAFKA_PROJECT_EVENTS.DELETED, deletedProject);
    } catch (kafkaError) {
      console.log("Kafka event failed:", kafkaError);
      // Don't fail the request if Kafka is down
    }

    res.status(200).json(deletedProject);
  } catch (error) {
    console.log("Project delete error:", error);
    res.status(500).json({ error: "Internal Server Error: deleteProject" });
  }
};