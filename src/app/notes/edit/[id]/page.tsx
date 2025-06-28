import EditForm from "@/components/edit-form";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const id = (await params).id;

  return (
    <div>
      <EditForm id={id}/>
    </div>
  );
}
