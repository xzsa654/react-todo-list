import { useEffect, useRef, useState } from "react";
import AddToList from "./components/AddToList";
import ProgressBar from "./components/ProgressBar";
import Switch from "./components/Switch";
import TodoCard from "./components/TodoCard";
import { useListStore } from "./store/useListStore";

function App() {
  const { list } = useListStore();

  // 因為每次點擊完成事項都會滾動螢幕，所以往下滾動，所以使用狀態控制是否滾動
  const [currentLength, setCurrentLength] = useState(0);

  // 控制滾動元素
  const scrollRef = useRef<HTMLDivElement>(null);

  // 自動滾動至底部
  useEffect(() => {
    if (scrollRef.current && list.length > 0) {
      // 判斷是否有新增事項沒有就不在滾動畫面，刪除事項也進行滾動
      if (currentLength >= list.length) return;
      setCurrentLength(list.length);
      scrollRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [list]);

  return (
    // 背景 藍色漸層 => 紫色
    <div className=" w-full min-h-screen flex justify-center items-center  bg-gradient-to-b from-blue-100 to-purple-100 ">
      <div className="pt-4 pb-2 w-full max-w-lg space-y-4 ">
        {/* 標題區塊 */}
        <header className="px-10">
          <h1 className="text-sky-600  text-2xl">Todo List</h1>
          <p className="text-gray-400 text-sm">Add things to do</p>
        </header>
        <div className="px-10">
          <hr className="text-gray-400 border-1 " />
        </div>
        {/* 進度欄 */}
        <ProgressBar />
        {/* 待辦事項 */}
        <ul className=" space-y-2 overflow-y-scroll max-h-68 pr-8 pl-10">
          {list.map((item) => (
            <TodoCard key={item.id} item={item} />
          ))}
          <div ref={scrollRef} className="h-1"></div>
        </ul>
        <div className="px-10">
          <hr className="text-gray-400 border-1 " />
        </div>
        {/* 排序切換 */}
        <div className="flex justify-end gap-2 mb-14 px-10">
          <p className="text-gray-400">Move done things to end?</p>
          <Switch />
        </div>
        {/* 尾部 */}
        <footer className=" w-full text-sky-600 px-10">
          <AddToList />
        </footer>
      </div>
    </div>
  );
}

export default App;
