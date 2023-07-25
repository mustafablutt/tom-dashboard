import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import axios from "axios";

type MenuItem = {
  _id: number;
  parentId: number;
  path: string;
  name: string;
  fullPath: string;
  children?: MenuItem[];
};

const SidebarContext = createContext<{ menuData: MenuItem[] } | null>(null);

export const SidebarProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [menuData, setMenuData] = useState<MenuItem[]>([]);

  useEffect(() => {
    const fetchMenuData = async () => {
      try {
        const res = await axios.get(
          "https://localhost:7136/api/Tab/GetAllTabs"
        );
        const fetchedData = res.data.data;
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
            const children = parentChildMap[menu._id];
            return {
              ...menu,
              children: children ? buildMenuTree(children) : [],
            };
          });
        };

        const newMenuData = buildMenuTree(topLevelMenus);
        setMenuData(newMenuData);
      } catch (err) {
        console.error(err);
      }
    };

    fetchMenuData();
  }, []);

  return (
    <SidebarContext.Provider value={{ menuData }}>
      {children}
    </SidebarContext.Provider>
  );
};

export const useSidebar = () => {
  const context = useContext(SidebarContext);
  if (!context) {
    throw new Error("useSidebar must be used within a SidebarProvider");
  }
  return context;
};
