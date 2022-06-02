import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Link from "../../util/ActiveLink";
import {
  NotificationContainer,
  NotificationManager,
} from "react-notifications";
import "react-notifications/lib/notifications.css";
import styled from "styled-components";

import { useSigningClient } from "../../contexts/cosmwasm";
import ToggleSwitch from "../ToggleSwitch";

const NavLink = styled.a`
  white-space: nowrap;
  color: ${(props) =>
    !props.defaultChecked && props.slot === "/gFOTmodule"
      ? "#4B365B"
      : "white"} !important;
  cursor: pointer;
  padding-top: 0 !important;
  padding-bottom: 0 !important;
  font-size: 19px !important;
  line-height: 28px !important;
  padding-left: unset !important;
  padding-right: unset !important;
  &.active {
    color: ${(props) =>
      props.slot === "gFOTmodule" ? "red" : "black"} !important;
  }
  padding-left: unset !important;
  padding-right: unset !important;
`;

const Navbar = ({ toggle, setToggle }) => {
  const {
    walletAddress,
    connectWallet,
    signingClient,
    disconnect,
    loading,
    getBalances,
    nativeBalance,
  } = useSigningClient();
  const router = useRouter();
  const { pathname } = router;

  const handleConnect = () => {
    if (walletAddress.length === 0) {
      connectWallet(false);
    } else {
      disconnect();
    }
  };

  useEffect(() => {
    let account = localStorage.getItem("address");
    if (account != null) {
      connectWallet(true);
    }
  }, []);

  useEffect(() => {
    if (!signingClient || walletAddress.length === 0) return;
    getBalances();
  }, [walletAddress, signingClient]);

  const [showMenu, setshowMenu] = useState(false);
  const toggleMenu = () => {
    setshowMenu(!showMenu);
  };
  // useEffect(() => {
  //   let elementId = document.getElementById("navbar");
  //   document.addEventListener("scroll", () => {
  //     if (window.scrollY > 80) {
  //       elementId.classList.add("is-sticky");
  //     } else {
  //       elementId.classList.remove("is-sticky");
  //     }
  //   });
  //   window.scrollTo(0, 0);
  // }, []);

  return (
    <>
      <NotificationContainer />
      <div id="navbar" className="navbar-area w-full">
        {/* <div className="raimo-responsive-nav">
          <div className="container">
            <div className="raimo-responsive-menu">
              <Link className="flex" href="https://www.fortisoeconomia.com/">
                <img src="/images/mobileapp.png"
                  style={{ display: "block", marginLeft: "auto", marginRight: "auto", width: "100%", height: "100%", marginBottom: "1000px", cursor:"pointer" }} />
              </Link>
              <div className="responsive-others-option">
                <div className="option-item">
                </div>
              </div>
            </div>
          </div>
        </div> */}
        <nav
          className={
            showMenu
              ? "show navbar navbar-expand-md navbar-light"
              : "navbar navbar-expand-md navbar-light hide-menu"
          }
        >
          <div
            className="container"
            style={{ padding: "20px 32px", maxWidth: "unset" }}
          >
            <Link className="flex" href="https://www.fortisoeconomia.com/">
              <div className="d-flex flex-row align-items-center">
                <a className="justify-content-center w-full">
                  <img
                    src={`/images/castle${
                      pathname === "/gFOTmodule" ? "-dark" : "new"
                    }.png`}
                    alt="logo"
                    className="justify-right"
                    style={{ marginRight: "20px", cursor: "pointer" }}
                  />
                </a>
              </div>
            </Link>

            <div className="collapse navbar-collapse mean-menu">
              <ul
                className="navbar-nav"
                style={{
                  width: "100%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-around",
                }}
              >
                <li className="nav-item">
                  <Link href="/airdrop" activeClassName="active">
                    <NavLink
                      className="nav-link"
                      slot={pathname}
                      defaultChecked={toggle}
                    >
                      Airdrop
                    </NavLink>
                  </Link>
                </li>
                {/*<li className="nav-item">
                  <Link href="/publicsale" activeClassName="active">
                    <a className="nav-link">Public Sale</a>
                  </Link>
                  </li>*/}
                <li className="nav-item">
                  <Link href="/burnmodule" activeClassName="active">
                    <NavLink
                      className="nav-link"
                      slot={pathname}
                      defaultChecked={toggle}
                    >
                      Burn Module
                    </NavLink>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link href="/gFOTmodule" activeClassName="active">
                    <NavLink
                      className="nav-link"
                      slot={pathname}
                      defaultChecked={toggle}
                    >
                      Grand Module (gFOT)
                    </NavLink>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link href="/sFOTmodule" activeClassName="active">
                    <NavLink
                      className="nav-link"
                      slot={pathname}
                      defaultChecked={toggle}
                    >
                      sFOT Module
                    </NavLink>
                  </Link>
                </li>
                {/*<li className="nav-item">
                  <Link href="/burntostake" activeClassName="active">
                    <a className="nav-link" style={{whiteSpace:"nowrap"}}>Burn to Stake</a>
                  </Link>
                </li>*/}
                {/*<li className="nav-item">
                  <Link href="/legionnairecoins" activeClassName="active">
                    <a className="nav-link" style={{whiteSpace:"nowrap"}}>Legionnaire Coins</a>
                  </Link>
                </li>*/}
                <li className="nav-item">
                  <Link href="/nwallet" activeClassName="active">
                    <NavLink
                      className="nav-link"
                      slot={pathname}
                      defaultChecked={toggle}
                    >
                      Wallet
                    </NavLink>
                  </Link>
                </li>
                <ToggleSwitch toggle={toggle} setToggle={setToggle} />
                <button
                  className={`default-btn ${
                    !toggle && pathname === "/gFOTmodule" ? "secondary-btn" : ""
                  }`}
                  onClick={handleConnect}
                >
                  {walletAddress
                    ? walletAddress.substring(0, 12) +
                      "..." +
                      walletAddress.substring(
                        walletAddress.length - 6,
                        walletAddress.length
                      )
                    : "Connect Wallet"}
                </button>
              </ul>
              {/* <div className="others-option">
                <div className="d-flex align-items-center">
                  {walletAddress.length == 0 ? (
                    <></>
                  ) : (
                    <div
                      className="banner-wrapper-content"
                      style={{ marginLeft: "30px" }}
                    >
                    </div>
                  )}
                  <div className="flex flex-grow lg:flex-grow-0 max-w-full ms-2">
                    <button
                      className="block default-btn w-full max-w-full truncate"
                      onClick={handleConnect}
                    >
                      <i className="bx bxs-contact"></i>
                      {walletAddress
                        ? walletAddress.substring(0, 12) +
                        "..." +
                        walletAddress.substring(
                          walletAddress.length - 6,
                          walletAddress.length
                        )
                        : "Connect Wallet"}
                    </button>
                  </div>
                </div>
              </div> */}
            </div>
          </div>
        </nav>
      </div>
    </>
  );
};

export default Navbar;
