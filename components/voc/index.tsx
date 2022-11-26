import { View } from 'react-native';
import { useAppSelector } from "../../redux/store";
import { selectFloatingCategoryIds, selectFloatingTermIds } from "../../redux/voc/selectors";
import { Category } from './Category';
import { Term } from "./Term";

export default function Voc() {
    const floatingCategoryIds = useAppSelector(selectFloatingCategoryIds);
    const floatingTermIds = useAppSelector(selectFloatingTermIds);

    return(
        <View>
            {floatingCategoryIds.map(categoryId => (
                <Category 
                    categoryId={categoryId}
                    key={categoryId}
                />
            ))}

            {floatingTermIds.map(termId => (
                <Term 
                    termId={termId}
                    key={termId}
                />
            ))}
        </View>
    )
}