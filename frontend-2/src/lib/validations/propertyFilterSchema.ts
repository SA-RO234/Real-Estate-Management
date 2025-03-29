import { z } from "zod";

export const PropertyFilterSchema = z.object({
  propertyType: z.string().optional(),
  location: z.string().optional().default(""),
  bedrooms: z.string().optional(),
  // Replace priceRange object with priceRangeId (using string because Select values are strings)
  priceRangeId: z.string().optional(),
});

export type PropertyFilterSchemaType = z.infer<typeof PropertyFilterSchema>;
