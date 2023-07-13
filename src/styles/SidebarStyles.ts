
import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const Navbar = styled.div`
  display: flex;
  justify-content: start;
  align-items: center;
  height: 3.5rem;
  background-color: ;
`

export const MenuIconOpen = styled(Link)`
  display: flex;
  justify-content: start;
  padding: 2px;
  font-size: 1.2rem;
  margin-left: 2rem;
  color: #4e79f5;
`

export const MenuIconClose = styled(Link)`
  display: flex;
  justify-content: end;
  font-size: 1.5rem;
  margin-top: 0.75rem;
  margin-right: 1rem;
  color: #ffffff;
`

export const SidebarMenu = styled.div<{ close: boolean }>`
  width: 250px;
  height: 100vh;
  background-color: #4e79f5;
  position: fixed;
  top: 0;
  left: ${({ close }) => (close ? '0' : '-100%')};
  transition: 0.6s;
`

export const MenuItems = styled.li`
  list-style: none;
  display: flex;
  align-items: center;
  justify-content: start;
  width: 100%;
  height: 50px;
  padding: 0.25rem 0 0.5rem;
`

export const MenuItemLinks = styled(Link)<{ isActive: boolean }>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 1rem;
  font-size: 12px;
  text-decoration: none;
  color: #ffffff;
  width: ${({ isActive }) => (isActive ? '90%' : '100%')}; // genişlik ayarlandı
  background-color: ${({ isActive }) => (isActive ? '#546cb2' : 'transparent')};
  border-radius: ${({ isActive }) => (isActive ? '15px' : '0px')}; // border radius ayarlandı
  height: ${({ isActive }) => (isActive ? '45px' : '0px')};;
  &:hover {
    background-color: #546cb2;
    color: #ffffff;
    height: 45px;
    text-align: center;
    border-radius: 50px;
  }
`

/*
const AdministrationMenu = styled.li`
display: flex;
align-items: center;
padding: 0 2rem;
font-size: 15px;
text-decoration: none;
color: #ffffff;
`
*/

export const SubMenuItems = styled.ul<{ open: boolean }>`
  display: ${({ open }) => (open ? 'block' : 'none')};
  padding: 0;
  padding-left:15px;
  margin: 0;
  
`


