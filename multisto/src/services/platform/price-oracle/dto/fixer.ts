export interface FixerResponse {
    success: boolean;
    timestamp: number;
    base: string;
    date: Date;
    rates: {
        [code: string]: number;
    };
}
