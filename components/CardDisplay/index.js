import { useEffect, useState } from "react";
import cardsDisplay from "./cardsDisplay.json";
import styles from "./styles.module.scss";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import Card from "../Card";
import Image from "next/image";
import cardTest1 from "../../assets/cardtest1.png";
import cardTest2 from "../../assets/cardtest2.png";
import cardTest3 from "../../assets/cardtest3.png";
import cardTest4 from "../../assets/cardtest4.png";
import { useIsMounted } from "@/hooks/useIsMounted";
import { IS_DEV } from "@/const";
import { data } from "@/conf/cardConfig";

const CardDisplay = (props) => {
  const { searchCard } = props;
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [cardList, setCardList] = useState([]);
  const [searchResult, setSearchResult] = useState({});
  const [cardDetail, setCardDetail] = useState({});
  const mounted = useIsMounted();

  useEffect(() => {
    const handleSearchCard = () => {
      if (searchCard) {
        console.log("Searching for cards", searchCard);
        const card = data.filter(
          (item) =>
            item.name.toLowerCase().includes(searchCard.toLowerCase()) === true
        );
        console.log("card is", card);
        return card;
      }
    };
    setSearchResult(handleSearchCard);
  }, [searchCard]);

  const handleOpen = (card) => {
    console.log("name", card.name);
    console.log("id", card.id);
    setCardDetail({ name: card.name, id: card.id });
    setLoading(true);
    setOpen(true);
    setLoading(false);

    return <div></div>;
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    setCardList(cardsDisplay);
  }, []);

  return (
    <div className={styles["cardList-container"]}>
      <div>
        <Backdrop
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={open}
        >
          <Card cardDetail={cardDetail} close={handleClose}></Card>
          {/* <CircularProgress color="inherit" /> */}
        </Backdrop>
      </div>
      {!IS_DEV && mounted && searchCard ? (
        searchResult ? (
          searchResult.map((item, index) => (
            <div
              className={styles["card-container"]}
              key={index}
              onClick={(e) => handleOpen(item)}
            >
              <Image
                src={`https://card.godsunchained.com/?id=${item.id}&q=4`}
                alt="sample post"
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                style={{
                  objectFit: "cover",
                }}
              />
            </div>
          ))
        ) : (
          <p>{`Kartu tidak ditemukan, coba cek lagi nama kartunya boskuh`}</p>
        )
      ) : (
        cardList?.map((item, index) => (
          <div
            className={styles["card-container"]}
            key={index}
            onClick={(e) => handleOpen(item)}
          >
            <Image
              src={`https://card.godsunchained.com/?id=${item.id}&q=4`}
              alt="sample post"
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              style={{
                objectFit: "cover",
              }}
            />
          </div>
        ))
      )}
    </div>
  );
};

export default CardDisplay;
