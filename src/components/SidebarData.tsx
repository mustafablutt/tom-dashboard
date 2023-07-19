import axios from "axios";

export const fetchSidebarData = async () => {
  try {
    const res = await axios.get("https://localhost:7136/api/Tab/GetAllTabs");
    return res.data.data;
  } catch (err) {
    console.error(err);
  }
};
