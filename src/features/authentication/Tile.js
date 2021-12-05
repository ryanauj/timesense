import styled from 'styled-components'
import { SHADOW_DARK, VERY_DARK_BLUE, VERY_LIGHT_BLUE } from '../../constants/cssVars'

// "Floating" tile style
const TileOuter = styled.div`
  background-color: ${VERY_LIGHT_BLUE};
  color: ${VERY_DARK_BLUE};
  box-shadow: ${SHADOW_DARK};
  width: 380px;
  max-width: 100%;
`

const TileInner = styled.div`
  padding: 20px;
`

// Tile-like input screen, used for Signup & Login components
export const Tile = ({ children }) => (
  <TileOuter>
    <TileInner>
      {children}
    </TileInner>
  </TileOuter>
)