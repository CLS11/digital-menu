import {useState} from 'react';

const MENU_ITEMS = [
  {id: 1, name: "Espresso", category: "Coffee", price: 3, available: true },
  { id: 2, name: "Croissant", category: "Pastry", price: 4, available: true },
  { id: 3, name: "Iced Latte", category: "Coffee", price: 5, available: false },
  { id: 4, name: "Blueberry Muffin", category: "Pastry", price: 4, available: true },
];

function App(){
  const [filter, setFilter] = useState("All");
  const filteredItems = MENU_ITEMS.filter(item => filter === "All" ? true : item.category === filter);
  return(
    <div style={{ padding: '20px', fontFamily: 'Arial'}}>
      <h1>
        Cafe Menu
      </h1>
      <div style={{ marginBottom: '20px'}}>
        {["All", "Coffee", "Pastry"].map(cat => (
          <button
            key={cat}
            onClick={() => setFilter(cat)}
            style={{
              marginRight: '10px',
              backgroundColor: filter === cat ? '#6200ee' : '#e0e0e0',
              color: filter === cat ? 'white' : 'black',
              padding: '8px 16px',
              borderRadius: '20px',
              border: 'none',
              cursor: 'pointer'
            }}>
              {cat}
              </button>
        ))}
      </div>
      <div style={{ display: 'grid', gap: '10px'}}>
        {filteredItems.map(item => (
          <div
            key={item.id}
            style={{
              padding: '15px',
              border: '1px solid #ddd',
              borderRadius: '8px',
              opacity: item.available ? 1 : 0.5
            }} >
            <div style={{display: 'flex', justifyContent: 'space-between'}}>
            <strong>{item.name}</strong>
            <span>${item.price}</span>
            </div>
            {!item.available && <small style={{color: 'red'}}>Sold out</small>}
            </div>
        ))}
      </div>
    </div>
  );
}
export default App;