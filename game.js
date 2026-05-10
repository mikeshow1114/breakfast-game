/* ========================================
   早安小老闆 - 台灣早餐連鎖夢
   Game Logic v1.1 - Bug Fixed
======================================== */

// ===== GAME DATA =====
const MENU_ITEMS = [
  { id:'egg',      emoji:'🍳', name:'煎蛋',   price:25,  time:3,  xp:5  },
  { id:'toast',    emoji:'🍞', name:'吐司',   price:30,  time:4,  xp:6  },
  { id:'bacon',    emoji:'🥓', name:'培根',   price:35,  time:5,  xp:8  },
  { id:'coffee',   emoji:'☕', name:'咖啡',   price:40,  time:3,  xp:7  },
  { id:'sandwich', emoji:'🥪', name:'三明治', price:55,  time:8,  xp:12 },
  { id:'pancake',  emoji:'🥞', name:'鬆餅',   price:65,  time:10, xp:15 },
  { id:'rice',     emoji:'🍱', name:'飯糰',   price:30,  time:4,  xp:7  },
  { id:'waffle',   emoji:'🧇', name:'格子鬆餅',price:70,  time:12, xp:18 },
  { id:'soy',      emoji:'🥛', name:'豆漿',   price:20,  time:2,  xp:4  },
  { id:'noodle',   emoji:'🍜', name:'湯麵',   price:60,  time:9,  xp:14 },
  { id:'dumpling', emoji:'🥟', name:'水餃',   price:45,  time:7,  xp:10 },
  { id:'muffin',   emoji:'🧁', name:'鬆糕',   price:50,  time:8,  xp:11 },
];

const UPGRADES = [
  { id:'stove2',   name:'升級瓦斯爐',  desc:'烹飪速度 +30%',    cost:500,  icon:'🔥', effect:'speed',    value:0.3  },
  { id:'sign',     name:'霓虹招牌',    desc:'客流量 +20%',      cost:800,  icon:'✨', effect:'customer', value:0.2  },
  { id:'uniform',  name:'可愛制服',    desc:'評分 +0.5',        cost:600,  icon:'👘', effect:'rating',   value:0.5  },
  { id:'fridge',   name:'大型冰箱',    desc:'被動收入 +10%',    cost:1500, icon:'🧊', effect:'passive',  value:0.1  },
  { id:'speaker',  name:'音響設備',    desc:'顧客滿意度 +25%',  cost:900,  icon:'🎵', effect:'sat',      value:0.25 },
  { id:'stove3',   name:'專業爐具',    desc:'烹飪速度再 +20%',  cost:2000, icon:'⚡', effect:'speed',    value:0.2  },
];

const CITIES = {
  taipei:    { name:'台北',  desc:'首都繁華商圈，早餐需求超高！',    cost:5000,  dailyIncome:1200 },
  newtaipei: { name:'新北',  desc:'雙北交通便利，上班族人潮滾滾',    cost:8000,  dailyIncome:1000 },
  taoyuan:   { name:'桃園',  desc:'國際機場附近，觀光客絡繹不絕',    cost:10000, dailyIncome:900  },
  hsinchu:   { name:'新竹',  desc:'科技園區員工多，早餐消費力強',    cost:12000, dailyIncome:950  },
  taichung:  { name:'台中',  desc:'台灣心臟地帶，美食競爭最激烈',    cost:18000, dailyIncome:1100 },
  tainan:    { name:'台南',  desc:'古都美食天堂，在地口味要到位',    cost:22000, dailyIncome:1000 },
  kaohsiung: { name:'高雄',  desc:'南台灣最大城市，夜市文化濃厚',    cost:25000, dailyIncome:1050 },
  hualien:   { name:'花蓮',  desc:'東部後花園，觀光客全年不斷',     cost:15000, dailyIncome:800  },
};

const TITLES = [
  { level:1,  title:'初學廚師', min:0      },
  { level:2,  title:'小廚師',   min:500    },
  { level:3,  title:'實習老闆', min:1500   },
  { level:4,  title:'小老闆',   min:3000   },
  { level:5,  title:'連鎖新手', min:6000   },
  { level:6,  title:'展店達人', min:12000  },
  { level:7,  title:'地區霸主', min:25000  },
  { level:8,  title:'全台知名', min:50000  },
  { level:9,  title:'早餐大王', min:100000 },
  { level:10, title:'早餐帝國', min:200000 },
];

