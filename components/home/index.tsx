import CreateMenu from '../create-menu';
import View from '../view';
import { HomeCards } from './HomeCards';

export default function Home() {
    return(
        <>
        <View safeAreaView>
            <View scrollView>
                <HomeCards />
            </View>
        </View>
        <CreateMenu />
        </>
    )
}