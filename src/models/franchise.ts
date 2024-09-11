export interface Franchise {
    id: number;
    name: string;
    city: string;
    state: string;
    country: string;
    league: string;
}

export interface NFLFranchise extends Franchise {
    powerRanking: number;
    powerRating:number;
}