/* ========================================
   早安小老闆 - 台灣早餐連鎖夢
   Game Logic v1.0
======================================== */

// ===== GAME DATA =====
const MENU_ITEMS = [
  { id:'egg',    emoji:'🍳', name:'煎蛋',   price:25,  time:3,  xp:5  },
  { id:'toast',  emoji:'🍞', name:'吐司',   price:30,  time:4,  xp:6  },
  { id:'bacon',  emoji:'🥓', name:'培根',   price:35,  time:5,  xp:8  },
  { id:'coffee', emoji:'☕', name:'咖啡',   price:40,  time:3,  xp:7  },
  { id:'sandwich',emoji:'🥪',name:'三明治', price:55,  time:8,  xp:12 },
  { id:'pancake',emoji:'🥞', name:'鬆餅',   price:65,  time:10, xp:15 },
  { id:'rice',   emoji:'🍱', name:'飯糰',   price:30,  time:4,  xp:7  },
  { id:'waffle', emoji:'🧇', name:'鬆餅格',  price:70,  time:12, xp:18 },
  { id:'soy',    emoji:'🥛', name:'豆漿',   price:20,  time:2,  xp:4  },
  { id:'noodle', emoji:'🍜', name:'湯麵',   price:60,  time:9,  xp:14 },
  { id:'dumpling',emoji:'🥟',name:'水餃',   price:45,  time:7,  xp:10 },
  { id:'muffin', emoji:'🧁', name:'鬆糕',   price:50,  time:8,  xp:11 },
];

const UPGRADES = [
  { id:'stove2',  name:'升級瓦斯爐',    desc:'烹飪速度 +30%',  cost:500,  icon:'🔥', effect:'speed',  value:0.3,  level:1 },
  { id:'sign',    name:'霓虹招牌',      desc:'客流量 +20%',   cost:800,  icon:'✨', effect:'customer', value:0.2, level:1 },
  { id:'uniform', name:'可愛制服',      desc:'評分 +0.5',     cost:600,  icon:'👘', effect:'rating',  value:0.5,  level:1 },
  { id:'menu2',   name:'擴充菜單',      desc:'解鎖更多品項',  cost:1200, icon:'📋', effect:'menu',   value:1,    level:1 },
  { id:'fridge',  name:'大型冰箱',      desc:'食材成本 -15%',  cost:1500, icon:'🧊', effect:'cost',   value:0.15, level:1 },
  { id:'speaker', name:'音響設備',      desc:'顧客滿意度 +25%',cost:900,  icon:'🎵', effect:'sat',    value:0.25, level:1 },
];

const CITIES = {
  taipei:    { name:'台北',  desc:'首都繁華商圈，早餐需求超高！',       cost:5000,  dailyIncome:1200, x:205, y:90  },
  newtaipei: { name:'新北',  desc:'雙北交通便利，上班族人潮滾滾',       cost:8000,  dailyIncome:1000, x:195, y:115 },
  taoyuan:   { name:'桃園',  desc:'國際機場附近，觀光客絡繹不絕',       cost:10000, dailyIncome:900,  x:175, y:135 },
  hsinchu:   { name:'新竹',  desc:'科技園區員工多，早餐消費力強',       cost:12000, dailyIncome:950,  x:162, y:165 },
  taichung:  { name:'台中',  desc:'台灣心臟地帶，美食競爭最激烈',       cost:18000, dailyIncome:1100, x:168, y:255 },
  tainan:    { name:'台南',  desc:'古都美食天堂，在地口味要到位',       cost:22000, dailyIncome:1000, x:172, y:360 },
  kaohsiung: { name:'高雄',  desc:'南台灣最大城市，夜市文化濃厚',       cost:25000, dailyIncome:1050, x:185, y:405 },
  hualien:   { name:'花蓮',  desc:'東部後花園，觀光客全年不斷',        cost:15000, dailyIncome:800,  x:255, y:240 },
};

