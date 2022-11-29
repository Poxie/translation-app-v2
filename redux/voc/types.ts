import { LanguageItem, SelectorItem, VocItem } from "../../types"

export type VocState = {
    terms: VocItem[];
    categories: VocItem[];
    selectors: SelectorItem[];
    languages: LanguageItem[];
    translations: {[key: string]: string[] | undefined};
}