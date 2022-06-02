import { useSigningClient } from "../../contexts/cosmwasm";
import {
    convertMicroDenomToDenom,
    convertDenomToMicroDenom,
    convertMicroDenomToDenom2,
    convertDenomToMicroDenom2,
    convertFromMicroDenom
} from '../../util/conversion'
import InputWithIncDec from '../InputWithIncDec'
import styled from 'styled-components'
import {useContext} from 'react'
import { ToggleContext } from "../Layout/Layout";

const Wrapper = styled.div`
    padding: 50px 32px;
    background: rgba(255, 255, 255, 0.25);
    box-shadow: 2.74846px 5.49692px 57.0305px rgba(161, 164, 176, 0.25);
    border-radius: 15.1165px;
    margin-bottom: 16px;
    display: flex;
    max-width: 770px;
    width: 100%;
    @media (max-width: 768px) {
        flex-direction: column;
    }
`

const TotalStaked = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    flex: 1;
    border-right: 2.05843px solid #2E0752;
    padding-right: 40px;
    margin-right: 40px;
    @media (max-width: 768px) {
        padding-right: 0px;
        margin-right: 0px;
        margin-bottom: 20px;
        padding-bottom: 20px;
        border-right: 0px;
        border-bottom: 2.05843px solid #2E0752;
    }
`

const TotalStakedText = styled.label`
    width: unset !important;
    border-bottom: 0px !important;
    margin: 0 !important;
    font-size: 18px;
`

const StakedValue = styled.span`
    font-size: 18px;
    display: block;
    float: right;
`

const MyStaked = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    flex: 1;
`

const MyStakedContent = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    flex-direction: column;
`

const MyStakedText = styled.label`
    width: 100% !important;
    border-bottom: 0px !important;
    margin: 0 !important;
`

const MaxButton = styled.button`
    margin-top: -35px;
    margin-bottom: 20px;
    padding: 5px !important;
    width: 100px;
    min-width: unset !important;
`

const StakeNClaim = ({
    handleBurnMinus,
    onBurnChange,
    handleBurnPlus,
    handleFotStaking,
    handleFotStakingUnstake,
    handleFotStakingClaimReward,

}) => {
  const {
    fotTokenInfo,
    gfotTokenInfo,
    gfotStakingContractInfo,
    gfotStakingAmount,
    gfotStakingApy,
    gfotStakingMyStaked,
    gfotStakingMyReward,
    gfotBalance,
    handlegFotStakingChange,
  } = useSigningClient();
  const toggle = useContext(ToggleContext)
    return (
        <Wrapper>
            <TotalStaked>
                <div className="wallet-text w-full">
                    <TotalStakedText className="wallet-label">
                        Total Staked gFOT
                        <StakedValue>
                            {" "}
                            {convertMicroDenomToDenom2(gfotStakingContractInfo.gfot_amount, gfotTokenInfo.decimals)}
                        </StakedValue>
                    </TotalStakedText>
                    <TotalStakedText className="wallet-label">
                        APR
                        <StakedValue>
                            {" "}
                            {(gfotStakingApy / 10000000000.0).toFixed(10)} %
                        </StakedValue>
                    </TotalStakedText>
                    <TotalStakedText className="wallet-label">
                        APY
                        <StakedValue>
                            {" "}
                            {((gfotStakingApy * 365) / 10000000000.0).toFixed(10)} %
                        </StakedValue>
                    </TotalStakedText>
                </div>
                <div className='gFotCurrencyt-selection'>
                    <InputWithIncDec
                        handleBurnMinus={handleBurnMinus}
                        burnAmount={gfotStakingAmount}
                        onBurnChange={onBurnChange}
                        handleBurnPlus={handleBurnPlus}
                    />
                </div>
                <MaxButton 
                    onClick={() => handlegFotStakingChange(gfotBalance)}
                    className={`default-btn  ${!toggle && 'secondary-btn outlined'}`}
                >
                    Max
                </MaxButton>
                <button className={`default-btn ${!toggle && 'secondary-btn'}`} onClick={handleFotStaking}>Stake</button>
            </TotalStaked>
            <MyStaked>
                <MyStakedContent className="wallet-text">
                    <MyStakedText className="wallet-label">
                        My Staked gFOT
                        <StakedValue>
                            {" "}
                            {convertMicroDenomToDenom2(gfotStakingMyStaked, gfotTokenInfo.decimals)}
                        </StakedValue>
                    </MyStakedText>
                    <button 
                        className={`default-btn  ${!toggle && 'secondary-btn outlined'}`}
                        style={{marginBottom: '25px'}}
                        onClick={handleFotStakingUnstake}
                    >
                        Unstake
                    </button>
                    <MyStakedText className="wallet-label">
                        My Rewards
                        <StakedValue>
                            {" "}
                            {convertMicroDenomToDenom2(gfotStakingMyReward, fotTokenInfo.decimals)}
                        </StakedValue>
                    </MyStakedText>
                </MyStakedContent>
                <button className={`default-btn   ${!toggle && 'secondary-btn'}`} onClick={handleFotStakingClaimReward}>Claim</button>
            </MyStaked>
        </Wrapper>
    )
}

export default StakeNClaim