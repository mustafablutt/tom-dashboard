import * as React from "react";
import Option, { optionClasses } from "@mui/joy/Option";
import Chip from "@mui/joy/Chip";
import List from "@mui/joy/List";
import ListItemDecorator, {
  listItemDecoratorClasses,
} from "@mui/joy/ListItemDecorator";
import ListDivider from "@mui/joy/ListDivider";
import ListItem from "@mui/joy/ListItem";
import Typography from "@mui/joy/Typography";
import Check from "@mui/icons-material/Check";
import KeyboardArrowDown from "@mui/icons-material/KeyboardArrowDown";
import { IAddComponentData } from "../../../interfaces/Interfaces";
import { usePageComponent } from "../../../context/PageComponentContext";
import Select, { selectClasses } from "@mui/joy/Select";

type SelectGroupedOptionsProps = {
  handleSelectChange: (
    event:
      | React.MouseEvent<Element, MouseEvent>
      | React.KeyboardEvent<Element>
      | React.FocusEvent<Element>
      | null,
    value: string | null
  ) => void;
  // Other props if needed
};

const SelectGroupedOptions: React.FC<SelectGroupedOptionsProps> = ({
  handleSelectChange,
}) => {
  const { componentsInPage } = usePageComponent();
  const groupByPageName = (data: IAddComponentData[] | undefined) => {
    const groupedData: Record<string, any[]> = {};
    if (data) {
      data.forEach((item) => {
        const { pageName, name } = item;
        const pageKey = pageName ?? "Uncategorized";
        if (!groupedData[pageKey]) {
          groupedData[pageKey] = [];
        }
        groupedData[pageKey].push(name);
      });
    }
    return groupedData;
  };
  const groupedComponents = groupByPageName(componentsInPage);

  return (
    <Select
      placeholder="Choose your component to edit"
      onChange={handleSelectChange}
      indicator={<KeyboardArrowDown />}
      sx={{
        [`& .${selectClasses.indicator}`]: {
          transition: "0.2s",
          [`&.${selectClasses.expanded}`]: {
            transform: "rotate(-180deg)",
          },
        },
      }}
      slotProps={{
        listbox: {
          component: "div",
          sx: {
            overflow: "auto",
            "--List-padding": "0px",
            "--ListItem-radius": "0px",
          },
        },
      }}
    >
      {Object.entries(groupedComponents).map(([pageName, names], index) => (
        <React.Fragment key={pageName}>
          {index !== 0 && <ListDivider role="none" />}
          <List
            aria-labelledby={`select-group-${pageName}`}
            sx={{ "--ListItemDecorator-size": "28px" }}
          >
            <ListItem id={`select-group-${pageName}`} sticky>
              <Typography
                level="body3"
                textTransform="uppercase"
                letterSpacing="md"
              >
                {pageName} ({names.length})
              </Typography>
            </ListItem>
            {names.map((name: string) => (
              <Option
                key={name}
                value={name}
                label={
                  <React.Fragment>
                    <Chip
                      size="sm"
                      color="primary" // Replace this with the appropriate color based on the component
                      sx={{ borderRadius: "xs", mr: 1 }}
                    >
                      {pageName}
                    </Chip>{" "}
                    {name}
                  </React.Fragment>
                }
                sx={{
                  [`&.${optionClasses.selected} .${listItemDecoratorClasses.root}`]:
                    {
                      opacity: 1,
                    },
                }}
              >
                <ListItemDecorator sx={{ opacity: 0 }}>
                  <Check />
                </ListItemDecorator>
                {name}
              </Option>
            ))}
          </List>
        </React.Fragment>
      ))}
    </Select>
  );
};
export default SelectGroupedOptions;
