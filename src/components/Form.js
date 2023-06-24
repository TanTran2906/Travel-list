import { useState } from "react";

export default function Form({ onAddItem }) {
    const [description, setDescription] = useState('');
    const [quantity, setQuantity] = useState(1);

    function handleForm(e) {
        e.preventDefault();

        if (!description) return;

        const newItem = { description, quantity, packed: false, id: Date.now() };
        onAddItem(newItem);

        setDescription('');
        setQuantity(1);
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
    );
}
