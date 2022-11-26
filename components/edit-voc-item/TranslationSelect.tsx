import { MaterialIcons } from '@expo/vector-icons'; 
import { useNavigation } from '@react-navigation/native';
import { View, TouchableOpacity } from 'react-native';
import layout from '../../constants/layout';
import { useColors } from '../../hooks/useColors';
import { useAppSelector } from "../../redux/store";
import { selectTranslations } from "../../redux/voc/selectors";
import Text from '../text';

export const TranslationSelect: React.FC<{
    id: string;
    isEditing: boolean;
}> = ({ id, isEditing }) => {
    const { background: { secondary, tertiary }, text: { secondary: textSecondary } } = useColors();
    const navigation = useNavigation();
    const translations = useAppSelector(state => selectTranslations(state, id));
    const items = translations.map(translation => translation.term || translation.definition);

    const openModal = () => {
        navigation.navigate('Modal', {
            screen: 'Item Translations',
            params: { id }
        })
    }

    return(
        <View style={styles.container}>
            <Text style={{
                color: textSecondary,
                ...styles.label
            }}>
                Translations
            </Text>
            
            <TouchableOpacity
                onPress={openModal}
                disabled={!isEditing}
                style={{
                    backgroundColor: secondary,
                    borderColor: tertiary,
                    ...styles.button
                }}
            >
                <Text>
                    {items.join(', ') || 'Select translations...'}
                </Text>
                
                {isEditing && (
                    <MaterialIcons name="arrow-forward-ios" size={16} color="black" />
                )}
            </TouchableOpacity>
        </View>
    )
}
const styles = {
    container: {
        marginBottom: layout.spacing.primary
    },
    button: {
        padding: layout.spacing.primary,
        borderWidth: layout.borderWidth.primary,
        borderRadius: layout.borderRadius.secondary,
        flexDirection: 'row' as 'row',
        justifyContent: 'space-between' as 'space-between',
        alignItems: 'center' as 'center',
        width: '100%'
    },
    label: {
        marginBottom: layout.spacing.secondary,
        fontWeight: '600' as '600'
    }
}