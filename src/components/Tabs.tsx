import * as React from "react";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import CancelIcon from "@mui/icons-material/Cancel";

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
        <Box
          sx={{
            borderBottom: 1,
            borderColor: "divider",
            //  width: `${tabs.length * 100}px`,
          }}
        >
          <TabList
            onChange={(event, newValue) => changeTab(newValue)}
            aria-label="lab API tabs example"
          >
            {tabs.map((tab, index) => (
              <Tab
                key={tab.value}
                label={
                  <div
                    style={{
                      textTransform: "none",
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    {tab.label.charAt(0).toUpperCase() +
                      tab.label.slice(1).toLowerCase()}
                    {tab.value !== "/" && (
                      <IconButton
                        onClick={(event) => {
                          event.stopPropagation();
                          removeTab(tab);
                        }}
                        size="small"
                        style={{
                          backgroundColor: "rgba(0, 0, 0, 0.04)",
                          borderRadius: "50%",
                          marginLeft: "10px",
                        }}
                      >
                        <CloseIcon fontSize="small" />
                      </IconButton>
                    )}
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
