import { styled } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";

export const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: "#53308C",
  "&:hover": {
    backgroundColor: "#53308C",
  },
  marginRight: "80%",
  marginTop: 17,
  width: "30%",

  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "200px",
  },

  [theme.breakpoints.down("sm")]: {
    width: "80%",
    marginRight: 0,
  },
}));

export const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  color: "white",
}));

export const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "white",

  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "": {
        width: "20ch",
      },
    },
  },
}));
