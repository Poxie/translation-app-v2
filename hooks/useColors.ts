import { useColorScheme } from 'react-native';
import Colors from '../constants/colors';

export const useColors = () => {
    const colorScheme = useColorScheme() || 'light';
    const colors = Colors[colorScheme];
    return colors;
}