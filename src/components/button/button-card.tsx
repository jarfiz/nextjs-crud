import { DeleteButton, EditButton } from "@/components/button/button";
import { SquarePen, Trash } from "lucide-react";

export default function ButtonCard({
  id,
  onDelete,
}: {
  id: string;
  onDelete?: () => Promise<void>;
}) {
  return (
    <div className="flex items-center absolute right-3 bottom-1 space-x-1">
      <DeleteButton id={id} onDelete={onDelete}>
        <Trash className="size-5 cursor-pointer hover:text-red-500 duration-200 hover:-translate-y-0.5 hover:scale-110" />
      </DeleteButton>
      <span className="text-2xl text-gray-400 select-none">|</span>
      <EditButton id={id}>
        <SquarePen className="size-5 cursor-pointer hover:text-green-500 duration-200 hover:-translate-y-0.5 hover:scale-110" />
      </EditButton>
    </div>
  );
}
