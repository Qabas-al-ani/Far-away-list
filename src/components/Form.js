import { useState } from "react";

// Form component to add a new item
export default function Form({ onAddItem }) {
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
