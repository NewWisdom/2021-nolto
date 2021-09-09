import styled from 'styled-components';

import HighLightedText from 'components/@common/HighlightedText/HighlightedText';

const MembersContainer = styled.div`
  width: 60rem;
  display: flex;
  flex-direction: column;
  gap: 2rem;
  margin: 4rem auto;
`;

const SectionTitle = styled(HighLightedText)``;

export default { MembersContainer, SectionTitle };
