import Head from "next/head";
import Header from "@/components/Header";
import { useState } from "react";
import Cart from "@/components/Cart";

export default function Home() {

  return (
    <>
      <Head>
        <title>Gu Indo</title>
        <meta name="description" content="Tempat Beli Kartu GU Pake Rupiah" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <Cart />
    </>
  );
}
