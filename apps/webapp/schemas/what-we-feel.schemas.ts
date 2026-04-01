import { z } from "zod";

export const createWhatWeFeelSchema = z.object({
  firstImpression: z.string(),
  mostMemorableMoment: z.string(),
  feelingOnLeavingNews: z.string(),
  bestCompliment: z.string(),
  whatWouldYouMiss: z.string(),
  messageToYushen: z.string(),
});
