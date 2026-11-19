
interface AuctionData {
    title: string;
    imgs: string[];
    stock: string;
    odometer: string;
    engine: string;
    fuelType: string;
    primaryDamage: string;
    transmission: string;
    keys: string;
    location: string;
    auction: "copart" | "iaai";
}

export type {AuctionData};
