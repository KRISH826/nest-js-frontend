import { z } from "zod";

export const createChatRoomSchema = z.object({
    name: z
        .string()
        .trim()
        .min(5, "Room name must be at least 5 characters")
        .max(50, "Room name cannot exceed 50 characters"),
    description: z
        .string()
        .trim()
        .max(255, "Description cannot exceed 255 characters")
        .optional(),
    maxMembers: z
        .number({ message: "Max members must be a number" })
        .min(1, "Must allow at least 1 member")
        .max(50, "Max members limit cannot exceed 50"),
});

export type CreateChatRoomSchemaType = z.infer<typeof createChatRoomSchema>;
