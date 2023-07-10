import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import * as FaIcons from 'react-icons/fa' 
import { SidebarData } from './SidebarData'
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';


const Navbar = styled.div`
  display: flex;
  justify-content: start;
  align-items: center;
  height: 3.5rem;
  background-color: ;
`

const MenuIconOpen = styled(Link)`
  display: flex;
  justify-content: start;
  padding: 2px;
  font-size: 1.2rem;
  margin-left: 2rem;
  color: #4e79f5;
`

const MenuIconClose = styled(Link)`
  display: flex;
  justify-content: end;
  font-size: 1.5rem;
  margin-top: 0.75rem;
  margin-right: 1rem;
  color: #ffffff;
`

const SidebarMenu = styled.div<{ close: boolean }>`
  width: 250px;
  height: 100vh;
  background-color: #4e79f5;
  position: fixed;
  top: 0;
  left: ${({ close }) => (close ? '0' : '-100%')};
  transition: 0.6s;
`

const MenuItems = styled.li`
  list-style: none;
  display: flex;
  align-items: center;
  justify-content: start;
  width: 100%;
  height: 50px;
  padding: 0.25rem 0 0.5rem;
`

const MenuItemLinks = styled(Link)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 1rem;
  font-size: 12px;
  text-decoration: none;
  color: #ffffff;
  width: 90%;


  &:hover {
    background-color: #546cb2;
    color: #ffffff;
    height: 45px;
    text-align: center;
    border-radius: 50px;
  }
`

const AdministrationMenu = styled.li`
display: flex;
align-items: center;
padding: 0 2rem;
font-size: 15px;
text-decoration: none;
color: #ffffff;
`

const SubMenuItems = styled.ul<{ open: boolean }>`
  display: ${({ open }) => (open ? 'block' : 'none')};
  padding: 0;
  padding-left:15px;
  margin: 0;
  
`


const Sidebar: React.FunctionComponent = () => {
  const [close, setClose] = useState(false)
  const [openSubMenu, setOpenSubMenu] = useState<number | null>(null)
  const showSidebar = () => setClose(!close)

  const handleSubMenu = (menuId: number) => {
    setOpenSubMenu(openSubMenu === menuId ? null : menuId)
  }

  const renderMenuItems = (data: any[], parentOpen: boolean) => {
    return data.map((item, index) => (
      <div key={index}>
        <MenuItems onClick={() => item.children.length > 0 && handleSubMenu(item.menuId)}>
          <MenuItemLinks to={item.path}>
            <div style={{ display: "flex",
              alignItems: "center",
              padding: "0 1rem",
              fontSize: "12px",
              textDecoration: "none",
              color: "#ffffff",
              width: "90%"}}>
              {item.icon}
              <span style={{ marginLeft: '16px' }}>{item.title}</span>
            </div>
            {item.children.length > 0 && !(openSubMenu === item.menuId) &&
            <ArrowRightIcon style={{color: 'gray' }} />}
            {item.children.length > 0 && (openSubMenu === item.menuId) &&
            <ArrowDropUpIcon style={{color:  'white' }} />}
          </MenuItemLinks>
         
        </MenuItems>
        {item.children.length > 0 && (
          <SubMenuItems className='sub-menu-items' open={parentOpen && openSubMenu === item.menuId}>
            {renderMenuItems(item.children, parentOpen && openSubMenu === item.menuId)}
          </SubMenuItems>
        )}
      </div>
    ))
  }

  return (
    <>
      <Navbar>
        <MenuIconOpen to="#" onClick={showSidebar}>
          <FaIcons.FaBars />
        </MenuIconOpen>
      </Navbar>

      <SidebarMenu close={close}>
        <MenuIconClose to="#" onClick={showSidebar}>
          <FaIcons.FaTimes />
        </MenuIconClose>

        {renderMenuItems(SidebarData, close)}
      </SidebarMenu>
    </>
  )
}

export default Sidebar