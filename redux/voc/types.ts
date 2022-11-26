import { VocItem } from "../../types"

export type VocState = {
    terms: VocItem[];
    categories: VocItem[];
    selectors: string[];
}