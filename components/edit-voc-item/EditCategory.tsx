import { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { View } from 'react-native';
import layout from '../../constants/layout';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import { addCategory, removeCategory, updateCategory } from '../../redux/voc/actions';
import { selectCategories } from '../../redux/voc/selectors';
import { createCategory as createCategoryInStorage, updateCategory as updateCategoryInStorage, deleteCategory as deleteCategoryInStorage } from '../../logic';
import { VocItem } from "../../types";
import Button from '../button';
import Input from '../input';
import Select from '../select';
import { PreviewInput } from './PreviewInput';

export const EditCategory: React.FC<{
    defaultItem?: VocItem;
    isEditing: boolean;
}> = ({ defaultItem, isEditing }) => {
    const dispatch = useAppDispatch();
    const navigation = useNavigation();
    const [title, setTitle] = useState(defaultItem?.title || '');
    const [parentId, setParentId] = useState(defaultItem?.parentId || null);
    const availableParents = useAppSelector(selectCategories).filter(category => category.id !== defaultItem?.id);
    const disabled = !title;

    // Updating category on edit stop
    useEffect(() => {
        if(isEditing || !defaultItem) return;

        const newItem = {
            ...defaultItem,
            title,
            parentId
        }

        // Updating category in redux
        dispatch(updateCategory(newItem));

        // Updating category in local storage
        updateCategoryInStorage(newItem);
    }, [isEditing]);

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

        // Adding category to local storage
        createCategoryInStorage(category)
    }

    // Deleting category
    const deleteCategory = () => {
        if(!defaultItem) return;
        dispatch(removeCategory(defaultItem.id));
        deleteCategoryInStorage(defaultItem.id);
        navigation.goBack();
    }

    // Determining parent items and active parent
    const parentItems = availableParents.map(category => ({
        id: category.id,
        text: category.title as string
    }));
    const activeParent = parentItems.find(parent => parent.id === parentId);

    // Determining if user can edit
    const canEdit = isEditing || !defaultItem;
    return(
        <View style={styles.container}>
            <View>
                {canEdit ? (
                    <Input 
                        placeholder={'Title'}
                        label={'Title'}
                        onTextChange={setTitle}
                        containerStyle={styles.inputContainer}
                        defaultValue={title}
                    />
                ) : (
                    <PreviewInput 
                        text={title}
                        label={'Title'}
                    />
                )}
                {canEdit ? (
                    <Select 
                        defaultActive={parentId ? [parentId] : undefined}
                        label={'Category'}
                        selectableItems={parentItems}
                        onChange={ids => setParentId(ids[0])}
                        containerStyle={styles.inputContainer}
                        placeholder={'Select category...'}
                    />
                ) : (
                    <PreviewInput 
                        text={activeParent?.text || ''}
                        label={'Category'}
                    />
                )}

                {canEdit && (
                    <Button 
                        type={'danger'}
                        onPress={deleteCategory}
                    >
                        Delete category
                    </Button>
                )}
            </View>
            {!defaultItem && (
                <Button 
                    onPress={createCategory}
                    disabled={disabled}
                >
                    Create category
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