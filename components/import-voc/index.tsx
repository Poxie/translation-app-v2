import { useState } from "react";
import { getDoc, doc } from '@firebase/firestore';
import { ScrollView, View as DefaultView } from 'react-native';
import Button from "../button";
import Input from "../input";
import Text from "../text";
import View from "../view";
import { firestore } from "../../firebase";
import { VocItem } from "../../types";
import { TempVocItem } from "./TempVocItem";
import layout from "../../constants/layout";
import { useColors } from "../../hooks/useColors";
import { addTerms } from "../../redux/voc/actions";
import { useAppDispatch } from "../../redux/store";
import { createTerms } from "../../logic";

export default function ImportVoc() {
    const dispatch = useAppDispatch();
    const { background: { secondary, tertiary }, text: { secondary: textSecondary }, color: { red } } = useColors();
    const [id, setId] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [terms, setTerms] = useState<VocItem[]>([]);
    const [success, setSuccess] = useState(false);

    const onTextChange = (text: string) => {
        setError('');
        setId(text);
    }

    const fetchTerms = async () => {
        setLoading(true);
        const data = (await getDoc(doc(firestore, 'import', id))).data();
        setLoading(false);

        if(!data) return setError('Inputted ID does not correspond to a vocabulary.');

        const terms: VocItem[] = data.terms;
        for(const term of terms) {
            term.id = Math.random().toString();
        }
        setTerms(terms);
    }

    const removeTerm = (id: string) => {
        setTerms(prev => prev.filter(term => term.id !== id));
    }

    const mergeTerms = () => {
        dispatch(addTerms(terms));
        createTerms(terms);
        setSuccess(true);
    }
    
    const reset = () => {
        setSuccess(false);
        setError('');
        setTerms([]);
        setId('');
    }

    return(
        <>
            {terms.length === 0 && (
                <View style={{
                    flex: 1,
                    justifyContent: 'space-between'
                }} safeAreaView>
                    <DefaultView style={styles.container}>
                        <Text style={{
                            color: textSecondary,
                            ...styles.label
                        }}>
                            Enter vocabulary ID
                        </Text>
                        <Input 
                            onTextChange={onTextChange}
                            placeholder={'mpwFKV7SzksDp1wczCVL'}
                        />

                        {error && (
                            <Text style={{
                                color: red,
                                ...styles.error
                            }}>
                                {error}
                            </Text>
                        )}
                    </DefaultView>
                    <Button
                        onPress={fetchTerms}
                        style={styles.button}
                        disabled={!id}
                        loading={loading}
                    >
                        Import vocabulary
                    </Button>
                </View>
            )}

            {terms.length !== 0 && (
                <View safeAreaView>
                    <ScrollView style={styles.container}>
                        <Text style={{
                            color: textSecondary,
                            ...styles.label
                        }}>
                            {terms.length.toString()} terms were loaded. 
                        </Text>

                        <DefaultView style={{
                            backgroundColor: secondary,
                            borderColor: tertiary,
                            ...styles.termContainer
                        }}>
                            {terms.map((term, key) => (
                                <TempVocItem 
                                    {...term}
                                    isLast={key === terms.length - 1}
                                    onItemRemove={!success ? removeTerm : undefined}
                                    key={key}
                                />
                            ))}
                        </DefaultView>

                        {success && (
                            <Text style={styles.successText}>
                                The terms above have been added to your vocabulary.
                            </Text>
                        )}
                    </ScrollView>

                    <DefaultView>
                        <Button
                            style={styles.button}
                            type={'secondary'}
                            onPress={reset}
                        >
                            Import another vocabulary
                        </Button>
                        {!success && (
                            <Button
                                style={{
                                    marginTop: layout.spacing.secondary,
                                    ...styles.button
                                }}
                                onPress={mergeTerms}
                            >
                                Add terms to my vocabulary
                            </Button>
                        )}
                    </DefaultView>
                </View>
            )}
        </>
    )
}
const styles = {
    container: {
        padding: layout.spacing.primary
    },
    error: {
        marginTop: layout.spacing.secondary,
        fontWeight: '600' as '600'
    },
    label: {
        fontWeight: '600' as '600',
        marginBottom: layout.spacing.secondary
    },
    termContainer: {
        padding: layout.spacing.secondary,
        borderRadius: layout.borderRadius.secondary,
        borderWidth: layout.borderWidth.secondary
    },
    successText: {
        marginTop: layout.spacing.secondary
    },
    button: {
        marginHorizontal: layout.spacing.primary
    }
}