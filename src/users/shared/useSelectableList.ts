import { useState } from "react"

export function useSelectableList<T>(items: T[], getId: (item: T) => number) {
  const [selectedItems, setSelectedItems] = useState<number[]>([])

  const isSelected = (id: number) => selectedItems.includes(id)

  const toggleSelect = (id: number) => {
    setSelectedItems(prev =>
      prev.includes(id)
        ? prev.filter(itemId => itemId !== id)
        : [...prev, id]
    )
  }

  const selectAll = () => {
    if (selectedItems.length === items.length) {
      setSelectedItems([])
    } else {
      setSelectedItems(items.map(getId))
    }
  }

  const clearSelection = () => setSelectedItems([])

  return {
    selectedItems,
    isSelected,
    toggleSelect,
    selectAll,
    clearSelection
  }
}
