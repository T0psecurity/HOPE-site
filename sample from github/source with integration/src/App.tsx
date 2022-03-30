import React from "react";
import "./App.css";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Main from "./pages/Main";
import { SdkProvider } from "./services/client/wallet"
import { config } from "./config"

function App() {
  return (
    <div className="App">
      <SdkProvider config={config}>
        <Header />
        <Main />
        <Footer />
      </SdkProvider>
    </div>
  );
}

export default App;
