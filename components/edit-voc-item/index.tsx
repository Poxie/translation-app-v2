import { useNavigation } from '@react-navigation/native';
import { useEffect, useState } from "react";
import layout from "../../constants/layout";
import { EditVocItemScreenProps } from "../../types";
import { TouchableOpacity } from 'react-native';
import Text from "../text";
import View from "../view";
import { EditCategory } from "./EditCategory";
import { EditTerm } from "./EditTerm";
import { TypeSelection } from "./TypeSelection";
import { useAppSelector } from '../../redux/store';
import { selectCategoryById, selectTermById } from '../../redux/voc/selectors';

export default function EditVocItem({ route: { params: {
    id,
    type: _type
} } }: EditVocItemScreenProps) {
    const navigation = useNavigation();
    const term = useAppSelector(state => selectTermById(state, id || ''));
    const cateogry = useAppSelector(state => selectCategoryById(state, id || ''));
    const defaultItem = term || cateogry;
    const [type, setType] = useState(_type);
    const [isEditing, setIsEditing] = useState(false);

    // Updating header on type change
    useEffect(() => {
        if(defaultItem) {
            navigation.setOptions({ headerRight: () => (
                <TouchableOpacity onPress={() => setIsEditing(!isEditing)}>
                    <Text>
                        {isEditing ? 'Save' : 'Edit'}
                    </Text>
                </TouchableOpacity>
            ) });
            return;
        }
        navigation.setOptions({ headerTitle: `Create ${type}` })
    }, [type, isEditing]);

    return(
        <View safeAreaView>
            <View style={styles.container}>
                {!defaultItem && (
                    <TypeSelection 
                        type={type}
                        setType={setType}
                    />
                )}

                {type === 'term' && (
                    <EditTerm 
                        defaultItem={defaultItem}
                        isEditing={isEditing}
                    />
                )}

                {type === 'category' && (
                    <EditCategory 
                        defaultItem={defaultItem}
                        isEditing={isEditing}
                    />
                )}
            </View>
        </View>
    )
}
const styles = {
    container: {
        padding: layout.spacing.primary,
        paddingBottom: 0
    }
}