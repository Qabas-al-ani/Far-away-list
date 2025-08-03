// Import useState from React to manage component state
import { useState } from "react";
import Logo from "./Logo";
import Form from "./Form";
import PackingList from "./PackingList";
import Stats from "./Stats";

// Main App component
export default function App() {
  // State to hold the list of packing items
  const [items, setItems] = useState([]);

  // Function to handle adding a new item to the list
  function handleAddItem(item) {
    setItems(items => [...items, item]); // Add new item to existing list
  }

  // Function to delete an item by ID
  function handleDeleteItem(id) {
    setItems(items => items.filter(item => item.id !== id));
  }

  // Function to clear the entire packing list
  function handleClearList() {
    const confirmed = window.confirm(
      "Are you sure you want to delete the whole list?"
    );
    if (confirmed) setItems([]);
  }

  // Function to toggle the 'packed' status of an item
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
        onClearList={handleClearList}
      />{" "}
      {/* Display and manage the list of items */}
      <Stats items={items} /> {/* Show stats about packed items */}
    </div>
  );
}
