
///biochimie
export function acid_uric_seric(varsta: number, gen: string, luni: number) {
    if (varsta < 18)
        return "2.0 - 5.5"
    if (gen == "Femeie")
        return "2.4 - 6.0"
    return "3.4 - 7.2"
}
export function alaninaminotransferaza_ALT_GPT_TGP(varsta: number, gen: string, luni: number) {
    if (varsta == 0 && luni <= 6)
        return "<56"
    if (varsta == 0 && luni <= 12)
        return "<54"
    if (varsta <= 3)
        return "<33"
    if (varsta <= 6)
        return "<29"
    if (varsta <= 12)
        return "<39"
    if (varsta <= 17) {
        if (gen == "Femeie")
            return "<25"
        return "<24"
    }
    if (varsta > 17) {
        if (gen == "Femeie")
            return "<31"
        return "<41"
    }
}
export function alaninaminotransferaza_GOT_AST_TGO(varsta: number, gen: string, luni: number){
    if (varsta == 0)
        return "<97"
    if (varsta <= 3)
        return "<48"
    if (varsta <= 6)
        return "<40"
    if (varsta <= 12)
        return "<35"
    if (varsta <= 17) {
        if (gen == "Femeie")
            return "<25"
        return "<29"
    }
    if (varsta > 17) {
        if (gen == "Femeie")
            return "<31"
        return "<37"
    }
}

///