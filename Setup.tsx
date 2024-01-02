import React, { useContext, useEffect, useState } from 'react';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from './src/views/login/login';
import { NavigationContainer } from '@react-navigation/native';
import HomeScreen from './src/views/home/Home';
import { AppContext } from "./src/context/AppContext";
import { View } from 'react-native'
const Stack = createNativeStackNavigator();
const Setup = () => {
    const { User } = useContext(AppContext)
    const [InitialRoute, setInitialRoute] = useState<string>('')
    const [load, setLoad] = useState(true)
    const LoadUser = async () => {
        const value = await User ? 'home' : 'login'
        console.log(InitialRoute)
        setInitialRoute(value)
        setLoad(false)
    }
    useEffect(() => {
        LoadUser()
    }, [])
    return (<View style={{ flex: 1 }}>

        <NavigationContainer >
            {load ? null : <Stack.Navigator initialRouteName={InitialRoute}>
                <Stack.Screen options={{ headerShown: false }} name="login" component={LoginScreen} />
                <Stack.Screen options={{ headerShown: false }} name="home" component={HomeScreen} />
            </Stack.Navigator>}
        </NavigationContainer>
    </View>

    )
}
export default Setup