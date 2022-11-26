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
        active: string[];
        onChange: (activeIds: string[]) => void;
        header?: string;
        closeOnChange?: boolean;
        allowAdd?: boolean;
        addHeader?: string;
        onItemAdd?: (item: SelectItem) => void;
        onItemDelete?: (id: string) => void;
        multiSelect?: boolean;
    }
    'Add Select Item': {
        onSubmit: (text: string) => void;
        header?: string;
    }
}

// Screen props
export type SelectItemScreenProps = NativeStackScreenProps<ModalStackParamList, 'Select Items'>
export type AddSelectItemScreenProps = NativeStackScreenProps<ModalStackParamList, 'Add Select Item'>