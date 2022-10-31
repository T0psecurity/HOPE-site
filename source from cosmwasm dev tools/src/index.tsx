import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { persistor, store } from "./app/store";
import { Provider } from "react-redux";
import * as serviceWorker from "./serviceWorker";
import { PersistGate } from "redux-persist/es/integration/react";
import { WalletManagerProvider, WalletType } from "@noahsaso/cosmodal";

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <WalletManagerProvider
          // defaultChainId={config.chainId}
          defaultChainId="juno-1"
          enabledWalletTypes={[WalletType.Keplr, WalletType.WalletConnectKeplr]}
          localStorageKey="keplr-wallet"
          walletConnectClientMeta={{
            name: "Hope Galaxy App",
            description: "Hope Galaxy App",
            url: "https://mint.hopegalaxy.app/",
            icons: ["https://mint.hopegalaxy.app/logo.png"],
          }}
        >
          <App />
        </WalletManagerProvider>
      </PersistGate>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
