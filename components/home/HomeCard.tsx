import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import layout from '../../constants/layout';
import { useColors } from '../../hooks/useColors';
import Text from '../text';
import { HomeCard as HomeCardType } from './HomeCards';

export const HomeCard: React.FC<HomeCardType> = ({ text, icon, path }) => {
    const { background: { tertiary
    , } } = useColors();
    const { navigate } = useNavigation();
    
    return(
        <TouchableOpacity 
            onPress={() => navigate('Root', { screen: path })} 
            style={styles.button}
        >
            <View style={{
                borderColor: tertiary,
                ...styles.container
            }}>
                {icon}
                <Text 
                    style={styles.text} 
                    type={'secondary'}
                >
                    {text}
                </Text>
            </View>
        </TouchableOpacity>
    )
}
const styles = {
    button: {
        width: '50%',
    },
    container: {
        flex: 1,
        alignItems: 'center' as 'center',
        margin: layout.spacing.secondary / 2,
        borderWidth: layout.borderWidth.primary,
        borderRadius: layout.borderRadius.primary,
        paddingVertical: 35
    },
    text: {
        fontSize: 15,
        fontWeight: '500' as '500',
        marginTop: 24
    }
}