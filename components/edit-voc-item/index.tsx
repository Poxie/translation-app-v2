import { useNavigation } from '@react-navigation/native';
import { useEffect, useState } from "react";
import layout from "../../constants/layout";
import { EditVocItemScreenProps } from "../../types";
import Text from "../text";
import View from "../view";
import { EditCategory } from "./EditCategory";
import { EditTerm } from "./EditTerm";
import { TypeSelection } from "./TypeSelection";

export default function EditVocItem({ route: { params: {
    defaultItem,
    type: _type
} } }: EditVocItemScreenProps) {
    const navigation = useNavigation();
    const [type, setType] = useState(_type);

    // Updating header on type change
    useEffect(() => {
        navigation.setOptions({ headerTitle: `Create ${type}` })
    }, [type]);

    return(
        <View safeAreaView>
            <View style={styles.container}>
                <TypeSelection 
                    type={type}
                    setType={setType}
                />

                {type === 'term' && (
                    <EditTerm 
                        defaultItem={defaultItem}
                    />
                )}

                {type === 'category' && (
                    <EditCategory 
                        defaultItem={defaultItem}
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