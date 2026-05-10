/* ════════════════════════════════════════════
   早安小老闆 v2.0
   - 地圖選店面
   - 室內擺設
   - 30分鐘一天
   - 達日營收%開分店
   - 員工系統
   - 訂單系統 + 音效
════════════════════════════════════════════ */

// ══════════════ SOUND ENGINE ══════════════
let audioCtx = null, musicOn = true, bgmTimer = null, bgmBeat = 0;
function getCtx(){ if(!audioCtx) try{ audioCtx=new(window.AudioContext||window.webkitAudioContext)() }catch(e){} return audioCtx; }
function tone(f,type,dur,vol,delay=0){
  const ctx=getCtx(); if(!ctx) return;
  try{
    const o=ctx.createOscillator(), g=ctx.createGain();
    o.connect(g); g.connect(ctx.destination);
    o.type=type; o.frequency.setValueAtTime(f,ctx.currentTime+delay);
    g.gain.setValueAtTime(vol,ctx.currentTime+delay);
    g.gain.exponentialRampToValueAtTime(0.0001,ctx.currentTime+delay+dur);
    o.start(ctx.currentTime+delay); o.stop(ctx.currentTime+delay+dur+.05);
  }catch(e){}
}
function noise(dur,vol,hipass=2000){
  const ctx=getCtx(); if(!ctx) return;
  try{
    const buf=ctx.createBuffer(1,ctx.sampleRate*dur,ctx.sampleRate);
    const d=buf.getChannelData(0); for(let i=0;i<d.length;i++) d[i]=(Math.random()*2-1)*(1-i/d.length);
    const s=ctx.createBufferSource(),f=ctx.createBiquadFilter(),g=ctx.createGain();
    s.buffer=buf; f.type='highpass'; f.frequency.value=hipass;
    s.connect(f); f.connect(g); g.connect(ctx.destination);
    g.gain.setValueAtTime(vol,ctx.currentTime);
    g.gain.exponentialRampToValueAtTime(0.0001,ctx.currentTime+dur);
    s.start();
  }catch(e){}
}
const SFX={
  tap(){tone(600,'sine',.05,.08)},
  sizzle(){noise(.3,.22,2200)},
  complete(){tone(880,'sine',.08,.25);tone(1320,'sine',.2,.2,.07);tone(1760,'sine',.25,.18,.15)},
  coin(){tone(1200,'square',.05,.12);tone(1600,'square',.05,.1,.03);tone(2000,'sine',.08,.08,.06)},
  correct(){[523,659,784,1047].forEach((f,i)=>tone(f,'sine',.15,.18,i*.08))},
  wrong(){tone(220,'sawtooth',.2,.25);tone(196,'sawtooth',.2,.25,.1)},
  levelUp(){[523,587,659,698,784,880,988,1047].forEach((f,i)=>tone(f,'sine',.18,.22,i*.07))},
  doorbell(){tone(698,'sine',.12,.14);tone(880,'sine',.12,.14,.13)},
  timeout(){tone(440,'square',.08,.18);tone(330,'square',.08,.18,.1);tone(220,'square',.1,.25,.2)},
  branchOpen(){[523,659,784,659,784,1047,784,1047,1319].forEach((f,i)=>tone(f,'sine',.2,.28,i*.1))},
  place(){tone(800,'sine',.06,.12);tone(1000,'sine',.06,.1,.05)},
  hire(){[440,554,659].forEach((f,i)=>tone(f,'sine',.12,.2,i*.09))},
  fire(){tone(440,'sawtooth',.1,.2);tone(330,'sawtooth',.12,.18,.1)},
  dayEnd(){[1047,988,880,784].forEach((f,i)=>tone(f,'sine',.18,.2,i*.1))},
  dayStart(){[523,659,784,1047].forEach((f,i)=>tone(f,'sine',.15,.22,i*.08))},
};
const BGM_SCALE=[523,587,659,698,784,880,988,1047];
const BGM_BASS =[262,294,330,349,392,440,494,523];
const BGM_PROG =[[0,2,4],[3,5,0],[4,6,1],[2,4,6]];
function startBGM(){
  if(bgmTimer) return;
  bgmBeat=0;
  bgmTimer=setInterval(()=>{
    if(!musicOn) return;
    const s=bgmBeat%32, ci=Math.floor(s/8)%BGM_PROG.length;
    if(s%2===0) tone(BGM_BASS[BGM_PROG[ci][0]],'triangle',.28,.06);
    if([0,3,6,9,12,15,18,21,24,27].includes(s)){
      const ni=BGM_PROG[ci][Math.floor(Math.random()*BGM_PROG[ci].length)];
      tone(BGM_SCALE[ni],'sine',.22,.04);
    }
    noise(.05,.06,6500);
    bgmBeat++;
  },220);
}
function stopBGM(){ if(bgmTimer){clearInterval(bgmTimer);bgmTimer=null;} }
function toggleMusic(){
  musicOn=!musicOn;
  const b=document.getElementById('btn-music');
  if(musicOn){startBGM();if(b)b.textContent='🎵';showToast('🎵 音樂開啟');}
  else{stopBGM();if(b)b.textContent='🔇';showToast('🔇 音樂關閉');}
  SFX.tap();
}

// ══════════════ GAME DATA ══════════════
const CITIES={
  taipei:   {name:'台北',desc:'首都繁華商圈，人潮最多',traffic:'極高',avgPrice:45,badge:'🔥 熱門',passive:1200},
  newtaipei:{name:'新北',desc:'雙北通勤族，固定早餐客',traffic:'高',  avgPrice:38,badge:'👥 穩定',passive:1000},
  taoyuan:  {name:'桃園',desc:'航空城，多元族群',       traffic:'中高',avgPrice:40,badge:'✈️ 新興',passive:900},
  hsinchu:  {name:'新竹',desc:'科技人，消費力強',       traffic:'中',  avgPrice:50,badge:'💻 科技',passive:950},
  taichung: {name:'台中',desc:'宜居城市，慢活族多',     traffic:'高',  avgPrice:42,badge:'🌸 宜居',passive:1100},
  tainan:   {name:'台南',desc:'古都美食激戰區',         traffic:'中高',avgPrice:35,badge:'🏛️ 古都',passive:1000},
  kaohsiung:{name:'高雄',desc:'南部最大商圈',           traffic:'高',  avgPrice:40,badge:'🏙️ 南部',passive:1050},
  hualien:  {name:'花蓮',desc:'觀光勝地，旺季超強',     traffic:'中',  avgPrice:45,badge:'🏔️ 觀光',passive:800},
};
const CITY_SVG_POS={
  taipei:   {cx:205,cy:88}, newtaipei:{cx:192,cy:116}, taoyuan:{cx:172,cy:138},
  hsinchu:  {cx:160,cy:167},taichung: {cx:168,cy:256},  tainan: {cx:171,cy:362},
  kaohsiung:{cx:184,cy:406},hualien:  {cx:256,cy:242},
};
const CITY_LABELS={
  taipei:'台北', newtaipei:'新北', taoyuan:'桃園', hsinchu:'新竹',
  taichung:'台中', tainan:'台南', kaohsiung:'高雄', hualien:'花蓮'
};

// Shop items (for setup & purchase)
const FLOOR_ITEMS={
  // Free starter items
  cashier: {name:'收銀台',emoji:'💰',free:true, required:true, desc:'必要',       category:'essential'},
  stove:   {name:'瓦斯爐',emoji:'🍳',free:true, required:true, desc:'必要',       category:'essential'},
  table1:  {name:'餐桌',  emoji:'🪑',free:true, required:true, desc:'必要(需≥1)', category:'table',     max:6},
  counter: {name:'工作台',emoji:'🔪',free:true, required:false,desc:'建議放置',   category:'prep'},
  // Purchasable
  table2:  {name:'大桌',  emoji:'🍽️',free:false,cost:300, desc:'容量+2',category:'table',    max:4},
  fridge:  {name:'冰箱',  emoji:'🧊',free:false,cost:800, desc:'速度+15%',category:'equip'},
  display: {name:'展示架',emoji:'🧁',free:false,cost:500, desc:'平均客單+$5',category:'equip'},
  speaker: {name:'音響',  emoji:'🎵',free:false,cost:400, desc:'滿意度+10%',category:'equip'},
  microwave:{name:'微波爐',emoji:'📦',free:false,cost:600,desc:'料理選項+2', category:'equip'},
  sign:    {name:'招牌燈',emoji:'✨',free:false,cost:700, desc:'客流+15%',   category:'deco'},
  plant:   {name:'盆栽',  emoji:'🌿',free:false,cost:200, desc:'評分+0.2',   category:'deco'},
  tv:      {name:'電視',  emoji:'📺',free:false,cost:500, desc:'等待耐心+5秒',category:'deco'},
};
const FLOOR_COLS=6, FLOOR_ROWS=5;

