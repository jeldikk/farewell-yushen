"use client";

import { FileUploader, FileUploaderProps } from "@aws-amplify/ui-react-storage";

interface Props extends Omit<FileUploaderProps, "path" | "bucket"> {
  path: NonNullable<FileUploaderProps["path"]>;
  bucket: NonNullable<FileUploaderProps["bucket"]> | string;
  uploadSuccessHandler: NonNullable<FileUploaderProps["onUploadSuccess"]>;
}

export default function AdminImageFileUploader(props: Props) {
  const { path, maxFileCount, bucket, uploadSuccessHandler } = props;
  console.log({ path, maxFileCount, bucket });
  return (
    <FileUploader
      path={path}
      maxFileCount={maxFileCount}
      acceptedFileTypes={["image/*"]}
      bucket={bucket}
      onUploadError={(error, file) => {
        console.log({ error, file });
      }}
      onUploadSuccess={uploadSuccessHandler}
      processFile={({ file, key }) => {
        // add a timestamp before the file extension to ensure uniqueness
        const fileExtension = file.name.split(".").pop();
        const fileNameWithoutExtension = file.name.replace(
          `.${fileExtension}`,
          "",
        );
        const newFilename = `${fileNameWithoutExtension}-${Date.now()}.${fileExtension}`;
        return {
          file,
          key: newFilename,
        };
      }}
      autoUpload={true}
      showThumbnails={true}
    />
  );
}
