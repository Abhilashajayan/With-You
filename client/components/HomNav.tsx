import React from 'react';
import styled from 'styled-components';
import FilterIcons from './icons/FilterIcon';
import BackIcon from './icons/BackIcons';

const NavbarContainer = styled.nav`
  background-color: white;
  padding: 16px;
  @media (max-width: 1023px) {
    margin-bottom: 20px;
  }
`;

const LogoContainer = styled.div`
  text-gray: 800;
  font-bold;
  text-xl;
`;

const LogoImage = styled.img`
  width: 60px; /* Adjust the logo size */
  height: 80px;
`;

const MiddleSection = styled.div`
  display: flex;
  flex-direction: column; /* Adjusted to column layout */
  align-items: center;
  @media (min-width: 1023px) {
    padding: 15px;
  }
  
`;

const DiscoverText = styled.span`
  color: #1f2937; /* Dark color for Discover */
  font-weight: bold;
`;

const IndiaText = styled.span`
  color: #9ca3af; 
  font-size: 0.8em; /* Adjust the font size */
`;

const FilterIcon = styled.div`
  color: #1f2937; /* Dark color for FilterIcon */
  cursor: pointer;
`;

const CenteredIconsContainer = styled.div`
  display: flex;
  justify-content: space-between;

  @media (min-width: 1023px) {
    /* For md devices and larger */
    justify-content: center; 
  }
`;


const HomeNavbar = () => {
  return (
    <NavbarContainer>
      <div className="container mx-auto">
        <CenteredIconsContainer>
          <LogoContainer>
            <BackIcon />
          </LogoContainer>
          <MiddleSection>
            <DiscoverText>Discover</DiscoverText>
            <IndiaText>india</IndiaText>
          </MiddleSection>
          <FilterIcon>
            <FilterIcons />
          </FilterIcon>
        </CenteredIconsContainer>
      </div>
    </NavbarContainer>
  );
};

export default HomeNavbar;
