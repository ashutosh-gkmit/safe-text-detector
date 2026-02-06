const COMBINED_EXAMPLES = [
    {
        'name': 'Kerry Anne Ward',
        'username': 'darkdomina2',
        'ans': 'UNSAFE',
        'reason': 'The username contains the term "domina," which has highly suggestive and sexualized connotations in modern internet contexts, making it inappropriate for a professional environment.'
    },
    {
        'name': 'Barkha Barkha',
        'username': 'Brakh82',
        'ans': 'SAFE',
        'reason': 'The username is a professional phonetic variation of the user\'s legal name. The addition of numbers is standard practice for account differentiation.'
    },
    {
        'name': 'Kegomoditsoe Tlou',
        'username': 'mstlou420',
        'ans': 'UNSAFE',
        'reason': 'The username contains the number "420," a globally recognized slang reference to cannabis culture, which violates corporate conduct policies regarding substance-related references.'
    },
    {
        'name': 'Alicia Dias Cabrita',
        'username': 'ashxx0111',
        'ans': 'UNSAFE',
        'reason': 'The use of repetitive "xx" suffixes is associated with informal or suggestive social media naming conventions and lacks professional alignment.'
    },
    {
        'name': 'C STOWIK',
        'username': 'christiaan.stowik',
        'ans': 'SAFE',
        'reason': 'Follows standard corporate formatting (firstname.lastname) and directly utilizes the user\'s legal name.'
    },
    {
        'name': 'PHILIP BOTES',
        'username': 'irisabundance69',
        'ans': 'UNSAFE',
        'reason': 'Contains the number "69," a recognized sexual reference, and the term "abundance" in this context often appears in suggestive or spam marketing.'
    },
    {
        'name': 'DO VAN HA VAN HA DO NGUYEN',
        'username': 'donguyen10522',
        'ans': 'SAFE',
        'reason': 'A professional combination of the user\'s surname and given name with a standard numerical identifier.'
    },
    {
        'name': 'Caitlin bianca Sherratt',
        'username': 'caitytwerks01',
        'ans': 'UNSAFE',
        'reason': 'Contains the term "twerks," referring to a sexually provocative dance style, which is inappropriate for a corporate environment.'
    },
    {
        'name': 'SAMUEL WILLIAM JAMES',
        'username': 'davelot80',
        'ans': 'UNSAFE',
        'reason': 'The username uses a name ("Dave") that bears no relation to the legal name. In a corporate context, this identity mismatch is a security and attribution risk.'
    },
    {
        'name': '1Nadine Thiart',
        'username': 'hentaip34',
        'ans': 'UNSAFE',
        'reason': 'Contains "hentai," a reference to sexually explicit adult content, violating all professional conduct standards.'
    },
    {
        'name': 'FATIEMA ORRIE',
        'username': 'fatiemaonlyfans',
        'ans': 'UNSAFE',
        'reason': 'References "OnlyFans," a platform primarily known for adult content, making it unsuitable for professional use.'
    },
    {
        'name': 'Ewan Booth',
        'username': 'theanimeitaku',
        'ans': 'UNSAFE',
        'reason': 'The term "itaku" is heavily associated with adult-oriented doujinshi marketplaces, and the reference to "anime" lacks professional alignment with the legal name.'
    },
    {
        'name': 'DEBORA EMILLY DA SILVA SANTOS',
        'username': 'demilly737',
        'ans': 'SAFE',
        'reason': 'A professional derivative combining the user\'s first and middle name with a neutral numerical identifier.'
    },
    {
        'name': 'VICTORIA DIAS DOLABELLA LTDA',
        'username': 'closertochloe',
        'ans': 'UNSAFE',
        'reason': 'Uses an unrelated name ("Chloe") and carries an informal, personal tone ("closer to") inconsistent with professional identity.'
    },
    {
        'name': 'ETHAN MINH THIEN HOA',
        'username': 'baowsupremacy',
        'ans': 'UNSAFE',
        'reason': 'Contains "supremacy," which is associated with extremist ideologies, and "baow," an informal slang term.'
    },
    {
        'name': 'JULIA GLODO Salva',
        'username': 'Curazaprince',
        'ans': 'UNSAFE',
        'reason': 'Uses a masculine title ("prince") for a female user and an informal handle ("Curaza"), failing identity alignment.'
    },
    {
        'name': 'GERALDINE NAVARRO ORTEGA',
        'username': 'iwantprincesslilly',
        'ans': 'UNSAFE',
        'reason': 'Contains an unrelated name ("Lilly") and an informal/suggestive prefix ("iwantprincess") that is unprofessional.'
    },
    {
        'name': 'James Bennati',
        'username': 'afterfun122',
        'ans': 'UNSAFE',
        'reason': 'The phrase "afterfun" has informal/suggestive connotations and bears no relation to the legal name provided.'
    },
    {
        'name': 'Marcus Irwin',
        'username': 'info',
        'ans': 'UNSAFE',
        'reason': 'The username is a generic functional descriptor (info) that obscures individual identity and lacks alignment with the legal name.'
    },
    {
        'name': 'Cameron Barsby',
        'username': 'info.sensual.rubs',
        'ans': 'UNSAFE',
        'reason': 'Contains "sensual" and "rubs," which are overtly suggestive and carry strong sexual connotations.'
    },
    {
        'name': 'FAYE ELISE DICKIE',
        'username': 'fayedickie777',
        'ans': 'SAFE',
        'reason': 'Direct and professional use of the user\'s legal name; the surname is used appropriately despite having potential slang meanings elsewhere.'
    }
];

