import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { NavigatorScreenParams } from '@react-navigation/native';
import { SelectItem } from "./components/select";

// Creating global types
export type VocItem = {
    id: string;
    type: 'term' | 'category';
    title?: string | null;
    term?: string | null;
    definition?: string | null;
    selectors?: string[];
    parentId: string | null;
}
export type SelectorItem = {
    text: string;
    id: string;
}

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
    'Search': undefined;
    'Voc': undefined;
    'Import Voc': undefined;
    'Choose Quiz': undefined;
    'Favorites': undefined;
}

export type ModalStackParamList = {
    'Select Items': {
        items: SelectItem[];
        active: string[];
        onChange: (activeIds: string[]) => void;
        header?: string;
        closeOnChange?: boolean;
        allowEdit?: boolean;
        addHeader?: string;
        onItemAdd?: (item: SelectItem) => void;
        onItemDelete?: (id: string) => void;
        multiSelect?: boolean;
    }
    'Add Select Item': {
        onSubmit: (text: string) => void;
        header?: string;
    }
    'Edit Voc Item': {
        header: string;
        type: 'term' | 'category';
        defaultItem?: VocItem;
    }
}

// Screen props
export type SelectItemScreenProps = NativeStackScreenProps<ModalStackParamList, 'Select Items'>
export type AddSelectItemScreenProps = NativeStackScreenProps<ModalStackParamList, 'Add Select Item'>
export type EditVocItemScreenProps = NativeStackScreenProps<ModalStackParamList, 'Edit Voc Item'>