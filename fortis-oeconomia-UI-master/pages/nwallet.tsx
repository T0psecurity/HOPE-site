import { borderBottom } from "@mui/system";
import { useSigningClient } from "../contexts/cosmwasm";
import styled from 'styled-components'
import { useContext, useEffect, useState } from "react";
import { ToggleContext } from "../components/Layout/Layout";

const Wallet = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding: 20px;
`

const Wrapper = styled.div`
  width: 100%;
  max-width: 807px;
  background: rgba(255, 255, 255, 0.3);
  box-shadow: 15.1194px 15.1194px 60.4777px rgba(8, 4, 81, 0.18);
  border-radius: 52.162px;
  padding: 40px;
  position: relative;
`

const Asset = styled.label`
  width: 100%;
  max-width: 516px;
  text-align: left;
  font-size: 20px;
  color: #030f49;
  display: block;
  margin-left: auto;
  margin-right: auto;
  display: flex;
  margin-top: 20px;
  align-items: center;
  gap: 32px;
  padding-top: 1px;
`

const AssetImage = styled.img`
  width: 64px;
  height: 64px;
  border-radius: 39px;
  filter: ${props => props.defaultChecked && 'drop-shadow(16px 16px 20px) invert(1) hue-rotate(-170deg) '};
`

const AssetImageWrapper = styled.div`
  background: ${props => props.slot};
  border: 1.4694px solid #FFFFFF;
  box-sizing: border-box;
  border-radius: 100%;
  min-width: 54px;
  min-height: 54px;
  display: flex;
  align-items: center;
  justify-content: center;
  `
  
const OutWrapper = styled.div`
  filter: ${props => props.defaultChecked && 'drop-shadow(16px 16px 20px) invert(1) hue-rotate(-170deg) '};
  background: linear-gradient(105deg, #98ACFF 0%, #6774AD 81.65%);
  box-shadow: ${props => props.slot};
  border-radius: 100%;
  min-width: 64px;
  min-height: 64px;
  display: flex;
  align-items: center;
  justify-content: center;
`

const Divider = styled.div`
`

const AssetContent = styled.div`
  padding: 16px 0;
  font-weight: 600;
  font-size: 32px;
  line-height: 48px;
  color: #080451;
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
`

const AssetValue = styled.span`
  font-weight: 600;
  font-size: 32px;
  line-height: 48px;
  color: #080451;
`

const Title = styled.span`
  font-weight: 500;
  font-size: 32px;
  line-height: 48px;
  color: #080451;
`

const Gradient1 = styled.div`
  position: absolute;
  left: 3%;
  top: 3%;
  background: #c33cc4;
  filter: blur(128px);
  width: 269px;
  height: 32%;
  border-radius: 100%;
`

const Gradient2 = styled.div`
  position: absolute;
  width: 327px;
  height: 39%;
  left: 0;
  bottom: 0;
  background: #8394DD;
  filter: blur(90px);
  border-radius: 100%;
`

const Gradient3 = styled.div`
  position: absolute;
  width: 269px;
  height: 32%;
  right: 0;
  top: 0;
  background: #A8A4F7;
  filter: blur(80px);
  border-radius: 100%;
`

const Gradient4 = styled.div`
  position: absolute;
  width: 269px;
  height: 32%;
  right: 0;
  bottom: 0;
  background: #83B8DD;
  filter: blur(80px);
  border-radius: 100%;
`

const nwallet = () => {
  const {
    bfotBalance,
    fotBalance,
    fotBalanceStr,
    nativeBalance,
    walletAddress,
    atomBalance,
    osmoBalance,
    gfotBalance,
  } = useSigningClient();
  const toggle = useContext(ToggleContext)
  
  const assetData = [
    {
      label: 'FOT',
      amount: fotBalance,
      color: '#0741AD',
      background: 'linear-gradient(180deg, #8394DD 0%, #FBFCFD 100%)',
      boxShadow: '48.0696px 12.8802px 99.5307px rgba(26, 30, 44, 0.338), inset -17.946px -4.80861px 18.5791px #606CA1, inset 17.946px 4.80861px 18.5791px #9FB4FF'
    },
    {
      label: 'bFOT',
      amount: bfotBalance,
      color: '#2B064D',
      background: 'linear-gradient(179.97deg, #C1292E -90.61%, #FAFDFC 112.72%)',
      boxShadow: '77.5316px 20.7745px 160.533px rgba(26, 30, 44, 0.338), inset -28.9451px -7.75583px 29.9662px #606CA1, inset 28.9451px 7.75583px 29.9662px #9FB4FF'

    },
    {
      label: 'gFOT',
      amount: gfotBalance,
      color: '#22053D',
      background: 'linear-gradient(180.02deg, #4B0C86 -128.9%, #F4F6FF 99.98%)',
      boxShadow: '77.5316px 20.7745px 160.533px rgba(26, 30, 44, 0.338), inset -28.9451px -7.75583px 29.9662px #606CA1, inset 28.9451px 7.75583px 29.9662px #9FB4FF'
    },
    {
      label: 'ATOM',
      amount: atomBalance,
      image: '../images/atom.png'
    },
    {
      label: 'JUNO',
      amount: nativeBalance,
      image: '../images/juno.png'
    },
    {
      label: 'OSMO',
      amount: osmoBalance,
      image: '../images/osmo.png'
    },
  ]
  return (
    <Wallet>
      <Wrapper>
        <Gradient1 />
        <Gradient2 />
        <Gradient3 />
        <Gradient4 />
        <div className="currencyt-selection">
          <Title>
            My Assets
          </Title>
          <div className="wallet-text" style={{ marginTop: '32px' }}>
            {assetData.map((d, idx) =>
              <Asset key={`${idx}`}>
                <div className="w-full">
                  <Divider />
                  <AssetContent>
                    {d.label}
                    <AssetValue> {walletAddress.length == 0 ? 0 : d.amount}</AssetValue>
                  </AssetContent>
                </div>
                {idx > 2 && <AssetImage defaultChecked={toggle} src={`${d.image}`} />}
                {idx < 3 && <OutWrapper defaultChecked={toggle} slot={`${d.boxShadow}`}>
                  <AssetImageWrapper slot={d.background}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="34" height="20" viewBox="0 0 34 20" fill="none">
                      <path d="M15.3539 0.360624C12.905 0.89715 10.9542 2.12497 9.51187 4.06471C7.18752 7.17037 6.84509 11.2768 8.60911 14.7643L8.89965 15.3421L7.58183 15.6619C5.75555 16.1056 5.04995 16.2191 4.03304 16.2294C3.09915 16.2397 2.73598 16.1262 2.63221 15.796C2.53882 15.4865 2.81899 15.0428 3.53497 14.3825C3.89815 14.0523 4.0538 13.8666 3.8774 13.9801C2.49731 14.8055 0.982337 16.1468 0.857819 16.6421C0.826689 16.8072 0.837066 17.0445 0.899325 17.1786C1.20025 17.8286 3.42083 17.5913 7.70635 16.4564L9.45998 15.9921L9.62601 16.2191C10.1448 16.9723 11.8673 18.4683 12.2201 18.4683C12.2824 18.4683 12.3343 18.5096 12.3343 18.5612C12.3343 18.7057 13.8908 19.366 14.7832 19.6033C15.8623 19.8922 17.4396 19.9747 18.5914 19.8097C19.0894 19.7478 19.463 19.6446 19.4319 19.593C19.4007 19.5414 19.546 19.5001 19.7535 19.5001C20.1893 19.5001 21.6109 18.943 21.9015 18.6541C22.0052 18.5509 22.1401 18.4683 22.2128 18.4683C22.5552 18.4683 24.2466 16.9104 24.9626 15.9302C25.4399 15.2698 26.27 13.5364 26.4775 12.742C26.7369 11.7721 26.8926 10.2451 26.82 9.32679L26.7473 8.49104L27.9199 7.85134C29.5801 6.93306 31.2923 5.77746 32.1535 4.983C33.1912 4.02344 33.4091 3.52819 32.9733 3.13611C32.7865 2.97103 32.5997 2.94007 31.7488 2.95039C30.8668 2.96071 28.5736 3.32183 28.4179 3.4766C28.3868 3.50755 28.7396 3.50755 29.1962 3.46628C31.0225 3.32183 31.4894 3.8274 30.5244 4.8695C30.2442 5.1584 29.7669 5.59174 29.4556 5.82905C28.6981 6.40685 26.6851 7.73785 26.5605 7.73785C26.5087 7.73785 26.4153 7.52117 26.3426 7.24259C25.9691 5.74651 24.8484 3.86867 23.6759 2.78531C22.3788 1.57812 20.7185 0.71143 19.0583 0.370941C18.0829 0.174904 16.267 0.164587 15.3539 0.360624ZM18.996 1.29954C22.2958 2.04242 24.9314 4.68378 25.6578 7.96484C25.72 8.22278 25.6578 8.27437 24.2881 9.00693C20.3242 11.153 16.4123 12.8245 11.4834 14.496L9.84392 15.0532L9.57413 14.5889C7.92425 11.8031 8.06952 7.85134 9.91655 5.08617C11.141 3.24961 13.0399 1.89798 15.1567 1.34081C16.1321 1.09319 17.9688 1.07255 18.996 1.29954ZM25.8653 9.39901C25.9795 9.96649 25.938 10.6887 25.7304 11.7411C25.3465 13.7222 24.4749 15.2801 22.9391 16.735C21.9845 17.6326 20.6148 18.4683 20.0856 18.4683C19.9403 18.4683 19.8054 18.5096 19.7847 18.5715C19.7224 18.7572 18.3319 18.9842 17.2632 18.9842C16.1944 18.9842 14.8039 18.7572 14.7416 18.5715C14.7209 18.5096 14.5756 18.4683 14.4304 18.4683C13.7559 18.4683 12.189 17.5191 11.058 16.4254C10.1345 15.5278 10.1033 15.6103 11.5042 15.1667C15.0218 14.0214 19.878 11.9991 23.8004 10.0284C24.8277 9.5125 25.6993 9.08948 25.7304 9.08948C25.7719 9.07916 25.8238 9.22361 25.8653 9.39901Z" fill={d.color} />
                    </svg>
                  </AssetImageWrapper>
                </OutWrapper>}
              </Asset>
            )}
          </div>
        </div>
      </Wrapper>
    </Wallet>
  );
};

export default nwallet;

