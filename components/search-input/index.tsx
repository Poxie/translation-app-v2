import { useEffect, useState } from 'react';
import { View } from 'react-native';
import { StyleProps } from 'react-native-reanimated';
import layout from '../../constants/layout';
import { useColors } from '../../hooks/useColors';
import { useAppSelector } from '../../redux/store';
import { selectTerms } from '../../redux/voc/selectors';
import { VocItem } from '../../types';
import Input from '../input';
import Select from '../select';
import Text from '../text';
import { LanguageSelector } from './LanguageSelector';

export default function SearchInput({
    onQueryChange, onQueryResults, containerStyle, hasFilters
}: {
    onQueryChange: (query: string) => void;
    onQueryResults: (items: string[]) => void;
    containerStyle?: StyleProps;
    hasFilters?: boolean;
}) {
    const { background: { secondary } } = useColors();
    const terms = useAppSelector(selectTerms);
    const [filter, setFilter] = useState<string[]>([]);
    const [query, setQuery] = useState('');
    const [language, setLanguage] = useState('');
    
    // Updating results
    useEffect(() => {
        if(!query) {
            onQueryResults([]);
            onQueryChange('');
            return;
        }

        // Filtering terms based on filters and query
        const processedQuery = query.toLowerCase();
        let filteredTerms = terms.filter(term => (
            (term.term && term.term.toLowerCase().includes(processedQuery)) ||
            (term.definition && term.definition.toLowerCase().includes(processedQuery))
        ))
        if(['term', 'definition'].includes(filter[0])) {
            filteredTerms = filteredTerms.filter(term => term[filter[0] as 'term' | 'definition']?.toLowerCase()?.includes(processedQuery));
        }
        if(['language'].includes(filter[0])) {
            filteredTerms = filteredTerms.filter(term => term.language?.toLowerCase() === language.toLowerCase());
        }

        onQueryResults(filteredTerms.map(term => term.id));
        onQueryChange(query);
    }, [query, filter, language]);
    
    const filters = [
        { text: 'Filter by term', id: 'term' },
        { text: 'Filter by definition', id: 'definition' },
        { text: 'Filter by language', id: 'language' }
    ]
    return(
        <View>
            <View style={{
                borderColor: secondary,
                ...styles.container,
                ...containerStyle
            }}>
                <Input 
                    placeholder={'Search'}
                    onTextChange={setQuery}
                />
                {hasFilters && (
                    <Select 
                        containerStyle={styles.filters}
                        selectableItems={filters}
                        onChange={setFilter}
                        defaultActive={filter}
                        placeholder={'Select a filter...'}
                        closeOnChange
                    />
                )}
            </View>
            {filter.includes('language') && (
                <LanguageSelector 
                    onChange={setLanguage}
                    active={language}
                />
            )}
        </View>
    )
}
const styles = {
    container: {
        paddingBottom: layout.spacing.primary,
        marginBottom: layout.spacing.primary,
        borderBottomWidth: layout.borderWidth.secondary
    },
    filters: {
        marginTop: 4
    }
}