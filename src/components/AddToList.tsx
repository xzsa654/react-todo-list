import { Plus } from "lucide-react";
import { ChangeEvent, FormEvent, useState } from "react";
import { useListStore } from "../store/useListStore";

export default function AddToList() {
  const { addToList } = useListStore();
  const [title, setTitle] = useState("");
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // 判斷輸入框是否為空
    if (!title) return;
    addToList(title);
    setTitle("");
  };

  return (
    <div className="space-y-2 ">
      <p>Add to List</p>
      <form onSubmit={handleSubmit} className="flex justify-end gap-2">
        <input
          type="text"
          value={title}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setTitle(e.target.value)
          }
          className="w-9/12 rounded bg-white flex-1 text-black px-3 "
        />
        <button
          type="submit"
          className="bg-sky-600 rounded p-3 text-white cursor-pointer"
        >
          <Plus />
        </button>
      </form>
    </div>
  );
}
