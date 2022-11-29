import { View } from "react-native"
import { PlayedTerm } from "."
import Text from "../text"
import { QuizResultItem } from "./QuizResultItem";

export const QuizResultsScreen: React.FC<{
    results: PlayedTerm[];
}> = ({ results }) => {
    return(
        <View>
            <Text>
                Results
            </Text>
            <View>
                {results.map(result => (
                    <QuizResultItem 
                        {...result}
                        key={result.id}
                    />
                ))}
            </View>
        </View>
    )
}