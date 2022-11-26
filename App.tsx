import AsyncStorageLib from '@react-native-async-storage/async-storage';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { Provider } from 'react-redux';
import { store, useAppDispatch } from './redux/store';
import useCachedResources from './hooks/useCachedResources';
import Navigation from './navigation';
import { ReactElement, useEffect } from 'react';
import { setCategories, setSelectors, setTerms } from './redux/voc/actions';

export default function App() {
  const isLoadingComplete = useCachedResources();

  if(!isLoadingComplete) return null;
  
  return(
    <Provider store={store}>
      <StorageProvider>
        <Navigation />
      </StorageProvider>
    </Provider>
  )
  return (
    <View>
      <StatusBar style="auto" />
    </View>
  );
}

const StorageProvider: React.FC<{
  children: ReactElement;
}> = ({ children }) => {
  const dispatch = useAppDispatch();

  // Hydrating redux with data from local storage
  useEffect(() => {
    // Setting inital terms
    try {
      AsyncStorageLib.getItem('@terms').then(data => {
        if(!data) {
          AsyncStorageLib.setItem('@terms', '[]');
          dispatch(setTerms([]));
          return;
        }

        dispatch(setTerms(JSON.parse(data)));
      })
    } catch(e) {
      console.error(`Error getting/setting initial items`, e);
    }

    // Setting initial categories
    try {
      AsyncStorageLib.getItem('@categories').then(data => {
        if(!data) {
          AsyncStorageLib.setItem('@categories', '[]');
          dispatch(setCategories([]));
          return;
        }

        dispatch(setCategories(JSON.parse(data)));
      })
    } catch(e) {
      console.error(`Error getting/setting initial categories`, e);
    }

    // Setting initial selectors
    try {
      AsyncStorageLib.getItem('@selectors').then(data => {
        if(!data) {
          AsyncStorageLib.setItem('@selectors', '[]');
          dispatch(setSelectors([]));
          return;
        }

        dispatch(setSelectors(JSON.parse(data)));
      })
    } catch(e) {
      console.error(`Error getting/setting initial categories`, e);
    }
  }, []);

  return children;
}