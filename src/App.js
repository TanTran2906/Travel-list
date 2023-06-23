import { useState } from "react";

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

  return (
    <div className="app">
      <Logo />
      <Form onAddItem={handleAddItem} />
      <PackingList items={items} onDeleteItem={handleDeleteItem} onToggleItem={handleToggleItem} />
      <Stats items={items} />
    </div>
  )
}

function Logo() {
  return <h1>🌴Far away💼</h1>
}

function Form({ onAddItem }) {
  const [description, setDescription] = useState('')
  const [quantity, setQuantity] = useState(1)

  function handleForm(e) {
    e.preventDefault()

    if (!description) return;

    const newItem = { description, quantity, packed: false, id: Date.now() }
    onAddItem(newItem)

    setDescription('')
    setQuantity(1)
  }


  //Array.from({ length: 20 }, (_, i) => i + 1): tạo mảng có 20 phần tử (1-20)
  return (
    <form className="add-form" onSubmit={handleForm}>
      <h3>What do you need for you trip?</h3>
      <select value={quantity} onChange={(e) => setQuantity(Number(e.target.value))}>
        {Array.from({ length: 20 }, (_, i) => i + 1).map(num => <option value={num} key={num}>{num}</option>)}
      </select>
      <input type="text" placeholder="Item..." value={description} onChange={(e) => setDescription(e.target.value)}></input>
      <button type="submit">Add</button>
    </form>
  )
}

function PackingList({ items, onDeleteItem, onToggleItem }) {
  const [sortBy, setSortBy] = useState('input')

  let sortedItems;

  if (sortBy === 'input') sortedItems = items
  if (sortBy === 'description') sortedItems = items.slice().sort((a, b) => a.description.localeCompare(b.description))
  if (sortBy === 'packed') sortedItems = items.slice().sort((a, b) => Number(a.packed) - Number(b.packed))

  return (
    <div className="list" >
      <ul >
        {sortedItems.map(item => <Item item={item} key={item.id} onDeleteItem={onDeleteItem} onToggleItem={onToggleItem} />)}
      </ul>

      <div className="actions">
        <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
          <option value='input'>Sort by input order</option>
          <option value='description'>Sort by description</option>
          <option value='packed'>Sort by packed</option>
        </select>
      </div>
    </div >
  )
}

function Item({ item, onDeleteItem, onToggleItem }) {
  return (
    <li>
      <input type="checkbox" onChange={() => onToggleItem(item.id)} value={item.packed} />
      <span style={item.packed ? { textDecoration: "line-through" } : {}}>{item.quantity} {item.description}</span>
      <button onClick={() => onDeleteItem(item.id)}>❌</button>
    </li>
  )
}

function Stats({ items }) {
  if (!items.length)
    return (
      <footer className="stats">
        <em>
          Start adding some items to your packing list🔥
        </em>
      </footer>
    )


  const numItem = items.length
  const numPacked = items.filter(item => item.packed).length
  const percentage = Math.round((numPacked / numItem) * 100)
  return (
    <footer className="stats">
      <em>
        {percentage === 100 ?
          "You got anything! Ready to go ✈️" :
          `💼You have ${numItem} items on your list, and you already packed ${numPacked} (${percentage}%)`
        }
      </em>
    </footer>
  )
}