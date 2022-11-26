import React from 'react';
import layout from '../../constants/layout';
import { useColors } from '../../hooks/useColors';
import { useAppSelector } from "../../redux/store";
import { selectCategories, selectFloatingCategoryIds, selectFloatingTermIds, selectTerms } from "../../redux/voc/selectors";
import View from '../view';
import { View as DefaultView, ScrollView } from 'react-native';
import { Category } from './Category';
import { Term } from "./Term";
import Text from '../text';
import SearchInput from '../search-input';
import { useState } from 'react';
import { VocItem, VocScreenProps } from '../../types';
import { SearchResults } from './SearchResults';

type VocContext = {
    setActive: (id: string) => void;
    selectable: boolean;
    activeIds: string[];
}
const VocContext = React.createContext({} as VocContext);

export const useVoc = () => React.useContext(VocContext);

export default function Voc({ route: { params: { selectable } } }: VocScreenProps) {
    const { background: { secondary, tertiary }, text: { secondary: textSecondary } } = useColors();
    const categories = useAppSelector(selectCategories);
    const terms = useAppSelector(selectTerms);
    const categoryIds = categories.map(category => category.id);
    const termIds = terms.map(term => term.id);
    const floatingCategoryIds = useAppSelector(selectFloatingCategoryIds);
    const floatingTermIds = useAppSelector(selectFloatingTermIds);
    const [query, setQuery] = useState('');
    const [results, setResults] = useState<VocItem[]>([]);
    const [active, setActive] = useState<string[]>([]);

    const setActiveItem = (id: string) => {
        // TODO: make this 'algorithm' better

        const ids: string[] = [];
        const exists = active.includes(id);
        const updateActiveStatus = (id: string) => {
            // If selected item is category
            if(categoryIds.includes(id)) {
                // Finding children and appending to array
                const children = [
                    ...terms.filter(term => term.parentId === id),
                    ...categories.filter(category => category.parentId === id)
                ];
                for(const child of children) {
                    updateActiveStatus(child.id);
                }
            }
            ids.push(id);
        }
        updateActiveStatus(id);

        // Updating parents
        const term = terms.find(term => term.id === id);
        const category = categories.find(category => category.id === id);
        if(exists) {
            const parent = categories.find(cat => cat.id === term?.parentId || category?.parentId);
            if(parent) {
                ids.push(parent.id);
            }
        } else {
            const parent = categories.find(cat => cat.id === term?.parentId || category?.parentId);
            const children = [
                ...categories.filter(cat => cat.parentId === parent?.id),
                ...terms.filter(term => term.parentId === parent?.id)
            ]
            const nonActiveChildren = children.filter(child => !ids.includes(child.id));
            if(!nonActiveChildren.length) {
                if(term?.parentId) {
                    ids.push(term.parentId);
                } else if(category?.parentId) {
                    ids.push(category.parentId);
                }
            }
        }

        setActive(prev => {
            let newActiveIds = [...prev];
            if(!exists) {
                newActiveIds = newActiveIds.filter(id => !ids.includes(id));
                newActiveIds = [...newActiveIds, ...ids];
            } else {
                newActiveIds = newActiveIds.filter(id => !ids.includes(id));
            }

            return newActiveIds
        });
    }

    const value = {
        setActive: setActiveItem,
        selectable: !!selectable,
        activeIds: active
    }
    return(
        <VocContext.Provider value={value}>
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
        </VocContext.Provider>
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