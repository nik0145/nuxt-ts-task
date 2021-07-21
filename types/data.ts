export interface Data {
    Error: string;
    Id: number;
    Success: boolean;
    Value: Value;
}
export interface DataConvert {
    nameGroup?: string;
    items: Item[];
    id: number;
}
export interface Item extends Good {
    title: string;
    id: number;
    count: number;
    amount: number;
    price: number;
}
export interface Value  {
    Goods: Good[];
}

export interface Good {
    B: boolean;
    C: number;
    CV: null;
    G: number;
    P: number;
    Pl: null;
    T: number;
}
