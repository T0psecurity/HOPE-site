import React, { useEffect } from "react";
import "./App.css";
import "@shoelace-style/shoelace/dist/themes/light.css";
import { setBasePath } from "@shoelace-style/shoelace/dist/utilities/base-path";
import { ToastContainer } from "react-toastify";
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
