import { useNavigation } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import { CreateQuizScreenProps } from '../../types';
import Text from "../text";
import View from "../view";
import { NoTermsSelected } from './NoTermsSelected';
import { QuizTypeSelector } from './QuizTypeSelector';
import { CreateQuizSummary } from './CreateQuizSummary';

export default function CreateQuiz({ route: { params: { termIds: _termIds } } }: CreateQuizScreenProps) {
    const [name, setName] = useState('');
    const [termIds, setTermIds] = useState(_termIds);

    useEffect(() => setTermIds(_termIds), [_termIds]);

    const removeTerm = (id: string) => setTermIds(prev => prev?.filter(termId => termId !== id));

    return(
        <View safeAreaView>
            {!termIds && (
                <NoTermsSelected 
                    name={name}
                    setName={setName}
                />
            )}

            {termIds && (
                <CreateQuizSummary 
                    removeTerm={removeTerm}
                    termIds={termIds}
                    name={name}
                />
            )}
        </View>
    )
}