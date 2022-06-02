import styled from 'styled-components'
import { useContext } from 'react'
import { ToggleContext } from '../Layout/Layout'
import InputWithIncDec from "../InputWithIncDec"

const WalletTitle = styled.label`
    align-items: center;
    font-weight: 600;
    font-size: 32px;
    line-height: 48px;
    margin-bottom: 32px;
    background-color: ${props => props.slot!=='bFOT' && '#22053D !important'}
`

const MaxButton = styled.span`
    margin-bottom: 20px;
    padding: 5px !important;
    width: 100px !important;
    min-width: unset !important;
    cursor: pointer;
`

const FromConv = ({
    from,
    handleBurnMinus,
    burnAmount,
    onBurnChange,
    handleBurnPlus,
    balance,
    handleChange
}) => {
    const toggle = useContext(ToggleContext)
    return (
        <div className="gFotCurrencyt-selection">
            <WalletTitle slot={from} className="wallet-title">
                {from}
            </WalletTitle>
            <InputWithIncDec
                handleBurnMinus={handleBurnMinus}
                burnAmount={burnAmount}
                onBurnChange={onBurnChange}
                handleBurnPlus={handleBurnPlus}
            />
            <MaxButton 
                onClick={() => handleChange(balance)}
                className={`default-btn  ${!toggle && 'secondary-btn outlined'}`}
            >
                Max
            </MaxButton>
        </div>
    )
}

export default FromConv