import styles from "./styles.module.scss"

const Hero = () => {
  return (
    <div className={styles.hero}>
      <div className="upper-text">
        <p>Beli Kartu God's Unchained</p>
      </div>
      <div className="lower-text">
        <p>Bayar Pake Rupiah</p>
      </div>
    </div>
  );
};

export default Hero;