// Menu
const MENU=[
  {id:'egg',    emoji:'🍳',name:'煎蛋',  price:25,time:3, xp:5 },
  {id:'toast',  emoji:'🍞',name:'吐司',  price:30,time:4, xp:6 },
  {id:'bacon',  emoji:'🥓',name:'培根',  price:35,time:5, xp:8 },
  {id:'coffee', emoji:'☕',name:'咖啡',  price:40,time:3, xp:7 },
  {id:'sandwich',emoji:'🥪',name:'三明治',price:55,time:8,xp:12},
  {id:'pancake',emoji:'🥞',name:'鬆餅',  price:65,time:10,xp:15},
  {id:'rice',   emoji:'🍱',name:'飯糰',  price:30,time:4, xp:7 },
  {id:'waffle', emoji:'🧇',name:'格子鬆餅',price:70,time:12,xp:18},
  {id:'soy',    emoji:'🥛',name:'豆漿',  price:20,time:2, xp:4 },
  {id:'noodle', emoji:'🍜',name:'湯麵',  price:60,time:9, xp:14},
  {id:'dumpling',emoji:'🥟',name:'水餃', price:45,time:7, xp:10},
  {id:'muffin', emoji:'🧁',name:'鬆糕',  price:50,time:8, xp:11},
];

// Staff catalog
const STAFF_CATALOG=[
  {id:'helper1', name:'工讀生小花', emoji:'👩‍🍳',skill:'basic',
   speed:0.05,  satisfaction:0.05, autoServe:false,
   salary:200,  desc:'速度+5% 滿意度+5%',     badge:'🟢 入門'},
  {id:'helper2', name:'廚師助理阿豪',emoji:'👨‍🍳',skill:'inter',
   speed:0.12,  satisfaction:0.08, autoServe:false,
   salary:450,  desc:'速度+12% 滿意度+8%',    badge:'🔵 中級'},
  {id:'server1', name:'外場服務生小玲',emoji:'🧑‍💼',skill:'server',
   speed:0,     satisfaction:0.2,  autoServe:true, autoInterval:15,
   salary:350,  desc:'自動服務 滿意度+20%',   badge:'🟡 服務'},
  {id:'chef1',   name:'正職廚師老陳',emoji:'👴',skill:'senior',
   speed:0.25,  satisfaction:0.1,  autoServe:false,
   salary:900,  desc:'速度+25% 滿意度+10%',   badge:'🔴 資深'},
  {id:'manager', name:'店長王姐',   emoji:'👩‍💼',skill:'manager',
   speed:0.1,   satisfaction:0.25, autoServe:true, autoInterval:10,
   salary:1500, desc:'全能加成 自動送餐超快', badge:'🟣 店長'},
];

// Branch expansion (conditions: % of day revenue target achieved N days)
const BRANCH_EXPAND=[
  {cityId:'newtaipei', name:'新北', cost:8000,  dayRevTarget:2000, daysNeeded:3, passive:1000},
  {cityId:'taoyuan',   name:'桃園', cost:10000, dayRevTarget:2500, daysNeeded:3, passive:900 },
  {cityId:'hsinchu',   name:'新竹', cost:12000, dayRevTarget:3000, daysNeeded:4, passive:950 },
  {cityId:'taichung',  name:'台中', cost:18000, dayRevTarget:4000, daysNeeded:5, passive:1100},
  {cityId:'tainan',    name:'台南', cost:22000, dayRevTarget:5000, daysNeeded:5, passive:1000},
  {cityId:'kaohsiung', name:'高雄', cost:25000, dayRevTarget:6000, daysNeeded:6, passive:1050},
  {cityId:'hualien',   name:'花蓮', cost:15000, dayRevTarget:3500, daysNeeded:4, passive:800 },
];
// How much % of target must be reached each day to unlock expansion
const BRANCH_PCT_THRESHOLD = 0.8; // 80%

const TITLES=[
  {level:1, title:'初學廚師',min:0},
  {level:2, title:'小廚師',  min:500},
  {level:3, title:'實習老闆',min:1500},
  {level:4, title:'小老闆',  min:3000},
  {level:5, title:'連鎖新手',min:6000},
  {level:6, title:'展店達人',min:12000},
  {level:7, title:'地區霸主',min:25000},
  {level:8, title:'全台知名',min:50000},
  {level:9, title:'早餐大王',min:100000},
  {level:10,title:'早餐帝國',min:200000},
];
const ACHIEVEMENTS=[
  {id:'first_cook', name:'初次下廚',  desc:'製作第一道料理', icon:'🍳',cond:s=>s.totalCooked>=1},
  {id:'earn_1k',    name:'小有積蓄',  desc:'累積$1,000',    icon:'💰',cond:s=>s.totalIncome>=1000},
  {id:'earn_10k',   name:'萬元富翁',  desc:'累積$10,000',   icon:'💵',cond:s=>s.totalIncome>=10000},
  {id:'earn_50k',   name:'五萬存款',  desc:'累積$50,000',   icon:'🏦',cond:s=>s.totalIncome>=50000},
  {id:'branch_2',   name:'二店開張',  desc:'開立第2間分店', icon:'🏪',cond:s=>s.branches.length>=2},
  {id:'branch_all', name:'台灣連鎖夢',desc:'開立全台分店',  icon:'🇹🇼',cond:s=>s.branches.length>=8},
  {id:'staff_1',    name:'初次聘人',  desc:'聘用第一位員工',icon:'👩‍🍳',cond:s=>s.hiredStaff.length>=1},
  {id:'staff_5',    name:'小團隊',    desc:'同時有5位員工',  icon:'👥',cond:s=>s.hiredStaff.length>=5},
  {id:'cook_100',   name:'百道料理',  desc:'製作100道',     icon:'🏆',cond:s=>s.totalCooked>=100},
  {id:'day_10',     name:'十日堅持',  desc:'撐過10天',      icon:'📅',cond:s=>s.dayCount>=10},
];

// ══════════════ STATE ══════════════
const DAY_DURATION_MS = 30 * 60 * 1000; // 30 minutes real = 1 game day
let state = {
  user:null, char:null, charName:'', money:500,
  totalIncome:0, totalCooked:0,
  level:1, xp:0, rating:4.0,
  branches:[], // [{cityId, shopName, layout, dayRevHistory:[]}]
  activeBranchIdx:0,
  hiredStaff:[], // [{staffId, assignedBranch}]
  achievements:[],
  combo:0, bestCombo:0,
  dayCount:1,
  dayRevenue:0,    // current day revenue
  dayGoal:1500,    // current day target
  daysMetGoal:0,   // consecutive/cumulative days meeting goal
  branchProgress:{}, // cityId -> daysMetGoal count
  purchasedItems:[], // floor item ids bought
};
// runtime
let pendingChar=null, pendingCityId=null, pendingLayout=null;
let activeOrders=[], orderIdCtr=0;
let dayTimerInterval=null, dayRemaining=0;
let autoServeIntervals=[];
let customerLoopStarted=false, autoIncomeStarted=false;
let toastTimer=null, selectedExpandCity=null;
let selectedCell=null;

