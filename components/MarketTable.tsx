import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  getKeyValue,
} from "@nextui-org/react";
import { LinkIcon } from "@heroicons/react/24/outline";

type Column = {
  key: string;
  label: string;
};

type Market = {
  market: string;
  baseMint: string;
  quoteMint: string;
  name: string;
};

interface MarketTableProps {
  columns: Column[];
  fetchMarket: (key: string) => Promise<void>;
  markets: Market[];
}

export default function MarketTable({
  columns,
  fetchMarket,
  markets,
}: MarketTableProps) {
  const linkedPk = (pk: string) => (
    <div>
      {pk}
      <a
        href={`https://solscan.io/account/${pk}`}
        target="_blank"
        className="pl-2"
      >
        <LinkIcon className="w-4 h-4 inline" />
      </a>
    </div>
  );

  return (
    <>
      <div className="flex flex-col gap-3 pb-2.5">
        <Table
          isStriped
          selectionMode="single"
          aria-label="Markets"
          onRowAction={async (key) => fetchMarket(key.toString())}
        >
          <TableHeader columns={columns}>
            {(column) => (
              <TableColumn key={column.key}>{column.label}</TableColumn>
            )}
          </TableHeader>
          <TableBody items={markets}>
            {(item) => (
              <TableRow key={item.market}>
                {(columnKey) => (
                  <TableCell>
                    {columnKey == "name"
                      ? getKeyValue(item, columnKey)
                      : linkedPk(getKeyValue(item, columnKey))}
                  </TableCell>
                )}
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </>
  );
}
