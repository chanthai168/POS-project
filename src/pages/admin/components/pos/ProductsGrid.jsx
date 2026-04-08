import { useState, useRef, useEffect } from 'react';
import ProductCard from './ProductCard';
import styles from "../../../css/pos.module.css";
import foods from "../../../../../public/foods.json";

export default function ProductsGrid({ onAddToCart }) {
  const [search, setSearch] = useState("");
  const [searchOpen, setSearchOpen] = useState(false);
  const [isNarrow, setIsNarrow] = useState(false);
  const containerRef = useRef(null);
  const inputRef = useRef(null);

  const filtered = foods.filter(f =>
    f.name.toLowerCase().includes(search.toLowerCase())
  );

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const observer = new ResizeObserver(([entry]) => {
      setIsNarrow(entry.contentRect.width < 420);
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const handleSearchToggle = () => {
    setSearchOpen(prev => {
      if (prev) { setSearch(""); }
      else { setTimeout(() => inputRef.current?.focus(), 50); }
      return !prev;
    });
  };

  return (
    <div className={styles.productGrid} ref={containerRef}>
      <div className={styles.productGridHeader}>
        <h2 className={styles.productGridTitle}>Product</h2>

        <div className={styles.searchWrapper}>
          {isNarrow ? (
            <>
              {searchOpen && (
                <input
                  ref={inputRef}
                  className={`${styles.searchInput} ${styles.searchInputNarrow}`}
                  placeholder="Search..."
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                />
              )}
              <button className={styles.searchIconBtn} onClick={handleSearchToggle}>
                {searchOpen
                  ? <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                  : <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
                }
              </button>
            </>
          ) : (
            <input
              className={styles.searchInput}
              placeholder="Search..."
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
          )}
        </div>
      </div>

      <div className={styles.grid}>
        {filtered.map(food => (
          <ProductCard key={food.id} food={food} onClick={() => onAddToCart(food)} />
        ))}
      </div>
    </div>
  );
}
