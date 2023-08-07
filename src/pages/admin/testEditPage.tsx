import Radio from "@mui/joy/Radio/Radio";
import RadioGroup from "@mui/joy/RadioGroup/RadioGroup";
import Select from "@mui/joy/Select";
import Option from "@mui/joy/Option";
import Checkbox from "@mui/joy/Checkbox/Checkbox";
import Input from "@mui/joy/Input/Input";

import Grid from "@mui/joy/Grid/Grid";

const Test: React.FunctionComponent = () => {
  return (
    <Grid container spacing={2} sx={{ flexGrow: 1 }}>
      <Grid xs={6} md={6}>
        <Select
          color="primary"
          placeholder="mustafadeneme12"
          variant="solid"
          size="lg"
        >
          {" "}
          <Option value="dog">DOG</Option>
          <Option value="cat">CAT</Option>{" "}
        </Select>
      </Grid>
      <Grid xs={6} md={6}>
        <Select
          color="primary"
          placeholder="mustafadeneme12"
          variant="solid"
          size="lg"
        >
          {" "}
          <Option value="dog">DOG</Option>
          <Option value="cat">CAT</Option>{" "}
        </Select>
      </Grid>
      <Grid xs={12} md={12}>
        <Checkbox
          checked={true}
          color="neutral"
          label="undefined"
          variant="outlined"
          size="sm"
        />
      </Grid>
      <Grid xs={6} md={6}>
        <RadioGroup defaultValue="radio1" name="radio-buttons-group">
          <Radio
            value="radio1"
            label="fdfd"
            size="sm"
            color="neutral"
            variant="outlined"
          />
          <Radio
            value="radio2"
            label="fdfd"
            size="sm"
            color="neutral"
            variant="outlined"
          />
          <Radio
            value="radio3"
            label="fdfd"
            size="sm"
            color="neutral"
            variant="outlined"
          />
        </RadioGroup>
      </Grid>
      <Grid xs={6} md={6}>
        <Input
          color="warning"
          placeholder="aslı ben"
          variant="outlined"
          size="lg"
        />
      </Grid>
    </Grid>
  );
};

export default Test;