const TITLES = [
  { level:1,  title:'初學廚師',  min:0 },
  { level:2,  title:'小廚師',    min:500 },
  { level:3,  title:'實習老闆',  min:1500 },
  { level:4,  title:'小老闆',    min:3000 },
  { level:5,  title:'連鎖新手',  min:6000 },
  { level:6,  title:'展店達人',  min:12000 },
  { level:7,  title:'地區霸主',  min:25000 },
  { level:8,  title:'全台知名',  min:50000 },
  { level:9,  title:'早餐大王',  min:100000 },
  { level:10, title:'早餐帝國',  min:200000 },
];

const ACHIEVEMENTS = [
  { id:'first_cook',  name:'初次下廚',  desc:'製作第一道料理',       icon:'🍳', condition: s => s.totalCooked >= 1 },
  { id:'earn_1k',     name:'小有積蓄',  desc:'累積賺到$1,000',       icon:'💰', condition: s => s.totalIncome >= 1000 },
  { id:'earn_10k',    name:'萬元富翁',  desc:'累積賺到$10,000',      icon:'💵', condition: s => s.totalIncome >= 10000 },
  { id:'earn_50k',    name:'五萬存款',  desc:'累積賺到$50,000',      icon:'🏦', condition: s => s.totalIncome >= 50000 },
  { id:'branch_2',    name:'二店開張',  desc:'開立第2間分店',        icon:'🏪', condition: s => s.branches.length >= 2 },
  { id:'branch_5',    name:'連鎖品牌',  desc:'開立第5間分店',        icon:'🔗', condition: s => s.branches.length >= 5 },
  { id:'friend_1',    name:'廣結善緣',  desc:'加入第一個好友',       icon:'👫', condition: s => s.friends.length >= 1 },
  { id:'cook_100',    name:'百道料理',  desc:'製作100道料理',        icon:'🏆', condition: s => s.totalCooked >= 100 },
  { id:'all_taiwan',  name:'台灣連鎖夢',desc:'在全台開立分店',       icon:'🇹🇼', condition: s => s.branches.length >= 8 },
];

const BRANCH_GOALS = [0, 50000, 100000, 180000, 300000, 500000, 750000, 1000000];
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

// ===== UTILS =====
function genId() {
  return Math.random().toString(36).substr(2,8).toUpperCase();
}
function saveState() {
  if (!state.user) return;
  const key = 'bk_save_' + state.user.id;
  localStorage.setItem(key, JSON.stringify(state));
}
function loadState(userId) {
  const key = 'bk_save_' + userId;
  const saved = localStorage.getItem(key);
  if (saved) {
    try {
      const s = JSON.parse(saved);
      Object.assign(state, s);
      return true;
    } catch(e) {}
  }
  return false;
}
function showToast(msg, duration=2000) {
  const t = document.getElementById('toast');
  t.textContent = msg;
  t.classList.add('show');
  setTimeout(() => t.classList.remove('show'), duration);
}
function showCookAnim(emoji) {
  const el = document.getElementById('cook-anim');
  el.textContent = emoji;
  el.style.display = 'block';
  el.style.animation = 'none';
  void el.offsetWidth;
  el.style.animation = 'cookPop .6s ease forwards';
  setTimeout(() => el.style.display = 'none', 600);
}
function showScreen(id) {
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
  const sc = document.getElementById(id);
  if (sc) sc.classList.add('active');
  if (id === 'screen-game') refreshGameUI();
  if (id === 'screen-map') refreshMapUI();
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
  document.querySelector(`.tab-btn[onclick="switchTab('${tab}')"]`).classList.add('active');
  document.getElementById('tab-' + tab).classList.add('active');
}

function doLogin() {
  const email = document.getElementById('login-email').value || 'demo@demo.com';
  const pass = document.getElementById('login-password').value || 'demo';
  
  // Check existing users
  let users = JSON.parse(localStorage.getItem('bk_users') || '{}');
  let user = Object.values(users).find(u => u.email === email);
  
  if (!user) {
    // Auto-create demo account
    user = { id: genId(), email, name: email.split('@')[0] };
    users[user.id] = user;
    localStorage.setItem('bk_users', JSON.stringify(users));
  }
  
  state.user = user;
  const hasData = loadState(user.id);
  
  if (!hasData || !state.char) {
    showScreen('screen-char');
  } else {
    startGame();
  }
}

