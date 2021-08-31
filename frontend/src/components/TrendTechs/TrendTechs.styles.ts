import styled from 'styled-components';

import { PALETTE } from 'constants/palette';
import { MEDIA_QUERY } from 'constants/mediaQuery';
import { FONT_SIZE } from 'constants/styles';
import { hoverUnderline } from 'commonStyles';

const Root = styled.div`
  display: flex;
  gap: 0.75rem;
  align-items: center;

  & span {
    color: ${PALETTE.WHITE_400};
    line-height: 1rem;
  }

  & span.trends {
    font-weight: 700;
  }

  @media ${MEDIA_QUERY.MOBILE} {
    display: none;
  }
`;

const Tag = styled.span`
  cursor: pointer;

  > .trends-text {
    ${hoverUnderline};

    @media ${MEDIA_QUERY.MOBILE} {
      font-size: ${FONT_SIZE.SMALL};
    }
  }

  > .trends-bar {
    margin-right: 0.75rem;
  }
`;

export default { Root, Tag };
