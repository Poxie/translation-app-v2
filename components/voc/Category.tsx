import { View } from 'react-native';
import { useAppSelector } from "../../redux/store"
import { selectCategoryById } from "../../redux/voc/selectors"
import Text from "../text"

export const Category: React.FC<{
    categoryId: string;
}> = ({ categoryId }) => {
    const category = useAppSelector(state => selectCategoryById(state, categoryId));
    
    return(
        <View>
            <Text>
                {category?.title || ''}
            </Text>
        </View>
    )
}