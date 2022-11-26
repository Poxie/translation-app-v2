import { View } from 'react-native';
import { useAppSelector } from '../../redux/store';
import { selectTermById } from '../../redux/voc/selectors';
import Text from '../text';

export const Term: React.FC<{
    termId: string;
}> = ({ termId }) => {
    const term = useAppSelector(state => selectTermById(state, termId));
    
    return(
        <View>
            <Text>
                {term?.term || ''}
            </Text>
        </View>
    )
}