import { useNavigation } from '@react-navigation/native';
import { MaterialIcons } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native';
import layout from '../../constants/layout';
import { useColors } from '../../hooks/useColors';
import { addLanguage as addLanguageInStore } from '../../logic';
import { useAppDispatch } from '../../redux/store';
import { addLanguage } from '../../redux/voc/actions';

export const AddLanguage = () => {
    const navigation = useNavigation();
    const dispatch = useAppDispatch();
    const { background: { secondary, tertiary }, text: { primary } } = useColors();

    const openModal = () => {
        const onSubmit = (text: string) => {
            const id = Math.random().toString();
            const item = {
                id,
                text
            }

            dispatch(addLanguage(item));
            addLanguageInStore(item);
        }

        navigation.navigate('Modal', {
            screen: 'Add Select Item',
            params: { 
                onSubmit, 
                header: 'Add language',
                addLabel: 'Add language',
                placeholder: 'Language',
                closeOnSubmit: true 
            }
        })
    }

    return(
        <TouchableOpacity
            onPress={openModal} 
            style={{
                backgroundColor: secondary,
                borderColor: tertiary,
                ...styles.container
            }}
        >
            <MaterialIcons name="add" size={24} color={primary} />
        </TouchableOpacity>
    )
}
const styles = {
    container: {
        alignItems: 'center' as 'center',
        justifyContent: 'center' as 'center',
        borderWidth: layout.borderWidth.secondary,
        borderRadius: layout.borderRadius.secondary,
        paddingHorizontal: 7,
        marginRight: 10
    }
}