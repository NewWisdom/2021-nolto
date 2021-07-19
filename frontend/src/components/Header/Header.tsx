import React, { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';

import Logo from 'assets/logo.svg';
import Search from 'assets/search.svg';
import Pencil from 'assets/pencil.svg';
import { PALETTE } from 'constants/palette';
import ROUTE from 'constants/routes';
import useModal from 'hooks/@common/useModal';
import LoginModal from 'components/LoginModal/LoginModal';
import { ButtonStyle } from 'types';
import Styled, { IconButton, SearchBar } from './Header.styles';
import useUserInfo from 'hooks/@common/useUserInfo';

interface Props {
  isFolded?: boolean;
}

const Header = ({ isFolded = false }: Props) => {
  const modal = useModal();
  const userInfo = useUserInfo();
  const [isSearchBarOpened, setSearchBarOpened] = useState(false);

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

  const logout = () => {
    localStorage.removeItem('accessToken');
    userInfo.removeUserInfo();
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
            <Logo width="200px" />
          </Link>
        </Styled.LogoWrapper>
        <nav>
          <Styled.NavContainer>
            <li>
              <NavLink to="/" activeStyle={navLinkActiveStyle}>
                Feed
              </NavLink>
            </li>
            <li>
              <NavLink to="/best" activeStyle={navLinkActiveStyle}>
                Best 10
              </NavLink>
            </li>
            <li>
              <NavLink to="/hosting" activeStyle={navLinkActiveStyle}>
                Joel’s Hosting
              </NavLink>
            </li>
            <li>
              <NavLink to="/makers" activeStyle={navLinkActiveStyle}>
                Toy Makers
              </NavLink>
            </li>
          </Styled.NavContainer>
        </nav>
        <Styled.ButtonsContainer>
          <IconButton onClick={openSearchBar}>
            <Search width="32px" />
          </IconButton>
          {isSearchBarOpened && <SearchBar />}
          <Link to={ROUTE.UPLOAD}>
            <IconButton>
              <Pencil width="22px" />
            </IconButton>
          </Link>

          {userInfo.userInfo ? (
            <Styled.AuthButton buttonStyle={ButtonStyle.OUTLINE} reverse={true} onClick={logout}>
              Logout
            </Styled.AuthButton>
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
