import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from '@react-navigation/native';
import Home from "../components/home/Home";
import { SelectItems } from "../components/select/SelectItems";
import { MainStackParamList, ModalStackParamList, RootStackParamList } from "../types";

// Root stack
const RootStack = createNativeStackNavigator<RootStackParamList>();
const RootStackProvider = () => {
    return(
        <RootStack.Navigator 
            initialRouteName={'Root'}
            screenOptions={{ headerShown: false }}
        >
            <RootStack.Screen name="Root" component={MainStackProvider} />
            <RootStack.Screen name="Modal" component={ModalStackProvider} options={{ presentation: 'modal' }} />
        </RootStack.Navigator>
    )
}

// Main stack
const MainStack = createNativeStackNavigator<MainStackParamList>();
const MainStackProvider = () => {
    return(
        <MainStack.Navigator initialRouteName={'Home'}>
            <MainStack.Screen options={{ headerTitle: 'heylow' }} name="Home" component={Home} />
        </MainStack.Navigator>
    )
}

// Modal stack
const ModalStack = createNativeStackNavigator<ModalStackParamList>();
const ModalStackProvider = () => {
    return(
        <ModalStack.Navigator>
            <ModalStack.Screen name="Select Items" component={SelectItems} />
        </ModalStack.Navigator>
    )
}

// Exporting navigation
export default function Navigation() {
    return(
        <NavigationContainer>
            <RootStackProvider />
        </NavigationContainer>
    )
}