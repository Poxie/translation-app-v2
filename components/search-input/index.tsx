import { useEffect, useState } from 'react';
import { View } from 'react-native';
import layout from '../../constants/layout';
import { useAppSelector } from '../../redux/store';
import { selectTerms } from '../../redux/voc/selectors';
import { VocItem } from '../../types';
import Input from '../input';
import Select from '../select';

export default function SearchInput({
    onQueryChange, onQueryResults, hasFilters
}: {
    onQueryChange: (query: string) => void;
    onQueryResults: (items: string[]) => void;
    hasFilters?: boolean;
}) {
    const terms = useAppSelector(selectTerms);
    const [filter, setFilter] = useState<string[]>([]);
    const [query, setQuery] = useState('');
    
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
        if(filter.length) {
            filteredTerms = filteredTerms.filter(term => term[filter[0] as 'term' | 'definition']?.toLowerCase()?.includes(processedQuery));
        }

        onQueryResults(filteredTerms.map(term => term.id));
        onQueryChange(query);
    }, [query, filter]);
    
    const filters = [
        { text: 'Filter by term', id: 'term' },
        { text: 'Filter by definition', id: 'definition' }
    ]
    return(
        <View style={styles.container}>
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
    )
}
const styles = {
    container: {
        padding: layout.spacing.primary, 
        paddingBottom: 0
    },
    filters: {
        marginTop: 4
    }
}