function doRegister() {
  const name = document.getElementById('reg-name').value;
  const email = document.getElementById('reg-email').value;
  const pass = document.getElementById('reg-password').value;
  
  if (!name || !email || !pass) { showToast('⚠️ 請填寫所有欄位'); return; }
  if (pass.length < 6) { showToast('⚠️ 密碼至少需要6個字元'); return; }
  
  let users = JSON.parse(localStorage.getItem('bk_users') || '{}');
  if (Object.values(users).find(u => u.email === email)) {
    showToast('⚠️ 此信箱已被使用');
    return;
  }
  
  const user = { id: genId(), email, name };
  users[user.id] = user;
  localStorage.setItem('bk_users', JSON.stringify(users));
  
  state.user = user;
  showToast('✅ 帳號創建成功！');
  showScreen('screen-char');
}

function doFacebookLogin() {
  // Simulated Facebook login
  const fbUser = {
    id: 'FB' + genId(),
    email: 'facebook_user@fb.com',
    name: 'Facebook 用戶'
  };
  let users = JSON.parse(localStorage.getItem('bk_users') || '{}');
  if (!users[fbUser.id]) {
    users[fbUser.id] = fbUser;
    localStorage.setItem('bk_users', JSON.stringify(users));
  }
  state.user = fbUser;
  const hasData = loadState(fbUser.id);
  if (!hasData || !state.char) {
    showScreen('screen-char');
  } else {
    startGame();
  }
  showToast('✅ Facebook 登入成功！（模擬）');
}

function doLogout() {
  saveState();
  state = {
    user:null, char:null, charName:'', money:500, totalIncome:0,
    totalCooked:0, dailyOrders:0, dailyIncome:0, level:1, xp:0, rating:4.0,
    branches:['taipei'], purchasedUpgrades:[], friends:[], speedBonus:0,
    customerBonus:0, achievements:[], shopName:'', selectedCity:null
  };
  showToast('👋 已登出');
  showScreen('screen-login');
}

// ===== CHARACTER SELECT =====
let selectedChar = null;
function selectChar(type) {
  selectedChar = type;
  document.querySelectorAll('.char-card').forEach(c => c.classList.remove('selected'));
  document.getElementById('char-' + type).classList.add('selected');
  document.getElementById('char-name-section').style.display = 'block';
  document.getElementById('char-name').value = type === 'boy' ? '小明' : '小美';
}
function confirmChar() {
  if (!selectedChar) { showToast('⚠️ 請先選擇角色'); return; }
  const name = document.getElementById('char-name').value || (selectedChar === 'boy' ? '小明' : '小美');
  state.char = selectedChar;
  state.charName = name;
  state.shopName = name + '的早餐店';
  state.money = 500;
  state.totalIncome = 0;
  state.branches = ['taipei'];
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
  setTimeout(() => showToast('🎉 歡迎來到' + state.shopName + '！'), 500);
}

// ===== GAME UI =====
function refreshGameUI() {
  if (!state.char) return;
  const avatar = state.char === 'boy' ? '👦' : '👧';
  document.getElementById('hud-avatar').textContent = avatar;
  document.getElementById('hud-name').textContent = state.charName;
  const titleData = getTitle(state.totalIncome);
  document.getElementById('hud-level').textContent = titleData.level;
  document.getElementById('hud-money').textContent = state.money.toLocaleString();
  document.getElementById('shop-sign-name').textContent = state.shopName;
  document.getElementById('daily-orders').textContent = state.dailyOrders;
  document.getElementById('daily-income').textContent = '$' + state.dailyIncome.toLocaleString();
  
  // Goal progress
  const branchCount = state.branches.length;
  const goalAmount = BRANCH_GOALS[Math.min(branchCount, BRANCH_GOALS.length - 1)];
  const progress = Math.min(100, (state.totalIncome / goalAmount) * 100);
  document.getElementById('goal-bar').style.width = progress + '%';
  document.getElementById('next-goal-amount').textContent = '$' + goalAmount.toLocaleString();
  document.getElementById('big-progress-fill').style.width = progress + '%';
  document.getElementById('big-progress-text').textContent = Math.floor(progress) + '%';
  
  // Stats
  document.getElementById('stat-branches').textContent = state.branches.length;
  document.getElementById('stat-total-sold').textContent = state.totalCooked;
  document.getElementById('stat-total-income').textContent = '$' + state.totalIncome.toLocaleString();
  document.getElementById('stat-rating').textContent = state.rating.toFixed(1);
  
  // Branch button
  const canOpenBranch = state.totalIncome >= goalAmount && branchCount < Object.keys(CITIES).length;
  document.getElementById('btn-open-branch').disabled = !canOpenBranch;
  
  checkAchievements();
}

