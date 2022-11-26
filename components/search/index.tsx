import { useState } from "react";
import { ScrollView, View as DefaultView } from 'react-native';
import layout from "../../constants/layout";
import { useColors } from "../../hooks/useColors";
import { VocItem } from "../../types";
import SearchInput from "../search-input";
import Text from "../text";
import View from "../view";
import { SearchResult } from "./SearchResult";

export default function Search() {
    const { background: { tertiary }, text: { secondary } } = useColors();
    const [results, setResults] = useState<string[]>([]);
    const [query, setQuery] = useState('');

    return(
        <View>
            <SearchInput
                onQueryChange={setQuery}
                onQueryResults={setResults}
                hasFilters
            />

            <ScrollView style={styles.content}>
                <DefaultView style={{
                    borderColor: tertiary,
                    ...styles.labelContainer
                }}>
                    <Text style={{
                        color: secondary,
                        ...styles.label
                    }}>
                        {!query ? (
                            'Enter something above to search.'
                        ) : (
                            results.length ? (
                                `Displaying ${results.length} results.`
                            ) : (
                                `No results were found matching "${query}"`
                            )
                        )}
                    </Text>
                </DefaultView>
                {results.map(result => (
                    <SearchResult 
                        id={result}
                        key={result}
                    />
                ))}
            </ScrollView>
        </View>
    )
}
const styles = {
    content: {
        padding: layout.spacing.primary
    },
    labelContainer: {
        borderBottomWidth: layout.borderWidth.secondary,
        marginBottom: layout.spacing.primary,
        paddingBottom: layout.spacing.primary
    },
    label: {
        fontWeight: '600' as '600'
    }
}