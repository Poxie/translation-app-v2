import React, { useEffect, useRef, useState } from 'react';
import { addLanguage as addLanugageInStorage, removeLanguage as removeLanguageInStorage, updateItem as updateItemInStore } from '../../logic';
import { View, ScrollView } from 'react-native';
import layout from '../../constants/layout';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import { addLanguage, addSelector, addTerm, removeLanguage, removeSelector, setTerms, updateTerm } from '../../redux/voc/actions';
import { addSelector as addSelectorInStorage, removeSelector as removeSelectorInStorage } from '../../logic';
import { selectCategories, selectLanguages, selectSelectors } from '../../redux/voc/selectors';
import { createTerm as createTermInStorage } from '../../logic';
import { LanguageItem, VocItem } from '../../types';
import Button from '../button';
import Input from '../input';
import Select, { SelectItem } from '../select';
import { PreviewInput } from './PreviewInput';
import { TranslationSelect } from './TranslationSelect';

export const EditTerm: React.FC<{
    defaultItem?: VocItem;
    isEditing: boolean;
}> = ({ defaultItem, isEditing }) => {
    const dispatch = useAppDispatch();
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

        // Adding term to redux store
        dispatch(addTerm(termItem));
        
        // Adding term to local storage
        createTermInStorage(termItem);
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
        <View style={styles.container}>
            <ScrollView>
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
                        header={'Choose category'}
                        placeholder={'No category selected.'}
                        label={'Category'}
                    />
                )}
            </ScrollView>
            {!defaultItem && (
                <Button 
                    onPress={createTerm}
                    disabled={disabled}
                >
                    Create term
                </Button>
            )}
        </View>
    )
}
const styles = {
    container: {
        flex: 1,
        justifyContent: 'space-between' as 'space-between'
    },
    inputContainer: {
        marginBottom: layout.spacing.primary
    }
}