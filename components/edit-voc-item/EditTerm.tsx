import React, { useEffect, useRef, useState } from 'react';
import { View } from 'react-native';
import layout from '../../constants/layout';
import { VocItem } from '../../types';
import Button from '../button';
import Input from '../input';

const isDisabled = (item: Partial<VocItem>) => {
    return Object.values(item).find(v => console.log(v)) || !Object.keys(item).length;
}
export const EditTerm: React.FC<{
    defaultItem?: VocItem;
}> = ({ defaultItem }) => {
    const item = useRef<Partial<VocItem>>(defaultItem || {});
    const [term, setTerm] = useState(defaultItem?.term || '');
    const [definition, setDefinition] = useState(defaultItem?.definition || '');
    const disabled = !term && !definition;

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
            </View>
            <Button disabled={disabled}>
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