const ACHIEVEMENTS = [
  { id:'first_cook', name:'初次下廚',  desc:'製作第一道料理',    icon:'🍳', condition: s => s.totalCooked >= 1       },
  { id:'earn_1k',    name:'小有積蓄',  desc:'累積賺到$1,000',    icon:'💰', condition: s => s.totalIncome >= 1000    },
  { id:'earn_10k',   name:'萬元富翁',  desc:'累積賺到$10,000',   icon:'💵', condition: s => s.totalIncome >= 10000   },
  { id:'earn_50k',   name:'五萬存款',  desc:'累積賺到$50,000',   icon:'🏦', condition: s => s.totalIncome >= 50000   },
  { id:'branch_2',   name:'二店開張',  desc:'開立第2間分店',     icon:'🏪', condition: s => s.branches.length >= 2   },
  { id:'branch_5',   name:'連鎖品牌',  desc:'開立第5間分店',     icon:'🔗', condition: s => s.branches.length >= 5   },
  { id:'friend_1',   name:'廣結善緣',  desc:'加入第一個好友',    icon:'👫', condition: s => s.friends.length >= 1    },
  { id:'cook_100',   name:'百道料理',  desc:'製作100道料理',     icon:'🏆', condition: s => s.totalCooked >= 100     },
  { id:'all_taiwan', name:'台灣連鎖夢',desc:'在全台8城市開立分店',icon:'🇹🇼',condition: s => s.branches.length >= 8   },
];

// BUG FIX 1: BRANCH_GOALS[0]=0 導致新玩家一開始就觸發展店通知 → 第一個目標改為實際金額
const BRANCH_GOALS = [50000, 100000, 180000, 300000, 500000, 750000, 1000000, 999999999];
const CUSTOMER_EMOJIS = ['👨','👩','👴','👵','👦','👧','🧑','👱','🧔','👲'];

// ===== STATE =====
let state = {
  user: null,
  char: null,
  charName: '',
  money: 500,
  totalIncome: 0,
  totalCooked: 0,
  dailyOrders: 0,
  dailyIncome: 0,
  level: 1,
  xp: 0,
  rating: 4.0,
  branches: ['taipei'],
  purchasedUpgrades: [],
  friends: [],
  speedBonus: 0,
  customerBonus: 0,
  achievements: [],
  shopName: '',
  selectedCity: null,
};

// BUG FIX 2: setInterval 重複累加 → 用 flag 確保 loop 只啟動一次
let customerLoopStarted = false;
let autoIncomeStarted = false;
// BUG FIX 3: checkBranchGoal 每次烹飪都重複彈出展店通知 → 用 flag 記錄已顯示
let branchNotifyShown = false;

// ===== UTILS =====
function genId() {
  return Math.random().toString(36).substr(2, 8).toUpperCase();
}

function saveState() {
  if (!state.user) return;
  try {
    localStorage.setItem('bk_save_' + state.user.id, JSON.stringify(state));
  } catch(e) {
    console.warn('Save failed:', e);
  }
}

function loadState(userId) {
  try {
    const saved = localStorage.getItem('bk_save_' + userId);
    if (saved) {
      const s = JSON.parse(saved);
      // BUG FIX 4: loadState 後舊 state 殘留非陣列欄位 → 確保陣列欄位正確
      if (!Array.isArray(s.branches))         s.branches = ['taipei'];
      if (!Array.isArray(s.purchasedUpgrades)) s.purchasedUpgrades = [];
      if (!Array.isArray(s.friends))           s.friends = [];
      if (!Array.isArray(s.achievements))      s.achievements = [];
      Object.assign(state, s);
      return true;
    }
  } catch(e) {
    console.warn('Load failed:', e);
  }
  return false;
}

// BUG FIX 5: Toast 連續觸發時上一個還沒消失就被蓋掉 → 用 clearTimeout 管理
let toastTimer = null;
function showToast(msg, duration = 2000) {
  const t = document.getElementById('toast');
  if (!t) return;
  if (toastTimer) clearTimeout(toastTimer);
  t.textContent = msg;
  t.classList.add('show');
  toastTimer = setTimeout(() => {
    t.classList.remove('show');
    toastTimer = null;
  }, duration);
}

function showCookAnim(emoji) {
  const el = document.getElementById('cook-anim');
  if (!el) return;
  el.textContent = emoji;
  el.style.display = 'block';
  el.style.animation = 'none';
  void el.offsetWidth; // reflow
  el.style.animation = 'cookPop .6s ease forwards';
  setTimeout(() => { el.style.display = 'none'; }, 650);
}

