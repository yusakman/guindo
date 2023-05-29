import axios from "axios";

// // Notes
// // Flow App
// // User dateng, kita suguhkan kartu kartu termahal
// // Kalo user ketik nama di search, otomatis nyari data static yang udah diunduh
// // Khususnya proto id
// // Pas user click, akan ada pilihan untuk ganti "Meteorite", "Shadow", "Gold", sama "Shiny"
// // Harga akan update saat user klik jenish yang lain
// // Setelah itu user bisa tambah ke keranjang
// // Setalah itu user bisa checkout,
// // Data-data kartu yang sudah ditambahkan akan diproses secara manual

// Get order
export const getSellOrder = async (id, quality) => {
  let result;

  // Example
  // proto: ["231"]
  // quality: ["Meteorite"]
  const sellMetadata = encodeURI(
    JSON.stringify({ proto: [id], quality: [quality] })
  );

  //   params: {status: 'active', include_fees: 'true'}
  const options = {
    method: "GET",
    url: "https://api.x.immutable.com/v3/orders",
    params: {
      page_size: 10,
      direction: "asc",
      order_by: "buy_quantity_with_fees",
      buy_token_type: "eth",
      status: "active",
      sell_metadata: sellMetadata,
      include_fees: "true",
    },
    headers: { "Content-Type": "application/json" },
  };

  await axios
    .request(options)
    .then((res) => {
      result = res.data;
    })
    .catch((error) => {
      console.error(error);
    });

  console.log("result of orders in apiservices", result);
  return result;
};

// export const getCollection = async () => {
//   const address = `0xacb3c6a43d15b907e8433077b6d38ae40936fe2c`;
//   let result;

//   const options = {
//     method: "GET",
//     url: `https://api.x.immutable.com/v1/collections/${address}`,
//     headers: { "Content-Type": "application/json" },
//   };

//   console.log("Trying to call name...");

//   axios
//     .request(options)
//     .then((res) => {
//       result = res.data;
//       console.log("result", result);
//     })
//     .catch((error) => {
//       console.error(error);
//     });

//   return result;
// };

// Get card based on proto and quality
// export const getCardPrice = async (id, quality) => {
//   let result;

//   const metadaCard = encodeURI(
//     JSON.stringify({ proto: ["231"], quality: ["Meteorite"] })
//   );

//   const options = {
//     method: "GET",
//     url: "https://api.x.immutable.com/v1/assets",
//     params: {
//       direction: "asc",
//       status: "imx",
//       metadata: metadaCard,
//       sell_orders: "true",
//       include_fees: "true",
//       collection: "0xacb3c6a43d15b907e8433077b6d38ae40936fe2c",
//     },
//     headers: { "Content-Type": "application/json" },
//   };

//   console.log("Trying to call card....");

//   axios
//     .request(options)
//     .then((res) => {
//       result = res.data;
//       console.log("result of card", result);
//     })
//     .catch((error) => {
//       console.error(error);
//     });

//   return result;
// };
