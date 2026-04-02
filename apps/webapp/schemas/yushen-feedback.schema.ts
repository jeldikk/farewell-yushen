import { z } from "zod";

export const createYushenFeedbackSchema = z.object({
  workingWithOffshore: z.string(),
  missingOffshoreTeam: z.string(),
  aboutTributeWebsite: z.string(),
  mostMemorableMoment: z.string(),
  sayToOffshoreBeforeLeaving: z.string(),
});