function showScreen(id) {
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
  const sc = document.getElementById(id);
  if (sc) sc.classList.add('active');
  // Refresh UI after transition
  if (id === 'screen-game')    refreshGameUI();
  if (id === 'screen-map')     refreshMapUI();
  if (id === 'screen-friends') refreshFriendsUI();
  if (id === 'screen-profile') refreshProfileUI();
}

function getTitle(income) {
  let t = TITLES[0];
  for (const title of TITLES) {
    if (income >= title.min) t = title;
  }
  return t;
}

// ===== AUTH =====
function switchTab(tab) {
  document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
  document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
  const btn = document.querySelector(`.tab-btn[onclick="switchTab('${tab}')"]`);
  if (btn) btn.classList.add('active');
  const content = document.getElementById('tab-' + tab);
  if (content) content.classList.add('active');
}

function doLogin() {
  const emailEl = document.getElementById('login-email');
  const passEl  = document.getElementById('login-password');
  const email = (emailEl && emailEl.value.trim()) || 'demo@demo.com';
  const pass  = (passEl  && passEl.value)         || 'demo';

  let users = {};
  try { users = JSON.parse(localStorage.getItem('bk_users') || '{}'); } catch(e) {}
  let user = Object.values(users).find(u => u.email === email);

  if (!user) {
    user = { id: genId(), email, name: email.split('@')[0] };
    users[user.id] = user;
    localStorage.setItem('bk_users', JSON.stringify(users));
  }

  state.user = user;
  localStorage.setItem('bk_lastuser', JSON.stringify(user));

  const hasData = loadState(user.id);
  if (!hasData || !state.char) {
    showScreen('screen-char');
  } else {
    startGame();
  }
}

function doRegister() {
  const name  = document.getElementById('reg-name').value.trim();
  const email = document.getElementById('reg-email').value.trim();
  const pass  = document.getElementById('reg-password').value;

  if (!name || !email || !pass) { showToast('⚠️ 請填寫所有欄位'); return; }
  if (pass.length < 6)          { showToast('⚠️ 密碼至少需要6個字元'); return; }
  if (!email.includes('@'))     { showToast('⚠️ 請輸入正確的信箱格式'); return; }

  let users = {};
  try { users = JSON.parse(localStorage.getItem('bk_users') || '{}'); } catch(e) {}

  if (Object.values(users).find(u => u.email === email)) {
    showToast('⚠️ 此信箱已被使用，請直接登入');
    return;
  }

  const user = { id: genId(), email, name };
  users[user.id] = user;
  localStorage.setItem('bk_users', JSON.stringify(users));
  localStorage.setItem('bk_lastuser', JSON.stringify(user));

  state.user = user;
  showToast('✅ 帳號創建成功！');
  showScreen('screen-char');
}

function doFacebookLogin() {
  // BUG FIX 6: FB 每次都產生新 ID → 改用固定 key 讓同裝置 FB 帳號一致
  let fbId = localStorage.getItem('bk_fb_id');
  if (!fbId) {
    fbId = 'FB' + genId();
    localStorage.setItem('bk_fb_id', fbId);
  }
  const fbUser = { id: fbId, email: 'fb_' + fbId + '@fb.com', name: 'Facebook用戶' };

  let users = {};
  try { users = JSON.parse(localStorage.getItem('bk_users') || '{}'); } catch(e) {}
  users[fbId] = fbUser;
  localStorage.setItem('bk_users', JSON.stringify(users));
  localStorage.setItem('bk_lastuser', JSON.stringify(fbUser));

  state.user = fbUser;
  const hasData = loadState(fbId);
  if (!hasData || !state.char) {
    showScreen('screen-char');
  } else {
    startGame();
  }
  showToast('✅ Facebook 登入成功！');
}

function doLogout() {
  saveState();
  localStorage.removeItem('bk_lastuser');
  // BUG FIX 7: 登出後 loop flag 沒重置，重新登入會多跑 interval
  customerLoopStarted = false;
  autoIncomeStarted   = false;
  branchNotifyShown   = false;
  state = {
    user: null, char: null, charName: '', money: 500, totalIncome: 0,
    totalCooked: 0, dailyOrders: 0, dailyIncome: 0, level: 1, xp: 0,
    rating: 4.0, branches: ['taipei'], purchasedUpgrades: [], friends: [],
    speedBonus: 0, customerBonus: 0, achievements: [], shopName: '', selectedCity: null
  };
  showToast('👋 已登出');
  showScreen('screen-login');
}

// ===== CHARACTER SELECT =====
let selectedChar = null;

