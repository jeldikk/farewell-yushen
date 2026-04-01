import { z } from "zod";

export const createFileUploadSchema = z.object({
  fileName: z.string(),
  fileSummary: z.string(),
});