// ===== MENU =====
function buildMenuGrid() {
  const grid = document.getElementById('menu-grid');
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
    div.onclick = () => cookItem(item);
    grid.appendChild(div);
  });
}

function cookItem(item) {
  const el = document.getElementById('menu-' + item.id);
  if (el.classList.contains('cooking')) return;
  
  el.classList.add('cooking');
  
  // Add to cooking display
  const cookingItems = document.getElementById('cooking-items');
  const cookEl = document.createElement('span');
  cookEl.textContent = item.emoji;
  cookEl.style.animation = 'bounce .3s ease infinite alternate';
  cookingItems.appendChild(cookEl);
  
  const speed = 1 - (state.speedBonus || 0);
  const cookTime = item.time * 1000 * speed;
  
  setTimeout(() => {
    // Earn money
    const earned = item.price;
    state.money += earned;
    state.totalIncome += earned;
    state.dailyIncome += earned;
    state.dailyOrders++;
    state.totalCooked++;
    state.xp += item.xp;
    
    // Update level
    const newTitle = getTitle(state.totalIncome);
    if (newTitle.level > state.level) {
      state.level = newTitle.level;
      showLevelUp(newTitle);
    }
    
    // Remove from cooking display
    cookingItems.removeChild(cookEl);
    el.classList.remove('cooking');
    
    showCookAnim(item.emoji);
    showToast(`${item.emoji} ${item.name} 完成！+$${earned}`, 1500);
    
    saveState();
    refreshGameUI();
    checkBranchGoal();
  }, cookTime);
}

function showLevelUp(titleData) {
  showToast(`🎊 升級！你現在是「${titleData.title}」Lv.${titleData.level}！`, 3000);
}

