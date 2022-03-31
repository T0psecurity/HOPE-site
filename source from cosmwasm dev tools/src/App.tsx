import React, { useEffect } from "react";
import "./App.css";
import "@shoelace-style/shoelace/dist/themes/light.css";
import { setBasePath } from "@shoelace-style/shoelace/dist/utilities/base-path";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Main from "./pages/Main";
import { useAppDispatch, useAppSelector } from "./app/hooks";
import {
  contractAccounts,
  deleteAccount,
  importContract,
} from "./features/accounts/accountsSlice";

setBasePath(
  "https://cdn.jsdelivr.net/npm/@shoelace-style/shoelace@2.0.0-beta.64/dist/"
);
function App() {
  const dispatch = useAppDispatch();
  const contracts = useAppSelector(contractAccounts);
  const account = useAppSelector((state) => state.accounts.keplrAccount);
  useEffect(() => {
    // remove existing account
    if (account) {
      dispatch(deleteAccount(account.address));
    }
    // remove existing contracts
    if (contracts.length) {
      for (let i = 0; i < contracts.length; i++) {
        const contract = contracts[i];
        dispatch(deleteAccount(contract.address));
      }
    }
    // import target contract
    dispatch(
      importContract(
        "juno150vk7u753kt62uh96mws8tt7vgrtfn5rzva0vt40p97rw40z70wsngj7c9"
      )
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="main">
      <Header />
      <Main />
      <Footer />
    </div>
  );
}

export default App;
