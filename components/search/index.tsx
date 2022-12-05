import { useState } from "react";
import { SafeAreaView, ScrollView, View as DefaultView } from 'react-native';
import layout from "../../constants/layout";
import { useColors } from "../../hooks/useColors";
import { VocItem } from "../../types";
import SearchInput from "../search-input";
import Text from "../text";
import View from "../view";
import { SearchLabel } from "./SearchLabel";
import { SearchResult } from "./SearchResult";

export default function Search() {
    const { background: { tertiary }, text: { secondary } } = useColors();
    const [results, setResults] = useState<string[]>([]);
    const [query, setQuery] = useState('');

    return(
        <View 
            scrollView
            style={styles.content} 
            contentInsetAdjustmentBehavior={'automatic'} 
        >
            <SearchInput
                onQueryChange={setQuery}
                onQueryResults={setResults}
                hasFilters
            />

            <SafeAreaView>
                <SearchLabel 
                    query={query}
                    resultCount={results.length}
                />

                {results.map(result => (
                    <SearchResult 
                        id={result}
                        key={result}
                    />
                ))}
            </SafeAreaView>
        </View>
    )
}
const styles = {
    content: {
        padding: layout.spacing.primary
    }
}