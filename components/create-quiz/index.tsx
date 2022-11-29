import { useNavigation } from '@react-navigation/native';
import { useState } from 'react';
import { CreateQuizScreenProps } from '../../types';
import Text from "../text";
import View from "../view";
import { NoTermsSelected } from './NoTermsSelected';
import { QuizTypeSelector } from './QuizTypeSelector';
import { SelectedTerms } from './SelectedTerms';

export default function CreateQuiz({ route: { params: { termIds } } }: CreateQuizScreenProps) {
    const [name, setName] = useState('');

    return(
        <View safeAreaView>
            {!termIds && (
                <NoTermsSelected 
                    name={name}
                    setName={setName}
                />
            )}

            {termIds && (
                <SelectedTerms termIds={termIds} />
            )}
        </View>
    )
}