function checkBranchGoal() {
  const branchCount = state.branches.length;
  const goalAmount = BRANCH_GOALS[Math.min(branchCount, BRANCH_GOALS.length - 1)];
  if (state.totalIncome >= goalAmount && branchCount < Object.keys(CITIES).length) {
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
  setInterval(() => {
    updateCustomerQueue();
  }, 2000);
}

function updateCustomerQueue() {
  const queue = document.getElementById('customer-queue');
  const baseCustomers = 3 + state.branches.length;
  const bonus = Math.floor(baseCustomers * (state.customerBonus || 0));
  const count = Math.min(8, baseCustomers + bonus);
  const actual = Math.floor(Math.random() * count) + 1;
  
  queue.innerHTML = '';
  for (let i = 0; i < actual; i++) {
    const span = document.createElement('span');
    span.className = 'customer';
    span.textContent = CUSTOMER_EMOJIS[Math.floor(Math.random() * CUSTOMER_EMOJIS.length)];
    span.style.animationDelay = (i * 0.1) + 's';
    queue.appendChild(span);
  }
}

// ===== AUTO INCOME (branch income) =====
function startAutoIncome() {
  setInterval(() => {
    if (state.branches.length > 1) {
      // Extra branches generate passive income
      const extraBranches = state.branches.slice(1);
      let passiveEarned = 0;
      extraBranches.forEach(cityId => {
        const city = CITIES[cityId];
        if (city) {
          const income = Math.floor(city.dailyIncome / 60); // per minute
          passiveEarned += income;
        }
      });
      if (passiveEarned > 0) {
        state.money += passiveEarned;
        state.totalIncome += passiveEarned;
        saveState();
        refreshGameUI();
      }
    }
  }, 60000); // every minute
}

// ===== UPGRADES =====
function buildUpgradeList() {
  const list = document.getElementById('upgrade-list');
  list.innerHTML = '';
  UPGRADES.forEach(upg => {
    const owned = state.purchasedUpgrades.includes(upg.id);
    const div = document.createElement('div');
    div.className = 'upgrade-item';
    div.innerHTML = `
      <div class="upgrade-icon">${upg.icon}</div>
      <div class="upgrade-info">
        <div class="upgrade-name">${upg.name} ${owned ? '✅' : ''}</div>
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
  const upg = UPGRADES.find(u => u.id === id);
  if (!upg) return;
  if (state.purchasedUpgrades.includes(id)) { showToast('⚠️ 已購買此升級'); return; }
  if (state.money < upg.cost) { showToast('💸 金錢不足！繼續努力賺錢！'); return; }
  
  state.money -= upg.cost;
  state.purchasedUpgrades.push(id);
  
  // Apply effect
  if (upg.effect === 'speed') state.speedBonus = (state.speedBonus || 0) + upg.value;
  if (upg.effect === 'customer') state.customerBonus = (state.customerBonus || 0) + upg.value;
  if (upg.effect === 'rating') state.rating = Math.min(5.0, state.rating + upg.value);
  
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
  document.querySelector(`.panel-tab[onclick="switchPanel('${panel}')"]`).classList.add('active');
  document.getElementById('panel-' + panel).classList.add('active');
}

// ===== MAP =====
let selectedCityId = null;

function refreshMapUI() {
  document.getElementById('map-money').textContent = state.money.toLocaleString();
  
  // Update city markers
  Object.keys(CITIES).forEach(cityId => {
    const circle = document.getElementById('city-' + cityId);
    if (!circle) return;
    const owned = state.branches.includes(cityId);
    if (owned) {
      circle.setAttribute('fill', '#f59e0b');
      circle.classList.remove('locked');
    } else {
      circle.setAttribute('fill', '#6b7280');
      circle.classList.add('locked');
    }
  });
}

function selectCity(cityId) {
  selectedCityId = cityId;
  const city = CITIES[cityId];
  const owned = state.branches.includes(cityId);
  const branchCount = state.branches.length;
  const goalAmount = BRANCH_GOALS[Math.min(branchCount, BRANCH_GOALS.length - 1)];
  const canExpand = state.totalIncome >= goalAmount;
  
  document.getElementById('popup-city-name').textContent = city.name;
  document.getElementById('popup-city-desc').textContent = city.desc;
  document.getElementById('popup-cost').textContent = '$' + city.cost.toLocaleString();
  document.getElementById('popup-income').textContent = '$' + city.dailyIncome.toLocaleString() + '/日';
  
  const statusEl = document.getElementById('popup-status');
  const btnEl = document.getElementById('popup-btn');
  
  if (owned) {
    statusEl.textContent = '✅ 已在此城市開店';
    statusEl.style.background = 'rgba(16,185,129,.2)';
    statusEl.style.color = '#34d399';
    btnEl.disabled = true;
    btnEl.textContent = '已開店';
  } else if (!canExpand) {
    statusEl.textContent = `🔒 需累積 $${goalAmount.toLocaleString()} 才可展店`;
    statusEl.style.background = 'rgba(107,114,128,.2)';
    statusEl.style.color = '#9ca3af';
    btnEl.disabled = true;
    btnEl.textContent = '尚未解鎖';
  } else if (state.money < city.cost) {
    statusEl.textContent = `💸 資金不足（需 $${city.cost.toLocaleString()}）`;
    statusEl.style.background = 'rgba(239,68,68,.2)';
    statusEl.style.color = '#f87171';
    btnEl.disabled = true;
    btnEl.textContent = '金錢不足';
  } else {
    statusEl.textContent = '✨ 可以在此開立分店！';
    statusEl.style.background = 'rgba(245,158,11,.2)';
    statusEl.style.color = '#fbbf24';
    btnEl.disabled = false;
    btnEl.textContent = `開立分店 ($${city.cost.toLocaleString()})`;
  }
  
  document.getElementById('city-popup').style.display = 'block';
}

function hideCityPopup() {
  document.getElementById('city-popup').style.display = 'none';
  selectedCityId = null;
}

function openBranch() {
  if (!selectedCityId) return;
  const city = CITIES[selectedCityId];
  if (!city) return;
  
  if (state.money < city.cost) { showToast('💸 金錢不足！'); return; }
  if (state.branches.includes(selectedCityId)) { showToast('⚠️ 已在此城市開店'); return; }
  
  state.money -= city.cost;
  state.branches.push(selectedCityId);
  
  saveState();
  refreshMapUI();
  hideCityPopup();
  
  // Celebration
  const overlay = document.createElement('div');
  overlay.className = 'branch-unlock';
  overlay.innerHTML = `
    <div class="branch-unlock-card">
      <span class="unlock-emoji">🎊</span>
      <div class="unlock-title">${city.name} 分店開張！</div>
      <div class="unlock-desc">${city.desc}<br><br>恭喜你在<strong style="color:#fbbf24">${city.name}</strong>成功開立分店！<br>預計每日收入：<strong style="color:#34d399">$${city.dailyIncome.toLocaleString()}</strong></div>
      <button class="unlock-btn" onclick="this.closest('.branch-unlock').remove()">
        🎉 太棒了！
      </button>
    </div>
  `;
  document.body.appendChild(overlay);
  showToast(`🏪 ${city.name}分店開張！`);
  checkAchievements();
}

// ===== FRIENDS =====
function refreshFriendsUI() {
  document.getElementById('my-account-id').textContent = state.user ? state.user.id : '---';
  
  const list = document.getElementById('friends-list');
  if (state.friends.length === 0) {
    list.innerHTML = '<div style="color:#6b7280;text-align:center;padding:20px">還沒有好友，快分享你的 ID 給朋友吧！</div>';
    return;
  }
  
  list.innerHTML = '';
  state.friends.forEach(friend => {
    const div = document.createElement('div');
    div.className = 'friend-item';
    div.innerHTML = `
      <div class="friend-avatar">${friend.char === 'girl' ? '👧' : '👦'}</div>
      <div class="friend-info">
        <div class="friend-name">${friend.name}</div>
        <div class="friend-detail">Lv.${friend.level} • ${friend.branches} 間分店 • ID: ${friend.id}</div>
      </div>
      <div class="friend-action" onclick="visitFriend('${friend.id}')">參觀 →</div>
    `;
    list.appendChild(div);
  });
}

function copyId() {
  const id = state.user ? state.user.id : '';
  navigator.clipboard.writeText(id).then(() => {
    showToast('📋 ID 已複製！快分享給好友！');
  }).catch(() => {
    showToast('ID: ' + id);
  });
}

function addFriend() {
  const input = document.getElementById('friend-id-input');
  const friendId = input.value.trim().toUpperCase();
  
  if (!friendId) { showToast('⚠️ 請輸入好友 ID'); return; }
  if (friendId === state.user.id) { showToast('⚠️ 不能加自己當好友'); return; }
  if (state.friends.find(f => f.id === friendId)) { showToast('⚠️ 已經是好友了'); return; }
  
  // Check if user exists
  const users = JSON.parse(localStorage.getItem('bk_users') || '{}');
  const friendUser = users[friendId];
  
  if (!friendUser) {
    showToast('⚠️ 找不到此 ID 的玩家');
    return;
  }
  
  // Load friend save
  const friendSave = localStorage.getItem('bk_save_' + friendId);
  let friendState = null;
  if (friendSave) {
    try { friendState = JSON.parse(friendSave); } catch(e) {}
  }
  
  const friend = {
    id: friendId,
    name: (friendState && friendState.charName) || friendUser.name,
    char: (friendState && friendState.char) || 'boy',
    level: (friendState && getTitle(friendState.totalIncome || 0).level) || 1,
    branches: (friendState && friendState.branches && friendState.branches.length) || 1,
    rating: (friendState && friendState.rating) || 4.0,
    shopName: (friendState && friendState.shopName) || '早餐店',
    totalIncome: (friendState && friendState.totalIncome) || 0,
  };
  
  state.friends.push(friend);
  input.value = '';
  saveState();
  refreshFriendsUI();
  showToast(`✅ 已加入 ${friend.name} 為好友！`);
  checkAchievements();
}

function visitFriend(friendId) {
  const friend = state.friends.find(f => f.id === friendId);
  if (!friend) return;
  
  document.getElementById('visit-title').textContent = '參觀' + friend.name + '的店';
  document.getElementById('friend-shop-sign').textContent = friend.shopName || (friend.name + '的早餐店');
  document.getElementById('friend-char').textContent = friend.char === 'girl' ? '👧' : '👦';
  document.getElementById('friend-speech').textContent = ['歡迎光臨！請多關照！', '今天的早餐超好吃的！', '謝謝你來！再來玩啊！', '我要在全台灣開分店！'][Math.floor(Math.random()*4)];
  document.getElementById('fstat-branches').textContent = friend.branches;
  document.getElementById('fstat-level').textContent = friend.level;
  document.getElementById('fstat-rating').textContent = (friend.rating || 4.0).toFixed(1);
  
  showScreen('screen-visit');
}

function giveReview() {
  state.money += 50;
  state.totalIncome += 50;
  saveState();
  showToast('⭐ 給好評成功！獲得 $50 獎勵！');
  showCookAnim('⭐');
}

function buyItem() {
  if (state.money < 30) { showToast('💸 金錢不足！'); return; }
  state.money -= 30;
  saveState();
  showToast('🥪 你買了一份早餐！美味！');
  showCookAnim('🥪');
}

function sendGift() {
  if (state.money < 100) { showToast('💸 金錢不足！需要 $100'); return; }
  state.money -= 100;
  saveState();
  showToast('🎁 禮物已送出！對方將獲得驚喜！');
  showCookAnim('🎁');
}

// ===== PROFILE =====
function refreshProfileUI() {
  if (!state.char) return;
  const avatar = state.char === 'boy' ? '👦' : '👧';
  document.getElementById('profile-avatar').textContent = avatar;
  document.getElementById('profile-name').textContent = state.charName;
  const titleData = getTitle(state.totalIncome);
  document.getElementById('profile-title').textContent = `Lv.${titleData.level} ${titleData.title}`;
  document.getElementById('pstat-money').textContent = '$' + state.money.toLocaleString();
  document.getElementById('pstat-branches').textContent = state.branches.length;
  document.getElementById('pstat-level').textContent = titleData.level;
  document.getElementById('pstat-cooked').textContent = state.totalCooked;
  
  buildAchievementList();
}

function buildAchievementList() {
  const list = document.getElementById('achievement-list');
  list.innerHTML = '';
  ACHIEVEMENTS.forEach(ach => {
    const unlocked = state.achievements.includes(ach.id);
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
  ACHIEVEMENTS.forEach(ach => {
    if (!state.achievements.includes(ach.id) && ach.condition(state)) {
      state.achievements.push(ach.id);
      showToast(`🏆 成就解鎖：${ach.icon} ${ach.name}！`, 3000);
    }
  });
}

// ===== DAILY RESET =====
function checkDailyReset() {
  const lastDate = localStorage.getItem('bk_lastdate_' + (state.user ? state.user.id : ''));
  const today = new Date().toDateString();
  if (lastDate !== today) {
    state.dailyOrders = 0;
    state.dailyIncome = 0;
    localStorage.setItem('bk_lastdate_' + state.user.id, today);
    saveState();
  }
}

// ===== INIT =====
window.onload = function() {
  // Check if already logged in
  const lastUser = localStorage.getItem('bk_lastuser');
  if (lastUser) {
    try {
      const user = JSON.parse(lastUser);
      state.user = user;
      if (loadState(user.id) && state.char) {
        checkDailyReset();
        startGame();
        return;
      }
    } catch(e) {}
  }
  showScreen('screen-login');
};

// Save last user on login
const origDoLogin = doLogin;
window.doLogin = function() {
  origDoLogin();
  if (state.user) {
    localStorage.setItem('bk_lastuser', JSON.stringify(state.user));
  }
};
