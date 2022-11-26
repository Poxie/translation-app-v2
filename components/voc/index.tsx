import { View } from 'react-native';
import { useAppSelector } from "../../redux/store";
import { selectFloatingTermIds } from "../../redux/voc/selectors";
import { Term } from "./Term";

export default function Voc() {
    const floatingTermIds = useAppSelector(selectFloatingTermIds);

    return(
        <View>
            {floatingTermIds.map(termId => (
                <Term 
                    termId={termId}
                    key={termId}
                />
            ))}
        </View>
    )
}