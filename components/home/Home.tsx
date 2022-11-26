import { useState } from 'react';
import { TouchableOpacity } from 'react-native';
import layout from '../../constants/layout';
import { useColors } from '../../hooks/useColors';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import { toggleTest } from '../../redux/voc/actions';
import { selectVocTest } from '../../redux/voc/selectors';
import Button from '../button';
import Input from '../input';
import Select from '../select';
import Text from '../text';
import View from '../view';

const SELECTABLE_ITEMS = [
    { text: 'Day', id: 'day' },
    { text: 'Night', id: 'night' },
    { text: 'Both', id: 'both' }
]
export default function Home() {
    const { text: { secondary }, background: { primary } } = useColors();
    const test = useAppSelector(selectVocTest);
    const dispatch = useAppDispatch();
    const [text, setText] = useState('typed text');
    const [selectableItems, setSelectableItems] = useState(SELECTABLE_ITEMS);
    console.log(selectableItems);

    return(
        <View style={styles.container}>
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
            <Select 
                selectableItems={selectableItems}
                defaultActive={'day'}
                header={'Select Preferred Time'}
                allowAdd
                onItemAdd={item => setSelectableItems(prev => [...prev, ...[item]])}
            />
        </View>
    )
}

const styles = {
    container: {
        alignItems: 'center' as 'center',
        justifyContent: 'center' as 'center',
        padding: layout.spacing.primary
    }
}