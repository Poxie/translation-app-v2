import { useEffect } from 'react';
import { TouchableOpacity, ScrollView } from 'react-native';
import layout from '../../constants/layout';
import { useColors } from '../../hooks/useColors';
import { useAppSelector } from '../../redux/store';
import { selectLanguages } from '../../redux/voc/selectors';
import Text from '../text';
import { AddLanguage } from './AddLanguage';
import { RemoveLanguage } from './RemoveLanguage';

export const LanguageSelector: React.FC<{
    onChange: (id: string) => void;
    active?: string;
}> = ({ onChange, active }) => {
    const { background: { secondary, tertiary } } = useColors();
    const languages = useAppSelector(selectLanguages);

    useEffect(() => {
        if(active) return;
        onChange(languages[0].id);
    }, []);

    return(
        <ScrollView 
            style={{
                borderColor: tertiary,
                ...styles.container
            }} 
            horizontal
        >
            {languages.map(language => (
                <TouchableOpacity 
                    style={{
                        backgroundColor: language.id === active ? tertiary : secondary,
                        borderColor: tertiary,
                        ...styles.item
                    }}
                    onPress={() => onChange(language.id)}
                    key={language.id}
                >
                    <Text>
                        {language.text}
                    </Text>
                </TouchableOpacity>
            ))}

            <AddLanguage />
            <RemoveLanguage />
        </ScrollView>
    )
}
const styles = {
    container: {
        flexDirection: 'row' as 'row',
        padding: layout.spacing.primary,
        paddingTop: 0,
        marginBottom: layout.spacing.primary,
        borderBottomWidth: layout.borderWidth.secondary
    },
    item: {
        paddingVertical: 10,
        paddingHorizontal: 14,
        marginRight: 10,
        borderRadius: layout.borderRadius.secondary,
        borderWidth: layout.borderWidth.secondary
    }
}