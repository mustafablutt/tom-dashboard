import React, { useState, useEffect } from "react";
import * as FaIcons from "react-icons/fa";
import { useSidebar } from "../context/SidebarContext";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import { useTab, Tab } from "../context/TabContext";

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

  const { addTab, tabs, currentTab, changeTab } = useTab()!;
  const [search, setSearch] = useState("");
  const [openTopMenu, setOpenTopMenu] = useState<number | null>(null);
  const { menuData } = useSidebar();

  const nameMatchesSearch = (name: string) => {
    return search === "" || name.toLowerCase().includes(search.toLowerCase());
  };

  const showSidebar = () => {
    setClose(!close);
    onWidthChange(close ? "80px" : "256px");
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
  const isActiveOrParentActive = (item: MenuItem): boolean => {
    return item.path === currentTab || isActiveParent(item);
  };

  const isActiveParent = (item: MenuItem): boolean => {
    if (item.children) {
      for (const child of item.children) {
        if (child.path === currentTab || isActiveParent(child)) {
          return true;
        }
      }
    }
    return false;
  };

  const isAnyChildActive = (data: MenuItem[]): boolean => {
    for (const item of data) {
      if (item.path === currentTab) {
        return true;
      }
      if (item.children && isAnyChildActive(item.children)) {
        return true;
      }
    }
    return false;
  };
  const renderMenuItems = (
    data: MenuItem[], // MenuItem tipini kullanın
    parentOpen: boolean,
    parentMatched: boolean = false,
    activeParent: MenuItem | null = null
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

    return filteredData.map((item: MenuItem, index: number) => {
      const isActive = item.path === currentTab;
      const isChildActive = item.children && isAnyChildActive(item.children);

      // Calculate the font weight based on whether the parent or the current item is active
      const fontWeight =
        isActive || isChildActive || isActiveOrParentActive(item)
          ? "bold"
          : "normal";

      return (
        <div key={index}>
          <MenuItems
            onClick={() =>
              item.children && item.children.length > 0
                ? handleSubMenu(item._id, item.parentId) // _id alanını kullanın
                : null
            }
            style={{
              fontWeight,
            }}
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
                nameMatchesSearch(item.name) || parentMatched,
                isActiveOrParentActive(item) ? item : activeParent
              )}
            </SubMenuItems>
          )}
        </div>
      );
    });
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
