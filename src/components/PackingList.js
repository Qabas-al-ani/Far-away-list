import { useState } from "react";
import Item from "./Item";

// Component to render and manage the packing list
export default function PackingList({
  items,
  onDeleteItem,
  onToggleItem,
  onClearList,
}) {
  const [sortBy, setSortBy] = useState("input");

  let sortedItems;

  // Sorting logic based on selected option
  if (sortBy === "input") sortedItems = items;
  if (sortBy === "description")
    sortedItems = items
      .slice()
      .sort((a, b) => a.description.localeCompare(b.description));
  if (sortBy === "packed")
    sortedItems = items
      .slice()
      .sort((a, b) => Number(a.packed) - Number(b.packed));

  return (
    <div className="list">
      <ul>
        {sortedItems.map(item => (
          // Render each item using the Item component
          <Item
            item={item}
            onDeleteItem={onDeleteItem}
            onToggleItem={onToggleItem}
            onClearList={onClearList}
            key={item.id}
          />
        ))}
      </ul>
      <div className="actions">
        {/* Dropdown to choose sort type */}
        <select value={sortBy} onChange={e => setSortBy(e.target.value)}>
          <option value="input">Sort by input</option>
          <option value="description">Sort by description</option>
          <option value="packed">Sort by packed</option>
        </select>
        {/* Button to clear the list */}
        <button onClick={onClearList}>Clear The List</button>
      </div>
    </div>
  );
}
