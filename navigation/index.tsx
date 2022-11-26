import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from '@react-navigation/native';
import { SelectItems } from "../components/select/SelectItems";
import { MainStackParamList, ModalStackParamList, RootStackParamList } from "../types";
import { AddSelectItem } from "../components/select/AddSelectItem";
import Home from "../components/home";
import Search from "../components/search";
import Voc from "../components/voc";
import Quiz from "../components/quiz";
import Favorite from "../components/favorite";
import ImportVoc from "../components/import-voc";
import EditVocItem from "../components/edit-voc-item";

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
            <MainStack.Screen 
                options={{ 
                    headerTitle: 'Dashboard',
                    headerLargeTitle: true,
                    headerShadowVisible: false,
                    headerLargeTitleStyle: { fontSize: 32 }
                }} 
                name="Home" 
                component={Home} 
            />
            <MainStack.Screen name="Search" component={Search} />
            <MainStack.Screen 
                name="Voc" 
                component={Voc} 
                options={({ route }) => ({ headerTitle: route.params.header })}
            />
            <MainStack.Screen name="Import Voc" component={ImportVoc} />
            <MainStack.Screen name="Choose Quiz" component={Quiz} />
            <MainStack.Screen name="Favorites" component={Favorite} />
        </MainStack.Navigator>
    )
}

// Modal stack
const ModalStack = createNativeStackNavigator<ModalStackParamList>();
const ModalStackProvider = () => {
    return(
        <ModalStack.Navigator>
            <ModalStack.Screen 
                name="Select Items" 
                component={SelectItems}
                options={({ route }) => ({ headerTitle: route.params.header || 'Select Items' })}
            />
            <ModalStack.Screen 
                name="Add Select Item" 
                component={AddSelectItem}
                options={({ route }) => ({ headerTitle: route.params.header || 'Add Item' })}
            />
            <ModalStack.Screen 
                name="Edit Voc Item"
                component={EditVocItem}
                options={({ route }) => ({ headerTitle: route.params.header })}
            />
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