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
    language?: string | null;
    translation?: string | null;
    parentId?: string | null;
}
export type SelectorItem = {
    text: string;
    id: string;
}
export type LanguageItem = {
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
    'Voc': {
        header: string;
        selectable?: boolean;
        pathAfterSelection?: keyof MainStackParamList;
    };
    'Import Voc': undefined;
    'Quiz': {
        termIds: string[];
    };
    'Quizzes': undefined;
    'Create Quiz': {
        termIds?: string[];
    };
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
        onAddClick?: () => void;
        onlyEdit?: boolean;
        addItemPlaceholder?: string;
        addItemLabel?: string;
    }
    'Add Select Item': {
        onSubmit: (text: string) => void;
        header?: string;
        addLabel?: string;
        placeholder?: string;
        closeOnSubmit?: boolean;
    }
    'Edit Voc Item': {
        header: string;
        type: 'term' | 'category';
        id?: string;
    }
    'Search Term': {
        header: string;
        description?: string;
        onTermSelected: (id: string) => void;
    }
    'Item Translations': {
        id: string;
    }
}

// Main stack screen props
export type VocScreenProps = NativeStackScreenProps<MainStackParamList, 'Voc'>;
export type QuizScreenProps = NativeStackScreenProps<MainStackParamList, 'Quiz'>;
export type CreateQuizScreenProps = NativeStackScreenProps<MainStackParamList, 'Create Quiz'>;

// Modal stack screen props
export type SelectItemScreenProps = NativeStackScreenProps<ModalStackParamList, 'Select Items'>
export type AddSelectItemScreenProps = NativeStackScreenProps<ModalStackParamList, 'Add Select Item'>
export type EditVocItemScreenProps = NativeStackScreenProps<ModalStackParamList, 'Edit Voc Item'>
export type SearchTermScreenProps = NativeStackScreenProps<ModalStackParamList, 'Search Term'>
export type ItemTranslationsScreenProps = NativeStackScreenProps<ModalStackParamList, 'Item Translations'>