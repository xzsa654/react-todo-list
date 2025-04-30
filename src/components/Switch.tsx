import { useListStore } from "../store/useListStore";

export default function Switch() {
  const { isOrderOpen, toggleListOrder } = useListStore();

  const handleSwitch = () => {
    toggleListOrder();
  };
  return (
    <label className="flex items-center space-x-3 cursor-pointer">
      <div className="relative">
        <input
          type="checkbox"
          className="sr-only peer"
          onChange={handleSwitch}
          checked={isOrderOpen}
        />
        <div className="w-10 h-6 bg-white rounded-full peer peer-checked:bg-sky-600 transition-all"></div>
        <div className="absolute left-1 top-1 w-4 h-4 bg-blue-300 rounded-full transition-all peer-checked:bg-white peer-checked:left-5"></div>
      </div>
    </label>
  );
}
