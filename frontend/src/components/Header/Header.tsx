import Pencil from 'assets/pencil.svg';
import Search from 'assets/search.svg';
import LoginModal from 'components/LoginModal/LoginModal';
import { PALETTE } from 'constants/palette';
import ROUTE from 'constants/routes';
import useModal from 'contexts/modal/useModal';
import useMember from 'hooks/queries/useMember';
import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { ButtonStyle } from 'types';
import Styled, { IconButton, Logo, LogoSimple, SearchBar, UserProfile } from './Header.styles';

interface Props {
  isFolded?: boolean;
}

const Header = ({ isFolded = false }: Props) => {
  const modal = useModal();
  const [isSearchBarOpened, setSearchBarOpened] = useState(false);
  const member = useMember();

  const navLinkActiveStyle = {
    borderBottom: `2px solid ${PALETTE.WHITE_400}`,
  };

  const openLoginModal = () => {
    modal.openModal(<LoginModal />);
  };

  const openSearchBar = () => {
    setSearchBarOpened(true);
  };

  const closeSearchBar = (event: React.MouseEvent<HTMLElement>) => {
    if (event.target === event.currentTarget) {
      setSearchBarOpened(false);
    }
  };

  return (
    <Styled.Root isFolded={isFolded}>
      <svg height="100%" width="100vw">
        <defs>
          <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor={PALETTE.PRIMARY_200} stopOpacity="1" />
            <stop offset="100%" stopColor={PALETTE.PRIMARY_400} stopOpacity="1" />
          </linearGradient>
        </defs>
        <rect x="-30vw" y="0" width="160vw" height="100%" fill="url(#grad1)" />
      </svg>

      <Styled.HeaderContent onClick={closeSearchBar}>
        <Styled.LogoWrapper>
          <Link to={ROUTE.HOME}>
            <Logo height="100%" />
            <LogoSimple height="100%" />
          </Link>
        </Styled.LogoWrapper>
        <nav>
          <Styled.NavContainer>
            <li>
              <NavLink to={ROUTE.RECENT} activeStyle={navLinkActiveStyle}>
                Toy Projects
              </NavLink>
            </li>
            <li className="web-hosting">
              <a href="https://joel-web-hosting.o-r.kr/" target="_blank">
                Joel’s Hosting
              </a>
            </li>
            <li>
              <NavLink to={ROUTE.ABOUT} activeStyle={navLinkActiveStyle}>
                Nolto Team
              </NavLink>
            </li>
          </Styled.NavContainer>
        </nav>
        <Styled.ButtonsContainer>
          <IconButton onClick={openSearchBar} className="search">
            <Search height="85%" />
          </IconButton>
          {isSearchBarOpened && <SearchBar placeholder="제목/내용으로만 검색이 가능합니다" />}
          <Link to={ROUTE.UPLOAD} className="upload">
            <IconButton>
              <Pencil fill={PALETTE.PRIMARY_300} height="85%" />
            </IconButton>
          </Link>

          {member.userData ? (
            <UserProfile />
          ) : (
            <Styled.AuthButton
              buttonStyle={ButtonStyle.OUTLINE}
              reverse={true}
              onClick={openLoginModal}
            >
              Sign In
            </Styled.AuthButton>
          )}
        </Styled.ButtonsContainer>
      </Styled.HeaderContent>
    </Styled.Root>
  );
};

export default Header;
