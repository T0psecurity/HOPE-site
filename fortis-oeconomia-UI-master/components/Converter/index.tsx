import { useContext } from 'react'
import styled from 'styled-components'
import { ToggleContext } from '../Layout/Layout'

import FromConv from './FromConv'
import ToConv from './ToConv'

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
`

const Converter = ({
    convImg, 
    from, 
    to,
    handleBurnMinus,
    burnAmount,
    onBurnChange,
    handleBurnPlus,
    expectedAmount,
    handleSubmit,
    balance,
    handleChange
}) => {
    const toggle = useContext(ToggleContext)
    return (
        <Wrapper>
            <FromConv 
                from={from} 
                handleBurnMinus={handleBurnMinus} 
                burnAmount={burnAmount} 
                onBurnChange={onBurnChange}
                handleBurnPlus={handleBurnPlus}
                balance={balance}
                handleChange={handleChange}
            />
            <img src={convImg} style={{marginBottom: '58px'}} />
            <ToConv to={to} expectedAmount={expectedAmount} />
            <button className={`default-btn ${!toggle && from === 'bFOT' ? 'secondary-btn' : ''}`} onClick={handleSubmit}>Burn</button>
        </Wrapper>
    )
}

export default Converter