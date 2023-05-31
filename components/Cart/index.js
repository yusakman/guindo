import styles from "./styles.module.scss";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import IconButton from "@mui/material/IconButton";
import { Button } from "@mui/material";

import useStore from "@/store/store";
import { useEffect, useState } from "react";
import { formatCurrency, formatString } from "@/helper/formatter";
import Link from "next/link";
import InputForm from "../Form";
import { phoneNumber } from "@/const";

const Cart = () => {
  const cartList = useStore((state) => state.cartList);
  const addCard = useStore((state) => state.addCard);
  const removeCard = useStore((state) => state.removeCard);
  const [totalPrice, setTotalPrice] = useState("");
  const [encode, setEncode] = useState();
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");

  useEffect(() => {
    const calculateTotal = () => {
      if (!!cartList.length) {
        let total = 0;
        cartList.forEach((element) => {
          total += element.totalInIDR * element.amount;
        });

        const formatted = formatCurrency(total);
        setTotalPrice(formatted);
        return formatted;
      }
    };
    calculateTotal();
  }, [cartList]);

  useEffect(() => {
    const getLink = async () => {
      // Construct new object with name and address
      const input = {
        name: name,
        address: address,
        total: totalPrice,
      };

      const msg = await formatString(cartList, input);
      const message = encodeURIComponent(msg);
      setEncode(message);
    };

    getLink();
  }, [cartList, name, address, totalPrice]);

  const props = {
    setName,
    setAddress,
  };

  return (
    <div className={styles[`cart`]}>
      <div className={styles[`cart-title`]}>
        <p>List Kartu Yang Anda Beli</p>
      </div>
      {cartList &&
        !!cartList.length &&
        cartList.map((item, index) => {
          return (
            <div className={styles[`cart-content`]} key={index}>
              <p>- - - - - - - -</p>
              <p>Nama: {item.name}</p>
              <p>Kualitas: {item.quality}</p>
              <div className={styles[`button`]}>
                <p>Jumlah Item: {item.amount}</p>
                <IconButton
                  aria-label={`add-button`}
                  size="small"
                  className={styles[`add-button`]}
                  onClick={() => addCard(item)}
                >
                  <AddCircleIcon />
                </IconButton>
                <IconButton
                  aria-label={`sub-button`}
                  size="small"
                  className={styles[`sub-button`]}
                  onClick={() => removeCard(item)}
                >
                  <RemoveCircleOutlineIcon />
                </IconButton>
              </div>
              <p>Total IDR: {item.totalInIDR * item.amount}</p>
              <p>- - - - - - - -</p>
            </div>
          );
        })}

      {cartList.length ? (
        <>
          <div className={styles[`cart-total`]}>
            <p>Total Semuanya: {totalPrice !== "" && totalPrice}</p>
          </div>
          <div className={styles[`input-form`]}>
            <InputForm {...props} />
          </div>
          <div className={styles[`cart-button`]}>
            <Button
              variant="contained"
              className={styles["button-primary"]}
              style={{ width: "150px" }}
            >
              <Link
                href={`https://api.whatsapp.com/send?phone=${phoneNumber}&text=${encode}`}
                rel="noopener noreferrer"
                target="_blank"
              >
                Lanjut Bayar
              </Link>
            </Button>
          </div>
        </>
      ) : (
        <>
          <div className={styles[`cart-total`]}>
            <p>Sepertinya anda belum membeli kartu apapun</p>
            <Link href={"/"}>Klik Link Ini Untuk Belanja</Link>
          </div>
          <div className={styles[`cart-button`]}>
            <Button
              variant="contained"
              className={styles["button-primary"]}
              style={{ width: "150px" }}
              disabled
            >
              Lanjut Bayar
            </Button>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
