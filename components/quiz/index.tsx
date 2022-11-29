import { selectQuizById } from "../../redux/quiz/selectors";
import { useAppSelector } from "../../redux/store";
import { QuizScreenProps } from "../../types";
import Text from "../text";

export default function Quiz({ route: { params: { quizId } }}: QuizScreenProps ) {
    const quiz = useAppSelector(state => selectQuizById(state, quizId));
    return(
        <Text>
            {quiz?.name}
        </Text>
    )
}