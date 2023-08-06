import Checkbox from "@mui/joy/Checkbox/Checkbox";
import Radio from "@mui/joy/Radio/Radio";
import RadioGroup from "@mui/joy/RadioGroup/RadioGroup";
import Input from "@mui/joy/Input";
import Select from "@mui/joy/Select";
import Grid from "@mui/joy/Grid/Grid";
import Option from "@mui/joy/Option/Option";

const Test: React.FunctionComponent = () => {
  return (
    <Grid container spacing={2} sx={{ flexGrow: 1 }}>
      <Grid xs={4} md={4}>
        <Input
          color="warning"
          placeholder="aslı ben"
          variant="outlined"
          size="lg"
        />
      </Grid>
      <Grid xs={4} md={4}>
        <Input
          color="info"
          placeholder="ben ceydayım"
          variant="soft"
          size="lg"
        />
      </Grid>
      <Grid xs={4} md={4}>
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
        <Input
          color="info"
          placeholder="ben ceydayım"
          variant="soft"
          size="lg"
        />
        <Input
          color="danger"
          placeholder="NaberMustafa"
          variant="solid"
          size="sm"
        />
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
          color="info"
          placeholder="ben ceydayım"
          variant="soft"
          size="lg"
        />
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
    </Grid>
  );
};

export default Test;