function selectChar(type) {
  selectedChar = type;
  document.querySelectorAll('.char-card').forEach(c => c.classList.remove('selected'));
  const card = document.getElementById('char-' + type);
  if (card) card.classList.add('selected');
  const nameSection = document.getElementById('char-name-section');
  if (nameSection) nameSection.style.display = 'block';
  const nameInput = document.getElementById('char-name');
  if (nameInput) nameInput.value = (type === 'boy') ? '小明' : '小美';
}

function confirmChar() {
  if (!selectedChar) { showToast('⚠️ 請先選擇角色'); return; }
  const nameInput = document.getElementById('char-name');
  const name = (nameInput && nameInput.value.trim()) || (selectedChar === 'boy' ? '小明' : '小美');
  state.char     = selectedChar;
  state.charName = name;
  state.shopName = name + '的早餐店';
  // Reset fresh game values
  state.money         = 500;
  state.totalIncome   = 0;
  state.totalCooked   = 0;
  state.dailyOrders   = 0;
  state.dailyIncome   = 0;
  state.level         = 1;
  state.xp            = 0;
  state.rating        = 4.0;
  state.branches      = ['taipei'];
  state.purchasedUpgrades = [];
  state.achievements  = [];
  branchNotifyShown   = false;
  saveState();
  startGame();
}

// ===== GAME START =====
function startGame() {
  buildMenuGrid();
  buildUpgradeList();
  refreshGameUI();
  startCustomerLoop();
  startAutoIncome();
  showScreen('screen-game');
  setTimeout(() => showToast('🎉 歡迎來到 ' + state.shopName + '！'), 600);
}

// ===== GAME UI =====
function refreshGameUI() {
  if (!state.char) return;
  const avatar = (state.char === 'boy') ? '👦' : '👧';

  setText('hud-avatar',    avatar);
  setText('hud-name',      state.charName);
  const titleData = getTitle(state.totalIncome);
  setText('hud-level',     titleData.level);
  setText('hud-money',     state.money.toLocaleString());
  setText('shop-sign-name',state.shopName);
  setText('daily-orders',  state.dailyOrders);
  setText('daily-income',  '$' + state.dailyIncome.toLocaleString());

  // Goal progress
  const branchCount = state.branches.length;
  // BUG FIX 8: goalAmount 索引算錯，已有N間店時要取第N個目標
  const goalIdx    = Math.min(branchCount - 1, BRANCH_GOALS.length - 1);
  const goalAmount = BRANCH_GOALS[goalIdx];
  const progress   = goalAmount > 0 ? Math.min(100, (state.totalIncome / goalAmount) * 100) : 100;

  setStyle('goal-bar',           'width', progress + '%');
  setText('next-goal-amount',    '$' + goalAmount.toLocaleString());
  setStyle('big-progress-fill',  'width', progress + '%');
  setText('big-progress-text',   Math.floor(progress) + '%');

  // Stats
  setText('stat-branches',      state.branches.length);
  setText('stat-total-sold',    state.totalCooked);
  setText('stat-total-income',  '$' + state.totalIncome.toLocaleString());
  setText('stat-rating',        state.rating.toFixed(1));

  // Branch unlock button
  const allCities   = Object.keys(CITIES).length;
  const canUnlock   = state.totalIncome >= goalAmount && branchCount < allCities;
  const btn = document.getElementById('btn-open-branch');
  if (btn) btn.disabled = !canUnlock;

  checkAchievements();
}

// helper to avoid repeated null checks
function setText(id, val) {
  const el = document.getElementById(id);
  if (el) el.textContent = val;
}
function setStyle(id, prop, val) {
  const el = document.getElementById(id);
  if (el) el.style[prop] = val;
}

// ===== MENU =====
function buildMenuGrid() {
  const grid = document.getElementById('menu-grid');
  if (!grid) return;
  grid.innerHTML = '';
  MENU_ITEMS.forEach(item => {
    const div = document.createElement('div');
    div.className = 'menu-item';
    div.id = 'menu-' + item.id;
    div.innerHTML = `
      <span class="menu-emoji">${item.emoji}</span>
      <div class="menu-name">${item.name}</div>
      <div class="menu-price">$${item.price}</div>
      <div class="menu-time">${item.time}秒</div>
    `;
    div.addEventListener('click', () => cookItem(item));
    grid.appendChild(div);
  });
}

