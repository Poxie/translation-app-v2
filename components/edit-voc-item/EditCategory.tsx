import { useState } from 'react';
import { View } from 'react-native';
import layout from '../../constants/layout';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import { addCategory } from '../../redux/voc/actions';
import { selectCategories } from '../../redux/voc/selectors';
import { VocItem } from "../../types";
import Button from '../button';
import Input from '../input';
import Select from '../select';

export const EditCategory: React.FC<{
    defaultItem?: VocItem;
}> = ({ defaultItem }) => {
    const dispatch = useAppDispatch();
    const [title, setTitle] = useState(defaultItem?.title || '');
    const [parentId, setParentId] = useState(defaultItem?.parentId || null);
    const availableParents = useAppSelector(selectCategories);
    const disabled = !title;

    const createCategory = () => {
        // TODO: Make id entirely unique
        const id = Math.random().toString();

        // Creating category structure
        const category: VocItem = {
            id,
            title,
            parentId,
            type: 'category'
        }

        // Adding category to redux store
        dispatch(addCategory(category));
    }

    const parentItems = availableParents.map(category => ({
        id: category.id,
        text: category.title as string
    }))
    return(
        <View style={styles.container}>
            <View>
                <Input 
                    placeholder={'Title'}
                    label={'Title'}
                    onTextChange={setTitle}
                    containerStyle={styles.inputContainer}
                />
                <Select 
                    label={'Category'}
                    selectableItems={parentItems}
                    onChange={ids => setParentId(ids[0])}
                    containerStyle={styles.inputContainer}
                />
            </View>
            <Button 
                onPress={createCategory}
                disabled={disabled}
            >
                Create category
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