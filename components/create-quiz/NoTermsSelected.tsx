import { useState } from "react"
import { useNavigation } from '@react-navigation/native';
import { KeyboardAvoidingView, Platform, ScrollView, TouchableOpacity, View } from "react-native"
import layout from "../../constants/layout";
import { useColors } from "../../hooks/useColors";
import Button from "../button";
import Input from "../input";
import Text from "../text";

export const NoTermsSelected: React.FC<{
    name: string;
    setName: (name: string) => void;
}> = ({ name, setName }) => {
    const navigation = useNavigation();
    const { background: { tertiary, secondary }, text: { secondary: textSecondary } } = useColors();

    const [type, setType] = useState('definition');

    const openTermSelection = () => {
        navigation.navigate('Root', {
            screen: 'Voc',
            params: { 
                header: 'Select terms', 
                pathAfterSelection: 'Create Quiz', 
                selectable: true 
            }
        })
    }

    return(
        <KeyboardAvoidingView 
            style={styles.container}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            keyboardVerticalOffset={110}
        >
            <ScrollView contentContainerStyle={styles.content}>
                <Text style={{ 
                    color: textSecondary,
                    ...styles.headerText
                }}>
                    What should the quiz be called?
                </Text>

                <Input 
                    placeholder={'Quiz name'}
                    onTextChange={setName}
                />

                <Text style={{ 
                    color: textSecondary,
                    ...styles.headerText
                }}>
                    What type of quiz would you like to create?
                </Text>
                
                <View style={{
                    borderColor: tertiary,
                    ...styles.options
                }}>
                    <TouchableOpacity 
                        style={{
                            borderColor: tertiary,
                            backgroundColor: type === 'translation' ? secondary : 'transparent',
                            ...styles.option
                        }} 
                        onPress={() => setType('translation')}
                    >
                        <Text>
                            Translation
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity 
                        style={{
                            borderColor: tertiary,
                            backgroundColor: type === 'definition' ? secondary : 'transparent',
                            ...styles.option
                        }} 
                        onPress={() => setType('definition')}
                    >
                        <Text>
                            Definition
                        </Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>

            <Button
                style={styles.button}
                onPress={openTermSelection}
                disabled={!name}
            >
                Create quiz
            </Button>
        </KeyboardAvoidingView>
    )
}
const styles = {
    container: {
        flex: 1
    },
    content: {
        padding: layout.spacing.primary,
        paddingTop: 0
    },
    headerText: {
        marginTop: layout.spacing.primary,
        marginBottom: layout.spacing.secondary,
        textAlign: 'center' as 'center',
        fontWeight: '600' as '600',
        fontSize: 16,
    },
    options: {
        flexDirection: 'row' as 'row',
        borderWidth: layout.borderWidth.secondary,
        borderRadius: layout.borderRadius.primary
    },
    option: {
        width: '50%',
        alignItems: 'center' as 'center',
        padding: 40,
        borderRadius: layout.borderRadius.primary
    },
    button: {
        marginHorizontal: layout.spacing.primary
    }
}