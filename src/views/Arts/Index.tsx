import { createStackNavigator } from '@react-navigation/stack';
// Importa la pantalla de detalles del arte si la tienes
import ListArts from './components/ListArts';
import ArtDetails from './components/ArtDetails';

const ListArtsStack = createStackNavigator();

const ListArtsNavigator = () => (
    <ListArtsStack.Navigator initialRouteName="ListArts">
        <ListArtsStack.Screen
            name="ListArts"
            component={ListArts}
            options={{
                title: 'List Arts',
                headerTitleAlign: 'center',
            }}
        />
        <ListArtsStack.Screen
            options={{
                title: 'Art Details',
                headerTitleAlign: 'center',
            }}
            name="ArtDetails"
            component={ArtDetails}
        />
    </ListArtsStack.Navigator>
);
export default ListArtsNavigator;