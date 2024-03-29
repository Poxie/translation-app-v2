import { useState } from "react"
import { ScrollView } from 'react-native';
import layout from "../../constants/layout";
import { useColors } from "../../hooks/useColors";
import { SearchTermScreenProps } from "../../types";
import SearchInput from "../search-input";
import { SearchLabel } from "../search/SearchLabel";
import Text from "../text"
import View from "../view"
import { SearchTermResult } from "./SearchTermResult";

export default function SearchTerm({ route: { params: {
    description, onTermSelected
} } }: SearchTermScreenProps) {
    const { text: { secondary } } = useColors();
    const [results, setResults] = useState<string[]>([]);
    const [query, setQuery] = useState('');

    return(
        <View>
            {description && (
                <Text style={{
                    color: secondary,
                    ...styles.description
                }}>
                    {description}
                </Text>
            )}
            <SearchInput 
                onQueryChange={setQuery}
                onQueryResults={setResults}
                containerStyle={styles.search}
                hasFilters
            />

            <ScrollView contentContainerStyle={styles.container}>
                <SearchLabel 
                    resultCount={results.length}
                    query={query}
                    style={styles.label}
                />

                {results.map(result => (
                    <SearchTermResult 
                        id={result}
                        onPress={onTermSelected}
                        key={result}
                    />
                ))}
            </ScrollView>
        </View>
    )
}
const styles = {
    description: {
        fontWeight: '600' as '600',
        padding: layout.spacing.primary,
        paddingBottom: 0
    },
    search: {
        padding: layout.spacing.primary,
        paddingBottom: 0,
    },
    container: {
        padding: layout.spacing.primary,
        paddingTop: 0
    },
    label: {
        marginBottom: layout.spacing.primary
    }
}