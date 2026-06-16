// Items / Equipment
const ITEMS = {
  // Weapons
  rusty_dagger: {
    id: "rusty_dagger",
    name: "Rusty Dagger",
    type: "weapon",
    atk: 2,
    def: 0,
    value: 10,
    desc: "Old and rusty Dagger, more likely to leave traces of rust than piercing skin. Gives +2 to ATK.",
  },
  short_sword: {
    id: "short_sword",
    name: "Short Sword",
    type: "weapon",
    atk: 5,
    def: 0,
    value: 30,
    desc: "Standard Short Sword, loved and hated in equal measure. Gives +5 to ATK.",
  },
  long_sword: {
    id: "long_sword",
    name: "Long Sword",
    type: "weapon",
    atk: 8,
    def: 0,
    value: 60,
    desc: "Long Sword, longer than the Short Sword, does more damage as well. Gives +8 to ATK.",
  },
  iron_axe: {
    id: "iron_axe",
    name: "Iron Axe",
    type: "weapon",
    atk: 6,
    def: 0,
    value: 45,
    desc: "Iron Axe, The bread and butter of Loggers and Barbarians alike! Gives +6 to ATK.",
  },
  two_handed_axe: {
    id: "two_handed_axe",
    name: "Two Handed Axe",
    type: "weapon",
    atk: 12,
    def: 0,
    value: 80,
    desc: "Two Handed Axe, requires both hands to use. High risk, high reward. Gives + 12 to ATK.",
  },

  //Armor
  cloth_rags: {
    id: "cloth_rags",
    name: "Cloth Rags",
    type: "armor",
    atk: 0,
    def: 1,
    value: 0,
    desc: "Cloth Rags, if you enjoy being cold, this is your premium choice. Gives +1 to DEF.",
  },
  leather_armor: {
    id: "leather_armor",
    name: "Leather Armor",
    type: "armor",
    atk: 0,
    def: 4,
    value: 35,
    desc: "Leather Armor, provides some protection against scratches and bumps, not the greatest against piercing. Gives +4 to DEF.",
  },
  chain_mail: {
    id: "chain_mail",
    name: "Chain Mail",
    type: "armor",
    atk: 0,
    def: 8,
    value: 80,
    desc: "Chain Mail, a step up from Leather Armor, provides more protection. Gives +8 to DEF.",
  },
  plate_armor: {
    id: "plate_armor",
    name: "Plate Armor",
    type: "armor",
    atk: 0,
    def: 12,
    value: 150,
    desc: "Plate Armor, the Be all End all in armor technology. Gives +12 to DEF.",
  },

  //Consumables
  health_potion: {
    id: "health_potion",
    name: "Health Potion",
    type: "potion",
    heal: 20,
    value: 25,
    desc: "Do you want to life forever? Then this is not it. Gives 20 Health.",
  },
  greater_health_potion: {
    id: "greater_health_potion",
    name: "Greater Health Potion",
    type: "potion",
    heal: 50,
    value: 60,
    desc: "One step closer to immortality, but still not there. Gives 50 Health.",
  },
  mana_potion: {
    id: "mana_potion",
    name: "Mana Potion",
    type: "potion",
    mp: "20",
    value: 40,
    desc: "MONSTER Energy, distelled from mana whisps, gives you a rush of energy. Guaranteed to keep the spells rolling. Gives 20 MP",
  },

  // Magic
  fireball_tome: {
    id: "fireball_tome",
    name: "Fireball Tome",
    type: "spell",
    dmg: 25,
    mp: 15,
    value: 100,
    desc: "Have you ever had aspirations as a local arsonist? Curb your impulses and set fire to monsters instead! Blasts your target with red hot flames. Deals 25 DMG.",
  },
  lightningbolt_tome: {
    id: "lightningbolt_tome",
    name: "Lightningbolt Tome",
    type: "spell",
    dmg: 25,
    mp: 15,
    value: 100,
    desc: "Not a fan of flames? How about electrocuting your enemies instead? Deals 25 DMG.",
  },
};

//Shop
const SHOP_STOCK = [
  "short_sword",
  "long_sword",
  "iron_axe",
  "two_handed_axe",
  "leather_armor",
  "chain_mail",
  "plate_armor",
  "health_potion",
  "greater_health_potion",
  "mana_potion",
  "fireball_tome",
  "lightningbolt_tome",
];

// Entity

class Entity {
  constructor(name, hp, atk, armor, weapon = null) {
    this.name = name;
    this.hp = hp;
    this.atk = atk;
    this.weapon = weapon;
  }

  fight(entity) {
    const damage = this.weapon ? this.weapon.atk : this.atk;
    entity.hp -= damage;
    console.log(`${this.name} attacks ${entity.name} and`);
  }
}
class Item {
  constructor(name, heal) {
    this.name = name;
    this.heal = heal;
  }
}
