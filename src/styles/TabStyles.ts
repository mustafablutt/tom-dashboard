import { styled } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";

export const StyledIconButton = styled(IconButton)(({ theme }) => ({
  backgroundColor: "rgba(0, 0, 0, 0.04)",
  borderRadius: "50%",
  marginLeft: "10px",
}));

export const StyledTabDiv = styled("div")(({ theme }) => ({
  textTransform: "none",
  display: "flex",
  alignItems: "center",
}));
