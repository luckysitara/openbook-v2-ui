import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";

function NavBar() {
  return (
    <div className="flex text-[#b2aacd] bg-[#1e1924]  p-2w justify-between items-center border-b border-gray-800">
      {/* <div className="border-l bg-slate-900 border-gray-200 p-4 "> */}
      <div className="px-4 text-sm">Welcome to OpenDex, User !!!</div>
      <WalletMultiButton className="bg-slate-500" />
      {/* </div> */}
    </div>
  );
}

export default NavBar;
