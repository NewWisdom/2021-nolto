import styled from 'styled-components';

import HorseIcon from 'assets/horse.svg';

const Root = styled.div`
  position: relative;
`;

const SvgRoot = styled.svg`
  ellipse {
    filter: drop-shadow(0 4px 4px rgba(0, 0, 0, 0.25));
  }
`;

const Horse = styled(HorseIcon)`
  height: auto;
  position: absolute;
  right: 20%;
  bottom: 10%;
  transform: rotate(-12deg);
`;

export default { Root, SvgRoot, Horse };
