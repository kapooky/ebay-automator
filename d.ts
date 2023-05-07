export interface Listing {
    quantityMultiplier: number,
    legacyItemID: string[],
    Description?: string,
    DBtable?: Index
    Game: Game,
    ListingType: ListingType
    limit?: number,
    Subject: string,


    bundleCodes?: bundleCode[],
    Instructions: string
}
export enum ListingType{
    TWITCHDROP,
    CODE,
    BUNDLE
}
export enum Game{
    COD,
    HALO,
    ROBLOX,
    XBOX,
    OTHER,
    TWITCHDROPS, //todo delete this safely
    HARRYPOTTER
}

export enum Index{
    codes = "codes",
    HYPERX="hyperx",
//    WeaponsXPUSA = "sellfast",
    WeaponsXPUSA = "5hour2xp10codes",
    Jacklinks = "jacklinks",
    Sea_Of_Thieves = "thieves_steam",
    Halo_Oreo = "halo_oreo",
    Halo_spnkr = "halo_spnkr",
    Halo_hydra = "halo_hydra",
    Halo_RAZERBACK = "halo_razerback",
    XBOX1MONTH = "xbox1month",

    Roblox100="roblox100",

    FIFA23="fifa2023",
    FORZA="forza",
    KEEPY_UPPY="keepy_uppy",
    SUNDAYCDL="sundaycdl",
    MIDNIGHT="midnight",
    VICTORYSHOUT="victoryshout",
    JEDI="jedi",
    HOGWARTS="legacy-new",
    MILK="milk-new"
}

export interface bundleCode {
    quantityMultiplier: number,
    DBtable: string

}
