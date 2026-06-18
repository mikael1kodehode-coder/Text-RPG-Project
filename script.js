// Player
let state = {
  player: {
    name: "Adventurer",
    hp: 20,
    maxHp: 20,
    mp: 10,
    maxMp: 10,
    xp: 0,
    xpToNextLevel: 50,
    level: 1,
    attack: 5,
    defense: 2,
    gold: 30,
    weapon: "rusty_dagger",
    armor: "cloth_rags",
    spells: [],
  },
  inventory: { health_potion: 2 },
  biome: "city",
  phase: "explore",
  enemy: null,
};

// Helpers

function randNum(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
function reduce(v, low, high) {
  return Math.max(low, Math.min(high, v));
}

function playerAtk() {
  const weap = ITEMS[state.player.weapon];
  return state.player.attack + (weap ? weap.atk : 0);
}

function playerDef() {
  const armor = ITEMS[state.player.armor];
  return state.player.defense + (armor ? armor.defense : 0);
}

function addToInventory(itemId, qty = 1) {
  state.inventory[itemId] = (state.inventory[itemId] || 0) + qty;
  renderInventory();
}

function removeFromInventory(itemId, qty = 1) {
  if (!state.inventory[itemId]) return;
  state.inventory[itemId] -= qty;
  if (state.inventory[itemId] <= 0) delete state.inventory[itemId];
  renderInventory();
}

// Log

function log(msg, cls = "story") {
  const el = document.getElementById("log");
  const line = document.createElement("div");
  line.className = "log-line ${cls";
  line.tetContent = msg;
  el.appendChild(line);
  el.scrollTop = el.scrollHeight;
}

function logSep() {
  const el = document.getElementById("log");
  const hr = document.createElement("hr");
  hr.className = "log-seperator";
  el.appendChild(hr);
}

//Monsters

const MONSTERS = {
  sewer: [
    { name: "Angry Rat", hp: 12, atk: 4, def: 1, xp: 8, gold: [1, 6] },
    { name: "Sewer Slug", hp: 18, atk: 6, def: 2, xp: 14, gold: [3, 10] },
    { name: "Snooze Bat", hp: 22, atk: 9, def: 2, xp: 20, gold: [5, 15] },
    { name: "Rat King", hp: 30, atk: 10, def: 3, xp: 25, gold: [10, 20] },
    {
      name: "Crockogator",
      hp: 38,
      atk: 12,
      def: 5,
      xp: 35,
      gold: [10, 25],
      boss: true,
    },
  ],
  forest: [
    { name: "Beevil Drone", hp: 16, atk: 5, def: 2, xp: 12, gold: [2, 8] },
    { name: "Feisty Pushroom", hp: 24, atk: 8, def: 3, xp: 18, gold: [3, 12] },
    { name: "Wild Pikavee", hp: 28, atk: 11, def: 3, xp: 25, gold: [8, 20] },
    { name: "Woolewoods", hp: 34, atk: 12, def: 4, xp: 30, gold: [8, 25] },
    {
      name: "Dreadful Vines",
      hp: 50,
      atk: 15,
      def: 6,
      xp: 50,
      gold: [15, 35],
      boss: true,
    },
  ],
  mountain: [
    { name: "Rocky Guy", hp: 20, atk: 6, def: 3, xp: 14, gold: [2, 7] },
    { name: "Slime-agma", hp: 32, atk: 10, def: 6, xp: 28, gold: [6, 18] },
    { name: "Salty Goat", hp: 35, atk: 14, def: 4, xp: 38, gold: [10, 28] },
    {
      name: "Crystal Drake",
      hp: 60,
      atk: 18,
      def: 8,
      xp: 60,
      gold: [20, 45],
      boss: true,
    },
  ],
  lake: [
    { name: "Watersprite", hp: 14, atk: 5, def: 1, xp: 10, gold: [2, 8] },
    { name: "Toad-toise", hp: 26, atk: 8, def: 7, xp: 22, gold: [4, 14] },
    { name: "Serpuntyne", hp: 40, atk: 13, def: 5, xp: 40, gold: [12, 30] },
    {
      name: "Chuchu'lu",
      hp: 65,
      atk: 20,
      def: 7,
      xp: 70,
      gold: [25, 50],
      boss: true,
    },
  ],
};

// Main panel
function renderMainPanel() {
  const panel = document.getElementById("main-panel");
  const intro = document.createElement("div");
  intro.className = "intro";
  intro.textContent =
    "You wake in darkness  cold stone beneath you, the smell of rot nearby";

  panel.append(intro);
}
renderMainPanel();

// Player panel
function renderPlayerPanel() {
  const panel = document.getElementById("player-panel");

  const title = document.createElement("div");
  title.className = "panel-title";
  title.textContent = state.player.name;

  const hpRow = document.createElement("div");
  hpRow.className = "stat-row";
  const hpLabel = document.createElement("span");
  hpLabel.className = "stat-label";
  hpLabel.textContent = "HP";
  const hpValue = document.createElement("span");
  hpValue.className = "stat-value";
  hpValue.textContent = ` ${state.player.hp} / ${state.player.maxHp}`;

  const mpRow = document.createElement("div");
  mpRow.className = "stat-row";
  const mpLabel = document.createElement("span");
  mpLabel.className = "stat-label";
  mpLabel.textContent = "MP";
  const mpValue = document.createElement("span");
  mpValue.className = "stat-value";
  mpValue.textContent = ` ${state.player.mp} / ${state.player.maxMp}`;

  const xpRow = document.createElement("div");
  xpRow.className = "stat-row";
  const xpLabel = document.createElement("span");
  xpLabel.className = "stat-label";
  xpLabel.textContent = "XP";
  const xpValue = document.createElement("span");
  xpValue.className = "stat-value";
  xpValue.textContent = ` ${state.player.xp} / ${state.player.xpToNextLevel}`;

  const levelRow = document.createElement("div");
  levelRow.className = "stat-row";
  const levelLabel = document.createElement("span");
  levelLabel.className = "stat-label";
  levelLabel.textContent = "level ";
  const levelValue = document.createElement("span");
  levelValue.className = "stat-value";
  levelValue.textContent = ` ${state.player.level}`;

  const attackRow = document.createElement("div");
  attackRow.className = "stat-row";
  const attackLabel = document.createElement("span");
  attackLabel.className = "stat-label";
  attackLabel.textContent = "Attack";
  const attackValue = document.createElement("span");
  attackValue.className = "stat-value";
  attackValue.textContent = ` ${state.player.attack}`;

  const defenceRow = document.createElement("div");
  defenceRow.className = "stat-row";
  const defenceLabel = document.createElement("span");
  defenceLabel.className = "stat-label";
  defenceLabel.textContent = "defence";
  const defencevalue = document.createElement("span");
  defencevalue.className = "stat-value";
  defencevalue.textContent = ` ${state.player.defense}`;

  defenceRow.append(defenceLabel, defencevalue);
  attackRow.append(attackLabel, attackValue);
  levelRow.append(levelLabel, levelValue);
  hpRow.append(hpLabel, hpValue);
  mpRow.append(mpLabel, mpValue);
  xpRow.append(xpLabel, xpValue);
  panel.append(title, hpRow, mpRow, xpRow, levelRow, attackRow, defenceRow);
}
renderPlayerPanel();

// EQUIPPED//

function renderEquippedPanel() {
  const panel = document.getElementById("equipped-panel");

  const title = document.createElement("div");
  title.className = "panel-title";
  title.textContent = "Equipped";

  const weaponRow = document.createElement("div");
  weaponRow.className = "equipped-row";

  const weaponLabel = document.createElement("span");
  weaponLabel.className = "stat-label";
  weaponLabel.textContent = "Weapon: ";

  const weaponValue = document.createElement("span");
  weaponValue.className = "stat-value";
  weaponValue.textContent = state.player.weapon;

  const armorRow = document.createElement("div");
  armorRow.className = "equipped";

  const armorLabel = document.createElement("span");
  armorLabel.className = "stat-label";
  armorLabel.textContent = "Armor: ";

  const armorValue = document.createElement("span");
  armorValue.className = "stat-value";
  armorValue.textContent = state.player.armor;

  weaponRow.append(weaponLabel, weaponValue);
  armorRow.append(armorLabel, armorValue);

  panel.append(title, weaponRow, armorRow);
}

renderEquippedPanel();

// INVENTORY //

function renderInventoryPanel() {
  const panel = document.getElementById("inventory-panel");

  const title = document.createElement("div");
  title.className = "panel-title";
  title.textContent = "Inventory";

  const potionRow = document.createElement("div");
  potionRow.className = "inventory-row";

  const potionLabel = document.createElement("span");
  potionLabel.className = "stat-label";
  potionLabel.textContent = "Health Potion";

  const potionValue = document.createElement("span");
  potionValue.className = "stat-value";
  potionValue.textContent = state.inventory.health_potion;

  const goldRow = document.createElement("div");
  goldRow.className = "inventory-row";

  const goldLabel = document.createElement("span");
  goldLabel.className = "stat-label";
  goldLabel.textContent = "Gold: ";

  const goldValue = document.createElement("span");
  goldValue.className = "stat-value";
  goldValue.textContent = state.player.gold;

  goldRow.append(goldLabel, goldValue);
  potionRow.append(potionLabel, potionValue);

  panel.append(title, goldRow, potionRow);
}

renderInventoryPanel();

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
