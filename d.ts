export interface Listing {
    quantityMultiplier: number,
    legacyItemID: string[],
    Description?: string,
    DBtable?: string
    Type?: string,
    Subject: string
    bundleCodes?: bundleCode[],
    Instructions: string
}

export interface bundleCode {
    quantityMultiplier: number,
    DBtable: string

}