const EMAIL_EXAMPLES = [
    {
        "username": "ghoshpritesh2006",
        "ans": "SAFE",
        "reason": "The username is a professional and clear combination of a surname and a first name followed by a year. It contains no offensive or suggestive language."
    },
    {
        "username": "pinkbucketredmug",
        "ans": "SAFE",
        "reason": "This consists of harmless, abstract words and colors. It is a creative, playful phrase that contains no profanity or inappropriate content."
    },
    {
        "username": "67edff66e5edc815de054c02",
        "ans": "SAFE",
        "reason": "This is a technical, system-generated alphanumeric string. It contains no human-readable profanity or offensive references and is considered a neutral, abstract identifier."
    },
    {
        "username": "bunnyasian69",
        "ans": "UNSAFE",
        "reason": "The username contains '69,' a sexual reference, and pairs a racial identifier ('asian') with a playful noun, which aligns with harmful racial fetishization tropes."
    },
    {
        "username": "abbyjoxo96",
        "ans": "SAFE",
        "reason": "This is a harmless combination of a name and common informal suffixes. The 'xo' (hugs and kisses) is a non-offensive social expression acceptable in a playful username."
    },
    {
        "username": "goddess.edenangel",
        "ans": "UNSAFE",
        "reason": "The combination of 'goddess' and 'angel' is frequently used in suggestive or adult-oriented contexts. It carries an unprofessional and suggestive tone unsuitable for work."
    },
    {
        "username": "nellixxx01",
        "ans": "UNSAFE",
        "reason": "The 'xxx' suffix is a globally recognized indicator for adult or sexually explicit content, violating corporate standards for professional identity."
    },
    {
        "username": "lilmisssquirtel",
        "ans": "UNSAFE",
        "reason": "The username contains a phonetic variation of a term often used in a sexually suggestive context. Combined with 'lilmiss,' it creates an inappropriate double entendre."
    },
    {
        "username": "lolasolaluxe420",
        "ans": "UNSAFE",
        "reason": "The number '420' is a widely recognized reference to marijuana culture, which constitutes a drug reference that is inappropriate for a corporate environment."
    },
    {
        "username": "chutiami998",
        "ans": "UNSAFE",
        "reason": "The username contains 'chutia,' which is a highly offensive vulgar slur in South Asian languages, violating the rule against profanity."
    },
    {
        "username": "thebootaysmashit",
        "ans": "UNSAFE",
        "reason": "This username uses slang phonetics ('bootay') and 'smashit' to create an overt sexual double entendre that is explicitly unprofessional."
    },
    {
        "username": "bongbongcongchua246",
        "ans": "SAFE",
        "reason": "This is a harmless Vietnamese phrase meaning 'bubble princess.' It is a playful, non-offensive nickname that contains no suggestive or hateful language."
    }
];

const NAME_EXAMPLES = [
    {
        "name": "Dick Head",
        "ans": "UNSAFE",
        "reason": "The name uses a vulgar anatomical term and a common insult. It falls under the category of profanity and offensive language, making it entirely inappropriate for a corporate environment."
    },
    {
        "name": "Fuck You",
        "ans": "UNSAFE",
        "reason": "This name contains a high-level profanity and a direct verbal assault. It is a clear violation of professional conduct policies regarding vulgarity and workplace-appropriate communication."
    },
    {
        "name": "Sex God",
        "ans": "UNSAFE",
        "reason": "The name contains overtly sexual and suggestive terms. It is unprofessional and violates the policy against sexualized language or suggestive nicknames in a corporate setting."
    },
    {
        "name": "Drug Dealer",
        "ans": "UNSAFE",
        "reason": "This name makes a direct reference to illegal substances and criminal activity. Drug-related references are strictly classified as unsafe for professional environments."
    },
    {
        "name": "Nazi Hitler",
        "ans": "UNSAFE",
        "reason": "The name contains hateful and discriminatory words referencing a violent extremist ideology. This is classified as highly offensive and hateful content."
    },
    {
        "name": "B1tch Pl3ase",
        "ans": "UNSAFE",
        "reason": "This is a leetspeak (symbol-swapping) variation of a profanity and a dismissive slur. Even with character substitutions, the offensive meaning remains clear and unprofessional."
    },
    {
        "name": "Kill Bill",
        "ans": "UNSAFE",
        "reason": "The name contains a direct reference to violence. While it is a movie title, in a corporate environment, 'Kill' is considered a violent reference that is generally prohibited."
    },
    {
        "name": "John Smith",
        "ans": "SAFE",
        "reason": "This is a standard, professional, and harmless combination of a common first and last name. It contains no offensive, suggestive, or unprofessional elements."
    },
    {
        "name": "Maria Garcia",
        "ans": "SAFE",
        "reason": "A professional and clear name-based identifier. It adheres to standard naming conventions and is perfectly acceptable for a formal or corporate setting."
    },
    {
        "name": "Emily Taylor",
        "ans": "SAFE",
        "reason": "This is a neutral and professional name consisting of a common first and last name. It contains no slang, profanity, or inappropriate references."
    },
    {
        "name": "Matthew Harris",
        "ans": "SAFE",
        "reason": "The name is a standard human name. It is harmless, non-offensive, and conveys a professional identity suitable for all corporate communications."
    },
    {
        "name": "Sarah Williams",
        "ans": "SAFE",
        "reason": "Consisting of a clear first and last name, this identifier is entirely safe, professional, and lacks any informal or questionable connotations."
    }
];

module.exports = {
    NAME_EXAMPLES,
    COMBINED_EXAMPLES,
    EMAIL_EXAMPLES
};
