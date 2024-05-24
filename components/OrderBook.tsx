import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  getKeyValue,
} from "@nextui-org/react";
import { priceLotsToUi } from "@openbook-dex/openbook-v2";
import { PublicKey } from "@solana/web3.js";

const columnsBook = [
  {
    key: "owner",
    label: "OWNER",
  },
  {
    key: "quantity",
    label: "SIZE",
  },
  {
    key: "key",
    label: "PRICE",
  },
];
interface Order {
  owner: PublicKey;
  quantity: any;
  key: any;
}

interface OrderBookProps {
  asks: Order[];
  bids: Order[];
  market: any;
}
function priceData(key: any): number {
  const shiftedValue = key.shrn(64); // Shift right by 64 bits
  return shiftedValue.toNumber(); // Convert BN to a regular number
}

export default function OrderBook({ asks, bids, market }: OrderBookProps) {
  function priceDataToUI(key: any) {
    const shiftedValue = key.shrn(64); // Shift right by 64 bits
    const priceLots = shiftedValue.toNumber(); // Convert BN to a regular number

    return priceLotsToUi(market, priceLots);
  }
  return (
    <div className=" h-[26.5vh]">
      <div>
        <h3 className="text-center mt-8 mb-5 text-xl ">
          ASKS -------- The Book -------- BIDS
        </h3>
      </div>
      <div className="grid grid-cols-2 gap-2 border-2 overflow-y-scroll h-full">
        <Table isStriped selectionMode="single" aria-label="OrderBook">
          <TableHeader className="text-left" columns={columnsBook}>
            {(column) => (
              <TableColumn key={column.key}>{column.label}</TableColumn>
            )}
          </TableHeader>
          <TableBody items={asks}>
            {(item) => (
              <TableRow key={priceData(item.key)}>
                {(columnKey) => (
                  <TableCell>
                    {columnKey == "owner"
                      ? getKeyValue(item, columnKey)
                          .toString()
                          .substring(0, 4) +
                        ".." +
                        getKeyValue(item, columnKey).toString().slice(-4)
                      : columnKey == "quantity"
                      ? getKeyValue(item, columnKey).toString()
                      : priceDataToUI(item.key)}
                  </TableCell>
                )}
              </TableRow>
            )}
          </TableBody>
        </Table>

        <Table isStriped selectionMode="single" aria-label="OrderBook">
          <TableHeader columns={columnsBook}>
            {(column) => (
              <TableColumn key={column.key}>{column.label}</TableColumn>
            )}
          </TableHeader>
          <TableBody items={bids}>
            {(item) => (
              <TableRow key={priceData(item.key)}>
                {(columnKey) => (
                  <TableCell>
                    {columnKey == "owner"
                      ? getKeyValue(item, columnKey)
                          .toString()
                          .substring(0, 4) +
                        ".." +
                        getKeyValue(item, columnKey).toString().slice(-4)
                      : columnKey == "quantity"
                      ? getKeyValue(item, columnKey).toString()
                      : priceDataToUI(item.key)}
                  </TableCell>
                )}
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
