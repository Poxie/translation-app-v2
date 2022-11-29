import { useNavigation } from '@react-navigation/native';
import { Feather } from '@expo/vector-icons'; 
import { TouchableOpacity } from 'react-native';
import layout from '../../constants/layout';
import { useColors } from '../../hooks/useColors';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import { addLanguage as addLanguageInStore, removeLanguage as removeLanguageInStore } from '../../logic';
import { addLanguage, removeLanguage } from '../../redux/voc/actions';
import { selectLanguages } from '../../redux/voc/selectors';
import { SelectItem } from '../select';

export const RemoveLanguage = () => {
    const navigation = useNavigation();
    const dispatch = useAppDispatch();
    const { background: { secondary, tertiary }, color: { red } } = useColors();
    const languages = useAppSelector(selectLanguages);

    const onItemAdd = (item: SelectItem) => {
        dispatch(addLanguage(item));
        addLanguageInStore(item);
    }
    const onItemDelete = (id: string) => {
        dispatch(removeLanguage(id));
        removeLanguageInStore(id);
    }
    const editLanguages = () => {
        navigation.navigate('Modal', {
            screen: 'Select Items',
            params: {
                items: languages,
                active: [],
                onItemAdd,
                onItemDelete,
                onChange: () => {},
                allowEdit: true,
                onlyEdit: true,
                header: 'Edit languages',
                addHeader: 'Add language',
                addItemLabel: 'Add language',
                addItemPlaceholder: 'Language'
            }
        })
    }

    return(
        <TouchableOpacity
            onPress={editLanguages}
            style={{
                backgroundColor: secondary,
                borderColor: tertiary,
                ...styles.container
            }}
        >
            <Feather name="trash-2" size={24} color={red} />
        </TouchableOpacity>
    )
}
const styles = {
    container: {
        alignItems: 'center' as 'center',
        justifyContent: 'center' as 'center',
        borderWidth: layout.borderWidth.secondary,
        borderRadius: layout.borderRadius.secondary,
        marginRight: layout.spacing.primary * 2,
        paddingHorizontal: 7,
    }
}