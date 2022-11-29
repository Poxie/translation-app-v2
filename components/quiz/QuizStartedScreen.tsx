import { useRef, useState } from "react";
import { View } from "react-native"
import { State } from ".";
import { selectQuizById, selectTermsByQuiz } from "../../redux/quiz/selectors";
import { useAppSelector } from "../../redux/store";
import Text from "../text";
import { QuizProgressBar } from "./QuizProgressBar";

export type PlayedTerm = {
    id: string;
    outcome: 'success' | 'error';
}
export const QuizStartedScreen: React.FC<{
    quizId: string;
    setState: (state: State) => void;
}> = ({ quizId, setState }) => {
    const quiz = useAppSelector(state => selectQuizById(state, quizId));
    const terms = useAppSelector(state => selectTermsByQuiz(state, quiz?.termIds || []));
    const [index, setIndex] = useState(1);
    const playedTerms = useRef<PlayedTerm[]>([]);
    
    return(
        <View>
            <QuizProgressBar 
                index={index}
                count={terms.length}
            />
            <Text>
                
            </Text>
        </View>
    )
}