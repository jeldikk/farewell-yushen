export default function YushenFeedbackLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="yushen-feedback-layout max-w-11/12 mx-auto px-6 py-10">
      <h1 className="mb-8 text-center text-3xl font-bold">Yushen Feedback</h1>
      {children}
    </div>
  );
}
