import styles from "../../../css/pos.module.css";

export default function ProductCard({ food, onClick }) {
  return (
    <div className={styles.card} onClick={onClick}>
      <img className={styles.cardImage} src={food.image} alt="" />
      <p className={styles.cardName}>{food.name}</p>
      <p className={styles.cardPrice}>$ {food.price}</p>
    </div>
  );
}
