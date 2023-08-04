
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
<Grid xs={6} md={6}>
  <Select color="danger" placeholder="Type Something oldu" 
    variant="soft" size="lg" > <Option value="dog">DOG</Option>
    <Option value="cat">CAT</Option> </Select>
  <Input color="info" placeholder="Type Somethingl" 
    variant="outlined" size="lg" />
</Grid>
<Grid xs={6} md={6}>
  <Checkbox checked={true} color="primary" label="ceydaa" 
    variant="solid" size="lg" />
</Grid>
<Grid xs={12} md={12}>
  <Select color="success" placeholder="selam cnım" 
    variant="soft" size="lg" > <Option value="dog">DOG</Option>
    <Option value="cat">CAT</Option> </Select>
</Grid>
</Grid>
);
};

export default Test;
