import { QuizScreenProps } from "../../types";
import Text from "../text";

export default function Quiz({ route: { params: { termIds } }}: QuizScreenProps ) {
    return(
        <Text>
            {termIds?.map(id => id)}
        </Text>
    )
}