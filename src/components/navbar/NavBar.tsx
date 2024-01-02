import React from 'react';
import { View } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { ListIcon } from '../icons/listIcon'
import { InventoryIcon } from '../icons/InventoryIcon';
import { PrimaryColor } from '../../constants/Colors';
import CustomTabLabel from './components/Label';
import ListArtsNavigator from '../../views/Arts/Index';
import FavoritesArts from '../../views/Favorites/Favorites';
type TabParamList = {
    Favoritos: undefined;
    Inicio: undefined;
};

const Tab = createBottomTabNavigator<TabParamList>();
const NavBar = () => {

    return (
        <View style={{ flex: 1 }}>
            <Tab.Navigator
            >
                <Tab.Screen options={{
                    tabBarLabel: ({ focused }) => <CustomTabLabel label="Inicio" focused={focused} />,
                    tabBarIcon: ({ focused, color, size }) => (
                        <ListIcon color={focused ? PrimaryColor : 'rgb(180,180,180)'} width={20} height={20} />
                    ), headerShown: false,
                }} name="Inicio" component={ListArtsNavigator}
                />
                <Tab.Screen options={{
                    tabBarLabel: ({ focused }) => <CustomTabLabel label="Favoritos" focused={focused} />,
                    tabBarIcon: ({ focused, color, size }) => (
                        <InventoryIcon color={focused ? PrimaryColor : 'rgb(180,180,180)'} width={20} height={20} />
                    ), headerShown: false,
                }} name="Favoritos" component={FavoritesArts} />
            </Tab.Navigator>
        </View>
    );
};

export default NavBar;