// ══════════════ UTILS ══════════════
function genId(){ return Math.random().toString(36).substr(2,8).toUpperCase(); }
function saveState(){
  if(!state.user) return;
  try{ localStorage.setItem('bk_save_'+state.user.id, JSON.stringify(state)); }catch(e){}
}
function loadState(uid){
  try{
    const raw=localStorage.getItem('bk_save_'+uid);
    if(!raw) return false;
    const s=JSON.parse(raw);
    if(!Array.isArray(s.branches))     s.branches=[];
    if(!Array.isArray(s.hiredStaff))   s.hiredStaff=[];
    if(!Array.isArray(s.achievements)) s.achievements=[];
    if(!s.branchProgress) s.branchProgress={};
    Object.assign(state,s);
    return true;
  }catch(e){ return false; }
}
function setText(id,v){const e=document.getElementById(id);if(e)e.textContent=v;}
function setW(id,v){const e=document.getElementById(id);if(e)e.style.width=v;}
function esc(s){return String(s).replace(/[&<>"']/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m]));}
let _toastQ=[];
function showToast(msg,dur=2000){
  const t=document.getElementById('toast'); if(!t) return;
  if(toastTimer) clearTimeout(toastTimer);
  t.textContent=msg; t.classList.add('show');
  toastTimer=setTimeout(()=>{t.classList.remove('show');toastTimer=null;},dur);
}
function showCookAnim(emoji){
  const el=document.getElementById('cook-anim'); if(!el) return;
  el.textContent=emoji; el.style.display='block';
  el.style.animation='none'; void el.offsetWidth;
  el.style.animation='cookPop .6s ease forwards';
  setTimeout(()=>{el.style.display='none';},650);
}
function showCombo(n){
  const el=document.getElementById('combo-flash'); if(!el) return;
  el.textContent=`🔥 COMBO x${n}!`; el.style.display='block';
  el.style.animation='none'; void el.offsetWidth;
  el.style.animation='comboAnim .8s ease forwards';
  setTimeout(()=>{el.style.display='none';},900);
}
function showScreen(id){
  SFX.tap();
  document.querySelectorAll('.screen').forEach(s=>s.classList.remove('active'));
  const sc=document.getElementById(id); if(sc) sc.classList.add('active');
  if(id==='screen-game')       refreshGameUI();
  if(id==='screen-map-expand') refreshExpandMap();
  if(id==='screen-friends')    refreshFriendsUI();
  if(id==='screen-profile')    refreshProfileUI();
}
function getTitle(inc){ let t=TITLES[0]; for(const x of TITLES){ if(inc>=x.min) t=x; } return t; }
function getCurrentBranch(){ return state.branches[state.activeBranchIdx] || state.branches[0]; }

// ══════════════ AUTH ══════════════
function switchTab(tab){
  document.querySelectorAll('.tab-btn').forEach(b=>b.classList.remove('active'));
  document.querySelectorAll('.tab-content').forEach(c=>c.classList.remove('active'));
  document.querySelector(`.tab-btn[onclick="switchTab('${tab}')"]`)?.classList.add('active');
  document.getElementById('tab-'+tab)?.classList.add('active');
  SFX.tap();
}
function doLogin(){
  getCtx();
  const email=(document.getElementById('li-email')?.value.trim())||'demo@demo.com';
  let users={}; try{users=JSON.parse(localStorage.getItem('bk_users')||'{}');}catch(e){}
  let user=Object.values(users).find(u=>u.email===email);
  if(!user){ user={id:genId(),email,name:email.split('@')[0]}; users[user.id]=user; localStorage.setItem('bk_users',JSON.stringify(users)); }
  state.user=user; localStorage.setItem('bk_lastuser',JSON.stringify(user));
  if(loadState(user.id)&&state.branches.length>0){ resumeGame(); }
  else{ showScreen('screen-char'); }
}
function doRegister(){
  getCtx();
  const name=document.getElementById('rg-name')?.value.trim();
  const email=document.getElementById('rg-email')?.value.trim();
  const pass=document.getElementById('rg-pass')?.value;
  if(!name||!email||!pass){showToast('⚠️ 請填寫所有欄位');return;}
  if(pass.length<6){showToast('⚠️ 密碼至少6字元');return;}
  if(!email.includes('@')){showToast('⚠️ 請輸入正確信箱');return;}
  let users={}; try{users=JSON.parse(localStorage.getItem('bk_users')||'{}');}catch(e){}
  if(Object.values(users).find(u=>u.email===email)){showToast('⚠️ 此信箱已被使用');return;}
  const user={id:genId(),email,name};
  users[user.id]=user; localStorage.setItem('bk_users',JSON.stringify(users));
  localStorage.setItem('bk_lastuser',JSON.stringify(user));
  state.user=user; showToast('✅ 帳號創建成功！'); showScreen('screen-char');
}
function doFBLogin(){
  getCtx();
  let fbId=localStorage.getItem('bk_fb_id'); if(!fbId){fbId='FB'+genId();localStorage.setItem('bk_fb_id',fbId);}
  const u={id:fbId,email:'fb_'+fbId+'@fb.com',name:'Facebook用戶'};
  let users={}; try{users=JSON.parse(localStorage.getItem('bk_users')||'{}');}catch(e){}
  users[fbId]=u; localStorage.setItem('bk_users',JSON.stringify(users));
  localStorage.setItem('bk_lastuser',JSON.stringify(u));
  state.user=u;
  if(loadState(fbId)&&state.branches.length>0){ resumeGame(); }
  else{ showScreen('screen-char'); }
  showToast('✅ Facebook 登入！');
}
function doLogout(){
  saveState(); stopAllTimers(); localStorage.removeItem('bk_lastuser');
  state={user:null,char:null,charName:'',money:500,totalIncome:0,totalCooked:0,
    level:1,xp:0,rating:4.0,branches:[],activeBranchIdx:0,hiredStaff:[],achievements:[],
    combo:0,bestCombo:0,dayCount:1,dayRevenue:0,dayGoal:1500,daysMetGoal:0,
    branchProgress:{},purchasedItems:[]};
  showToast('👋 已登出'); showScreen('screen-login');
}

// ══════════════ CHARACTER SELECT ══════════════
function selectChar(type){
  pendingChar=type; SFX.tap();
  document.querySelectorAll('.char-card').forEach(c=>c.classList.remove('selected'));
  document.getElementById('char-'+type)?.classList.add('selected');
  const r=document.getElementById('char-name-row'); if(r) r.style.display='flex';
  const ni=document.getElementById('char-name-input'); if(ni) ni.value=type==='boy'?'小明':'小美';
}
function confirmChar(){
  if(!pendingChar){showToast('⚠️ 請先選擇角色');return;}
  const ni=document.getElementById('char-name-input');
  const name=(ni?.value.trim())||(pendingChar==='boy'?'小明':'小美');
  state.char=pendingChar; state.charName=name;
  SFX.complete(); showScreen('screen-pick-location');
}

// ══════════════ PICK LOCATION ══════════════
function pickCity(cityId){
  SFX.tap(); pendingCityId=cityId;
  const city=CITIES[cityId]; if(!city) return;
  setText('lp-city', city.name);
  setText('lp-badge', city.badge);
  setText('lp-desc',  city.desc);
  setText('lp-traffic', city.traffic);
  setText('lp-rent',  '免費');
  setText('lp-price', '$'+city.avgPrice);
  const pop=document.getElementById('location-popup'); if(pop) pop.style.display='block';
}
function closeLPopup(){ const p=document.getElementById('location-popup'); if(p) p.style.display='none'; }
function confirmLocation(){
  if(!pendingCityId){showToast('⚠️ 請選擇城市');return;}
  closeLPopup();
  initSetupScreen(pendingCityId);
  showScreen('screen-setup');
}

// ══════════════ SHOP SETUP ══════════════
function initSetupScreen(cityId){
  const floor=document.getElementById('shop-floor'); if(!floor) return;
  floor.innerHTML='';
  // create cells
  for(let i=0;i<FLOOR_COLS*FLOOR_ROWS;i++){
    const cell=document.createElement('div');
    cell.className='floor-cell'; cell.dataset.idx=i;
    cell.onclick=()=>openCellPicker(i);
    floor.appendChild(cell);
  }
  pendingLayout=new Array(FLOOR_COLS*FLOOR_ROWS).fill(null);
  // show free items toolbar
  buildFreeItemsToolbar();
  updateSetupSummary();
}
let _pickingCellIdx=null;
function openCellPicker(idx){
  SFX.tap();
  _pickingCellIdx=idx;
  const existing=pendingLayout[idx];
  // build picker list
  const cpItems=document.getElementById('cp-items'); if(!cpItems) return;
  cpItems.innerHTML='';
  // if cell has item, add "remove" option
  if(existing){
    const rem=document.createElement('div');
    rem.className='cp-item';
    rem.innerHTML=`<span class="cpi-emoji">🗑️</span><div class="cpi-name">移除</div><div class="cpi-cost">免費</div>`;
    rem.onclick=()=>{ placeItem(idx,null); closeCellPicker(); };
    cpItems.appendChild(rem);
  }
  Object.entries(FLOOR_ITEMS).forEach(([key,item])=>{
    const alreadyPlaced=pendingLayout.filter(x=>x===key).length;
    const maxAllowed=item.max||1;
    // count placed across all cells
    const div=document.createElement('div');
    div.className='cp-item'+((!item.free&&!state.purchasedItems.includes(key)&&!isFreeFn(key))?'' :'');
    const canPlace= item.free || state.purchasedItems.includes(key);
    const atMax = alreadyPlaced>=maxAllowed;
    if(!canPlace||atMax) div.classList.add('disabled');
    div.innerHTML=`
      <span class="cpi-emoji">${item.emoji}</span>
      <div class="cpi-name">${item.name}</div>
      <div class="cpi-cost">${item.free?'免費':canPlace?'已購買':'$'+item.cost}</div>`;
    if(canPlace&&!atMax) div.onclick=()=>{ placeItem(idx,key); closeCellPicker(); };
    cpItems.appendChild(div);
  });
  document.getElementById('cell-picker').style.display='flex';
}
function isFreeFn(key){ return FLOOR_ITEMS[key]?.free; }
function closeCellPicker(){ document.getElementById('cell-picker').style.display='none'; }
function placeItem(idx,key){
  pendingLayout[idx]=key;
  SFX.place();
  const cells=document.querySelectorAll('.floor-cell');
  const cell=cells[idx]; if(!cell) return;
  const item=key?FLOOR_ITEMS[key]:null;
  cell.innerHTML=item?`${item.emoji}<span class="cell-label">${item.name}</span>`:'';
  cell.classList.toggle('has-item',!!key);
  updateSetupSummary();
}
function buildFreeItemsToolbar(){
  const fi=document.getElementById('free-items'); if(!fi) return;
  fi.innerHTML='';
  Object.entries(FLOOR_ITEMS).filter(([,v])=>v.free).forEach(([key,item])=>{
    const d=document.createElement('div'); d.className='tool-item';
    d.innerHTML=`<span class="ti-emoji">${item.emoji}</span><div class="ti-name">${item.name}</div>`;
    d.onclick=()=>showToast(`點擊格子放置 ${item.emoji} ${item.name}`);
    fi.appendChild(d);
  });
}
function updateSetupSummary(){
  const placed=pendingLayout.filter(x=>x!==null);
  const hasCashier=placed.includes('cashier');
  const hasStove=placed.includes('stove');
  const hasTable=placed.some(x=>x==='table1'||x==='table2');
  const ok=hasCashier&&hasStove&&hasTable;
  const hint=document.getElementById('setup-hint');
  const btn=document.getElementById('btn-start-biz');
  let missing=[];
  if(!hasCashier) missing.push('收銀台💰');
  if(!hasStove)   missing.push('瓦斯爐🍳');
  if(!hasTable)   missing.push('餐桌🪑');
  if(hint) hint.textContent= ok ? '✅ 設備齊全！可以開始營業了！' : `還需要：${missing.join('、')}`;
  if(btn)  btn.disabled=!ok;
  // placed summary
  const ps=document.getElementById('placed-summary'); if(!ps) return;
  const counts={};
  placed.forEach(k=>{ if(k) counts[k]=(counts[k]||0)+1; });
  ps.innerHTML='';
  Object.entries(counts).forEach(([k,n])=>{
    const it=FLOOR_ITEMS[k]; if(!it) return;
    const d=document.createElement('div'); d.className='placed-chip';
    d.textContent=`${it.emoji} ${it.name}${n>1?' x'+n:''}`;
    ps.appendChild(d);
  });
}
function startBusiness(){
  if(!pendingCityId||!pendingLayout){showToast('⚠️ 請先選擇城市並佈置店面');return;}
  const city=CITIES[pendingCityId];
  const branch={
    cityId:pendingCityId,
    cityName:city.name,
    shopName:state.charName+'的'+city.name+'早餐店',
    layout:[...pendingLayout],
    dayRevHistory:[],
    passive:city.passive,
  };
  state.branches=[branch];
  state.activeBranchIdx=0;
  state.char=pendingChar||state.char;
  state.charName=state.charName||'小老闆';
  state.dayGoal=computeDayGoal(branch);
  state.dayRevenue=0;
  state.dayCount=1;
  saveState();
  initGame();
}
function computeDayGoal(branch){
  // base goal based on city traffic
  const city=CITIES[branch.cityId];
  const base=city?city.avgPrice*50:1500; // roughly avgPrice * 50 orders
  // bonus per branch count
  return Math.floor(base*(1+state.branches.length*0.1));
}
function resumeGame(){
  state.dayRevenue=state.dayRevenue||0;
  // Fix old saves: if layout missing/empty give default
  state.branches.forEach(br=>{
    if(!Array.isArray(br.layout)||br.layout.filter(x=>x!==null).length===0){
      const dl=new Array(30).fill(null);
      dl[0]='cashier'; dl[1]='stove'; dl[6]='table1'; dl[7]='table1'; dl[12]='counter';
      br.layout=dl;
    }
  });
  initGame();
}

// ══════════════ GAME INIT ══════════════
function initGame(){
  buildMenuGrid();
  buildBuyPanel();
  buildStaffPanel();
  refreshGameUI();
  showScreen('screen-game');   // show first so DOM has dimensions
  startBGM();
  // render interior AFTER screen is visible so offsetHeight works
  requestAnimationFrame(()=>{
    setTimeout(()=>{
      renderInterior();
      const br=getCurrentBranch();
      showToast('🎉 '+(br?.shopName||state.charName+'的早餐店')+'開張！');
    }, 80);
  });
  startDayTimer();
  startOrderSpawner();
  if(!customerLoopStarted){ customerLoopStarted=true; setInterval(updateCustomerQueue,2500); }
  if(!autoIncomeStarted){ autoIncomeStarted=true; startAutoIncome(); }
  startAutoServeStaff();
}
function stopAllTimers(){
  if(dayTimerInterval){ clearInterval(dayTimerInterval); dayTimerInterval=null; }
  activeOrders.forEach(o=>clearInterval(o.timerInterval));
  activeOrders=[];
  autoServeIntervals.forEach(clearInterval);
  autoServeIntervals=[];
}

// ══════════════ DAY TIMER (30min real = 1 day) ══════════════
function startDayTimer(){
  if(dayTimerInterval) clearInterval(dayTimerInterval);
  dayRemaining=DAY_DURATION_MS/1000; // seconds
  updateDayBar();
  dayTimerInterval=setInterval(()=>{
    dayRemaining--;
    updateDayBar();
    if(dayRemaining<=0){ clearInterval(dayTimerInterval); dayTimerInterval=null; endDay(); }
  },1000);
}
function updateDayBar(){
  const total=DAY_DURATION_MS/1000;
  const pct=((total-dayRemaining)/total)*100;
  setW('day-fill',pct+'%');
  const m=Math.floor(dayRemaining/60), s=dayRemaining%60;
  setText('day-time',(m<10?'0':'')+m+':'+(s<10?'0':'')+s);
  setText('day-income','$'+state.dayRevenue.toLocaleString());
  setText('day-goal','$'+state.dayGoal.toLocaleString());
}
function endDay(){
  SFX.dayEnd(); stopAllTimers();
  activeOrders.forEach(o=>{ clearInterval(o.timerInterval); o.el?.remove(); });
  activeOrders=[];
  const metGoal=state.dayRevenue>=state.dayGoal;
  const pct=state.dayGoal>0?Math.min(100,Math.floor(state.dayRevenue/state.dayGoal*100)):100;
  // record
  const br=getCurrentBranch();
  if(br){ if(!br.dayRevHistory) br.dayRevHistory=[]; br.dayRevHistory.push(state.dayRevenue); }
  // count days met goal for branch expansion
  if(metGoal){
    state.daysMetGoal=(state.daysMetGoal||0)+1;
    // update branchProgress for each potential expand city
    BRANCH_EXPAND.forEach(e=>{
      if(!state.branches.find(b=>b.cityId===e.cityId)){
        if(state.dayRevenue>=e.dayRevTarget*BRANCH_PCT_THRESHOLD){
          state.branchProgress[e.cityId]=(state.branchProgress[e.cityId]||0)+1;
        }
      }
    });
  }
  // pay staff salary
  let totalSalary=0;
  state.hiredStaff.forEach(s=>{
    const cat=STAFF_CATALOG.find(c=>c.id===s.staffId);
    if(cat) totalSalary+=cat.salary;
  });
  state.money=Math.max(0,state.money-totalSalary);

  const modal=document.getElementById('day-end-modal'); if(!modal) return;
  document.getElementById('dem-emoji').textContent=metGoal?'🎊':'😓';
  document.getElementById('dem-title').textContent=`第 ${state.dayCount} 天結束`;
  document.getElementById('dem-body').innerHTML=`
    今日營收：<strong>$${state.dayRevenue.toLocaleString()}</strong><br>
    今日目標：<strong>$${state.dayGoal.toLocaleString()}</strong><br>
    達成率：<strong style="color:${metGoal?'#34d399':'#f87171'}">${pct}%</strong><br>
    ${totalSalary>0?`員工薪資：<strong>-$${totalSalary}</strong><br>`:''}
    ${metGoal?'<br>🎉 目標達成！可能解鎖展店資格！':'<br>💪 繼續加油！明天會更好！'}
  `;
  const btn=document.getElementById('dem-btn');
  if(btn) btn.textContent='前往第 '+(state.dayCount+1)+' 天 →';
  modal.style.display='flex';
  saveState();
  checkAchievements();
}
function closeDayEnd(){
  document.getElementById('day-end-modal').style.display='none';
  state.dayCount++;
  state.dayRevenue=0;
  const br=getCurrentBranch();
  if(br) state.dayGoal=computeDayGoal(br);
  saveState();
  // New day modal
  const nd=document.getElementById('new-day-modal'); if(!nd) return;
  setText('ndm-day',state.dayCount);
  document.getElementById('ndm-body').textContent='新的一天開始了！繼續為夢想努力！';
  nd.style.display='flex';
}
function closeNewDay(){
  document.getElementById('new-day-modal').style.display='none';
  SFX.dayStart();
  startDayTimer();
  startOrderSpawner();
  startAutoServeStaff();
  refreshGameUI();
}

// ══════════════ INTERIOR RENDER ══════════════
function renderInterior(){
  const view=document.getElementById('interior-view'); if(!view) return;
  view.innerHTML='';

  // ── Sky decorations ──
  const sun=document.createElement('div'); sun.className='sky-sun'; sun.textContent='☀️'; view.appendChild(sun);
  const cl1=document.createElement('div'); cl1.className='sky-cloud'; cl1.textContent='☁️';
  cl1.style.cssText='top:8px;left:-40px;animation-duration:18s'; view.appendChild(cl1);
  const cl2=document.createElement('div'); cl2.className='sky-cloud'; cl2.textContent='☁️';
  cl2.style.cssText='top:22px;left:-80px;font-size:.9rem;opacity:.5;animation-duration:28s'; view.appendChild(cl2);

  // ── Shop name banner ──
  const banner=document.createElement('div'); banner.className='shop-name-banner';
  banner.textContent=getCurrentBranch()?.shopName||(state.charName+'的早餐店');
  view.appendChild(banner);

  // ── Shop building (always shown) ──
  const building=document.createElement('div');
  building.style.cssText=`
    position:absolute;bottom:0;left:50%;transform:translateX(-50%);
    width:min(340px,95%);
    background:linear-gradient(180deg,#c94a20,#8c2e10);
    border-radius:10px 10px 0 0;
    box-shadow:0 -4px 16px rgba(0,0,0,.45);
    overflow:hidden;
    display:flex;flex-direction:column;
  `;

  const br=getCurrentBranch();
  const layout=br?.layout||[];

  // If layout is empty, show a simple default shop face
  if(layout.filter(x=>x!==null).length===0){
    building.style.height='140px';
    building.innerHTML=`
      <div style="text-align:center;padding:12px 8px 0;font-size:.7rem;color:rgba(255,255,255,.6)">店面佈置中…</div>
      <div style="display:flex;justify-content:center;gap:8px;padding:8px;flex-wrap:wrap">
        <span style="font-size:1.6rem">🍳</span>
        <span style="font-size:1.6rem">💰</span>
        <span style="font-size:1.6rem">🪑</span>
        <span style="font-size:1.6rem">☕</span>
      </div>
      <div style="text-align:center;font-size:.65rem;color:rgba(255,255,255,.5);padding:4px">點「購買」頁面可新增設備</div>
    `;
    view.appendChild(building);
    return;
  }

  // Build actual grid from layout
  // Calculate cell size to fill building nicely
  const viewH=view.offsetHeight||Math.floor(window.innerHeight*0.35)||200;
  const buildingH=Math.min(Math.floor(viewH*0.75), 200);
  const cellSize=Math.floor((buildingH-12)/FLOOR_ROWS);
  building.style.height=buildingH+'px';

  const ig=document.createElement('div');
  ig.style.cssText=`
    display:grid;
    grid-template-columns:repeat(${FLOOR_COLS},1fr);
    grid-template-rows:repeat(${FLOOR_ROWS},${cellSize}px);
    gap:2px;padding:4px;flex:1;
  `;

  layout.forEach(key=>{
    const cell=document.createElement('div');
    cell.style.cssText='background:rgba(255,220,180,.1);border-radius:4px;display:flex;flex-direction:column;align-items:center;justify-content:center;overflow:hidden';
    if(key){
      const it=FLOOR_ITEMS[key];
      if(it){
        const sz=Math.max(12,Math.min(20,cellSize-8));
        cell.innerHTML=`<span style="font-size:${sz}px;line-height:1">${it.emoji}</span><span style="font-size:9px;color:rgba(255,255,255,.55);margin-top:1px;overflow:hidden;white-space:nowrap;max-width:100%;text-overflow:ellipsis;padding:0 2px">${it.name}</span>`;
      }
    }
    ig.appendChild(cell);
  });
  building.appendChild(ig);
  view.appendChild(building);
}

// ══════════════ ORDER SYSTEM ══════════════
let orderSpawnTimer=null;
function startOrderSpawner(){
  if(orderSpawnTimer) clearInterval(orderSpawnTimer);
  spawnOrder();
  orderSpawnTimer=setInterval(()=>{ if(activeOrders.length<getMaxOrders()) spawnOrder(); },4000);
}
function getMaxOrders(){
  const br=getCurrentBranch();
  let base=3;
  if(br?.layout){
    const tables=br.layout.filter(x=>x==='table1'||x==='table2').length;
    base=Math.min(6,2+tables);
  }
  return base;
}
function getOrderTimer(){
  let t=20;
  const br=getCurrentBranch();
  if(br?.layout&&br.layout.includes('tv')) t+=5;
  state.hiredStaff.forEach(s=>{ const c=STAFF_CATALOG.find(x=>x.id===s.staffId); if(c?.autoInterval) t+=2; });
  return t;
}
function spawnOrder(){
  if(!getCurrentBranch()) return;
  const item=MENU[Math.floor(Math.random()*MENU.length)];
  const custEmojis=['👨','👩','👴','👵','👦','👧','🧑','👱'];
  const cust=custEmojis[Math.floor(Math.random()*custEmojis.length)];
  const oid=++orderIdCtr, tmax=getOrderTimer();
  const el=document.createElement('div'); el.className='order-card'; el.id='oc-'+oid;
  el.innerHTML=`<div class="oc-cust">${cust}</div><div class="oc-emoji">${item.emoji}</div><div class="oc-name">${item.name}</div><div class="oc-price">+$${item.price}</div><div class="oc-timer"><div class="oc-timer-bar" id="otb-${oid}"></div></div>`;
  const row=document.getElementById('orders-row'); if(!row) return;
  row.appendChild(el);
  requestAnimationFrame(()=>el.classList.add('oi'));
  let rem=tmax;
  const ti=setInterval(()=>{
    rem--;
    const pct=(rem/tmax)*100;
    const bar=document.getElementById('otb-'+oid);
    if(bar){ bar.style.width=pct+'%'; bar.style.background=pct>50?'#10b981':pct>25?'#f59e0b':'#ef4444'; }
    if(rem<=5) el.classList.add('urgent');
    if(rem<=0){ clearInterval(ti); expireOrder(oid); }
  },1000);
  activeOrders.push({id:oid,item,cust,timerInterval:ti,el,tmax,rem:tmax});
  SFX.doorbell(); updateMenuWanted();
}
function expireOrder(oid){
  const idx=activeOrders.findIndex(o=>o.id===oid); if(idx<0) return;
  const o=activeOrders[idx]; clearInterval(o.timerInterval);
  o.el.classList.add('oe'); setTimeout(()=>o.el.remove(),400);
  activeOrders.splice(idx,1);
  state.combo=0; state.rating=Math.max(1.0,state.rating-.1);
  SFX.timeout(); showToast('😤 顧客等太久走了！',1600);
  saveState(); refreshGameUI(); updateMenuWanted();
}
function fulfillOrder(itemId){
  const idx=activeOrders.findIndex(o=>o.item.id===itemId); if(idx<0) return false;
  const o=activeOrders[idx]; clearInterval(o.timerInterval);
  const speedPct=o.rem/o.tmax, bonus=speedPct>0.6?Math.floor(o.item.price*.3):0;
  const earned=o.item.price+bonus;
  state.money+=earned; state.totalIncome+=earned; state.dayRevenue+=earned;
  state.totalCooked++; state.xp+=o.item.xp;
  state.combo=(state.combo||0)+1;
  if(state.combo>state.bestCombo) state.bestCombo=state.combo;
  o.el.classList.add('od'); setTimeout(()=>o.el.remove(),400);
  activeOrders.splice(idx,1);
  SFX.correct(); SFX.coin();
  const msg=bonus>0?`${o.item.emoji} 快速送餐！+$${earned}（獎勵$${bonus}）`:`${o.item.emoji} ${o.item.name} 完成！+$${earned}`;
  showToast(msg,1800); showCookAnim(o.item.emoji);
  if(state.combo>=3) showCombo(state.combo);
  // level
  const nt=getTitle(state.totalIncome);
  if(nt.level>state.level){ state.level=nt.level; SFX.levelUp(); setTimeout(()=>showToast(`🎊 升級！「${nt.title}」Lv.${nt.level}！`,3000),400); }
  saveState(); refreshGameUI(); checkAchievements(); updateMenuWanted();
  updateDayBar();
  return true;
}
function updateMenuWanted(){
  MENU.forEach(it=>{
    const el=document.getElementById('mi-'+it.id); if(!el) return;
    el.classList.toggle('wanted',activeOrders.some(o=>o.item.id===it.id));
  });
}
function updateCustomerQueue(){
  const q=document.getElementById('customer-queue'); if(!q) return;
  const n=Math.min(8,1+activeOrders.length+Math.floor(Math.random()*2));
  const emojis=['👨','👩','👴','👵','👦','👧','🧑','👱'];
  q.innerHTML='';
  for(let i=0;i<n;i++){
    const s=document.createElement('span'); s.className='customer';
    s.textContent=emojis[Math.floor(Math.random()*emojis.length)];
    s.style.animationDelay=(i*.1)+'s'; q.appendChild(s);
  }
}

// ══════════════ MENU ══════════════
function buildMenuGrid(){
  const g=document.getElementById('menu-grid'); if(!g) return;
  g.innerHTML='';
  MENU.forEach(item=>{
    const d=document.createElement('div'); d.className='menu-item'; d.id='mi-'+item.id;
    d.innerHTML=`<span class="me-emoji">${item.emoji}</span><div class="me-name">${item.name}</div><div class="me-price">$${item.price}</div><div class="me-time">${item.time}秒</div>`;
    d.addEventListener('click',()=>cookItem(item));
    g.appendChild(d);
  });
}
function cookItem(item){
  const el=document.getElementById('mi-'+item.id); if(!el||el.classList.contains('cooking')) return;
  SFX.sizzle(); el.classList.add('cooking');
  const ci=document.getElementById('cooking-items');
  const ce=document.createElement('span'); ce.textContent=item.emoji; ce.style.animation='bob .3s ease infinite alternate';
  if(ci) ci.appendChild(ce);
  // speed bonuses
  let spd=0;
  state.hiredStaff.forEach(s=>{ const c=STAFF_CATALOG.find(x=>x.id===s.staffId); if(c) spd+=c.speed||0; });
  const br=getCurrentBranch();
  if(br?.layout?.includes('fridge')) spd+=.15;
  const speed=Math.max(.2,1-spd);
  const cookTime=item.time*1000*speed;
  setTimeout(()=>{
    if(ci?.contains(ce)) ci.removeChild(ce);
    el.classList.remove('cooking');
    const fulfilled=fulfillOrder(item.id);
    if(!fulfilled){
      const earned=Math.floor(item.price*.7);
      state.money+=earned; state.totalIncome+=earned; state.dayRevenue+=earned;
      state.totalCooked++; state.combo=0;
      SFX.complete(); SFX.coin();
      showToast(`${item.emoji} 零散販售 +$${earned}（無訂單）`,1800);
      showCookAnim(item.emoji);
      saveState(); refreshGameUI(); updateDayBar();
    }
  },cookTime);
}

// ══════════════ STAFF SYSTEM ══════════════
function buildStaffPanel(){
  const p=document.getElementById('staff-panel'); if(!p) return;
  p.innerHTML='';
  // Hired staff
  if(state.hiredStaff.length>0){
    const htitle=document.createElement('div'); htitle.className='buy-section-title'; htitle.textContent='✅ 在職員工'; p.appendChild(htitle);
    state.hiredStaff.forEach((s,idx)=>{
      const cat=STAFF_CATALOG.find(c=>c.id===s.staffId); if(!cat) return;
      const d=document.createElement('div'); d.className='staff-item';
      d.innerHTML=`
        <div class="si-avatar">${cat.emoji}</div>
        <div class="si-info">
          <div class="si-name">${cat.name}</div>
          <div class="si-skill">${cat.desc}</div>
          <div class="si-salary">日薪 $${cat.salary} ${cat.badge}</div>
        </div>
        <div class="si-status working">工作中</div>
        <button class="btn-fire" onclick="fireStaff(${idx})">解雇</button>`;
      p.appendChild(d);
    });
  }
  const title=document.createElement('div'); title.className='buy-section-title'; title.textContent='💼 應徵員工'; p.appendChild(title);
  STAFF_CATALOG.forEach(cat=>{
    const already=state.hiredStaff.some(s=>s.staffId===cat.id);
    const canAfford=state.money>=cat.salary*2; // need 2 days salary upfront
    const d=document.createElement('div'); d.className='staff-item';
    d.innerHTML=`
      <div class="si-avatar">${cat.emoji}</div>
      <div class="si-info">
        <div class="si-name">${cat.name}</div>
        <div class="si-skill">${cat.desc}</div>
        <div class="si-salary">日薪 $${cat.salary} ${cat.badge}</div>
      </div>
      <button class="btn-hire" ${already||!canAfford?'disabled':''} onclick="hireStaff('${cat.id}')">
        ${already?'已聘':canAfford?'聘用':'錢不足'}
      </button>`;
    p.appendChild(d);
  });
}
function hireStaff(staffId){
  const cat=STAFF_CATALOG.find(c=>c.id===staffId); if(!cat) return;
  if(state.hiredStaff.some(s=>s.staffId===staffId)){showToast('⚠️ 已聘用此員工');return;}
  const deposit=cat.salary*2;
  if(state.money<deposit){showToast(`💸 需要 $${deposit}（兩天薪資保證金）`);return;}
  state.money-=deposit;
  state.hiredStaff.push({staffId,assignedBranch:state.activeBranchIdx});
  saveState(); buildStaffPanel(); refreshGameUI();
  SFX.hire(); showToast(`✅ 已聘用 ${cat.name}！`);
  checkAchievements(); startAutoServeStaff();
}
function fireStaff(idx){
  const s=state.hiredStaff[idx]; if(!s) return;
  const cat=STAFF_CATALOG.find(c=>c.id===s.staffId);
  state.hiredStaff.splice(idx,1);
  saveState(); buildStaffPanel(); refreshGameUI();
  SFX.fire(); showToast(`👋 ${cat?.name||'員工'} 已離職`);
  startAutoServeStaff(); // restart to remove their interval
}
function startAutoServeStaff(){
  autoServeIntervals.forEach(clearInterval); autoServeIntervals=[];
  state.hiredStaff.forEach(s=>{
    const cat=STAFF_CATALOG.find(c=>c.id===s.staffId);
    if(cat?.autoServe&&cat.autoInterval){
      const iv=setInterval(()=>{
        if(activeOrders.length>0){
          const o=activeOrders[0];
          fulfillOrder(o.item.id);
        }
      },cat.autoInterval*1000);
      autoServeIntervals.push(iv);
    }
  });
}

// ══════════════ BUY PANEL ══════════════
function buildBuyPanel(){
  const p=document.getElementById('buy-panel'); if(!p) return;
  p.innerHTML='';
  const purchasable=Object.entries(FLOOR_ITEMS).filter(([,v])=>!v.free);
  if(purchasable.length===0){ p.innerHTML='<div style="color:#6b7280;padding:12px;text-align:center">目前沒有可購買的設備</div>'; return; }
  const t=document.createElement('div'); t.className='buy-section-title'; t.textContent='🛒 購買設備（放入店面）'; p.appendChild(t);
  purchasable.forEach(([key,item])=>{
    const owned=state.purchasedItems.includes(key);
    const d=document.createElement('div'); d.className='buy-item';
    d.innerHTML=`
      <div class="bi-icon">${item.emoji}</div>
      <div class="bi-info">
        <div class="bi-name">${item.name}${owned?' ✅':''}</div>
        <div class="bi-desc">${item.desc}</div>
        <div class="bi-cost">${owned?'已購買':'$'+item.cost.toLocaleString()}</div>
      </div>
      <button class="btn-buy" ${owned?'disabled':''} onclick="buyEquipment('${key}')">
        ${owned?'擁有':'購買'}
      </button>`;
    p.appendChild(d);
  });
}
function buyEquipment(key){
  if(state.purchasedItems.includes(key)){showToast('⚠️ 已購買');return;}
  const it=FLOOR_ITEMS[key]; if(!it||it.free) return;
  if(state.money<it.cost){showToast('💸 金錢不足！');return;}
  state.money-=it.cost;
  state.purchasedItems.push(key);
  saveState(); buildBuyPanel(); refreshGameUI();
  SFX.complete(); showToast(`✅ 已購買「${it.name}」！可到店面佈置頁放置。`);
}

// ══════════════ AUTO INCOME (branches) ══════════════
function startAutoIncome(){
  setInterval(()=>{
    if(state.branches.length<=1) return;
    let passive=0;
    state.branches.slice(1).forEach(b=>{ const c=CITIES[b.cityId]; if(c) passive+=Math.floor(c.passive/120); });
    if(passive>0){
      state.money+=passive; state.totalIncome+=passive;
      saveState(); refreshGameUI();
      showToast(`💼 分店被動 +$${passive}`,1200);
    }
  },30000);
}

// ══════════════ GAME UI ══════════════
function refreshGameUI(){
  if(!state.char) return;
  const av=state.char==='boy'?'👦':'👧', tt=getTitle(state.totalIncome);
  setText('hud-avatar',av); setText('hud-name',state.charName);
  setText('hud-lv',tt.level); setText('hud-title',tt.title);
  setText('hud-money',state.money.toLocaleString());
  setText('st-branches',state.branches.length); setText('st-sold',state.totalCooked);
  setText('st-income','$'+state.totalIncome.toLocaleString());
  setText('st-rating',(state.rating||4.0).toFixed(1));
  setText('st-staff',state.hiredStaff.length); setText('st-combo',state.bestCombo);
  // goal card
  const pct=state.dayGoal>0?Math.min(100,Math.floor(state.dayRevenue/state.dayGoal*100)):100;
  setText('gc-need','$'+state.dayGoal.toLocaleString());
  setText('gc-earned','$'+state.dayRevenue.toLocaleString());
  setW('gc-fill',pct+'%');
  setText('gc-pct',pct+'%');
  // branch button: check if any city qualifies
  const canExpand=BRANCH_EXPAND.some(e=>{
    if(state.branches.find(b=>b.cityId===e.cityId)) return false;
    return (state.branchProgress[e.cityId]||0)>=e.daysNeeded;
  });
  const bb=document.getElementById('btn-open-branch'); if(bb) bb.disabled=!canExpand;
  updateMenuWanted();
}

// ══════════════ PANEL SWITCH ══════════════
function switchTab2(tab){
  SFX.tap();
  document.querySelectorAll('.ptab').forEach(t=>t.classList.remove('active'));
  document.querySelectorAll('.tab2-content').forEach(c=>c.classList.remove('active'));
  document.querySelector(`.ptab[onclick="switchTab2('${tab}')"]`)?.classList.add('active');
  document.getElementById('tab2-'+tab)?.classList.add('active');
}

// ══════════════ EXPAND MAP ══════════════
function refreshExpandMap(){
  setText('me-money',state.money.toLocaleString());
  const g=document.getElementById('expand-cities'); if(!g) return;
  g.innerHTML='';
  Object.entries(CITY_SVG_POS).forEach(([cityId,pos])=>{
    const owned=state.branches.find(b=>b.cityId===cityId);
    const prog=state.branchProgress[cityId]||0;
    const expandDef=BRANCH_EXPAND.find(e=>e.cityId===cityId);
    const qualified=expandDef&&prog>=expandDef.daysNeeded;
    const color=owned?'#f59e0b':qualified?'#10b981':'#6b7280';
    const r=owned||qualified?12:10;
    g.innerHTML+=`
      <circle cx="${pos.cx}" cy="${pos.cy}" r="${r+4}" fill="transparent" onclick="selectExpandCity('${cityId}')" style="cursor:pointer"/>
      <circle id="edot-${cityId}" cx="${pos.cx}" cy="${pos.cy}" r="${r}" fill="${color}" stroke="white" stroke-width="2" style="cursor:pointer" onclick="selectExpandCity('${cityId}')"/>
      <text x="${pos.cx+(cityId==='tainan'||cityId==='kaohsiung'||cityId==='taichung'||cityId==='hsinchu'?-32:14)}" y="${pos.cy+4}" fill="${owned||qualified?'white':'#d1d5db'}" font-size="10" font-weight="${owned||qualified?'bold':'normal'}" pointer-events="none">${CITY_LABELS[cityId]}</text>
      ${owned?`<text x="${pos.cx}" y="${pos.cy+1}" text-anchor="middle" font-size="8" fill="white" pointer-events="none">✓</text>`:''}
    `;
  });
}
function selectExpandCity(cityId){
  SFX.tap(); selectedExpandCity=cityId;
  const city=CITIES[cityId]; if(!city) return;
  const owned=state.branches.find(b=>b.cityId===cityId);
  const expandDef=BRANCH_EXPAND.find(e=>e.cityId===cityId);
  const prog=state.branchProgress[cityId]||0;
  const qualified=expandDef&&prog>=expandDef.daysNeeded;
  setText('ep-city',city.name);
  setText('ep-desc',city.desc);
  const cost=expandDef?.cost||10000;
  setText('ep-cost','$'+cost.toLocaleString());
  setText('ep-passive','$'+Math.floor(city.passive/120)+'/30秒');
  const statusEl=document.getElementById('ep-status');
  const btnEl=document.getElementById('ep-btn');
  const condEl=document.getElementById('ep-condition');
  if(owned){
    if(statusEl){statusEl.textContent='✅ 已開店';statusEl.style.background='rgba(16,185,129,.2)';statusEl.style.color='#34d399';}
    if(btnEl){btnEl.disabled=true;btnEl.textContent='已開店';}
    if(condEl) condEl.classList.remove('show');
  }else if(!expandDef){
    if(statusEl){statusEl.textContent='⚠️ 主店先開';statusEl.style.background='rgba(107,114,128,.2)';statusEl.style.color=var_mt;}
    if(btnEl){btnEl.disabled=true;btnEl.textContent='無法開店';}
  }else if(!qualified){
    const need=expandDef.daysNeeded-prog;
    if(statusEl){statusEl.textContent='🔒 未達條件';statusEl.style.background='rgba(107,114,128,.2)';statusEl.style.color='#9ca3af';}
    if(condEl){condEl.classList.add('show');condEl.textContent=`需要連續 ${need} 天以上日營收達 $${expandDef.dayRevTarget.toLocaleString()} 的 ${Math.round(BRANCH_PCT_THRESHOLD*100)}%（目前已達 ${prog}/${expandDef.daysNeeded} 天）`;}
    if(btnEl){btnEl.disabled=true;btnEl.textContent='條件未達';}
  }else if(state.money<cost){
    if(statusEl){statusEl.textContent='💸 資金不足';statusEl.style.background='rgba(239,68,68,.2)';statusEl.style.color='#f87171';}
    if(condEl) condEl.classList.remove('show');
    if(btnEl){btnEl.disabled=true;btnEl.textContent='金錢不足';}
  }else{
    if(statusEl){statusEl.textContent='✨ 可以展店！';statusEl.style.background='rgba(245,158,11,.2)';statusEl.style.color='#fbbf24';}
    if(condEl) condEl.classList.remove('show');
    if(btnEl){btnEl.disabled=false;btnEl.textContent=`開立分店 ($${cost.toLocaleString()})`;}
  }
  document.getElementById('expand-popup').style.display='block';
}
const var_mt='#94a3b8';
function closeExpandPopup(){ document.getElementById('expand-popup').style.display='none'; selectedExpandCity=null; }
function openBranch(){
  if(!selectedExpandCity) return;
  const expandDef=BRANCH_EXPAND.find(e=>e.cityId===selectedExpandCity); if(!expandDef) return;
  if(state.branches.find(b=>b.cityId===selectedExpandCity)){showToast('⚠️ 已在此城市開店');return;}
  if(state.money<expandDef.cost){showToast('💸 金錢不足！');return;}
  const prog=state.branchProgress[selectedExpandCity]||0;
  if(prog<expandDef.daysNeeded){showToast('⚠️ 尚未達到展店條件');return;}
  state.money-=expandDef.cost;
  const city=CITIES[selectedExpandCity];
  state.branches.push({cityId:selectedExpandCity,cityName:city.name,shopName:state.charName+'的'+city.name+'早餐店',layout:[],dayRevHistory:[],passive:city.passive});
  saveState(); refreshExpandMap(); closeExpandPopup();
  SFX.branchOpen();
  showExpandSuccessModal(city.name,expandDef);
  checkAchievements();
}
function showExpandSuccessModal(cityName,def){
  const o=document.createElement('div'); o.className='modal-overlay';
  o.innerHTML=`<div class="modal-card">
    <span class="modal-emoji">🎊</span>
    <div class="modal-title">${cityName} 分店開張！</div>
    <div class="modal-body">恭喜在 <strong>${cityName}</strong> 成功開店！<br>每30秒被動收入：<strong>+$${Math.floor((def.passive||800)/120)}</strong></div>
    <button class="btn-primary" onclick="this.closest('.modal-overlay').remove()">🎉 太棒了！</button>
  </div>`;
  document.body.appendChild(o);
}

// ══════════════ FRIENDS ══════════════
function refreshFriendsUI(){
  setText('my-id',state.user?.id||'---');
  const list=document.getElementById('friends-list'); if(!list) return;
  const friends=state.friends||[];
  if(!friends.length){ list.innerHTML='<div style="color:#6b7280;text-align:center;padding:16px;font-size:.85rem">還沒有好友！分享你的 ID 給朋友吧</div>'; return; }
  list.innerHTML='';
  friends.forEach(f=>{
    const d=document.createElement('div'); d.className='friend-item';
    d.innerHTML=`<div class="fi-av">${f.char==='girl'?'👧':'👦'}</div><div class="fi-info"><div class="fi-name">${esc(f.name)}</div><div class="fi-detail">Lv.${f.level} • ${f.branches}間分店</div></div><div class="fi-act" onclick="visitFriend('${f.id}')">參觀→</div>`;
    list.appendChild(d);
  });
}
function copyId(){
  const id=state.user?.id||''; if(!id) return;
  navigator.clipboard?.writeText(id).then(()=>showToast('📋 ID 已複製！')).catch(()=>showToast('ID: '+id,4000));
}
function addFriend(){
  const inp=document.getElementById('friend-id-inp'); if(!inp) return;
  const fid=inp.value.trim().toUpperCase();
  if(!fid){showToast('⚠️ 請輸入好友 ID');return;}
  if(fid===state.user?.id){showToast('⚠️ 不能加自己');return;}
  if(!Array.isArray(state.friends)) state.friends=[];
  if(state.friends.find(f=>f.id===fid)){showToast('⚠️ 已是好友');return;}
  let users={}; try{users=JSON.parse(localStorage.getItem('bk_users')||'{}');}catch(e){}
  const fu=users[fid]; if(!fu){showToast('⚠️ 找不到此 ID');return;}
  let fs=null; try{fs=JSON.parse(localStorage.getItem('bk_save_'+fid));}catch(e){}
  state.friends.push({id:fid,name:fs?.charName||fu.name||'未知',char:fs?.char||'boy',level:fs?getTitle(fs.totalIncome||0).level:1,branches:Array.isArray(fs?.branches)?fs.branches.length:1,rating:fs?.rating||4.0,shopName:fs?.branches?.[0]?.shopName||'早餐店'});
  inp.value=''; saveState(); refreshFriendsUI(); checkAchievements();
  showToast('✅ 已加入好友！');
}
function visitFriend(fid){
  const f=(state.friends||[]).find(x=>x.id===fid); if(!f) return;
  setText('visit-title','參觀 '+f.name+' 的店');
  setText('vs-sign',f.shopName||f.name+'的早餐店');
  setText('vs-char',f.char==='girl'?'👧':'👦');
  const lines=['歡迎光臨！請多關照！','今天的早餐超好吃的！','謝謝你來！','我要在全台灣開分店！'];
  setText('vs-bubble',lines[Math.floor(Math.random()*lines.length)]);
  setText('vs-branches',f.branches); setText('vs-level',f.level); setText('vs-rating',(Number(f.rating)||4.0).toFixed(1));
  showScreen('screen-visit');
}
function giveReview(){ state.money+=50; state.totalIncome+=50; saveState(); SFX.coin(); showToast('⭐ 好評！+$50'); showCookAnim('⭐'); }
function buyItem(){ if(state.money<30){showToast('💸 需要$30');return;} state.money-=30; saveState(); SFX.coin(); showToast('🥪 美味！'); showCookAnim('🥪'); }
function sendGift(){ if(state.money<100){showToast('💸 需要$100');return;} state.money-=100; saveState(); SFX.complete(); showToast('🎁 禮物送出！'); showCookAnim('🎁'); }

// ══════════════ PROFILE ══════════════
function goProfile(){ showScreen('screen-profile'); }
function refreshProfileUI(){
  if(!state.char) return;
  const t=getTitle(state.totalIncome);
  setText('prof-avatar',state.char==='boy'?'👦':'👧');
  setText('prof-name',state.charName);
  setText('prof-title','Lv.'+t.level+' '+t.title);
  setText('ps-money','$'+state.money.toLocaleString());
  setText('ps-branches',state.branches.length);
  setText('ps-level',t.level);
  setText('ps-cooked',state.totalCooked);
  buildAchList();
}
function buildAchList(){
  const l=document.getElementById('ach-list'); if(!l) return;
  l.innerHTML='';
  ACHIEVEMENTS.forEach(a=>{
    const un=(state.achievements||[]).includes(a.id);
    const d=document.createElement('div'); d.className='ach-item'+(un?' unlocked':'');
    d.innerHTML=`<span class="ai-icon">${un?a.icon:'🔒'}</span><div class="ai-name">${un?a.name:'???'}</div><div class="ai-desc">${un?a.desc:'繼續努力...'}</div>`;
    l.appendChild(d);
  });
}
function checkAchievements(){
  if(!Array.isArray(state.achievements)) state.achievements=[];
  ACHIEVEMENTS.forEach(a=>{
    if(!state.achievements.includes(a.id)&&a.cond(state)){
      state.achievements.push(a.id);
      setTimeout(()=>showToast(`🏆 成就：${a.icon} ${a.name}！`,3000),300);
    }
  });
}

// ══════════════ INIT ══════════════
window.addEventListener('load',()=>{
  let lu=null; try{lu=JSON.parse(localStorage.getItem('bk_lastuser'));}catch(e){}
  if(lu?.id){
    state.user=lu;
    if(loadState(lu.id)&&state.branches.length>0){ resumeGame(); return; }
  }
  showScreen('screen-login');
});