function cookItem(item) {
  const el = document.getElementById('menu-' + item.id);
  if (!el || el.classList.contains('cooking')) return;
  el.classList.add('cooking');

  const cookingItems = document.getElementById('cooking-items');
  const cookEl = document.createElement('span');
  cookEl.textContent = item.emoji;
  cookEl.style.animation = 'bounce .3s ease infinite alternate';
  if (cookingItems) cookingItems.appendChild(cookEl);

  // BUG FIX 9: speedBonus=0.3 時 speed=0.7 正確，但若多次購買速度升級超過1會變負數
  const speed    = Math.max(0.2, 1 - (state.speedBonus || 0));
  const cookTime = item.time * 1000 * speed;

  setTimeout(() => {
    state.money       += item.price;
    state.totalIncome += item.price;
    state.dailyIncome += item.price;
    state.dailyOrders++;
    state.totalCooked++;
    state.xp += item.xp;

    const newTitle = getTitle(state.totalIncome);
    if (newTitle.level > state.level) {
      state.level = newTitle.level;
      showToast(`🎊 升級！你現在是「${newTitle.title}」Lv.${newTitle.level}！`, 3000);
    }

    // BUG FIX 10: cookingItems.removeChild 若 cookEl 已不在 DOM 會報錯
    if (cookingItems && cookingItems.contains(cookEl)) {
      cookingItems.removeChild(cookEl);
    }
    el.classList.remove('cooking');

    showCookAnim(item.emoji);
    showToast(`${item.emoji} ${item.name} 完成！+$${item.price}`, 1500);

    saveState();
    refreshGameUI();
    checkBranchGoal();
  }, cookTime);
}

function checkBranchGoal() {
  if (branchNotifyShown) return; // 已通知過，不重複彈出
  const branchCount = state.branches.length;
  const goalIdx     = Math.min(branchCount - 1, BRANCH_GOALS.length - 1);
  const goalAmount  = BRANCH_GOALS[goalIdx];
  const allCities   = Object.keys(CITIES).length;

  if (state.totalIncome >= goalAmount && branchCount < allCities) {
    branchNotifyShown = true;
    const overlay = document.createElement('div');
    overlay.className = 'branch-unlock';
    overlay.innerHTML = `
      <div class="branch-unlock-card">
        <span class="unlock-emoji">🏪</span>
        <div class="unlock-title">達成展店目標！</div>
        <div class="unlock-desc">恭喜！你的早餐店生意興隆！<br>現在可以在台灣地圖上選擇新的城市開立分店了！</div>
        <button class="unlock-btn" onclick="this.closest('.branch-unlock').remove(); showScreen('screen-map')">
          🗺️ 前往選擇地點
        </button>
      </div>
    `;
    document.body.appendChild(overlay);
  }
}

// ===== CUSTOMER LOOP =====
function startCustomerLoop() {
  if (customerLoopStarted) return;
  customerLoopStarted = true;
  setInterval(updateCustomerQueue, 2000);
}

function updateCustomerQueue() {
  const queue = document.getElementById('customer-queue');
  if (!queue) return;
  const base   = 2 + state.branches.length;
  const bonus  = Math.floor(base * (state.customerBonus || 0));
  const count  = Math.min(8, base + bonus);
  const actual = Math.floor(Math.random() * count) + 1;
  queue.innerHTML = '';
  for (let i = 0; i < actual; i++) {
    const span = document.createElement('span');
    span.className  = 'customer';
    span.textContent = CUSTOMER_EMOJIS[Math.floor(Math.random() * CUSTOMER_EMOJIS.length)];
    span.style.animationDelay = (i * 0.1) + 's';
    queue.appendChild(span);
  }
}

// ===== AUTO INCOME =====
function startAutoIncome() {
  if (autoIncomeStarted) return;
  autoIncomeStarted = true;
  setInterval(() => {
    if (state.branches.length <= 1) return;
    let passive = 0;
    state.branches.slice(1).forEach(cityId => {
      const city = CITIES[cityId];
      if (city) passive += Math.floor(city.dailyIncome / 120); // every 30s → /120
    });
    if (passive > 0) {
      state.money       += passive;
      state.totalIncome += passive;
      saveState();
      refreshGameUI();
    }
  }, 30000); // every 30 seconds (more noticeable)
}

// ===== UPGRADES =====
function buildUpgradeList() {
  const list = document.getElementById('upgrade-list');
  if (!list) return;
  list.innerHTML = '';
  UPGRADES.forEach(upg => {
    const owned = state.purchasedUpgrades.includes(upg.id);
    const div   = document.createElement('div');
    div.className = 'upgrade-item';
    div.innerHTML = `
      <div class="upgrade-icon">${upg.icon}</div>
      <div class="upgrade-info">
        <div class="upgrade-name">${upg.name}${owned ? ' ✅' : ''}</div>
        <div class="upgrade-desc">${upg.desc}</div>
        <div class="upgrade-cost">${owned ? '已購買' : '$' + upg.cost.toLocaleString()}</div>
      </div>
      <button class="btn-upgrade" ${owned ? 'disabled' : ''} onclick="buyUpgrade('${upg.id}')">
        ${owned ? '擁有' : '購買'}
      </button>
    `;
    list.appendChild(div);
  });
}

