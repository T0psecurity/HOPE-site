import React, { useEffect } from "react";
import "./App.css";
import "@shoelace-style/shoelace/dist/themes/light.css";
import { setBasePath } from "@shoelace-style/shoelace/dist/utilities/base-path";
import { ToastContainer } from "react-toastify";
import { WalletManagerProvider, WalletType } from "@noahsaso/cosmodal";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Main from "./pages/Main";
import useContract from "./hook/useContract";
import { useAppDispatch, useAppSelector } from "./app/hooks";
import { deleteAccount } from "./features/accounts/accountsSlice";

import "react-toastify/dist/ReactToastify.css";

setBasePath(
  "https://cdn.jsdelivr.net/npm/@shoelace-style/shoelace@2.0.0-beta.64/dist/"
);
function App() {
  const dispatch = useAppDispatch();
  const { initContracts } = useContract();
  const account = useAppSelector((state) => state.accounts.keplrAccount);
  const config = useAppSelector((state) => state.connection.config);
  useEffect(() => {
    // remove existing account
    if (account) {
      dispatch(deleteAccount(account.address));
    }
    //init contract
    initContracts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="main">
      <WalletManagerProvider
        defaultChainId={config.chainId}
        enabledWalletTypes={[WalletType.Keplr, WalletType.WalletConnectKeplr]}
        localStorageKey="keplr-wallet"
        walletConnectClientMeta={{
          name: "Hope Galaxy App",
          description: "Hope Galaxy App",
          url: "https://mint.hopegalaxy.app/",
          icons: ["https://mint.hopegalaxy.app/logo.png"],
        }}
      >
        <Header />
        <Main />
        <Footer />
        <ToastContainer
          position="top-right"
          autoClose={5000}
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          hideProgressBar
          newestOnTop
          closeOnClick
          theme="colored"
        />
      </WalletManagerProvider>
    </div>
  );
}

export default App;
