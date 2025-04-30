import { create } from "zustand";
import { persist } from "zustand/middleware";
// 代辦事項類型
export interface listItemInterface {
  id: number
  title: string
  isCompleted: boolean
  createdAt: number
}

// Store 參數類型
interface todoListInterface {
  list: listItemInterface[]
  percentage: number
  isOrderOpen: boolean
  addToList: (title: string) => void
  deleteToList: (id: number) => void
  ToggleIsCompletedItem: (id: number) => void
  calculatePercentage: () => void
  toggleListOrder: (data?: boolean) => void
}

// 初始資料
const initList: listItemInterface[] = [
  { id: 1, title: "Learn React.js", isCompleted: true, createdAt: 1746022214083 },
  { id: 2, title: "Learn Golang", isCompleted: false, createdAt: 1746022214085 },
  { id: 3, title: "Learn Docker", isCompleted: true, createdAt: 1746022214088 },
  { id: 4, title: "Learn Duolingo", isCompleted: false, createdAt: 1746022214089 },
]

export const useListStore = create<todoListInterface>()(
  // 將資料持久化保存
  persist((set, get) => ({
    // 狀態：list 代辦清單
    list: initList,
    // 完成率
    percentage: 0,
    // 是否開啟排序
    isOrderOpen: false,

    addToList: (title) => {
      // 添加新事項
      const id = get().list.length + 1
      const createdAt = Date.now()
      const newItem = { title, id, isCompleted: false, createdAt }
      set((state) => ({
        ...state,
        list: [...state.list, newItem]
      }))
      // 重新計算完成率&&判斷排序狀態
      get().toggleListOrder(true)
      get().calculatePercentage()
    },
    deleteToList: (id) => {
      // 刪除代辦事項
      set((state) => ({
        ...state,
        list: state.list.filter((item) => item.id !== id)
      }))
      // 重新計算完成率
      get().calculatePercentage()
    },
    ToggleIsCompletedItem: (id) => {
      // 切換完成狀態
      const newData = get().list.map((item) => item.id === id
        ? { ...item, isCompleted: !item.isCompleted }
        : item)
      set({ list: newData })
      // 重新計算完成率
      get().calculatePercentage()
      get().toggleListOrder(true)

    },
    calculatePercentage: () => {
      // 計算完成率
      const total = get().list.length
      const isCompleted = get().list.filter((item) => item.isCompleted).length
      let percentage = 0
      if (isCompleted !== 0) {
        // 數字經度取至整數
        percentage = Math.round((isCompleted / total) * 100)
      }
      set({ percentage })
    },
    toggleListOrder: (data) => {
      /* 切換排序方式
        如果有傳入參數代表新增事項後的觸發，不切換狀態
      */
      if (!data) {
        set({ isOrderOpen: !get().isOrderOpen })
      }
      // 重新排序代辦事項
      let newData
      const isOpen = get().isOrderOpen
      if (isOpen) {
        newData = get().list.sort((a, b) => {
          // 後面的數未完成放於前面
          if (a.isCompleted && !b.isCompleted) {
            return 1
            // 前面的數位完成則放於後面
          } else if (!a.isCompleted && b.isCompleted) {
            return -1
          } else {
            return 0
          }
        })
      } else {
        // 若未開啟排序，依照創建時間排序
        newData = get().list.sort((a, b) => a.createdAt - b.createdAt)
      }
      set({ list: newData })
    }
  }), { name: "todoListStorage" }))