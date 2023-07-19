import styled from "styled-components";
import { Link } from "react-router-dom";

export const Navbar = styled.div`
  display: flex;
  justify-content: start;
  align-items: center;
  height: 3.5rem;
  background-color: ;
`;

export const MenuIconOpen = styled(Link)`
  display: flex;
  justify-content: start;
  padding: 2px;
  font-size: 1.2rem;
  margin-left: 2rem;
  color: #53308c;
`;

export const MenuIconClose = styled(Link)`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.2rem;
  margin-top: 1rem;
  margin-right: 1rem;
  color: #53308c;
  background-color: #eee;
  width: 38px;
  height: 38px;
  border-radius: 50%; /* Change this to 50% to create a perfect circle */
  border: 2px solid #fff;
  transition: background-color 0.3s ease;
  position: absolute;

  right: -37px; /* Move the icon half of its width outside the SidebarMenu */
  z-index: 1; /* Ensure the icon is displayed on top */

  &:hover {
    background-color: rgba(255, 255, 255, 0.2);
  }
`;
export const SidebarMenu = styled.div<{ close: boolean }>`
  width: 268px;
  height: 100vh;
  background-color: #7947ca;
  position: fixed;
  top: 0;
  left: ${({ close }) => (close ? "0" : "-100%")};
  transition: 0.6s;
  overflow: visible;
`;

export const MenuItems = styled.li`
  list-style: none;
  display: flex;
  align-items: center;
  justify-content: start;
  width: 100%;
  height: 48px;
  padding: 0.25rem 0 0.5rem;
`;

export const MenuItemLinks = styled(Link)<{ isActive: boolean }>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 1rem;
  font-size: 12px;
  text-decoration: none;
  color: #ffffff;
  width: ${({ isActive }) => (isActive ? "90%" : "100%")}; // genişlik ayarlandı
  background-color: ${({ isActive }) => (isActive ? "#8A6DCA" : "transparent")};
  border-radius: ${({ isActive }) =>
    isActive ? "15px" : "0px"}; // border radius ayarlandı
  height: ${({ isActive }) => (isActive ? "45px" : "0px")};
  &:hover {
    background-color: #8a6dca;
    color: #ffffff;
    height: 45px;
    text-align: center;
    border-radius: 50px;
  }
`;

export const SubMenuItems = styled.ul<{ open: boolean }>`
  display: ${({ open }) => (open ? "block" : "none")};
  padding: 0;
  padding-left: 15px;
  margin: 0;
`;
