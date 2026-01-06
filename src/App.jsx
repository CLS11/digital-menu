import {useState} from 'react';

const MENU_ITEMS = [
  {id: 1, name: "Espresso", category: "Coffee", price: 3, available: true },
  { id: 2, name: "Croissant", category: "Pastry", price: 4, available: true },
  { id: 3, name: "Iced Latte", category: "Coffee", price: 5, available: false },
  { id: 4, name: "Blueberry Muffin", category: "Pastry", price: 4, available: true },
];

function App(){
  const [filter, setFilter] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [cart, setCart] = useState([]);
  const addToCart = (item) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(cartItem => cartItem.id === item.id)
      if(existingItem){
        return prevCart.map(cartItem =>
          cartItem.id == item.id
            ? {...cartItem, qty: cartItem.qty + 1}
            : cartItem
        );
      }
      return [...prevCart, {...item, qty: 1}];
    });
  };
  const totalCost = cart.reduce((sum, item) => sum + item.price, 0);
  const filteredItems = MENU_ITEMS.filter(
    item => { 
      const matchesCategory =filter === "All" || item.category === filter;
      const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesCategory && matchesSearch;
    }
  );
  return(
    <div style={{ display: 'flex', gap: '40px', padding: '20px' }}>
      <div style={{ flex: 2 }}>
        <h1>DIGITAL CAFE</h1>
        <input  
          type="text"
          placeholder="Search for coffee..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{ width: '100%', padding: '10px', marginBottom: '20px' }}
        />
        <div style={{ display: 'grid', gap: '10px' }}>
          {filteredItems.map(item => (
            <div key={item.id} style={{ border: '1px solid #ccc', padding: '10px', borderRadius: '8px'}} >
              <strong>{item.name}</strong> - ${item.price}
              <button
                onClick={() => addToCart(item)}
                disabled={!item.available}
                style={{ float: 'right'}}
              >
                {item.available ? "Add to Cart" : "Out of Stock"}
              </button>
            </div>
          ))}
        </div>
      </div>
      <div style={{ flex: 1, background: '#2e2c2cff', padding: '20px', borderRadius: '8px'}}>
          <h2>Your Cart ({cart.length})</h2>
          {cart.length === 0 ? <p>Cart is empty</p> : (
            <ul>
              {cart.map((item, index) => (
                <li key={index}>{item.name} - ${item.price}</li>
              ))}
            </ul>
          )}
          <hr />
          <h3>Total: ${totalCost}</h3>
          <button onClick={() => alert("Order Placed!")} disabled={cart.length === 0}>
            Checkout
          </button>
      </div>
    </div>
  );
}
export default App;