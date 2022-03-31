import React, { useEffect } from "react";
import "./App.css";
import "@shoelace-style/shoelace/dist/themes/light.css";
import { setBasePath } from "@shoelace-style/shoelace/dist/utilities/base-path";
import { ToastContainer } from "react-toastify";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Main from "./pages/Main";
import { useAppDispatch, useAppSelector } from "./app/hooks";
import {
  contractAccounts,
  deleteAccount,
  importContract,
} from "./features/accounts/accountsSlice";

import "react-toastify/dist/ReactToastify.css";

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
    // import target contracts
    dispatch(
      importContract(
        "juno1ecjjp9tdvyqnezafkkh4mkdlyx7rgfh98taaeq8suqwdk26z9agsnwamtp" // token contract
      )
    );
    dispatch(
      importContract(
        "juno1ja0sevv2pw2ntsjlsh4xtu66jpg2zph2qyrlvxy3mtyg0z4qnmxqxfjahc" // contract
      )
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="main">
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
    </div>
  );
}

export default App;
