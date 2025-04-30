import { X } from "lucide-react";
import { listItemInterface, useListStore } from "../store/useListStore";

export default function TodoCard({ item }: { item: listItemInterface }) {
  const { ToggleIsCompletedItem, deleteToList } = useListStore();
  // 切換完成狀態
  const handleCompleted = () => {
    ToggleIsCompletedItem(item.id);
  };
  // 刪除代辦事項
  const handleDelete = () => {
    deleteToList(item.id);
  };
  return (
    <li
      className="relative w-full  bg-white rounded py-4 px-6 overflow-hidden flex justify-between
      before:content-[''] before:h-full before:absolute before:top-0 before:left-0 before:w-2 before:bg-sky-600  "
    >
      {/*-- Checkbox 部分 --*/}
      <button
        onClick={handleCompleted}
        className="relative flex items-center gap-2 cursor-pointer"
      >
        <input
          id="red-checkbox"
          onChange={handleCompleted}
          checked={item.isCompleted}
          type="radio"
          className="sr-only peer"
        />
        {/* 客製 checkbox 樣式 */}
        <div className="w-6 h-6 bg-white cursor-pointer border-2 border-gray-300 rounded peer-checked:bg-sky-600 peer-checked:border-sky-600 transition-all"></div>
        <div className=" absolute hidden w-3 h-3 border-b-2 border-r-2 border-white transform rotate-45 left-1.5 top-1 peer-checked:block"></div>

        <div className="ms-2 text-lg text-sky-600 font-medium">
          {/* 如果已完成則顯示刪除線 */}
          {item.isCompleted ? <del>{item.title}</del> : item.title}
        </div>
      </button>
      {/* 刪除按鈕 */}
      <button onClick={handleDelete}>
        <X className="text-blue-300 hover:text-blue-500 cursor-pointer" />
      </button>
    </li>
  );
}
