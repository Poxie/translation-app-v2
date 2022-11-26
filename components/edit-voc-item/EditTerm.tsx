import React, { useEffect, useRef, useState } from 'react';
import { View } from 'react-native';
import layout from '../../constants/layout';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import { addTerm } from '../../redux/voc/actions';
import { selectCategories } from '../../redux/voc/selectors';
import { createTerm as createTermInStorage } from '../../logic';
import { VocItem } from '../../types';
import Button from '../button';
import Input from '../input';
import Select from '../select';

export const EditTerm: React.FC<{
    defaultItem?: VocItem;
}> = ({ defaultItem }) => {
    const dispatch = useAppDispatch();
    const [term, setTerm] = useState(defaultItem?.term || '');
    const [definition, setDefinition] = useState(defaultItem?.definition || '');
    const [parentId, setParentId] = useState(defaultItem?.parentId || null);
    const availableParents = useAppSelector(selectCategories);
    const disabled = !term && !definition;

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

    const parentItems = availableParents.map(category => ({
        id: category.id,
        text: category.title as string
    }))
    return(
        <View style={styles.container}>
            <View>
                <Input 
                    placeholder={'Term'}
                    label={'Term'}
                    onTextChange={setTerm}
                    containerStyle={styles.inputContainer}
                />
                <Input 
                    placeholder={'Definition'}
                    label={'Definition'}
                    onTextChange={setDefinition}
                    containerStyle={styles.inputContainer}
                />
                <Select 
                    onChange={ids => setParentId(ids[0])}
                    containerStyle={styles.inputContainer}
                    selectableItems={parentItems}
                    header={'Choose category'}
                    label={'Category'}
                />
            </View>
            <Button 
                onPress={createTerm}
                disabled={disabled}
            >
                Create term
            </Button>
        </View>
    )
}
const styles = {
    container: {
        flex: 1,
        justifyContent: 'space-between' as 'space-between'
    },
    inputContainer: {
        marginTop: layout.spacing.primary
    }
}