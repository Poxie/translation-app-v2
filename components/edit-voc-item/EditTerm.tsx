import React, { useEffect, useRef, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { addLanguage as addLanugageInStorage, deleteItem as deleteItemInStorage, removeLanguage as removeLanguageInStorage, updateItem as updateItemInStore } from '../../logic';
import { View, ScrollView } from 'react-native';
import layout from '../../constants/layout';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import { addLanguage, addSelector, addTerm, removeLanguage, removeSelector, removeTerm, setTerms, updateTerm } from '../../redux/voc/actions';
import { addSelector as addSelectorInStorage, removeSelector as removeSelectorInStorage } from '../../logic';
import { selectCategories, selectLanguages, selectSelectors } from '../../redux/voc/selectors';
import { createTerm as createTermInStorage } from '../../logic';
import { LanguageItem, VocItem } from '../../types';
import Button from '../button';
import Input from '../input';
import Select, { SelectItem } from '../select';
import { PreviewInput } from './PreviewInput';
import { TranslationSelect } from './TranslationSelect';
import { TypeSelection } from './TypeSelection';
import { removeTermFromQuiz } from '../../redux/quiz/actions';

export const EditTerm: React.FC<{
    defaultItem?: VocItem;
    isEditing: boolean;
    setType: (type: 'term' | 'category') => void;
}> = ({ defaultItem, isEditing, setType }) => {
    const dispatch = useAppDispatch();
    const navigation = useNavigation();
    const [item, setItem] = useState<Partial<VocItem>>(defaultItem || {
        term: '',
        definition: '',
        language: null,
        parentId: null,
        selectors: []
    })
    const { id, term, definition, language, parentId, selectors } = item;
    const availableSelectors = useAppSelector(selectSelectors);
    const availableParents = useAppSelector(selectCategories);
    const availableLanguages = useAppSelector(selectLanguages);
    const disabled = !term && !definition;

    // Updating properties on default item change
    useEffect(() => {
        if(!defaultItem) return;
        setItem(defaultItem);
    }, [defaultItem]);

    useEffect(() => {
        if(isEditing || !defaultItem) return;

        const newItem: VocItem = {
            ...defaultItem,
            ...item,
            definition,
            term
        }

        // Updating item in redux
        dispatch(updateTerm(newItem));

        // Updating item in local storage
        updateItemInStore(newItem);
    }, [isEditing]);

    const createTerm = () => {
        // TODO: Make id entirely unique
        const id = Math.random().toString();

        // Creating term structure
        const termItem: VocItem = {
            ...item,
            id,
            term,
            definition,
            type: 'term'
        }

        dispatch(addTerm(termItem));
        createTermInStorage(termItem);

        navigation.goBack();
    }

    // Deleting term
    const deleteTerm = () => {
        if(!defaultItem) return;
        dispatch(removeTerm(defaultItem.id));
        dispatch(removeTermFromQuiz(defaultItem.id));
        deleteItemInStorage(defaultItem.id);
        navigation.goBack();
    }

    // Updating item property
    const updateProperty = (property: keyof VocItem, value: any) => {
        setItem(prev => {
            const newItem = {...prev} as VocItem;
            newItem[property] = value;
            return newItem;
        })
    }

    // Creating selector
    const onSelectorAdd = (selector: SelectItem) => {
        dispatch(addSelector(selector))
        addSelectorInStorage(selector);
    }

    // Deleting selector
    const onSelectorDelete = (selectorId: string) => {
        dispatch(removeSelector(selectorId));
        removeSelectorInStorage(selectorId);
    }

    // Creating language
    const onLanguageAdd = (language: LanguageItem) => {
        dispatch(addLanguage(language));
        addLanugageInStorage(language);
    }

    // Removing language
    const onLanguageDelete = (languageId: string) => {
        dispatch(removeLanguage(languageId));
        removeLanguageInStorage(languageId);
    }

    // Fetching parents, current item parent
    const parentItems = availableParents.map(category => ({
        id: category.id,
        text: category.title as string
    }));
    const currentParent = availableParents.find(parent => parent.id === parentId);

    // Fetching selectors
    const currentSelectors = availableSelectors.filter(selector => selectors?.includes(selector.id)).map(s => s.text);

    // Fetching languages
    const currentLanguage = availableLanguages.find(lang => lang.id === language)

    // Checking if user can edit values
    const canEdit = isEditing || !defaultItem;
    return(
        <>
        <ScrollView contentContainerStyle={styles.container}>
            {!defaultItem && (
                <TypeSelection 
                    type={'term'}
                    setType={setType}
                />
            )}

            {!canEdit ? (
                <PreviewInput 
                    text={term || ''}
                    label={'Term'}
                />
            ) : (
                <Input 
                    placeholder={'Term'}
                    label={'Term'}
                    defaultValue={term || ''}
                    onTextChange={text => updateProperty('term', text)}
                    containerStyle={styles.inputContainer}
                />
            )}
            {!canEdit ? (
                <PreviewInput 
                    text={definition || ''}
                    label={'Definition'}
                />  
            ) : (
                <Input 
                    placeholder={'Definition'}
                    label={'Definition'}
                    defaultValue={definition || ''}
                    onTextChange={text => updateProperty('definition', text)}
                    containerStyle={styles.inputContainer}
                />
            )}
            {!canEdit ? (
                <PreviewInput 
                    text={currentSelectors.join(', ')}
                    label={'Selectors'}
                />
            ) : (
                <Select 
                    containerStyle={styles.inputContainer}
                    selectableItems={availableSelectors}
                    header={'Choose selectors'}
                    label={'Selectors'}
                    onChange={selectors => updateProperty('selectors', selectors)}
                    onItemAdd={onSelectorAdd}
                    onItemDelete={onSelectorDelete}
                    defaultActive={selectors}
                    addHeader={'Add selector'}
                    addItemLabel={'Add selector'}
                    addItemPlaceholder={'Selector'}
                    placeholder={'Select selector...'}
                    multiSelect
                    allowEdit
                />
            )}
            {!canEdit ? (
                <PreviewInput 
                    text={currentLanguage?.text || ''}
                    label={'Language'}
                />
            ) : (
                <Select 
                    containerStyle={styles.inputContainer}
                    defaultActive={language ? [language] : undefined}
                    selectableItems={availableLanguages}
                    onChange={ids => updateProperty('language', ids[0])}
                    header={'Choose language'}
                    addHeader={'Add language'}
                    addItemLabel={'Add language'}
                    addItemPlaceholder={'Language'}
                    placeholder={'Select language...'}
                    onItemAdd={onLanguageAdd}
                    onItemDelete={onLanguageDelete}
                    label={'Language'}
                    allowEdit
                />
            )}
            <TranslationSelect 
                id={defaultItem?.id || ''}
                isEditing={isEditing || !defaultItem}
            />
            {!canEdit ? (
                <PreviewInput 
                    text={currentParent?.title || ''}
                    label={'Category'}
                />
            ) : (
                <Select 
                    defaultActive={parentId ? [parentId] : undefined}
                    onChange={ids => updateProperty('parentId', ids[0])}
                    containerStyle={styles.inputContainer}
                    selectableItems={parentItems}
                    header={'Select category'}
                    placeholder={'Select category...'}
                    label={'Category'}
                />
            )}

            {canEdit && defaultItem && (
                <Button 
                    type={'danger'}
                    onPress={deleteTerm}
                >
                    Delete term
                </Button>
            )}
        </ScrollView>
        {!defaultItem && (
            <Button 
                onPress={createTerm}
                disabled={disabled}
                style={styles.button}
            >
                Create term
            </Button>
        )}
        </>
    )
}
const styles = {
    container: {
        padding: layout.spacing.primary,
        justifyContent: 'space-between' as 'space-between'
    },
    inputContainer: {
        marginBottom: layout.spacing.primary
    },
    button: {
        marginHorizontal: layout.spacing.primary
    }
}