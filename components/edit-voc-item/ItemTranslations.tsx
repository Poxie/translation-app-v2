import { useNavigation } from '@react-navigation/native';
import { View as DefaultView, TouchableOpacity } from 'react-native';
import layout from '../../constants/layout';
import { useColors } from '../../hooks/useColors';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import { addTranslation, removeTranslation } from '../../redux/voc/actions';
import { selectLanguages, selectTranslations } from '../../redux/voc/selectors';
import { ItemTranslationsScreenProps } from '../../types';
import { SelectItem } from '../select/SelectItem';
import Text from '../text';
import View from '../view';

export const ItemTranslations = ({ route: { params: { id } } }: ItemTranslationsScreenProps) => {
    const { background: { secondary, tertiary } } = useColors();
    const dispatch = useAppDispatch();
    const navigation = useNavigation();
    const translations = useAppSelector(state => selectTranslations(state, id));
    const languages = useAppSelector(selectLanguages);
    const items = translations.map(translation => ({
        id: translation.id,
        text: `${translation.term || translation.definition} ${translation.language ? '(' + (
            languages.find(language => language.id === translation.language)?.text
        ) + ')' : ''}`
    }))
    if(!translations) return null;

    const onAddClick = () => {
        const onTermSelected = (termId: string) => {
            dispatch(addTranslation(id, termId));
            navigation.goBack();
        }

        navigation.navigate('Modal', {
            screen: 'Search Term',
            params: {
                header: 'Search Term',
                description: 'Search and select another term to link as a translation for this term.',
                onTermSelected
            }
        })
    }

    const onDeletePress = (termId: string) => {
        dispatch(removeTranslation(id, termId));
    }

    return(
        <View style={styles.container}>
            <DefaultView style={{
                borderColor: tertiary,
                ...styles.content
            }}>
                {items.length === 0 && (
                    <Text 
                        style={{
                            backgroundColor: secondary,
                            borderColor: tertiary,
                            ...styles.empty
                        }}
                    >
                        There are no items here yet.
                    </Text>
                )}

                {items.map((item, key) => (
                    <SelectItem 
                        {...item}
                        onPress={() => {}}
                        isLast={key === translations.length - 1}
                        active={false}
                        onDeletePress={onDeletePress}
                        isEditing={true}
                        key={item.id}
                    />
                ))}
            </DefaultView>

            <TouchableOpacity 
                onPress={onAddClick}
                style={styles.addButton}
            >
                <Text>
                    Add Item
                </Text>
            </TouchableOpacity>
        </View>
    )
}
const styles = {
    container: {
        padding: layout.spacing.primary
    },
    content: {
        borderRadius: layout.borderRadius.primary,
        borderWidth: layout.borderWidth.secondary,
        overflow: 'hidden' as 'hidden'
    },
    addButton: {
        alignItems: 'center' as 'center',
        paddingVertical: layout.spacing.primary,
        marginTop: layout.spacing.primary
    },
    empty: {
        borderRadius: layout.borderRadius.primary,
        borderWidth: layout.borderWidth.primary,
        padding: layout.spacing.primary,
        textAlign: 'center' as 'center'
    }
}