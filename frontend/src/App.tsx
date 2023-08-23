import { Canvas } from "./components";
import { AddImage } from "./pages";
import { Route, Routes } from "react-router-dom";
import "@rainbow-me/rainbowkit/styles.css";
import { getDefaultWallets, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { configureChains, createConfig, WagmiConfig } from "wagmi";
import { optimism, goerli, localhost } from "wagmi/chains";
import { publicProvider } from "wagmi/providers/public";

const localhost2 = {
   id: 31337,
   name: "Localhost",
   network: "localhost",
   nativeCurrency: {
       decimals: 18,
       name: "Ether",
       symbol: "ETH",
  },
   rpcUrls: {
       default: {
           http: ["http://127.0.0.1:8545"],
      },
       public: {
           http: ["http://127.0.0.1:8545"],
      },
  },
};

const { chains, publicClient } = configureChains(
  [goerli, optimism, localhost, localhost2],
  [publicProvider()]
);

const { connectors } = getDefaultWallets({
  appName: "onChain Images",
  projectId: "fe544019d9c83ec387543f6a99f0a2ed",
  chains,
});

const wagmiConfig = createConfig({
  autoConnect: true,
  connectors,
  publicClient,
});

const App = () => {
  return (
    <>
      <WagmiConfig config={wagmiConfig}>
        <RainbowKitProvider chains={chains}>
          <Routes>
            <Route path="/add-image" element={<AddImage />} />
            <Route path="/create-image" element={<Canvas />} />
          </Routes>
        </RainbowKitProvider>
      </WagmiConfig>
    </>
  );
};

export default App;
