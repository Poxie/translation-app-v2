import View from '../view';
import { HomeCards } from './HomeCards';

export default function Home() {
    return(
        <View safeAreaView>
            <View style={styles.container} scrollView>
                <HomeCards />
            </View>
        </View>
    )
}
const styles = {
    container: {
        flex: 1
    }
}