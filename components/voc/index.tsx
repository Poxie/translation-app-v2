
import layout from '../../constants/layout';
import { useColors } from '../../hooks/useColors';
import { useAppSelector } from "../../redux/store";
import { selectFloatingCategoryIds, selectFloatingTermIds } from "../../redux/voc/selectors";
import View from '../view';
import { View as DefaultView, ScrollView } from 'react-native';
import { Category } from './Category';
import { Term } from "./Term";
import Text from '../text';
import SearchInput from '../search-input';
import { useState } from 'react';
import { VocItem } from '../../types';
import { SearchResults } from './SearchResults';

export default function Voc() {
    const { background: { secondary, tertiary }, text: { secondary: textSecondary } } = useColors();
    const floatingCategoryIds = useAppSelector(selectFloatingCategoryIds);
    const floatingTermIds = useAppSelector(selectFloatingTermIds);
    const [query, setQuery] = useState('');
    const [results, setResults] = useState<VocItem[]>([]);

    return(
        <View>
            <SearchInput 
                onQueryChange={setQuery}
                onQueryResults={setResults}
            />

            {query && (
                <SearchResults 
                    results={results}
                    query={query}
                />
            )}

            {!query && (
                <ScrollView style={styles.container}>
                    <DefaultView style={{
                        backgroundColor: secondary,
                        borderColor: tertiary,
                        ...styles.categories
                    }}>
                        {floatingCategoryIds.map(categoryId => (
                            <Category 
                                id={categoryId}
                                key={categoryId}
                            />
                        ))}
                    </DefaultView>

                    {floatingTermIds.length !== 0 && (
                        <Text style={{
                            color: textSecondary,
                            ...styles.label
                        }}>
                            Uncategorized terms
                        </Text>
                    )}
                    {floatingTermIds.map(termId => (
                        <Term 
                            id={termId}
                            key={termId}
                        />
                    ))}
                </ScrollView>
            )}
        </View>
    )
}
const styles = {
    container: {
        padding: layout.spacing.primary
    },
    categories: {
        borderWidth: layout.borderWidth.primary,
        borderRadius: layout.borderRadius.primary,
        padding: layout.spacing.secondary / 2
    },
    label: {
        marginTop: layout.spacing.primary * 2,
        marginBottom: layout.spacing.secondary / 2,
        fontWeight: '600' as '600'
    }
}