import styled from 'styled-components'

const Wrapper = styled.label`
  background: rgba(255, 255, 255, 0.6);
  height: 79px;
  border-radius: 20px;
  margin-bottom: 58px;
  display: flex;
  flex-direction: row;
`

const DecButton = styled.button`
  width: fit-content !important;
  height: 48px !important;
  background: transparent !important;
  box-shadow: none !important;
  color: #080451 !important;
  margin-right: 0px !important;
  margin-left: 16px !important;
  margin-top: 16px !important;
  margin-bottom: 15px !important;
`

const IncButton = styled.button`
  width: fit-content !important;
  height: 48px !important;
  background: transparent !important;
  box-shadow: none !important;
  color: #080451 !important;
  margin-left: 0px !important;
  margin-right: 16px !important;
  margin-top: 16px !important;
  margin-bottom: 15px !important;  
`

const IncDecInput = styled.input`
  color: #080451;
  width: 100%;
  background: transparent;
  border: none;
  text-align: center;
  flex: 1;
  font-weight: 600;
  font-size: 21px;
  line-height: 32px;
`

const InputWithIncDec = ({
  handleBurnMinus,
  burnAmount,
  onBurnChange,
  handleBurnPlus,
}) => {
    return (
      <Wrapper>
        <DecButton className="fa fa-minus" onClick={handleBurnMinus} />
        <IncDecInput 
          type="number" 
          value={burnAmount}
          onChange={onBurnChange}
          step=".01"
          min="1"
        />
        <IncButton className="fa fa-plus" onClick={handleBurnPlus} />
      </Wrapper>
    )
}

export default InputWithIncDec