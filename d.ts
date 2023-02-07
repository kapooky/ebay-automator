export interface Listing {
    quantityMultiplier: number,
    legacyItemID: string[],
    Description?: string,
    DBtable?: Index
    Game: listingType,
    Type?: string
    Subject: string
    bundleCodes?: bundleCode[],
    Instructions: string
}

export enum listingType{
    COD,
    HALO,
    ROBLOX
}

export enum Index{
    WeaponsXPCAD = "weaponsXPCANADA",
    codes = "codes",
    WeaponsXPUSA = "5hour2xp10codes",
    Jacklinks = "jacklinks",
    Sea_Of_Thieves = "thieves_steam",
    Halo_Oreo = "halo_oreo",
    Halo_spnkr = "halo_spnkr",
    Halo_hydra = "halo_hydra",
    Halo_RAZERBACK = "halo_razerback",

    Roblox100="roblox100"
}

export interface bundleCode {
    quantityMultiplier: number,
    DBtable: string

}