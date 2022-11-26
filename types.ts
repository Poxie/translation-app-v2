import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { NavigatorScreenParams } from '@react-navigation/native';
import { SelectItem } from "./components/select";

// Overriding useNavigation autocorrection
declare global {
    namespace ReactNavigation {
        interface RootParamList extends RootStackParamList {}
    }
}

// Stack props
export type RootStackParamList = {
    'Root': NavigatorScreenParams<MainStackParamList>;
    'Modal': NavigatorScreenParams<ModalStackParamList>;
}
export type MainStackParamList = {
    'Home': undefined;
}

export type ModalStackParamList = {
    'Select Items': {
        items: SelectItem[];
        active: SelectItem;
        onChange: (id: string) => void;
        header?: string;
        closeOnChange?: boolean;
        allowAdd?: boolean;
        onItemAdd?: (item: SelectItem) => void;
    }
    'Add Select Item': {
        onSubmit: (text: string) => void;
    }
}

// Screen props
export type SelectItemScreenProps = NativeStackScreenProps<ModalStackParamList, 'Select Items'>
export type AddSelectItemScreenProps = NativeStackScreenProps<ModalStackParamList, 'Add Select Item'>