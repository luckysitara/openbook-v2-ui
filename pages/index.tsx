import Head from "next/head";
import { useEffect, useState } from "react";

import React from "react";
import { fetchData, getMarket } from "../utils/openbook";
import { BN } from "@coral-xyz/anchor";
import { MarketAccount } from "@openbook-dex/openbook-v2";
import { useOpenbookClient } from "../hooks/useOpenbookClient";
import { PublicKey } from "@solana/web3.js";
import { useWallet } from "@solana/wallet-adapter-react";
import { ButtonState } from "../components/Button";
import { toast } from "react-hot-toast";
import MarketTable from "../components/MarketTable";
import MarketDetail from "../components/MarketDetail";
import OrderBook from "../components/OrderBook";
import Loader from "../components/Loader";

function priceData(key) {
  const shiftedValue = key.shrn(64); // Shift right by 64 bits
  return shiftedValue.toNumber(); // Convert BN to a regular number
}

export default function Home() {
  // const { publicKey, signTransaction, connected, wallet } = useWallet();
  const [asks, setAsks] = useState([]);
  const [bids, setBids] = useState([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [markets, setMarkets] = useState([
    { market: "", baseMint: "", quoteMint: "", name: "" },
  ]);
  const [market, setMarket] = useState({} as MarketAccount);
  const [marketPubkey, setMarketPubkey] = useState(PublicKey.default);
  // const [txState, setTxState] = React.useState<ButtonState>("initial");

  const columns = [
    {
      key: "name",
      label: "Name",
    },
    {
      key: "market",
      label: "Pubkey",
    },
    {
      key: "baseMint",
      label: "Base Mint",
    },
    {
      key: "quoteMint",
      label: "Quote Mint",
    },
  ];

  const openbookClient = useOpenbookClient();

  useEffect(() => {
    setIsLoading(true);
    fetchData()
      .then((res) => {
        setMarkets(res);

        fetchMarket(res[0].market);
        setIsLoading(false);
        setMarketPubkey(new PublicKey(res[0].market));
      })
      .catch((e) => {
        console.log(e);
      });
    console.log("markets", markets);
    console.log("markets", markets);
  }, []);

  const fetchMarket = async (key: string) => {
    const market = await getMarket(openbookClient, key);
    setMarket(market);
    setMarketPubkey(new PublicKey(key));

    const booksideAsks = await openbookClient.getBookSide(market.asks);
    const booksideBids = await openbookClient.getBookSide(market.bids);
    if (booksideAsks === null || booksideBids === null) return;
    const asks = openbookClient.getLeafNodes(booksideAsks).sort((a, b) => {
      const priceA = priceData(a.key);
      const priceB = priceData(b.key);
      return priceB - priceA;
    });
    setAsks(asks);
    const bids = openbookClient.getLeafNodes(booksideBids).sort((a, b) => {
      const priceA = priceData(a.key);
      const priceB = priceData(b.key);
      return priceB - priceA;
    });
    setBids(bids);
  };

  const crankMarket = async () => {
    let accountsToConsume = await openbookClient.getAccountsToConsume(market);
    console.log("accountsToConsume", accountsToConsume);

    if (accountsToConsume.length > 0) {
      const tx = await openbookClient.consumeEvents(
        marketPubkey,
        market,
        new BN(5),
        accountsToConsume
      );
      console.log("consume events tx", tx);
      toast("Consume events tx: " + tx.toString());
    }
  };

  return (
    <div>
      <Head>
        <title>Openbook DEX v3</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {isLoading ? (
        <Loader />
      ) : (
        <div className="flex flex-col w-full h-full relative text-main-text  ">
          <div className="flex h-[58.5vh] ">
            <div className="w-full table-fixed overflow-y-scroll  ">
              <h1 className="font-bold p-5 text-4xl text-title-text sticky top-0 z-50  border-b border-gray-800">
                Open Markets
              </h1>
              <MarketTable
                columns={columns}
                fetchMarket={fetchMarket}
                markets={markets}
              />
            </div>

            {market.asks ? <MarketDetail market={market} /> : <Loader />}
          </div>
          {market.asks ? (
            <div>
              <OrderBook market={market} asks={asks} bids={bids} />
            </div>
          ) : (
            <h1 className="text-center">This market has been closed!</h1>
          )}
        </div>
      )}
    </div>
  );
}
