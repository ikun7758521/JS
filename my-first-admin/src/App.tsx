import { Admin, Layout, Resource, ListGuesser, EditGuesser, CustomRoutes } from 'react-admin';
import { Route } from 'react-router-dom';
import { ChartPage } from './ChartPage';
import CustomMenu from './CustomMenu';
import { titanicDataProvider } from './titanicDataProvider';
import { StudentsChartPage } from './ChartPageStudents';
import { MyFirstPage } from './MyFirstPage';
import WineConsumptionChart from './alcoholic';

const CustomLayout = (props: any) => <Layout {...props} menu={CustomMenu} />;

export const App = () => (
    <Admin layout={CustomLayout} dataProvider={titanicDataProvider}>
        <Resource name="titanic" list={ListGuesser} edit={EditGuesser} />
        <Resource name="students" list={ListGuesser} edit={EditGuesser} />
        <Resource name="test" list={ListGuesser} edit={EditGuesser} />
        <Resource name="wine-consumption" list={WineConsumptionChart} />
        <CustomRoutes>
            <Route path="/chart" element={<ChartPage />} />
            <Route path="/students_chart" element={<StudentsChartPage />} />
            <Route path="/my_component" element={<MyFirstPage name={'yiming'} />} />
        </CustomRoutes>
    </Admin>
);

export default App;