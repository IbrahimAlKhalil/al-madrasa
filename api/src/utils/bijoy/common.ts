export function IsBanglaDigit(CUni: string) {
    return (
        CUni === "০" ||
        CUni === "১" ||
        CUni === "২" ||
        CUni === "৩" ||
        CUni === "৪" ||
        CUni === "৫" ||
        CUni === "৬" ||
        CUni === "৭" ||
        CUni === "৮" ||
        CUni === "৯"
    );
}


export function IsBanglaPreKar(CUni: string): boolean {
    return CUni === "ি" || CUni === "ৈ" || CUni === "ে";
}


export function IsBanglaPostKar(CUni: string): boolean {
    return (
        CUni === "া" ||
        CUni === "ো" ||
        CUni === "ৌ" ||
        CUni === "ৗ" ||
        CUni === "ু" ||
        CUni === "ূ" ||
        CUni === "ী" ||
        CUni === "ৃ"
    );
}

export function IsBanglaKar(CUni: string): boolean {
    return IsBanglaPreKar(CUni) || IsBanglaPostKar(CUni);
}

export function IsBanglaBanjonborno(CUni: string): boolean {
    return (
        CUni === "ক" ||
        CUni === "খ" ||
        CUni === "গ" ||
        CUni === "ঘ" ||
        CUni === "ঙ" ||
        CUni === "চ" ||
        CUni === "ছ" ||
        CUni === "জ" ||
        CUni === "ঝ" ||
        CUni === "ঞ" ||
        CUni === "ট" ||
        CUni === "ঠ" ||
        CUni === "ড" ||
        CUni === "ঢ" ||
        CUni === "ণ" ||
        CUni === "ত" ||
        CUni === "থ" ||
        CUni === "দ" ||
        CUni === "ধ" ||
        CUni === "ন" ||
        CUni === "প" ||
        CUni === "ফ" ||
        CUni === "ব" ||
        CUni === "ভ" ||
        CUni === "ম" ||
        CUni === "শ" ||
        CUni === "ষ" ||
        CUni === "স" ||
        CUni === "হ" ||
        CUni === "য" ||
        CUni === "র" ||
        CUni === "ল" ||
        CUni === "য়" ||
        CUni === "ং" ||
        CUni === "ঃ" ||
        CUni === "ঁ" ||
        CUni === "ৎ"
    );
}

export function IsBanglaSoroborno(CUni: string): boolean {
    return (
        CUni === "অ" ||
        CUni === "আ" ||
        CUni === "ই" ||
        CUni === "ঈ" ||
        CUni === "উ" ||
        CUni === "ঊ" ||
        CUni === "ঋ" ||
        CUni === "ঌ" ||
        CUni === "এ" ||
        CUni === "ঐ" ||
        CUni === "ও" ||
        CUni === "ঔ"
    );
}

export function IsBanglaNukta(CUni: string): boolean {
    return CUni === "ং" || CUni === "ঃ" || CUni === "ঁ";
}

export function IsBanglaFola(CUni: string): boolean {
    return CUni === "্য" || CUni === "্র";
}

export function IsBanglaHalant(CUni: string): boolean {
    return CUni === "্";
}

export function IsSpace(C: string): boolean {
    return C === " " || C === "\t" || C === "\n" || C === "\r";
}

export function MapKarToSorborno(CUni: string): string {
    let CSorborno = CUni;
    if (CUni === "া") CSorborno = "আ";
    else if (CUni === "ি") CSorborno = "ই";
    else if (CUni === "ী") CSorborno = "ঈ";
    else if (CUni === "ু") CSorborno = "উ";
    else if (CUni === "ূ") CSorborno = "ঊ";
    else if (CUni === "ৃ") CSorborno = "ঋ";
    else if (CUni === "ে") CSorborno = "এ";
    else if (CUni === "ৈ") CSorborno = "ঐ";
    else if (CUni === "ো") CSorborno = "ও";
    else if (CUni === "ো") CSorborno = "ও";
    else if (CUni === "ৌ") CSorborno = "ঔ";
    else if (CUni === "ৌ") CSorborno = "ঔ";
    return CSorborno;
}

export function MapSorbornoToKar(CUni: string): string {
    let CKar = CUni;
    if (CUni === "আ") CKar = "া";
    else if (CUni === "ই") CKar = "ি";
    else if (CUni === "ঈ") CKar = "ী";
    else if (CUni === "উ") CKar = "ু";
    else if (CUni === "ঊ") CKar = "ূ";
    else if (CUni === "ঋ") CKar = "ৃ";
    else if (CUni === "এ") CKar = "ে";
    else if (CUni === "ঐ") CKar = "ৈ";
    else if (CUni === "ও") CKar = "ো";
    else if (CUni === "ঔ") CKar = "ৌ";
    return CKar;
}

export type ConversionMap = string[][];
