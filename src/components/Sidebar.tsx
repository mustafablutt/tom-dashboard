import React, { useState, useEffect } from 'react'
import * as FaIcons from 'react-icons/fa' 
import { SidebarData } from './SidebarData'
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import { useTab , Tab } from '../context/TabContext';
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
  const { addTab, tabs, currentTab, changeTab} = useTab()!;
  const [search, setSearch] = useState('');

  const nameMatchesSearch = (name: string) => {
    return search === '' || name.toLowerCase().includes(search.toLowerCase());
  };

  

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
    // Check if the menu item has children
    const menuItem = menuData.find(item => item.path === path);
    if (menuItem && menuItem.children && menuItem.children.length > 0) {
      // If the menu item has children, expand/collapse the submenu
      handleSubMenu(menuItem.menuId);
    } else {
      // If the menu item does not have children, create or change the tab
      // Check if the tab already exists
      const tabExists = tabs.find((tab: Tab) => tab.value === path);
  
      // If the tab doesn't exist, create a new one
      if (!tabExists && path && name) {
        addTab(name, path);
      } else if (tabExists) {
        // If the tab does exist, set it as the current tab
        changeTab(path);
      }
    }
  };
  
  
 
  


  

  const renderMenuItems = (data: any[], parentOpen: boolean, parentMatched: boolean = false) => {
    // eşleşen menü öğelerini filtreleyin
    const filteredData = data.filter(item => {
      const matched = nameMatchesSearch(item.name);
      if (matched || parentMatched) {
        return true;
      }
      if (item.children) {
        const filteredChildren: any = renderMenuItems(item.children, false, matched);
        return filteredChildren.length > 0;
      }
      return false;
    });
  
    // filtrelenmiş verileri kullanarak menü öğelerini render edin
    return filteredData.map((item: any, index: any) => (
      <div key={index}>
        <MenuItems onClick={() => item.children.length > 0 ? handleSubMenu(item.menuId) : null}>
          <MenuItemLinks
            to={item.path}
            onClick={() => handleMenuItemClick(item.path, item.name)}
            isActive={currentTab === item.path}
          >
            <div style={{ display: "flex", alignItems: "center", padding: "0 1rem", fontSize: "12px", textDecoration: "none", color: "#ffffff", width: "90%"}}>
              <span style={{ marginLeft: '16px' }}>{item.name}</span>
            </div>
            {item.children.length > 0 && !openSubMenu.includes(item.menuId) &&
              <ArrowRightIcon style={{ color: 'white' }} />}
            {item.children.length > 0 && openSubMenu.includes(item.menuId) &&
              <ArrowDropUpIcon style={{ color:  'white' }} />}
          </MenuItemLinks>
        </MenuItems>
        {item.children.length > 0 && (
          <SubMenuItems className='sub-menu-items' open={parentOpen && openSubMenu.includes(item.menuId)}>
            {renderMenuItems(item.children, parentOpen && openSubMenu.includes(item.menuId), nameMatchesSearch(item.name) || parentMatched)}
          </SubMenuItems>
        )}
      </div>
    ));
  };
  
  


  

  return (
    <>
      <Navbar>
        <MenuIconOpen to="#" onClick={showSidebar}>
          <FaIcons.FaBars />
        </MenuIconOpen>
      </Navbar>
  
      <SidebarMenu close={close}>
        <SearchAppBar onSearch={setSearch} /> {/* onSearch propunu ekleyin */}
        <MenuIconClose to="#" onClick={showSidebar}>
          <FaIcons.FaTimes />
        </MenuIconClose>
  
        {renderMenuItems(menuData, close)}
      </SidebarMenu>
    </>
  );

}

export default Sidebar
