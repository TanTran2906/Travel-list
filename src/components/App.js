import { useState } from "react";
import Logo from "./Logo";
import Form from "./Form";
import PackingList from "./PackingList";
import Stats from "./Stats";


// const initialItems = [
//   { id: 1, description: "Passports", quantity: 2, packed: true },
//   { id: 2, description: "Socks", quantity: 12, packed: false },
//   { id: 3, description: "Books", quantity: 10, packed: false },
//   { id: 4, description: "Soaps", quantity: 4, packed: false },
// ];

export default function App() {
  const [items, setItems] = useState([])

  //Không thể dùng .push vì tính bất biến  Phải tạo ra mảng mới chứa thêm item
  function handleAddItem(item) {
    setItems((items) => [...items, item])
  }

  function handleDeleteItem(id) {
    setItems((items) => items.filter(item => item.id !== id))
  }

  function handleToggleItem(id) {
    setItems((items) => items.map(item => item.id === id ? { ...item, packed: true } : item))
  }

  function handleClearAllItems() {
    const confirm = window.confirm('Are you sure you want delete all items?')
    if (confirm) setItems((items) => [])

  }
  return (
    <div className="app">
      <Logo />
      <Form onAddItem={handleAddItem} />
      <PackingList items={items} onDeleteItem={handleDeleteItem} onToggleItem={handleToggleItem} onClearAllItems={handleClearAllItems} />
      <Stats items={items} />
    </div>
  )
}

