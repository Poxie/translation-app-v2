import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from '@react-navigation/native';
import Home from "../components/home/Home";

const MainStack = createNativeStackNavigator();

const MainStackProvider = () => {
    return(
        <MainStack.Navigator initialRouteName={'Home'}>
            <MainStack.Screen options={{ headerTitle: 'heylow' }} name="Home" component={Home} />
        </MainStack.Navigator>
    )
}

// Exporting navigation
export default function Navigation() {
    return(
        <NavigationContainer>
            <MainStackProvider />
        </NavigationContainer>
    )
}