import { useState } from "react";
import layout from "../../constants/layout";
import { AddSelectItemScreenProps } from "../../types";
import Button from "../button";
import Input from "../input";
import View from "../view";

export const AddSelectItem: React.FC<AddSelectItemScreenProps> = ({ route: { params: { onSubmit } } }) => {
    const [text, setText] = useState('');

    const onPress = () => {
        if(!text) return;
        onSubmit(text.trim());
    }

    return(
        <View style={styles.container}>
            <Input 
                placeholder={'Item'}
                onTextChange={setText}
            />
            <Button 
                type={'transparent'}
                style={styles.button}
                disabled={!text}
                onPress={onPress}
            >
                Add item
            </Button>
        </View>
    )
}
const styles = {
    container: {
        padding: layout.spacing.primary
    },
    button: {
        marginTop: layout.spacing.primary
    }
}