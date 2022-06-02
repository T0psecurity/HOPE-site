import { useRouter } from 'next/router';
import styled from 'styled-components'
import React from 'react'

const Wrapper = styled.div`
    background: ${props => props.slot === '/gFOTmodule' ? 'rgba(255, 255, 255, 0.25)' : 'rgba(251, 252, 253, 0.3)'};
    box-shadow: ${props => props.slot === '/gFOTmodule' ? '2.74846px 5.49692px 57.0305px rgba(161, 164, 176, 0.25)': '4px 8px 83px rgba(34, 40, 95, 0.25)'};
    border-radius: ${props => props.slot === '/gFOTmodule' ? '15.1165px': '70px'};
    width: 100%;
    max-width: 610px;
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;
`

const StatisticLabel = styled.span`
    font-weight: 600;
    font-size: ${props => props.slot=== '/gFOTmodule' ? '16.4907px' : '24px'};
    line-height: ${props => props.slot=== '/gFOTmodule' ? '25px' : '36px'};
    color: ${props => props.slot=== '/gFOTmodule' ? '#080451' : '#22053D'};
`

const StatisticValue = styled.span`
    font-weight: 600;
    font-size: ${props => props.slot=== '/gFOTmodule' ? '20.6134px' : '30px'};
    line-height: ${props => props.slot=== '/gFOTmodule' ? '31px' : '45px'};
    color: #22053D;
`

const StatisticItem = styled.label`
    width: 100%;
    max-width: 470px;
    padding: ${props => props.datatype === '/gFOTmodule' ? '36px':'72px'} 0;
    transform: rotate(0.01deg);
    display: flex;
    align-items: center;
    justify-content: space-between;
`

const Ellipse1 = styled.div`
    position: absolute;
    width: 289px;
    height: 286px;
    left: 93px;
    top: 51px;
    border-radius: 100%;
    background: #5F5BCD;
    filter: blur(132px);
`

const Ellipse2 = styled.div`
    position: absolute;
    left: 69px;
    bottom: 39px;
    border-radius: 100%;
    width: 245px;
    height: 231px;
    background: #8394DD;
    filter: blur(60px);
`

const Ellipse3 = styled.div`
    position: absolute;
    width: 294px;
    height: 290px;
    border-radius: 100%;
    right: 1px;
    top: 10px;
    background: #83B8DD;
    filter: blur(75px);
`

const Ellipse4 = styled.div`
    position: absolute;
    width: 297px;
    height: 231px;
    border-radius: 100%;
    right: 3px;
    bottom: 29px;
    background: #8394DD;
    filter: blur(90px);
`

const Divider = styled.div`
  background: ${props => props.slot === '/gFOTmodule' ? '#2E0752' : 'linear-gradient(270deg, #5F5BCD 0%, #83B8DD 100%)'};
  height: ${props => props.slot === '/gFOTmodule' ? '1.71779px' : '2.5px'};
  width: 100%;
  transform: rotate(0.01deg);
  max-width: 470px;
`

const StatisticBox = ({values=[]}) => {
    const router = useRouter();
    const { pathname } = router;
    return (
        <Wrapper slot={pathname}>
            {pathname !== '/gFOTmodule' && <>
                <Ellipse1 />
                <Ellipse2 />
                <Ellipse3 />
                <Ellipse4 />
            </>}
            {values.map((v, idx) => {
                return (
                    <React.Fragment key={idx}>
                        <StatisticItem htmlFor={`${idx}`} slot={`${values.length}`} datatype={pathname}>
                            <StatisticLabel slot={pathname}>{v.key}</StatisticLabel>
                            <StatisticValue slot={pathname}>
                                {" "}
                                {v.value}
                            </StatisticValue>
                        </StatisticItem>
                        {idx!==2 && <Divider slot={pathname} />}
                    </React.Fragment>
                )
            })}
        </Wrapper>
    )
}

export default StatisticBox