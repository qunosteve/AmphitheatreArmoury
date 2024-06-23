// This is the library of eligible ape traits that give perks and bonuses to holders

export const traitPerkType = {
    armorSkin,
    attributeBonus,
    skillBonus,
    equippableItem,
}

export const eligibleHatTraits = {
    "kingscrown": [attributeBonus, command, 2
    ],
}

export const eligibleBodyTraits = {
    "Chainmail": [armorSkin, "Chainmail"],
    "Robot": [armorSkin, "Robot"]
}


export const eligibleWeaponTraits = {
    "Spear": [equippableItem, "Spear"],
    "Sword": [equippableItem, "Sword"],
    "Rifle": [equippableItem, "Crossbow"]
}

export const eligibleFamilyTraits = {
    "Wright": [attributeBonus, proficiency, 1],
}

export const eligibleClassTraits = {
    "Craftsmen": [skillBonus, crafting, 2],
    "Artists": [skillBonus, athletics, 2],
    "Explorers": [skillBonus, riding, 2],
    "Merchants": [skillBonus, sustenance, 2],
    "Military Officers": [attributeBonus, proficiency, 4],
    "Royal Advisors": [skillBonus, tactics, 2],
    "Nobles": [skillBonus, inspiration, 2]
}