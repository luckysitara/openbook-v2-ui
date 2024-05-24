import { nameToString } from "@openbook-dex/openbook-v2";

export default function MarketDetail({ market, crankMarket }) {
  return (
    <>
      <div className="grid grid-cols-2 gap-2 text-center border-r-4 border-b-4 border-l-4">
        <div className="">
          <p className="font-bold">Name </p>
          {market.asks ? nameToString(market.name) : ""}
          <p className="font-bold">Base Mint </p>
          {market.asks ? market.baseMint.toString() : ""}
          <p className="font-bold">Quote Mint </p>
          {market.asks ? market.quoteMint.toString() : ""}
          <p className="font-bold">Bids </p>
          {market.asks ? market.bids.toString() : ""}
          <p className="font-bold">Asks </p>
          {market.asks ? market.asks.toString() : ""}
          <p className="font-bold">Event Heap </p>
          {market.asks ? market.eventHeap.toString() : ""}
        </div>

        <div className="">
          <p className="font-bold">Base Deposits </p>
          {market.asks ? market.baseDepositTotal.toString() : ""}
          <p className="font-bold">Quote Deposits </p>
          {market.asks ? market.quoteDepositTotal.toString() : ""}
          <p className="font-bold">Taker Fees </p>
          {market.asks ? market.takerFee.toString() : ""}
          <p className="font-bold">Maker Fees </p>
          {market.asks ? market.makerFee.toString() : ""}
          <p className="font-bold">Base Lot Size </p>
          {market.asks ? market.baseLotSize.toString() : ""}
          <p className="font-bold">Quote Lot Size </p>
          {market.asks ? market.quoteLotSize.toString() : ""}
          <p className="font-bold">Base Decimals </p>
          {market.asks ? market.baseDecimals : ""}
          <p className="font-bold">Quote Decimals </p>
          {market.asks ? market.quoteDecimals : ""}
        </div>
      </div>
      <button
        className="items-center text-center bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={(e: any) => crankMarket()}
      >
        CRANK
      </button>
    </>
  );
}
