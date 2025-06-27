export interface Campaign {
    name: string;
    description: string;
    eth_address: string;
    usdc_address: string;
    goal: number;
    collected: number;
    is_active: boolean;
    tags: string[];
    createdAt?: string;
    updatedAt?: string;
}