
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
export function aspartataminotransferaza_GOT_AST_TGO(varsta: number, gen: string, luni: number) {
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

export function calciu_seric(varsta: number, gen: string, luni: number) {
    if (varsta === 0)
        return "8.7 - 11.0"
    else if (varsta <= 17)
        return "9.3 - 10.6"
    else if (varsta <= 59)
        return "8.6 - 10.0"
    else if (varsta <= 90)
        return "8.8 - 10.2"
    return "8.2 - 9.6"
}

export function colesterol_total(varsta: number, gen: string, luni: number) {
    if (varsta <= 18)
        return "<170"
    return "125-200"
}

export function colesterol_HDL(varsta: number, gen: string, luni: number) {
    if (varsta <= 18)
        return ">45"
    else {
        if (gen === "Femeie")
            return ">50"
        return ">40"
    }
}

export function colesterol_LDL(varsta: number, gen: string, luni: number) {
    return "<100"
}

export function creatinina_serica(varsta: number, gen: string, luni: number) {
    if (varsta <= 17)
        return "0.45 - 0.87"
    else {
        if (gen === "Femeie")
            return "0.59 - 1.04"
        return "0.74 - 1.35"
    }
}

export function rata_estimata_filtrari(varsta: number, gen: string, luni: number) {
    if (varsta <= 30) {
        if (gen === "Femeie")
            return "81 - 134"
        return "88 - 146"
    }
    else if (varsta <= 40) {
        if (gen === "Femeie")
            return "75 - 128"
        return "82 - 140"
    }
    else if (varsta <= 50) {
        if (gen === "Femeie")
            return "69 - 121"
        return "75 - 133"
    }
    else if (varsta <= 60) {
        if (gen === "Femeie")
            return "62 - 112"
        return "68 - 123"
    }
    else if (varsta <= 70) {
        if (gen === "Femeie")
            return "61 - 120"
        return "56 - 105"
    }
    else {
        if (gen === "Femeie")
            return "50 - 99"
        return "55 - 113"
    }
}

export function glucoza_serica(varsta: number, gen: string, luni: number) {
    if (varsta <= 5)
        return "100 - 180"
    else if (varsta <= 12)
        return "90 - 180"
    else if (varsta <= 19)
        return "90 - 130"
    else if (varsta <= 59)
        return "70 - 140"
    return "<180"
}

export function trigliceride(varsta: number, gen: string, luni: number) {
    if (varsta <= 5)
        return "30 - 99"
    else if (varsta <= 11)
        return "31 - 114"
    else if (varsta <= 15)
        return "36 - 138"
    else {
        if (gen === "Femeie")
            return "40 - 149"
        return "35 - 149"
    }
}
///

///ExamenUrina

export function ph_urina() {
    return "5 - 7"
}
export function densitate_urina() {
    return "1.005 - 1.030"
}
///

///Hematologie
export function numar_de_eritrocite(varsta: number, gen: string, luni: number) {
    if (varsta == 0 && luni < 7)
        return "4.8 - 7.1"
    else if ((varsta == 0 && luni < 12) || (varsta == 1 && luni == 0))
        return "4 - 6"
    else if (varsta < 19)
        return "4 - 5.5"
    else {
        if (gen === "Femeie")
            return "4.2 - 5.4"
        return "4.7 - 6.1"
    }
}
export function hemoglobina(varsta: number, gen: string, luni: number) {
    if (varsta == 0 && luni == 1)
        return "11 - 15"
    else if (varsta < 19)
        return "11 - 13"
    else {
        if (gen === "Femeie")
            return "12 - 16"
        return "14 - 18"
    }
}
export function hematocrit(varsta: number, gen: string, luni: number) {
    if (varsta == 0 && luni < 6)
        return "32 - 42"
    else if (varsta <= 1)
        return "31 - 42"
    else if (varsta <= 5)
        return "34 - 44"
    else if (varsta <= 11)
        return "35 - 44"
    else if (varsta <= 17)
        return "36 - 44"
    else {
        if (gen === "Femeie")
            return "36 - 44"
        return "41 - 50"
    }
}
export function volumul_mediu_eritrocitar(varsta: number, gen: string, luni: number) {
    if (varsta === 0 && luni <= 3)
        return "85 - 123"
    else if (varsta === 0 && luni <= 6)
        return "75 - 115"
    else if (varsta === 0 && luni <= 11)
        return "70 - 110"
    else if (varsta <= 3)
        return "73 - 85"
    else if (varsta <= 6)
        return "75 - 87"
    else if (varsta <= 12)
        return "77 - 91"
    return "80 - 100"
}
export function hemoglobina_eritrocitara_medie(varsta: number, gen: string, luni: number) {
    if (varsta === 0 && luni <= 3)
        return "28 - 34"
    else if (varsta === 0 && luni <= 6)
        return "25 - 32"
    else if (varsta === 0 && luni <= 11)
        return "24 - 30"
    else if (varsta <= 3)
        return "22 - 30"
    else if (varsta <= 6)
        return "23 - 31"
    else if (varsta <= 12)
        return "24 - 32"
    return "27 - 33"
}
export function concentratia_medie_a_hemoglobinei(varsta: number, gen: string, luni: number) {
    if (varsta === 0 && luni <= 3)
        return "30 - 34"
    else if (varsta === 0 && luni <= 6)
        return "29 - 33"
    else if (varsta === 0 && luni <= 11)
        return "28 - 32"
    else if (varsta <= 3)
        return "30 - 34"
    else if (varsta <= 6)
        return "31 - 35"
    else if (varsta <= 12)
        return "32 - 36"
    return "32 - 36"
}
export function largimea_distributiei(varsta: number, gen: string, luni: number) {
    if (varsta === 0 && luni <= 3)
        return "12.5 - 16.5"
    else if (varsta === 0 && luni <= 6)
        return "12.0 - 15.5"
    else if (varsta === 0 && luni <= 11)
        return "11.5 - 14.5"
    else if (varsta <= 3)
        return "11.5 - 14.0"
    else if (varsta <= 6)
        return "11.5 - 14.0"
    else if (varsta <= 12)
        return "11.5 - 14.0"
    return "11.5 - 14.5"
}
export function numarul_de_reticulocite(varsta: number, gen: string, luni: number) {
    if (varsta === 0 && luni <= 3)
        return "80 - 250"
    else if (varsta === 0 && luni <= 6)
        return "70 - 200"
    else if (varsta === 0 && luni <= 11)
        return "50 - 150"
    else if (varsta <= 3)
        return "30 - 100"
    else if (varsta <= 6)
        return "20 - 90"
    else if (varsta <= 12)
        return "20 - 80"
    return "20 - 80"
}
export function procent_reticulocite(varsta: number, gen: string, luni: number) {
    if (varsta === 0 && luni <= 3)
        return "2.0 - 6.0"
    else if (varsta === 0 && luni <= 6)
        return "1.5 - 5.5"
    else if (varsta === 0 && luni <= 11)
        return "1.0 - 4.5"
    else if (varsta <= 3)
        return "0.5 - 3.5"
    else if (varsta <= 6)
        return "0.5 - 3.0"
    else if (varsta <= 12)
        return "0.5 - 2.5"
    return "0.5 - 2.5"
}
export function numar_de_leucocite(varsta: number, gen: string, luni: number) {
    if (varsta === 0)
        return "6 - 18"
    else if (varsta <= 5)
        return "6 - 15"
    else if (varsta <= 12)
        return "5 - 13"
    return "4.5 - 11"
}
export function procentul_de_neutrofile(varsta: number, gen: string, luni: number) {
    if (varsta === 0 && luni <= 3)
        return "30 - 60"
    else if (varsta === 0 && luni <= 6)
        return "25 - 55"
    else if (varsta === 0 && luni <= 11)
        return "20 - 50"
    else if (varsta <= 3)
        return "20 - 50"
    else if (varsta <= 6)
        return "30 - 60"
    else if (varsta <= 12)
        return "40 - 70"
    return "50 - 70"
}
export function procentul_de_eozinofile(varsta: number, gen: string, luni: number) {
    return "1 - 4"
}
export function procentul_de_bazofile(varsta: number, gen: string, luni: number) {
    if (varsta === 0 && luni <= 1)
        return "0.5"
    else if (varsta <= 1)
        return "0.6"
    else if (varsta <= 2)
        return "0.7"
    return "0.5 - 1"
}
export function procentul_de_limfocite(varsta: number, gen: string, luni: number) {
    if (varsta === 0 && luni <= 11)
        return "45 - 70"
    else if (varsta <= 3)
        return "45 - 65"
    else if (varsta <= 6)
        return "35 - 55"
    else if (varsta <= 12)
        return "30 - 50"
    return "20 - 45"
}
export function procentul_de_monocite(varsta: number, gen: string, luni: number) {
    if (varsta === 0 && luni <= 3)
        return "3 - 10"
    else if (varsta === 0 && luni <= 6)
        return "3 - 9"
    else if (varsta === 0 && luni <= 11)
        return "2 - 8"
    else if (varsta <= 12)
        return "2 - 7"
    return "2 - 8"
}
export function numar_de_neutrofile(varsta: number, gen: string, luni: number) {
    if (varsta === 0)
        return "6 - 18"
    else if (varsta <= 5)
        return "6 - 15"
    else if (varsta <= 12)
        return "5 - 13"
    return "2.5 - 7"
}
export function numar_de_eozinofile(varsta: number, gen: string, luni: number) {
    return "0.03 - 0.35"
}
export function numar_de_bazofile(varsta: number, gen: string, luni: number) {
    return "0 - 0.3"
}
export function numar_de_limfocite(varsta: number, gen: string, luni: number) {
    if (varsta <= 3)
        return "3.0 - 9.5"
    else if (varsta <= 12)
        return "1.5 - 7.0"
    return "1.0 - 4.8"
}
export function numar_de_monocite(varsta: number, gen: string, luni: number) {
    return "0.2-1.0"
}
export function numar_de_trombocite(varsta: number, gen: string, luni: number) {
    if (varsta == 0)
        return "180 - 400"
    else if (varsta <= 6)
        return "160 - 390"
    else if (varsta <= 12)
        return "160 - 380"
    return "150 - 450"
}
export function volumul_mediu_plachetar(varsta: number, gen: string, luni: number) {
    if (varsta <= 12)
        return "7.0 - 10.0"
    return "7.0 - 10.5"
}
export function distributia_plachetelor(varsta: number, gen: string, luni: number) {
    return "9.0 - 14.0"
}
export function viteza_de_sedimentare(varsta: number, gen: string, luni: number) {
    if (varsta <= 17)
        return "0 - 10"
    else if (varsta < 50) {
        if (gen === "Femeie")
            return "0 - 20"
        return "0 - 15"
    }
    else {
        if (gen === "Femeie")
            return "0 - 30"
        return "0 - 20"
    }
}
export function fibrogen(varsta: number, gen: string, luni: number) {
    if (varsta <= 1)
        return "160 - 390"
    else if (varsta <= 10)
        return "140 - 360"
    else if (varsta <= 18)
        return "160 - 390"
    else
        return "200 - 400"
}
///

///imunologie
export function tsh(varsta: number, gen: string, luni: number) {
    if (varsta == 0)
        return "0.6 - 10.0"
    else if (varsta <= 5)
        return "0.4 - 6.0"
    else if (varsta <= 10)
        return "0.4 - 5.0"
    else if (varsta <= 18)
        return "0.4 - 4.5"
    else
        return "0.4 - 4.0"
}
///

