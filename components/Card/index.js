import { getSellOrder } from "@/lib/ApiServices";
import { toIDR } from "@/helper/formatter";
import { useEffect, useState } from "react";
import { CgCloseR, CgShoppingCart } from "react-icons/cg";
import styles from "./styles.module.scss";
import { IconContext } from "react-icons";
import { Button } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import DiamondIcon from "@mui/icons-material/Diamond";
import Image from "next/image";
import { Quality } from "./quality";

const Card = ({ cardDetail, close }) => {
  const { name, id } = cardDetail;
  const [card, setCard] = useState({});
  const [order, setOrder] = useState({});
  const [price, setPrice] = useState("");
  const [quality, setQuality] = useState("");
  const [imgParam, setImageParam] = useState(4);

  useEffect(() => {
    // Four Qualities
    // Meteorite
    // Shadow
    // Gold
    // Diamond
    // if (id && quality) {
    //   const orders = async () => {
    //     const data = await getSellOrder(id.toString(), quality);
    //     const result = data.result;
    //     const totalPrice = await result[0]?.buy.data.quantity_with_fees;
    //     const formattedResult = await toIDR(totalPrice);
    //     console.log("formatted Result", formattedResult);
    //     setPrice(formattedResult);
    //     return formattedResult;
    //   };
    //   orders();
    // }
  }, [id, quality]);

  const handleQuality = (item) => {
    console.log("Click", item);
    setQuality(item.quality);
    setImageParam(item.value);
  };

  return (
    <div className={styles["card-detail-container"]}>
      <div className={styles["header-container"]} onClick={close}>
        <IconContext.Provider value={{ className: styles["header-icon"] }}>
          <CgCloseR />
        </IconContext.Provider>
      </div>
      <div className={styles["content-container"]}>
        {id ? (
          <div className={styles["card-container"]}>
            <Image
              src={`https://card.godsunchained.com/?id=${id}&q=${imgParam}`}
              alt={name}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              style={{
                objectFit: "cover",
              }}
            />
          </div>
        ) : (
          <div className={styles["card-container"]}>
            <p>No image found</p>
          </div>
        )}

        <div className={styles["text-container"]}>
          <p>{name}</p>
          {price ? <p>{price}</p> : <p>{`Kayanya Belum Ada yang Jual`}</p>}
          <p>Beli Langsung Atau Masukin Keranjang Dulu</p>
          <div className={styles["quality-container"]}>
            {Quality.map((item, index) => (
              <IconButton
                aria-label={`${item.quality}`}
                size="medium"
                className={styles[`${item.quality.toLowerCase()}`]}
                onClick={() => handleQuality(item)}
                key={index}
              >
                <DiamondIcon />
              </IconButton>
            ))}
          </div>
          <div className={styles["button-container"]}>
            <Button
              variant="contained"
              className={styles["button-primary"]}
              style={{ width: "100px" }}
            >
              Beli
            </Button>
            <IconButton
              aria-label="add to shopping cart"
              size="large"
              className={styles["cart-icon"]}
            >
              <AddShoppingCartIcon />
            </IconButton>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
