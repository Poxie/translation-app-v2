import React, { useEffect, useRef, useState } from 'react';
import { updateItem as updateItemInStore } from '../../logic';
import { View } from 'react-native';
import layout from '../../constants/layout';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import { addTerm, updateTerm } from '../../redux/voc/actions';
import { selectCategories } from '../../redux/voc/selectors';
import { createTerm as createTermInStorage } from '../../logic';
import { VocItem } from '../../types';
import Button from '../button';
import Input from '../input';
import Select from '../select';
import { PreviewInput } from './PreviewInput';

export const EditTerm: React.FC<{
    defaultItem?: VocItem;
    isEditing: boolean;
}> = ({ defaultItem, isEditing }) => {
    const dispatch = useAppDispatch();
    const [term, setTerm] = useState(defaultItem?.term || '');
    const [definition, setDefinition] = useState(defaultItem?.definition || '');
    const [parentId, setParentId] = useState(defaultItem?.parentId || null);
    const availableParents = useAppSelector(selectCategories);
    const disabled = !term && !definition;

    useEffect(() => {
        if(isEditing || !defaultItem) return;

        const newItem: VocItem = {
            ...defaultItem,
            term: term,
            definition: definition,
            parentId: parentId
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
            id,
            term,
            definition,
            parentId,
            type: 'term'
        }

        // Adding term to redux store
        dispatch(addTerm(termItem));
        
        // Adding term to local storage
        createTermInStorage(termItem);
    }

    // Fetching parents, current item parent
    const parentItems = availableParents.map(category => ({
        id: category.id,
        text: category.title as string
    }));
    const currentParent = availableParents.find(parent => parent.id === parentId);

    // Checking if user can edit values
    const canEdit = isEditing || !defaultItem;
    return(
        <View style={styles.container}>
            <View>
                {!canEdit ? (
                    <PreviewInput 
                        text={term}
                        label={'Term'}
                    />
                ) : (
                    <Input 
                        placeholder={'Term'}
                        label={'Term'}
                        defaultValue={term}
                        onTextChange={setTerm}
                        containerStyle={styles.inputContainer}
                    />
                )}
                {!canEdit ? (
                    <PreviewInput 
                        text={definition}
                        label={'Definition'}
                    />  
                ) : (
                    <Input 
                        placeholder={'Definition'}
                        label={'Definition'}
                        defaultValue={definition}
                        onTextChange={setDefinition}
                        containerStyle={styles.inputContainer}
                    />
                )}
                {!canEdit ? (
                    <PreviewInput 
                        text={currentParent?.title || ''}
                        label={'Category'}
                    />
                ) : (
                    <Select 
                        defaultActive={parentId ? [parentId] : undefined}
                        onChange={ids => setParentId(ids[0])}
                        containerStyle={styles.inputContainer}
                        selectableItems={parentItems}
                        header={'Choose category'}
                        placeholder={'No category selected.'}
                        label={'Category'}
                    />
                )}
            </View>
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