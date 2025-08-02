// Import useState from React to manage component state
import { useState } from "react";

// Sample list of items that could be used as initial data (not currently in use)
// const initialItems = [
//   { id: 1, description: "Passports", quantity: 2, packed: false },
//   { id: 2, description: "Socks", quantity: 12, packed: true },
//   { id: 3, description: "Charger", quantity: 11, packed: false },
// ];

// Main App component
export default function App() {
  // State to hold the list of packing items
  const [items, setItems] = useState([]);

  // Function to handle adding a new item to the list
  function handleAddItem(item) {
    setItems(items => [...items, item]); // Spread current items and add the new one
  }
  // Function to handle deleting a new item to the list
  function handleDeleteItem(id) {
    setItems(items => items.filter(item => item.id !== id));
  }

  function handleToggleItem(id) {
    setItems(items =>
      items.map(item =>
        item.id === id ? { ...item, packed: !item.packed } : item
      )
    );
  }

  return (
    <div className="app">
      <Logo /> {/* Header component */}
      <Form onAddItem={handleAddItem} /> {/* Form to add new items */}
      <PackingList
        items={items}
        onDeleteItem={handleDeleteItem}
        onToggleItem={handleToggleItem}
      />{" "}
      {/* Display list of packed items */}
      <Stats /> {/* Display statistics (currently static) */}
    </div>
  );
}

// Component to render the app title
function Logo() {
  return <h1>🏖️ Far Away 👜</h1>;
}

// Form component to add a new item
function Form({ onAddItem }) {
  // Local state for the form fields
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState(1);

  // Handle form submission
  function handleSubmit(e) {
    e.preventDefault(); // Prevent default form reload behavior

    if (!description) return; // Do not add if description is empty

    // Create a new item object
    const newItem = { description, quantity, packed: false, id: Date.now() };
    console.log(newItem); // Debug log

    // Call the parent function to add the item
    onAddItem(newItem);

    // Reset form fields
    setDescription("");
    setQuantity(1);
  }

  return (
    <form className="add-form" onSubmit={handleSubmit}>
      <h3>What do you need for your trip? 😊</h3>

      {/* Quantity dropdown (1 to 20) */}
      <select
        value={quantity}
        onChange={e => {
          console.log(e.target.value); // Debug log
          setQuantity(e.target.value); // Update state
        }}
      >
        {Array.from({ length: 20 }, (_, i) => i + 1).map(num => (
          <option value={num} key={num}>
            {num}
          </option>
        ))}
      </select>

      {/* Text input for item description */}
      <input
        type="text"
        placeholder="Item..."
        value={description}
        onChange={e => setDescription(e.target.value)}
      />

      {/* Submit button */}
      <button>Add</button>
    </form>
  );
}

// Component to render the list of packing items
function PackingList({ items, onDeleteItem, onToggleItem }) {
  return (
    <div className="list">
      <ul>
        {items.map(item => (
          // Render each item using the Item component
          <Item
            item={item}
            onDeleteItem={onDeleteItem}
            onToggleItem={onToggleItem}
            key={item.id}
          />
        ))}
      </ul>
    </div>
  );
}

// Component to render a single item
function Item({ item, onDeleteItem, onToggleItem }) {
  return (
    <li>
      <input
        type="checkbox"
        value={item.packed}
        onChange={() => onToggleItem(item.id)}
      />
      {/* If item is packed, add line-through styling */}
      <span style={item.packed ? { textDecoration: "line-through" } : {}}>
        {item.description} {item.quantity}
      </span>
      {/* Placeholder delete button (not functional yet) */}
      <button onClick={() => onDeleteItem(item.id)}>❌</button>
    </li>
  );
}

// Component to show stats (currently static text)
function Stats() {
  return (
    <footer className="stats">
      <em>🤦‍♂️ You have X items on your list, and you already packed X (X%)</em>
    </footer>
  );
}
