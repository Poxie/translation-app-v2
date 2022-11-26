import { useNavigation } from '@react-navigation/native';
import { useRef } from 'react';
import { View as DefaultView, TouchableOpacity } from 'react-native';
import Toast, { useToast } from 'react-native-toast-notifications';
import layout from '../../constants/layout';
import { useColors } from '../../hooks/useColors';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import { addTranslation, createTranslation } from '../../redux/voc/actions';
import { selectTermById, selectTerms, selectTermTranslations } from '../../redux/voc/selectors';
import { ItemTranslationsScreenProps } from '../../types';
import { SelectItem } from '../select/SelectItem';
import Text from '../text';
import View from '../view';

export const ItemTranslations = ({ route: { params: { id } } }: ItemTranslationsScreenProps) => {
    const { background: { secondary, tertiary } } = useColors();
    const toast = useToast();
    const dispatch = useAppDispatch();
    const navigation = useNavigation();
    const terms = useAppSelector(selectTerms);
    const term = useAppSelector(state => selectTermById(state, id));
    const termTranslations = useAppSelector(state => selectTermTranslations(state, id));
    const items = termTranslations.map(translation => ({
        id: translation.id,
        text: translation.term || translation.definition || ''
    }))
    const toastRef = useRef<any>();

    const openTerm = (id: string) => {
        navigation.navigate('Modal', {
            screen: 'Edit Voc Item',
            params: {
                header: 'View term',
                type: 'term',
                id
            }
        })
    }

    const onAddClick = () => {
        const onTermSelected = (termId: string) => {
            const selectedTerm = terms.find(term => term.id === termId);
            if(!selectedTerm) return;
            navigation.goBack();

            const selectedTermTranslation = selectedTerm?.translation;
            const selfTermTranslation = term?.translation
            const translation = selectedTermTranslation || selfTermTranslation;

            // If both terms are same
            if(termId === term?.id) {
                toastRef.current.show('A term cannot be a translation of itself.', {
                    type: 'danger'
                });
                return;
            }

            // If both terms are in translation
            if(translation && selectedTermTranslation === selfTermTranslation) {
                toastRef.current.show('This term is already a translation.');
                return;
            }
            
            // If selected term has translations, add to translation array
            if(translation) {
                dispatch(addTranslation(selectedTermTranslation ? id : termId, translation))
            } else {
                const translationId = Math.random().toString();
                dispatch(createTranslation([id, termId], translationId));
            }
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
        console.log('translation delete', termId);
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
                        onPress={openTerm}
                        isLast={key === items.length - 1}
                        active={false}
                        onDeletePress={onDeletePress}
                        isEditing={true}
                        allowPressWhileEdit={true}
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

            <Toast ref={toastRef} />
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