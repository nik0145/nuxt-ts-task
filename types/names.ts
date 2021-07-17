export interface Names {
    G: string;
    B: { [key: string]: B };
    C?: number;
}

export interface B {
    N: string;
    T: number | string;
}
