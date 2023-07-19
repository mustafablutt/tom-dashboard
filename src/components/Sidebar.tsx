import React, { useState, useEffect } from "react";
import * as FaIcons from "react-icons/fa";
import { fetchSidebarData } from "./SidebarData";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import { useTab, Tab } from "../context/TabContext";
import CancelIcon from "@mui/icons-material/Cancel";

import {
  Navbar,
  MenuIconOpen,
  MenuIconClose,
  SidebarMenu,
  MenuItems,
  MenuItemLinks,
  SubMenuItems,
} from "../styles/SidebarStyles";
import SearchAppBar from "./Search";

type MenuItem = {
  _id: number;
  parentId: number;
  path: string;
  name: string;
  fullPath: string;
  children?: MenuItem[];
};

const Sidebar: React.FunctionComponent<{
  onWidthChange: (width: string) => void;
}> = ({ onWidthChange }) => {
  const [close, setClose] = useState(false);
  const [openSubMenu, setOpenSubMenu] = useState<Record<number, boolean>>({});
  const [menuData, setMenuData] = useState<any[]>([]);
  const { addTab, tabs, currentTab, changeTab } = useTab()!;
  const [search, setSearch] = useState("");
  const [openTopMenu, setOpenTopMenu] = useState<number | null>(null);

  const nameMatchesSearch = (name: string) => {
    return search === "" || name.toLowerCase().includes(search.toLowerCase());
  };

  useEffect(() => {
    const fetchMenuData = async () => {
      const fetchedData = await fetchSidebarData();
      const parentChildMap: any = {};
      fetchedData.forEach((menu: any) => {
        if (parentChildMap[menu.parentId]) {
          parentChildMap[menu.parentId].push(menu);
        } else {
          parentChildMap[menu.parentId] = [menu];
        }
      });

      const topLevelMenus = fetchedData.filter(
        (menu: any) => menu.parentId === 0
      );

      const buildMenuTree = (menus: any[]): MenuItem[] => {
        return menus.map((menu: any) => {
          const children = parentChildMap[menu._id]; // id field changed to _id to match your API data
          return {
            ...menu,
            children: children ? buildMenuTree(children) : [],
          };
        });
      };

      const newMenuData = buildMenuTree(topLevelMenus);
      setMenuData(newMenuData);
    };

    fetchMenuData();
  }, []);

  const showSidebar = () => {
    setClose(!close);
    onWidthChange(close ? "100px" : "256px");
  };

  const handleSubMenu = (menuId: number, parentId: number) => {
    setOpenSubMenu((prevState) => {
      const newState = { ...prevState };

      // Eğer bir ana menüye tıklanırsa, tüm menülerin durumunu sıfırla
      if (parentId === 0) {
        for (const key in newState) {
          newState[Number(key)] = false;
        }
      }

      // Tıklanan menüyü açın veya kapatın
      newState[menuId] = !prevState[menuId];

      return newState;
    });

    if (parentId === 0) {
      setOpenTopMenu((prevState) => (prevState === menuId ? null : menuId));
    }
  };

  const handleMenuItemClick = (
    path: string,
    name: string,
    parentId: number
  ) => {
    // Check if the tab already exists
    const tabExists = tabs.find((tab: Tab) => tab.value === path);

    // If the tab doesn't exist, create a new one
    if (!tabExists && path && name) {
      addTab(name, path);
    } else if (tabExists) {
      // If the tab does exist, set it as the current tab
      changeTab(path);
    }

    // Close all menus if clicked item is a top level menu
    if (parentId === 0) {
      setOpenSubMenu([]);
      setOpenTopMenu(null);
    }
  };

  const getLinkPath = (item: any) => {
    if (item.children.length === 0) {
      return item.path;
    }
    return "#";
  };

  const renderMenuItems = (
    data: MenuItem[], // MenuItem tipini kullanın
    parentOpen: boolean,
    parentMatched: boolean = false
  ): JSX.Element[] => {
    // JSX.Element[] olarak dönüş tipini belirtin
    const filteredData = data.filter((item) => {
      const matched = nameMatchesSearch(item.name);
      if (matched || parentMatched) {
        return true;
      }
      if (item.children) {
        const filteredChildren = renderMenuItems(item.children, false, matched);
        return filteredChildren.length > 0;
      }
      return false;
    });

    const shouldOpen = search !== "" && filteredData.length > 0;

    return filteredData.map((item: MenuItem, index: number) => (
      <div key={index}>
        <MenuItems
          onClick={() =>
            item.children && item.children.length > 0
              ? handleSubMenu(item._id, item.parentId) // _id alanını kullanın
              : null
          }
        >
          <MenuItemLinks
            to={item.path}
            onClick={() =>
              item.children && item.children.length === 0
                ? handleMenuItemClick(item.path, item.name, item.parentId)
                : null
            }
            isActive={currentTab === item.path}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                padding: "0 1rem",
                fontSize: "12px",
                textDecoration: "none",
                color: "#ffffff",
                width: "90%",
              }}
            >
              <span style={{ marginLeft: "16px" }}>{item.name}</span>
            </div>
            {item.children &&
              item.children.length > 0 &&
              !openSubMenu[item._id] && ( // _id alanını kullanın
                <ArrowRightIcon style={{ color: "white" }} />
              )}
            {item.children &&
              item.children.length > 0 &&
              openSubMenu[item._id] && ( // _id alanını kullanın
                <ArrowDropUpIcon style={{ color: "white" }} />
              )}
          </MenuItemLinks>
        </MenuItems>

        {item.children && item.children.length > 0 && (
          <SubMenuItems
            className="sub-menu-items"
            open={
              ((parentOpen && openSubMenu[item._id]) || shouldOpen) && // _id alanını kullanın
              (item.parentId !== 0 || openTopMenu === item._id) // _id alanını kullanın
            }
          >
            {renderMenuItems(
              item.children,
              ((parentOpen && openSubMenu[item._id]) || shouldOpen) && // _id alanını kullanın
                (item.parentId !== 0 || openTopMenu === item._id), // _id alanını kullanın
              nameMatchesSearch(item.name) || parentMatched
            )}
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
        <div style={{ display: "flex", alignItems: "center" }}>
          <SearchAppBar onSearch={setSearch} />
          <MenuIconClose to="#" onClick={showSidebar}>
            <FaIcons.FaBars />
          </MenuIconClose>
        </div>

        {renderMenuItems(menuData, close)}
      </SidebarMenu>
    </>
  );
};

export default Sidebar;
