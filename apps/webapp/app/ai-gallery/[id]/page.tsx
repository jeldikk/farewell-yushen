import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { cookieBasedClient, getImageFileUrl } from "@/utils/amplify.server";

export default async function AiGalleryImagePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const recordResponse = await cookieBasedClient.models.FileUpload.list({
    filter: {
      id: { eq: id },
    },
  });

  const fileRecord = recordResponse.data[0];
  if (!fileRecord) {
    notFound();
  }

  const imageUrl = await getImageFileUrl(fileRecord.fileName);
  const username = fileRecord.author.split("@")[0];

  return (
    <div className="mx-auto flex min-h-screen w-full max-w-7xl flex-col gap-6 px-6 py-8">
      <div>
        <Link href="/ai-gallery" className="btn btn-sm">
          Back to Gallery
        </Link>
      </div>

      <div className="grid h-full grid-cols-1 overflow-hidden rounded-2xl bg-base-100 shadow-xl md:grid-cols-5">
        <div className="flex items-center justify-center bg-base-200 p-4 md:col-span-4">
          <Image
            src={imageUrl.url.toString()}
            alt={fileRecord.fileName}
            width={1200}
            height={1200}
            className="max-h-[82vh] w-auto max-w-full object-contain"
          />
        </div>
        <aside className="border-base-300 flex flex-col gap-4 border-t p-5 md:col-span-1 md:border-t-0 md:border-l">
          <div>
            <h1 className="text-lg font-bold">Image Summary</h1>
            <p className="mt-2 text-sm leading-relaxed">{fileRecord.fileSummary}</p>
          </div>
          <div className="text-sm opacity-80">Uploaded by {username}</div>
        </aside>
      </div>
    </div>
  );
}
