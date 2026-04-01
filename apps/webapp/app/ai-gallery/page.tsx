import { Schema } from "@/data-schema";
import Image from "next/image";
import { cookieBasedClient, getImageFileUrl } from "@/utils/amplify.server";
import { Suspense } from "react";
import Link from "next/link";

async function CardSkeleton() {
  return (
    <div className="mb-4 flex w-full break-inside-avoid flex-col gap-3 rounded-2xl bg-base-100 p-4 shadow-sm">
      <div className="skeleton h-32 w-full"></div>
      <div className="skeleton h-4 w-28"></div>
      <div className="skeleton h-4 w-full"></div>
      <div className="skeleton h-4 w-full"></div>
    </div>
  );
}

async function ImageCard({
  fileRecord,
}: {
  fileRecord: Schema["FileUpload"]["type"];
}) {
  const username = fileRecord.author.split("@")[0];
  const imageUrl = await getImageFileUrl(fileRecord.fileName);
  return (
    <Link
      href={`/ai-gallery/${fileRecord.id}`}
      className="block"
      scroll={false}
    >
      <div className="card bg-base-100 group mb-4 w-full cursor-pointer break-inside-avoid overflow-hidden rounded-2xl shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl">
        <figure className="relative w-full overflow-hidden">
          <Image
            src={imageUrl.url.toString()}
            alt={fileRecord.fileName}
            width={300}
            height={300}
            className="h-auto w-full object-cover transition duration-500 group-hover:scale-105 group-hover:brightness-110"
          />
          <div className="pointer-events-none absolute inset-0 transition duration-300 group-hover:ring-4 group-hover:ring-primary/40" />
        </figure>
        <div className="card-body gap-2 p-4">
          <h2 className="card-title text-base">Image Summary</h2>
          <p className="text-sm leading-relaxed">{fileRecord.fileSummary}</p>

          <div className="card-footer text-xs opacity-70">
            Uploaded by {username}
          </div>
        </div>
      </div>
    </Link>
  );
}

export default async function AiGalleryPage() {
  const fileRecords = await cookieBasedClient.models.FileUpload.list();
  return (
    <div className="w-full px-6 py-10">
      <h1 className="mb-8 text-center text-3xl font-bold">AI Gallery Page</h1>
      <div className="mx-auto max-w-7xl columns-1 gap-4 md:columns-2 lg:columns-3">
        {fileRecords.data.map((record) => (
          <Suspense key={record.id} fallback={<CardSkeleton />}>
            <ImageCard fileRecord={record} />
          </Suspense>
        ))}
      </div>
    </div>
  );
}
