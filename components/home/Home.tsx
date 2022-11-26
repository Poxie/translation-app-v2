import { useState } from 'react';
import { TouchableOpacity, Text, View } from 'react-native';
import { useColors } from '../../hooks/useColors';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import { toggleTest } from '../../redux/voc/actions';
import { selectVocTest } from '../../redux/voc/selectors';
import Button from '../button';
import Input from '../input';

export default function Home() {
    const { text: { secondary }, background: { primary } } = useColors();
    const test = useAppSelector(selectVocTest);
    const dispatch = useAppDispatch();
    const [text, setText] = useState('typed text');

    return(
        <View style={{backgroundColor: primary, ...styles.container}}>
            <Text>
                Hello test is: {test ? 'true' : 'false'}
            </Text>
            <TouchableOpacity 
                onPress={() => dispatch(toggleTest())}
            >
                <Text style={{ color: secondary }}>
                    Click to toggle test
                </Text>
            </TouchableOpacity>
            <Input 
                placeholder={'My nice input'}
                onTextChange={setText}
                defaultValue={text}
            />
            <Text>
                This is typed text: {text}
            </Text>
            <Button
                onPress={() => console.log('simple press')}
                onLongPress={() => console.log('loooong press')}
            >
                My primary button
            </Button>
            <Button
                onPress={() => console.log('simple press')}
                onLongPress={() => console.log('loooong press')}
                type={'secondary'}
            >
                My secondary button
            </Button>
        </View>
    )
}

const styles = {
    container: {
        flex: 1,
        alignItems: 'center' as 'center',
        justifyContent: 'center' as 'center'
    }
}