function buyUpgrade(id) {
  if (state.purchasedUpgrades.includes(id)) { showToast('⚠️ 已購買此升級'); return; }
  const upg = UPGRADES.find(u => u.id === id);
  if (!upg) return;
  if (state.money < upg.cost) { showToast('💸 金錢不足！繼續努力賺錢！'); return; }

  state.money -= upg.cost;
  state.purchasedUpgrades.push(id);

  if (upg.effect === 'speed')    state.speedBonus    = Math.min(0.8, (state.speedBonus    || 0) + upg.value);
  if (upg.effect === 'customer') state.customerBonus = (state.customerBonus || 0) + upg.value;
  if (upg.effect === 'rating')   state.rating        = Math.min(5.0, state.rating + upg.value);

  saveState();
  buildUpgradeList();
  refreshGameUI();
  showToast(`✅ 已購買「${upg.name}」！`);
  showCookAnim(upg.icon);
}

// ===== PANEL SWITCH =====
function switchPanel(panel) {
  document.querySelectorAll('.panel-tab').forEach(t => t.classList.remove('active'));
  document.querySelectorAll('.panel-content').forEach(c => c.classList.remove('active'));
  const tab = document.querySelector(`.panel-tab[onclick="switchPanel('${panel}')"]`);
  if (tab) tab.classList.add('active');
  const content = document.getElementById('panel-' + panel);
  if (content) content.classList.add('active');
}

// ===== MAP =====
let selectedCityId = null;

function refreshMapUI() {
  setText('map-money', state.money.toLocaleString());
  Object.keys(CITIES).forEach(cityId => {
    const circle = document.getElementById('city-' + cityId);
    if (!circle) return;
    const owned = state.branches.includes(cityId);
    circle.setAttribute('fill', owned ? '#f59e0b' : '#6b7280');
    circle.classList.toggle('locked', !owned);
  });
}

function selectCity(cityId) {
  selectedCityId = cityId;
  const city        = CITIES[cityId];
  if (!city) return;
  const owned       = state.branches.includes(cityId);
  const branchCount = state.branches.length;
  const goalIdx     = Math.min(branchCount - 1, BRANCH_GOALS.length - 1);
  const goalAmount  = BRANCH_GOALS[goalIdx];
  const canExpand   = state.totalIncome >= goalAmount;

  setText('popup-city-name', city.name);
  setText('popup-city-desc', city.desc);
  setText('popup-cost',      '$' + city.cost.toLocaleString());
  setText('popup-income',    '$' + city.dailyIncome.toLocaleString() + '/日');

  const statusEl = document.getElementById('popup-status');
  const btnEl    = document.getElementById('popup-btn');
  if (!statusEl || !btnEl) return;

  if (owned) {
    statusEl.textContent = '✅ 已在此城市開店';
    statusEl.style.cssText = 'background:rgba(16,185,129,.2);color:#34d399;border-color:rgba(16,185,129,.3)';
    btnEl.disabled    = true;
    btnEl.textContent = '已開店';
  } else if (!canExpand) {
    statusEl.textContent = `🔒 需累積 $${goalAmount.toLocaleString()} 才可展店`;
    statusEl.style.cssText = 'background:rgba(107,114,128,.2);color:#9ca3af;border-color:rgba(107,114,128,.3)';
    btnEl.disabled    = true;
    btnEl.textContent = '尚未解鎖';
  } else if (state.money < city.cost) {
    statusEl.textContent = `💸 資金不足（需 $${city.cost.toLocaleString()}）`;
    statusEl.style.cssText = 'background:rgba(239,68,68,.2);color:#f87171;border-color:rgba(239,68,68,.3)';
    btnEl.disabled    = true;
    btnEl.textContent = '金錢不足';
  } else {
    statusEl.textContent = '✨ 可以在此開立分店！';
    statusEl.style.cssText = 'background:rgba(245,158,11,.2);color:#fbbf24;border-color:rgba(245,158,11,.3)';
    btnEl.disabled    = false;
    btnEl.textContent = `開立分店 ($${city.cost.toLocaleString()})`;
  }

  const popup = document.getElementById('city-popup');
  if (popup) popup.style.display = 'block';
}

