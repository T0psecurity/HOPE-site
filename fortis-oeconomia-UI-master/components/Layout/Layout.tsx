import Head from 'next/head';
import React, { useState, createContext, useContext, useEffect } from 'react';
import { useRouter } from 'next/router';
import styled from 'styled-components'

//navbar
import Navbar from './Navbar';

//footer
import Footer from './Footer';

//styled components
// background: ${props => props.slot==='/gFOTmodule' ? 'white' : `linear-gradient(180deg, ${props.defaultChecked ? '#1e2e71' : '#8394DD'} 0%, ${props.defaultChecked ? '#181a1b' : '#FFFFFF'} 100%)`};
const Wrapper = styled.div`
  background: ${props => !props.defaultChecked && props.slot==='/gFOTmodule' ? 'white' : `linear-gradient(180deg, #8394DD 0%, #FFFFFF 100%)`};
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
`

export const ToggleContext = createContext(false)

const Layout = ({ children }) => {
  const [toggle, setToggle] = useState(false)
  useEffect(() => {
    let temp = localStorage.getItem('toggle')
    if (temp) {
      setToggle(JSON.parse(temp))
    }
  }, [])
  const router = useRouter();
  const { pathname } = router;
  return (
    <ToggleContext.Provider value={toggle}>
      <Wrapper defaultChecked={toggle} slot={pathname} style={{filter: toggle && 'drop-shadow(16px 16px 20px yellow) invert(90) hue-rotate(170deg) saturate(200%) contrast(100%) brightness(90%)'}}>
        {/* {pathname === '/' && <Background slot={`../images/HomePageBackground/${index%4 + 1}.png`}></Background>} */}
        <Head>
          <title>Fortis Oeconomia</title>
          <meta
            name='viewport'
            content='width=device-width, initial-scale=1, shrink-to-fit=no'
          />
          <meta
            name='description'
            content='Ribnic - Muli-Niche eCommerce React Template'
          />
          <meta
            name='og:title'
            property='og:title'
            content='Ribnic - Muli-Niche eCommerce React Template'
          ></meta>
          <meta
            name='twitter:card'
            content='Ribnic - Muli-Niche eCommerce React Template'
          ></meta>
          <link rel='canonical' href='https://novis-react.envytheme.com'></link>
        </Head>

        {/* {pathname === '/' ? <TopHeader /> : ''} */}
        {<Navbar toggle={toggle} setToggle={(toggle) => {
            localStorage.setItem('toggle', toggle.toString())
            setToggle(toggle)
          }} 
        />}
        
        {/* <button className={`default-btn wallet-btn ${pathname==='/gFOTmodule'?'secondary-btn':''}`}>
          <img src="../images/wallet.png" />
        </button> */}
        {children}

        {/* <Footer /> */}
      </Wrapper>
    </ToggleContext.Provider>
  );
};

export default Layout;
