"use client";
import { startTransition, useActionState, useState } from "react";

import { Schema } from "@/data-schema";
import { ExclamationCircleIcon } from "@heroicons/react/24/outline";
import AdminImageFileUploader from "./image-file-uploader.component";
import { createImageRecord, FormState } from "@/actions/file-upload.actions";

const initialState: FormState = {
  success: false,
  message: "",
  errors: null,
};

export default function AdminFileUploaderForm() {
  const [fileName, setFileName] = useState<string | null>(null);
  const [state, formAction, isPending] = useActionState(
    createImageRecord,
    initialState,
  );

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (fileName === null) {
      // Handle the case where no file has been uploaded
      alert("Please upload an image before submitting the form.");
      return;
    }
    const formData = new FormData(event.currentTarget);
    console.log(
      "Form data to be submitted:",
      Object.fromEntries(formData.entries()),
    );
    startTransition(() => {
      formAction(formData);
    });
  }

  return (
    <div className="create-feelings-form">
      {state.errors && (
        <div className="alert alert-error alert-outline m-4">
          <div>
            <ExclamationCircleIcon className="inline w-5 h-5 mr-2" />
            {state.message}
          </div>
        </div>
      )}
      <form onSubmit={handleSubmit} className="create-feelings-form p-4">
        <AdminImageFileUploader
          path="public/images/"
          bucket="yushen-public"
          uploadSuccessHandler={(file) => {
            console.log("File uploaded successfully:", file);
            if (file.key) {
              setFileName(file.key);
            }
          }}
          maxFileCount={1}
          accessLevel="guest"
        />

        <input type="hidden" name="image-uploaded" value={fileName || ""} />
        <fieldset className="fieldset w-full my-4">
          <legend className="fieldset-legend">
            Add some summary text for image here, so that Yushen can understand
            the context of the image.
          </legend>
          <textarea
            id="file-summary"
            required
            name="file-summary"
            className="textarea w-[stretch]"
            rows={3}
            placeholder="Write summary context here"
          ></textarea>
          {state.errors?.fileSummary && (
            <p className="label text-error">
              {state.errors.fileSummary.join(", ")}
            </p>
          )}
        </fieldset>
        <div className="button-controls flex flex-col gap-2 my-4">
          <button type="submit" className="btn btn-primary">
            {isPending && <span className="loading loading-spinner"></span>}
            Save File
          </button>
          <button type="reset" className="btn btn-secondary">
            Clear
          </button>
        </div>
      </form>
    </div>
  );
}
