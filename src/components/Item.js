// Component to render a single item in the list
export default function Item({ item, onDeleteItem, onToggleItem }) {
  return (
    <li>
      {/* Checkbox to toggle packed status */}
      <input
        type="checkbox"
        value={item.packed}
        onChange={() => onToggleItem(item.id)}
      />
      {/* If item is packed, add line-through styling */}
      <span style={item.packed ? { textDecoration: "line-through" } : {}}>
        {item.description} {item.quantity}
      </span>
      {/* Delete button */}
      <button onClick={() => onDeleteItem(item.id)}>❌</button>
    </li>
  );
}
