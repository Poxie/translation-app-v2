import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import useCachedResources from './hooks/useCachedResources';
import Navigation from './navigation';

export default function App() {
  const isLoadingComplete = useCachedResources();

  if(!isLoadingComplete) return null;
  
  return(
    <Provider store={store}>
      <Navigation />
    </Provider>
  )
  return (
    <View>
      <StatusBar style="auto" />
    </View>
  );
}