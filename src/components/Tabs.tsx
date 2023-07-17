import * as React from "react";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";

import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { useTab } from "../context/TabContext";
import { Outlet, useNavigate } from "react-router-dom"; // Import global TabContext

export default function LabTabs() {
  const { tabs, currentTab, removeTab, changeTab, reorderTabs } = useTab()!; // Use global TabContext
  const navigate = useNavigate();
  return (
    <Box sx={{ width: "100%", typography: "body1" }}>
      <TabContext value={currentTab}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <TabList
            onChange={(event, newValue) => changeTab(newValue)}
            aria-label="lab API tabs example"
          >
            {tabs.map((tab, index) => (
              <Tab
                key={tab.value}
                label={
                  <div>
                    {tab.label}
                    <IconButton
                      onClick={(event) => {
                        event.stopPropagation();
                        removeTab(tab);
                      }}
                      size="small"
                    >
                      <CloseIcon />
                    </IconButton>
                  </div>
                }
                value={tab.value}
                onClick={() => navigate(tab.value)}
                draggable
                onDragStart={(event) => {
                  event.dataTransfer.setData("text/plain", String(index));
                }}
                onDragOver={(event) => {
                  event.preventDefault(); // Bu satırı ekleyin
                }}
                onDrop={(event) => {
                  event.preventDefault();
                  const oldIndex = Number(
                    event.dataTransfer.getData("text/plain")
                  );
                  reorderTabs(oldIndex, index); // Bu satırı ekleyin
                }}
              />
            ))}
          </TabList>
        </Box>
        <Outlet />
      </TabContext>
    </Box>
  );
}
