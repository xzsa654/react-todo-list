import { BookPlus } from "lucide-react";
import { useListStore } from "../store/useListStore";

// 進度條
export default function ProgressBar() {
  const { percentage, list } = useListStore();

  return (
    <div className="w-full flex items-center gap-2 px-10 ">
      {list.length || percentage ? (
        <>
          <p className="text-sky-600">{percentage}%</p>
          <div className="w-full h-4 bg-white rounded-full">
            <div
              className={`bg-blue-300 h-full text-xs font-medium text-blue-100 text-center  leading-none rounded-full`}
              style={{ width: `${percentage}%` }}
            ></div>
          </div>
        </>
      ) : (
        <p className="text-sky-600 flex flex-col items-center justify-center gap-2 w-full">
          No tasks have been added yet
          <BookPlus size={62} />
        </p>
      )}
    </div>
  );
}
