import { View, TouchableOpacity } from 'react-native';
import layout from '../../constants/layout';
import { useColors } from '../../hooks/useColors';
import Text from "../text"

export const TypeSelection: React.FC<{
    type: 'term' | 'category';
    setType: (type: 'term' | 'category') => void;
}> = ({ type, setType }) => {
    const { background: { tertiary } } = useColors();
    
    const tabs = [
        { text: 'Term', onPress: () => setType('term') },
        { text: 'Category', onPress: () => setType('category') }
    ]
    return(
        <>
        <Text style={styles.header}>
            What would you like to create?
        </Text>
        <View 
            style={{
                borderColor: tertiary,
                ...styles.tabs
            }}
        >
            {tabs.map(tab => {
                const active = tab.text.toLowerCase() === type;
                return(
                    <TouchableOpacity 
                        onPress={tab.onPress} 
                        style={{
                            borderColor: tertiary,
                            backgroundColor: active ? tertiary : 'transparent',
                            ...styles.tab
                        }}
                        key={tab.text} 
                    >
                        <Text style={styles.tabText}>
                            {tab.text}
                        </Text>
                    </TouchableOpacity>
                )
            })}
        </View>
        </>
    )
}
const styles = {
    header: {
        marginBottom: layout.spacing.primary,
        fontSize: 17,
        fontWeight: '600' as '600'
    },
    tabs: {
        flexDirection: 'row' as 'row',
        borderRadius: layout.borderRadius.primary,
        borderWidth: layout.borderWidth.secondary,
        overflow: 'hidden' as 'hidden'
    },
    tab: {
        padding: 30,
        flex: 1,
        alignItems: 'center' as 'center',
    },
    tabText: {
        fontWeight: '600' as '600'
    },
}