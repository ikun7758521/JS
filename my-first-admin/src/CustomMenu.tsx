import { Menu } from 'react-admin';
import LabelIcon from '@mui/icons-material/Label';

const CustomMenu = () => (
    <Menu>
        <Menu.DashboardItem />
        <Menu.Item to="/titanic" primaryText="Titanic" leftIcon={<LabelIcon />}/>
        <Menu.Item to="/students" primaryText="Students" leftIcon={<LabelIcon />}/>
        <Menu.Item to="/chart" primaryText="Chart" leftIcon={<LabelIcon />}/>
        <Menu.Item to="/students_chart" primaryText="Students Chart" leftIcon={<LabelIcon />}/>
        <Menu.Item to="/my_component" primaryText="My Component" leftIcon={<LabelIcon />}/>
        <Menu.Item to="/wine-consumption" primaryText="Wine Consumption" leftIcon={<LabelIcon />}/>
    </Menu>
);

export default CustomMenu;