function hideCityPopup() {
  const popup = document.getElementById('city-popup');
  if (popup) popup.style.display = 'none';
  selectedCityId = null;
}

function openBranch() {
  if (!selectedCityId) return;
  const city = CITIES[selectedCityId];
  if (!city) return;
  if (state.branches.includes(selectedCityId)) { showToast('⚠️ 已在此城市開店'); return; }
  if (state.money < city.cost) { showToast('💸 金錢不足！'); return; }

  state.money -= city.cost;
  state.branches.push(selectedCityId);
  branchNotifyShown = false; // reset so next goal can notify again

  saveState();
  refreshMapUI();
  hideCityPopup();

  const overlay = document.createElement('div');
  overlay.className = 'branch-unlock';
  overlay.innerHTML = `
    <div class="branch-unlock-card">
      <span class="unlock-emoji">🎊</span>
      <div class="unlock-title">${city.name} 分店開張！</div>
      <div class="unlock-desc">${city.desc}<br><br>恭喜在 <strong style="color:#fbbf24">${city.name}</strong> 成功開店！<br>每30秒被動收入：<strong style="color:#34d399">+$${Math.floor(city.dailyIncome/120)}</strong></div>
      <button class="unlock-btn" onclick="this.closest('.branch-unlock').remove()">🎉 太棒了！</button>
    </div>
  `;
  document.body.appendChild(overlay);
  showToast(`🏪 ${city.name} 分店開張！`);
  checkAchievements();
}

// ===== FRIENDS =====
function refreshFriendsUI() {
  setText('my-account-id', state.user ? state.user.id : '---');
  const list = document.getElementById('friends-list');
  if (!list) return;

  if (!state.friends || state.friends.length === 0) {
    list.innerHTML = '<div style="color:#6b7280;text-align:center;padding:20px;font-size:.9rem">還沒有好友，快分享你的 ID 給朋友吧！</div>';
    return;
  }
  list.innerHTML = '';
  state.friends.forEach(friend => {
    const div = document.createElement('div');
    div.className = 'friend-item';
    div.innerHTML = `
      <div class="friend-avatar">${friend.char === 'girl' ? '👧' : '👦'}</div>
      <div class="friend-info">
        <div class="friend-name">${escapeHtml(friend.name)}</div>
        <div class="friend-detail">Lv.${friend.level} • ${friend.branches} 間分店</div>
      </div>
      <div class="friend-action" onclick="visitFriend('${friend.id}')">參觀 →</div>
    `;
    list.appendChild(div);
  });
}

