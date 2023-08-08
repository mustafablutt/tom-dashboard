import Select from "@mui/joy/Select";
import Option from "@mui/joy/Option";
import Input from "@mui/joy/Input/Input";

import Grid from "@mui/joy/Grid/Grid";

const Test: React.FunctionComponent = () => {
  return (
    <Grid container spacing={2} sx={{ flexGrow: 1 }}>
      <Grid xs={6} md={6}>
        <Select color="warning" placeholder="selam" variant="soft" size="lg">
          {" "}
          <Option value="dog">DOG</Option>
          <Option value="cat">CAT</Option>{" "}
        </Select>
      </Grid>
      <Grid xs={6} md={6}>
        <Select
          color="info"
          placeholder="Typhge Something"
          variant="solid"
          size="md"
        >
          {" "}
          <Option value="dog">DOG</Option>
          <Option value="cat">CAT</Option>{" "}
        </Select>
      </Grid>
      <Grid xs={4} md={4}></Grid>
      <Grid xs={4} md={4}>
        <Input
          color="danger"
          placeholder="ceyda placehh"
          variant="soft"
          size="sm"
        />
      </Grid>
      <Grid xs={4} md={4}></Grid>
      <Grid xs={12} md={12}>
        <Select
          color="info"
          placeholder="Typhge Something"
          variant="solid"
          size="md"
        >
          {" "}
          <Option value="dog">DOG</Option>
          <Option value="cat">CAT</Option>{" "}
        </Select>
      </Grid>
    </Grid>
  );
};

export default Test;
