import { View } from 'react-native';
import { FavoriteIcon } from "../../assets/icons/FavoriteIcon";
import { QuizIcon } from "../../assets/icons/QuizIcon";
import { SearchIcon } from "../../assets/icons/SearchIcon"
import { VocIcon } from "../../assets/icons/VocIcon";
import layout from '../../constants/layout';
import { useColors } from "../../hooks/useColors"
import { MainStackParamList } from "../../types";
import { HomeCard } from "./HomeCard";

export type HomeCard = {
    text: string;
    icon: any;
    path: keyof MainStackParamList;
}
export const HomeCards = () => {
    const { text: { secondary } } = useColors();

    const cards: HomeCard[] = [
        { text: 'Search Term', icon: <SearchIcon style={{ fill: secondary }} />, path: 'Search' },
        { text: 'Vocabulary', icon: <VocIcon style={{ fill: secondary }} />, path: 'Voc' },
        { text: 'Import Vocabulary', icon: <VocIcon style={{ fill: secondary }} />, path: 'Import Voc' },
        { text: 'Take Quiz', icon: <QuizIcon style={{ fill: secondary }} />, path: 'Choose Quiz' },
        { text: 'Favorites', icon: <FavoriteIcon style={{ fill: secondary }} />, path: 'Favorites' },
    ]

    return (
        <View style={styles.container}>
            {cards.map(card => (
                <HomeCard 
                    {...card}
                    key={card.path}
                />
            ))}
        </View>
    )
}
const styles = {
    container: {
        flex: 1,
        flexDirection: 'row' as 'row',
        flexWrap: 'wrap' as 'wrap',
        padding: layout.spacing.primary / 2,
    }
}