// BUG FIX: XSS 防護
function escapeHtml(str) {
  return String(str).replace(/[&<>"']/g, m => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m]));
}

function copyId() {
  const id = state.user ? state.user.id : '';
  if (!id) return;
  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(id).then(() => {
      showToast('📋 ID 已複製！快分享給好友！');
    }).catch(() => {
      showToast('你的ID：' + id, 4000);
    });
  } else {
    showToast('你的ID：' + id, 4000);
  }
}

function addFriend() {
  const input = document.getElementById('friend-id-input');
  if (!input) return;
  const friendId = input.value.trim().toUpperCase();

  if (!friendId)                                     { showToast('⚠️ 請輸入好友 ID'); return; }
  if (!state.user)                                   { showToast('⚠️ 請先登入'); return; }
  if (friendId === state.user.id)                    { showToast('⚠️ 不能加自己當好友'); return; }
  if (state.friends && state.friends.find(f => f.id === friendId)) { showToast('⚠️ 已經是好友了'); return; }

  let users = {};
  try { users = JSON.parse(localStorage.getItem('bk_users') || '{}'); } catch(e) {}
  const friendUser = users[friendId];
  if (!friendUser) { showToast('⚠️ 找不到此 ID，請確認是否正確'); return; }

  let friendSave = null;
  try {
    const raw = localStorage.getItem('bk_save_' + friendId);
    if (raw) friendSave = JSON.parse(raw);
  } catch(e) {}

  const friend = {
    id:         friendId,
    name:       (friendSave && friendSave.charName)                        || friendUser.name || '未知玩家',
    char:       (friendSave && friendSave.char)                            || 'boy',
    level:      (friendSave ? getTitle(friendSave.totalIncome || 0).level : 1),
    branches:   (friendSave && Array.isArray(friendSave.branches) ? friendSave.branches.length : 1),
    rating:     (friendSave && friendSave.rating)                          || 4.0,
    shopName:   (friendSave && friendSave.shopName)                        || '早餐店',
    totalIncome:(friendSave && friendSave.totalIncome)                     || 0,
  };

  if (!Array.isArray(state.friends)) state.friends = [];
  state.friends.push(friend);
  input.value = '';
  saveState();
  refreshFriendsUI();
  showToast(`✅ 已加入 ${friend.name} 為好友！`);
  checkAchievements();
}

function visitFriend(friendId) {
  if (!state.friends) return;
  const friend = state.friends.find(f => f.id === friendId);
  if (!friend) return;

  setText('visit-title',     '參觀 ' + friend.name + ' 的店');
  setText('friend-shop-sign', friend.shopName || (friend.name + '的早餐店'));
  setText('friend-char',     friend.char === 'girl' ? '👧' : '👦');
  const lines = ['歡迎光臨！請多關照！','今天的早餐超好吃的！','謝謝你來！再來玩啊！','我要在全台灣開分店！'];
  setText('friend-speech',   lines[Math.floor(Math.random() * lines.length)]);
  setText('fstat-branches',  friend.branches);
  setText('fstat-level',     friend.level);
  setText('fstat-rating',    (Number(friend.rating) || 4.0).toFixed(1));

  showScreen('screen-visit');
}

function giveReview() {
  state.money       += 50;
  state.totalIncome += 50;
  saveState();
  showToast('⭐ 給好評成功！獲得 $50 獎勵！');
  showCookAnim('⭐');
}

function buyItem() {
  if (state.money < 30) { showToast('💸 金錢不足！需要 $30'); return; }
  state.money -= 30;
  saveState();
  showToast('🥪 你買了一份早餐！美味！');
  showCookAnim('🥪');
}

function sendGift() {
  if (state.money < 100) { showToast('💸 金錢不足！需要 $100'); return; }
  state.money -= 100;
  saveState();
  showToast('🎁 禮物已送出！');
  showCookAnim('🎁');
}

// ===== PROFILE =====
function refreshProfileUI() {
  if (!state.char) return;
  const avatar    = (state.char === 'boy') ? '👦' : '👧';
  const titleData = getTitle(state.totalIncome);
  setText('profile-avatar', avatar);
  setText('profile-name',   state.charName);
  setText('profile-title',  `Lv.${titleData.level} ${titleData.title}`);
  setText('pstat-money',    '$' + state.money.toLocaleString());
  setText('pstat-branches', state.branches.length);
  setText('pstat-level',    titleData.level);
  setText('pstat-cooked',   state.totalCooked);
  buildAchievementList();
}

function buildAchievementList() {
  const list = document.getElementById('achievement-list');
  if (!list) return;
  list.innerHTML = '';
  ACHIEVEMENTS.forEach(ach => {
    const unlocked = Array.isArray(state.achievements) && state.achievements.includes(ach.id);
    const div = document.createElement('div');
    div.className = 'achievement' + (unlocked ? ' unlocked' : '');
    div.innerHTML = `
      <div class="ach-icon">${unlocked ? ach.icon : '🔒'}</div>
      <div class="ach-name">${unlocked ? ach.name : '???'}</div>
      <div class="ach-desc">${unlocked ? ach.desc : '繼續努力...'}</div>
    `;
    list.appendChild(div);
  });
}

function checkAchievements() {
  if (!Array.isArray(state.achievements)) state.achievements = [];
  ACHIEVEMENTS.forEach(ach => {
    if (!state.achievements.includes(ach.id) && ach.condition(state)) {
      state.achievements.push(ach.id);
      setTimeout(() => showToast(`🏆 成就解鎖：${ach.icon} ${ach.name}！`, 3000), 300);
    }
  });
}

// ===== DAILY RESET =====
function checkDailyReset() {
  if (!state.user) return;
  const key     = 'bk_lastdate_' + state.user.id;
  const today   = new Date().toDateString();
  const lastDay = localStorage.getItem(key);
  if (lastDay !== today) {
    state.dailyOrders = 0;
    state.dailyIncome = 0;
    localStorage.setItem(key, today);
    saveState();
  }
}

// ===== INIT =====
window.addEventListener('load', () => {
  let lastUser = null;
  try { lastUser = JSON.parse(localStorage.getItem('bk_lastuser')); } catch(e) {}

  if (lastUser && lastUser.id) {
    state.user = lastUser;
    if (loadState(lastUser.id) && state.char) {
      checkDailyReset();
      startGame();
      return;
    }
  }
  showScreen('screen-login');
});
