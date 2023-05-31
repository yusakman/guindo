import { getSellOrder } from "@/lib/ApiServices";
import { formatCurrency, toDecimal, toIDR } from "@/helper/formatter";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import styles from "./styles.module.scss";

import { CgCloseR } from "react-icons/cg";
import { IconContext } from "react-icons";
import { Button } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import DiamondIcon from "@mui/icons-material/Diamond";
import CircularProgress from "@mui/material/CircularProgress";

import { Quality } from "./quality";

import useStore from "@/store/store";

const Card = ({ cardDetail, close }) => {
  const { name, id } = cardDetail;
  const [price, setPrice] = useState("");
  const [quality, setQuality] = useState("Meteorite");
  const [imgParam, setImageParam] = useState(4);
  const [totalInIDR, setTotalInIDR] = useState(0);
  const [amountInCartList, setAmountInCartList] = useState(0);

  const cartList = useStore((state) => state.cartList);
  const addcard = useStore((state) => state.addCard);

  useEffect(() => {
    // Four Qualities
    // Meteorite
    // Shadow
    // Gold
    // Diamond
    if (id && quality) {
      const orders = async () => {
        const result = await getSellOrder(id.toString(), quality);

        if (!!result.length) {
          const totalInWei = await result[0].buy.data.quantity_with_fees;
          const totalInDecimal = toDecimal(totalInWei);
          const totalInIDR = await toIDR(totalInDecimal);
          setTotalInIDR(totalInIDR);

          // totalInIDR need to be sent to state
          const formatPrice = formatCurrency(totalInIDR);
          setPrice(formatPrice);
        } else {
          setTotalInIDR(0);
          setPrice("0");
        }
      };
      orders();
    }
  }, [id, quality]);

  useEffect(() => {
    if (!!cartList.length) {
      setAmountInCartList(cartList.length);
    }
  }, [cartList]);

  const handleQuality = (item) => {
    setQuality(item.quality);
    setImageParam(item.value);
  };

  const handleCart = (e) => {
    e.preventDefault();

    // Construct the object to send to global state
    const card = {
      name: name,
      quality: quality,
      totalInIDR: totalInIDR ? totalInIDR : 0,
      amount: 1,
    };

    // Send to cartList
    addcard(card);
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
          {price && price !== "0" ? (
            <p>{price}</p>
          ) : (
            <CircularProgress color="inherit" />
          )}
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
              <Link href={`/checkout`}>Beli</Link>
            </Button>

            <IconButton
              aria-label="add to shopping cart"
              size="large"
              className={styles["cart-icon"]}
              onClick={(e) => handleCart(e)}
            >
              <AddShoppingCartIcon />
            </IconButton>
          </div>
          {amountInCartList > 0 && (
            <div className={styles[`checkout-container`]}>
              <p>Ada barang di keranjang</p>
              <Link href={`/checkout`}>
                <p>Cek Keranjang</p>
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Card;
