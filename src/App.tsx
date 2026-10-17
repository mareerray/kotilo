import ItemCard from './components/ItemCard';
import type { Item } from './types/item';

const items: Item[] = [
  { id: 1, name: "Bookshelf", category: "Furniture", color: "Brown", condition: "Good" },
  { id: 2, name: "Sofa", category: "Furniture", color: "Blue", condition: "Good" },
  { id: 3, name: "Floor lamp", category: "Lighting", color: "White", condition: "Fair" },
  { id: 4, name: "Bedside table", category: "Furniture", color: "Wooden", condition: "Good" },
];

function App() {
  return (
    <div>
      <h1>Kotilo</h1>
      {items.map((item) => (
        <ItemCard key={item.id} item={item} />
      ))}

    </div>
  );
}
export default App
