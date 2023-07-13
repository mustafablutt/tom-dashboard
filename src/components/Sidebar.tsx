import React, { useState, useEffect } from 'react'
import * as FaIcons from 'react-icons/fa' 
import { SidebarData } from './SidebarData'
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import { TabContext as GlobalTabContext, Tab } from '../context/TabContext'; 
import { useContext } from 'react';
import { Navbar, MenuIconOpen, MenuIconClose, SidebarMenu, MenuItems, MenuItemLinks, SubMenuItems } from '../styles/SidebarStyles';
import SearchAppBar from './Search';



type MenuItem = {
  menuId: number;
  parentId: number;
  path: string;
  name: string;
  children?: MenuItem[];
};





const Sidebar: React.FunctionComponent = () => {
  const [close, setClose] = useState(false)
  const [openSubMenu, setOpenSubMenu] = useState<number[]>([])
  const [menuData, setMenuData] = useState<any[]>([]);
  const { addTab, tabs, currentTab, changeTab} = useContext(GlobalTabContext)!;

  

  useEffect(() => {
    const parentChildMap: any = {};
    SidebarData.forEach((menu: any) => {
      if (parentChildMap[menu.parentId]) {
        parentChildMap[menu.parentId].push(menu);
      } else {
        parentChildMap[menu.parentId] = [menu];
      }
    });

    const topLevelMenus = SidebarData.filter((menu: any) => menu.parentId === 0);

    const buildMenuTree = (menus: any[]): MenuItem[] => {
      return menus.map((menu: any) => {
        const children = parentChildMap[menu.menuId];
        return {
          ...menu,
          children: children ? buildMenuTree(children) : [],
        };
      });
    };

    const newMenuData = buildMenuTree(topLevelMenus);
    setMenuData(newMenuData);
  }, []);
  

  const showSidebar = () => setClose(!close)

  const handleSubMenu = (menuId: number) => {
    if(openSubMenu.includes(menuId)) {
      setOpenSubMenu(openSubMenu.filter(id => id !== menuId));
    } else {
      setOpenSubMenu([...openSubMenu, menuId]);
    }
  };
  
  const handleMenuItemClick = (path: string, name: string) => {
    // Check if the tab already exists
    const tabExists = tabs.find((tab: Tab) => tab.value === path);
  
    // If the tab doesn't exist, create a new one
    if (!tabExists && path && name) {
      addTab(name, path);
    } else if (tabExists) {
      // If the tab does exist, set it as the current tab
      changeTab(path);
    }
  };
  
 
  


  

  const renderMenuItems = (data: any[], parentOpen: boolean) => {
    return data.map((item, index) => (
        <div key={index}>
            <MenuItems onClick={() => item.children.length > 0 ? handleSubMenu(item.menuId) : null}>


            <MenuItemLinks 
        to={item.path} 
        onClick={() => handleMenuItemClick(item.path, item.name)} 
        isActive={currentTab === item.path} // Aktif tabın durumuna bağlı olarak ayarlandı
      >
      
                    <div style={{ display: "flex", alignItems: "center", padding: "0 1rem", fontSize: "12px", textDecoration: "none", color: "#ffffff", width: "90%"}}>
                        <span style={{ marginLeft: '16px' }}>{item.name}</span>
                    </div>
                    {item.children.length > 0 && !openSubMenu.includes(item.menuId) &&
                    <ArrowRightIcon style={{color: 'white' }} />}
                    {item.children.length > 0 && openSubMenu.includes(item.menuId) &&
                    <ArrowDropUpIcon style={{color:  'white' }} />}
                </MenuItemLinks>
            </MenuItems>
            {item.children.length > 0 && (
                <SubMenuItems className='sub-menu-items' open={parentOpen && openSubMenu.includes(item.menuId)}>
                    {renderMenuItems(item.children, parentOpen && openSubMenu.includes(item.menuId))}
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
      <SearchAppBar />
      <MenuIconClose to="#" onClick={showSidebar}>
        <FaIcons.FaTimes />
      </MenuIconClose>

      {renderMenuItems(menuData, close)}
    </SidebarMenu>
  </>
)

}

export default Sidebar
