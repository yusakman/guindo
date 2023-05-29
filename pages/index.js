import Head from "next/head";
import Image from "next/image";
import SearchBar from "@/components/SearchBar";
import Card from "@/components/Card";
import CardDisplay from "@/components/CardDisplay";
import { useState } from "react";

export default function Home() {
  const [searchCard, setSearchCard] = useState("");

  const handleSearchCard = (e) => {
    e.preventDefault();
    setSearchCard(e.target.value);
  };

  const props = {
    handleSearchCard,
    searchCard,
  };

  return (
    <>
      <Head>
        <title>Gu Indo</title>
        <meta name="description" content="Tempat Beli Kartu GU Pake Rupiah" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <SearchBar {...props} />
      <CardDisplay {...props} />
    </>
  );
}
