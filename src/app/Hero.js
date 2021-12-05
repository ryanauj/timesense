import React from 'react'
import styled from 'styled-components'
import { ReactComponent as Logo } from '../assets/TimeSenseLogo.svg'
import { MAX_CONTENT_WIDTH } from '../constants/cssVars'

// Organize header & logo content
const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  width: 100%;
  width: min(100%, ${MAX_CONTENT_WIDTH}px);
`

const OversizedHeader = styled.h1`
  font-size: 3em;
`

export const Hero = () => {
  return (
    <Wrapper>
      <OversizedHeader>
        Master Your Sense of Time
      </OversizedHeader>
      <Logo className='app-logo'></Logo>
    </Wrapper>
  )
}
