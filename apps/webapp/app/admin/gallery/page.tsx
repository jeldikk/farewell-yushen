import AdminFileUploaderForm from "@/components/file-uploader/file-uploader-form.component";

export default function AdminGalleryPage() {
  return (
    <div className="flex flex-col h-screen w-full items-center">
      <h1 className="text-3xl font-bold my-4">
        You can Upload the images here
      </h1>
      <AdminFileUploaderForm />
    </div>
  );
}
