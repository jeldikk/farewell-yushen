import { form } from "motion/react-client";

export interface FormState {
  success: boolean;
  message: string;
  errors: Record<string, string[]> | null;
}

export async function createImageRecord(
  prevState: FormState,
  formData: FormData,
) {
  const rawInput = {
    fileName: formData.get("image-uploaded"),
    fileSummary: formData.get("file-summary"),
  };
}
