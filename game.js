/* ═══════════════════════════════════
DATA.JS — All game constants
═══════════════════════════════════ */
‘use strict’;

const GD = {
// ── Menu Items ──
MENU: [
{ id:‘egg’,      emoji:‘🍳’, name:‘煎蛋’,    price:25,  time:3,  xp:5  },
{ id:‘toast’,    emoji:‘🍞’, name:‘吐司’,    price:30,  time:4,  xp:6  },
{ id:‘bacon’,    emoji:‘🥓’, name:‘培根’,    price:35,  time:5,  xp:8  },
{ id:‘coffee’,   emoji:‘☕’, name:‘咖啡’,    price:40,  time:3,  xp:7  },
{ id:‘sandwich’, emoji:‘🥪’, name:‘三明治’,  price:55,  time:8,  xp:12 },
{ id:‘pancake’,  emoji:‘🥞’, name:‘鬆餅’,    price:65,  time:10, xp:15 },
{ id:‘rice’,     emoji:‘🍱’, name:‘飯糰’,    price:30,  time:4,  xp:7  },
{ id:‘waffle’,   emoji:‘🧇’, name:‘格子鬆餅’,price:70,  time:12, xp:18 },
{ id:‘soy’,      emoji:‘🥛’, name:‘豆漿’,    price:20,  time:2,  xp:4  },
{ id:‘noodle’,   emoji:‘🍜’, name:‘湯麵’,    price:60,  time:9,  xp:14 },
],

// ── Cities ──
CITIES: {
taipei:    { name:‘台北’, desc:‘首都商圈，人潮最多’,  traffic:‘極高’, avgPrice:45, passive:1200, cx:205, cy:88  },
newtaipei: { name:‘新北’, desc:‘雙北通勤族，穩定客源’, traffic:‘高’,   avgPrice:38, passive:1000, cx:192, cy:116 },
taoyuan:   { name:‘桃園’, desc:‘航空城，多元族群’,    traffic:‘中高’,  avgPrice:40, passive:900,  cx:172, cy:138 },
hsinchu:   { name:‘新竹’, desc:‘科技人，消費力強’,    traffic:‘中’,    avgPrice:50, passive:950,  cx:160, cy:167 },
taichung:  { name:‘台中’, desc:‘宜居城市，慢活族’,    traffic:‘高’,    avgPrice:42, passive:1100, cx:168, cy:256 },
tainan:    { name:‘台南’, desc:‘古都美食激戰區’,      traffic:‘中高’,  avgPrice:35, passive:1000, cx:171, cy:362 },
kaohsiung: { name:‘高雄’, desc:‘南部最大商圈’,        traffic:‘高’,    avgPrice:40, passive:1050, cx:184, cy:406 },
hualien:   { name:‘花蓮’, desc:‘觀光勝地，旺季超強’,  traffic:‘中’,    avgPrice:45, passive:800,  cx:256, cy:242 },
},

// ── Staff ──
STAFF: [
{ id:‘helper1’,  name:‘工讀生小花’,   emoji:‘👩’, speed:.05, satisfaction:.05, autoServe:false, salary:200,  desc:‘速度+5% 滿意度+5%’,   badge:‘🟢 入門’ },
{ id:‘helper2’,  name:‘廚師助理阿豪’, emoji:‘👨’, speed:.12, satisfaction:.08, autoServe:false, salary:450,  desc:‘速度+12% 滿意度+8%’,  badge:‘🔵 中級’ },
{ id:‘server1’,  name:‘外場服務生小玲’,emoji:‘🧑’,speed:.0,  satisfaction:.2,  autoServe:true,  autoInterval:15, salary:350, desc:‘自動服務 滿意度+20%’, badge:‘🟡 服務’ },
{ id:‘chef1’,    name:‘正職廚師老陳’, emoji:‘👴’, speed:.25, satisfaction:.1,  autoServe:false, salary:900,  desc:‘速度+25% 滿意度+10%’, badge:‘🔴 資深’ },
{ id:‘manager’,  name:‘店長王姐’,     emoji:‘👩‍💼’,speed:.1, satisfaction:.25, autoServe:true,  autoInterval:8,  salary:1500, desc:‘全能加成 自動送餐’,  badge:‘🟣 店長’ },
],

// ── Equipment ──
EQUIP: {
cashier:   { name:‘收銀台’,  emoji:‘💰’, free:true,  required:true,  desc:‘必要設備’,      category:‘essential’ },
stove:     { name:‘瓦斯爐’,  emoji:‘🍳’, free:true,  required:true,  desc:‘必要設備’,      category:‘essential’ },
table1:    { name:‘餐桌’,    emoji:‘🪑’, free:true,  required:true,  desc:‘必要設備(≥1)’, category:‘table’, max:6 },
counter:   { name:‘工作台’,  emoji:‘🔪’, free:true,  required:false, desc:‘建議放置’,      category:‘prep’ },
fridge:    { name:‘冰箱’,    emoji:‘🧊’, free:false, cost:800,       desc:‘速度+15%’,      category:‘equip’ },
display:   { name:‘展示架’,  emoji:‘🧁’, free:false, cost:500,       desc:‘客單+$5’,       category:‘equip’ },
speaker:   { name:‘音響’,    emoji:‘🎵’, free:false, cost:400,       desc:‘滿意度+10%’,    category:‘deco’  },
tv:        { name:‘電視’,    emoji:‘📺’, free:false, cost:500,       desc:‘等待耐心+5s’,   category:‘deco’  },
sign:      { name:‘招牌燈’,  emoji:‘✨’, free:false, cost:700,       desc:‘客流+15%’,      category:‘deco’  },
plant:     { name:‘盆栽’,    emoji:‘🌿’, free:false, cost:200,       desc:‘評分+0.2’,      category:‘deco’  },
},

// ── Titles ──
TITLES: [
{ level:1,  title:‘初學廚師’, min:0      },
{ level:2,  title:‘小廚師’,   min:500    },
{ level:3,  title:‘實習老闆’, min:1500   },
{ level:4,  title:‘小老闆’,   min:3000   },
{ level:5,  title:‘連鎖新手’, min:6000   },
{ level:6,  title:‘展店達人’, min:12000  },
{ level:7,  title:‘地區霸主’, min:25000  },
{ level:8,  title:‘全台知名’, min:50000  },
{ level:9,  title:‘早餐大王’, min:100000 },
{ level:10, title:‘早餐帝國’, min:200000 },
],

// ── Branch expansion conditions ──
EXPAND: [
{ cityId:‘newtaipei’, cost:8000,  dayRevTarget:2000, daysNeeded:3 },
{ cityId:‘taoyuan’,   cost:10000, dayRevTarget:2500, daysNeeded:3 },
{ cityId:‘hsinchu’,   cost:12000, dayRevTarget:3000, daysNeeded:4 },
{ cityId:‘taichung’,  cost:18000, dayRevTarget:4000, daysNeeded:5 },
{ cityId:‘tainan’,    cost:22000, dayRevTarget:5000, daysNeeded:5 },
{ cityId:‘kaohsiung’, cost:25000, dayRevTarget:6000, daysNeeded:6 },
{ cityId:‘hualien’,   cost:15000, dayRevTarget:3500, daysNeeded:4 },
],

BRANCH_PCT:     0.8,
DAY_DURATION:   30 * 60 * 1000,
ORDER_TIMER:    20,
MAX_ORDERS:     4,
FLOOR_COLS:     6,
FLOOR_ROWS:     5,
CUST_EMOJIS:    [‘👨’,‘👩’,‘👴’,‘👵’,‘👦’,‘👧’,‘🧑’,‘👱’],
};

// ── Shared save/load ──
const DB = {
genId(){ return Math.random().toString(36).substr(2,8).toUpperCase(); },
save(state){
if(!state.user) return;
try{ localStorage.setItem(‘bk2_’+state.user.id, JSON.stringify(state)); }catch(e){}
},
load(uid){
try{
const raw = localStorage.getItem(‘bk2_’+uid);
if(!raw) return null;
const s = JSON.parse(raw);
if(!Array.isArray(s.branches))          s.branches=[];
if(!Array.isArray(s.hiredStaff))         s.hiredStaff=[];
if(!Array.isArray(s.achievements))       s.achievements=[];
if(!Array.isArray(s.purchasedItems))     s.purchasedItems=[];
if(!s.branchProgress)                    s.branchProgress={};
return s;
}catch(e){ return null; }
},
getTitle(income){
let t = GD.TITLES[0];
for(const tt of GD.TITLES){ if(income >= tt.min) t = tt; }
return t;
},
freshState(){
return {
user:null, char:null, charName:’’, money:500,
totalIncome:0, totalCooked:0, level:1, xp:0, rating:4.0,
branches:[], activeBranchIdx:0, hiredStaff:[], achievements:[],
purchasedItems:[], branchProgress:{},
combo:0, bestCombo:0, dayCount:1, dayRevenue:0, dayGoal:1500,
shopName:’’,
};
},
};
/* ═══════════════════════════════════
AUDIO.JS — Web Audio Engine
═══════════════════════════════════ */
const AudioEngine = (() => {
let ctx = null, musicOn = true, bgmNodes = [], bgmBeat = 0, bgmTimer = null;

function getCtx(){
if(!ctx) try{ ctx = new(window.AudioContext||window.webkitAudioContext)(); }catch(e){}
return ctx;
}
function resume(){ const c=getCtx(); if(c&&c.state===‘suspended’) c.resume(); }

function tone(f, type, dur, vol, delay=0){
const c=getCtx(); if(!c) return;
try{
const o=c.createOscillator(), g=c.createGain();
o.connect(g); g.connect(c.destination);
o.type=type; o.frequency.setValueAtTime(f, c.currentTime+delay);
g.gain.setValueAtTime(vol, c.currentTime+delay);
g.gain.exponentialRampToValueAtTime(0.0001, c.currentTime+delay+dur);
o.start(c.currentTime+delay); o.stop(c.currentTime+delay+dur+.05);
}catch(e){}
}
function noise(dur, vol, hipass=2000){
const c=getCtx(); if(!c) return;
try{
const buf=c.createBuffer(1,c.sampleRate*dur,c.sampleRate);
const d=buf.getChannelData(0); for(let i=0;i<d.length;i++) d[i]=(Math.random()*2-1)*(1-i/d.length);
const s=c.createBufferSource(),f=c.createBiquadFilter(),g=c.createGain();
s.buffer=buf; f.type=‘highpass’; f.frequency.value=hipass;
s.connect(f); f.connect(g); g.connect(c.destination);
g.gain.setValueAtTime(vol,c.currentTime);
g.gain.exponentialRampToValueAtTime(0.0001,c.currentTime+dur);
s.start();
}catch(e){}
}

const SFX = {
tap()    { tone(700,‘sine’,.05,.07); },
sizzle() { noise(.35,.2,2000); },
complete(){ tone(880,‘sine’,.08,.22); tone(1320,‘sine’,.18,.18,.07); tone(1760,‘sine’,.28,.16,.15); },
coin()   { tone(1200,‘square’,.05,.1); tone(1600,‘square’,.04,.08,.03); tone(2000,‘sine’,.07,.06,.06); },
correct(){ [523,659,784,1047].forEach((f,i)=>tone(f,‘sine’,.15,.17,i*.08)); },
wrong()  { tone(220,‘sawtooth’,.2,.22); tone(196,‘sawtooth’,.2,.22,.1); },
levelUp(){ [523,587,659,698,784,880,988,1047].forEach((f,i)=>tone(f,‘sine’,.18,.2,i*.07)); },
doorbell(){ tone(698,‘sine’,.12,.13); tone(880,‘sine’,.12,.13,.13); },
timeout(){ tone(440,‘square’,.08,.17); tone(330,‘square’,.08,.17,.1); tone(220,‘square’,.1,.22,.2); },
branch() { [523,659,784,659,784,1047,784,1047,1319].forEach((f,i)=>tone(f,‘sine’,.2,.26,i*.1)); },
dayEnd() { [1047,988,880,784].forEach((f,i)=>tone(f,‘sine’,.18,.18,i*.1)); },
dayStart(){ [523,659,784,1047].forEach((f,i)=>tone(f,‘sine’,.15,.2,i*.08)); },
place()  { tone(800,‘sine’,.06,.1); tone(1000,‘sine’,.06,.09,.05); },
};

// Generative BGM
const BGM_SCALE=[523,587,659,698,784,880,988,1047];
const BGM_BASS =[262,294,330,349,392,440,494,523];
const BGM_PROG =[[0,2,4],[3,5,0],[4,6,1],[2,4,6]];

function startBGM(){
if(bgmTimer) return;
bgmBeat=0;
bgmTimer=setInterval(()=>{
if(!musicOn) return;
const s=bgmBeat%32, ci=Math.floor(s/8)%BGM_PROG.length;
if(s%2===0) tone(BGM_BASS[BGM_PROG[ci][0]],‘triangle’,.28,.055);
if([0,3,6,9,12,15,18,21,24,27].includes(s)){
const ni=BGM_PROG[ci][Math.floor(Math.random()*BGM_PROG[ci].length)];
tone(BGM_SCALE[ni],‘sine’,.22,.038);
}
noise(.05,.055,6500);
bgmBeat++;
}, 220);
}
function stopBGM(){ if(bgmTimer){clearInterval(bgmTimer);bgmTimer=null;} }
function toggleMusic(){
musicOn=!musicOn;
if(musicOn) startBGM(); else stopBGM();
return musicOn;
}

return { getCtx, resume, SFX, startBGM, stopBGM, toggleMusic, get musicOn(){ return musicOn; } };
})();
/* ═══════════════════════════════════
PARTICLES.JS — Canvas Particle System
═══════════════════════════════════ */
class ParticleSystem {
constructor(scene) {
this.scene = scene;
this.particles = [];
}

// ── Emit particles ──
emit(x, y, config = {}) {
const {
count    = 8,
speed    = 120,
spread   = Math.PI * 2,
angle    = -Math.PI / 2,
gravity  = 200,
lifetime = 0.8,
colors   = [0xfbbf24, 0xf97316, 0xffffff],
size     = 6,
type     = ‘circle’, // ‘circle’ | ‘star’ | ‘spark’ | ‘smoke’
} = config;

```
for (let i = 0; i < count; i++) {
  const a = angle + (Math.random() - 0.5) * spread;
  const spd = speed * (0.5 + Math.random() * 0.5);
  this.particles.push({
    x, y,
    vx: Math.cos(a) * spd,
    vy: Math.sin(a) * spd,
    ax: 0,
    ay: gravity,
    life: lifetime,
    maxLife: lifetime,
    color: colors[Math.floor(Math.random() * colors.length)],
    size: size * (0.5 + Math.random() * 0.5),
    rotation: Math.random() * Math.PI * 2,
    rotSpeed: (Math.random() - 0.5) * 8,
    type,
    alpha: 1,
  });
}
```

}

// ── Burst: coins collected ──
burstCoin(x, y) {
this.emit(x, y, {
count: 12, speed: 160, spread: Math.PI * 2, gravity: 300,
lifetime: 0.9, size: 8, type: ‘star’,
colors: [0xfbbf24, 0xffd700, 0xffffff, 0xf97316],
});
// Trailing sparks
this.emit(x, y, {
count: 20, speed: 80, spread: Math.PI * 2, gravity: 80,
lifetime: 0.5, size: 3, type: ‘spark’,
colors: [0xfbbf24, 0xffffff],
});
}

// ── Burst: order complete ──
burstComplete(x, y) {
this.emit(x, y, {
count: 15, speed: 200, spread: Math.PI * 1.5, angle: -Math.PI / 2,
gravity: 250, lifetime: 1.0, size: 10, type: ‘star’,
colors: [0x10b981, 0xfbbf24, 0xffffff, 0x34d399],
});
this.emit(x, y, {
count: 25, speed: 100, spread: Math.PI * 2, gravity: 50,
lifetime: 0.6, size: 4, type: ‘spark’,
colors: [0x10b981, 0xffffff],
});
}

// ── Burst: cooking sizzle ──
burstSizzle(x, y) {
this.emit(x, y, {
count: 8, speed: 60, spread: Math.PI / 2, angle: -Math.PI / 2,
gravity: 20, lifetime: 0.5, size: 4, type: ‘smoke’,
colors: [0xffffff, 0xd4d4d4, 0xa3a3a3],
});
}

// ── Burst: level up ──
burstLevelUp(x, y) {
for (let ring = 0; ring < 3; ring++) {
setTimeout(() => {
this.emit(x, y, {
count: 20, speed: 180 + ring * 40, spread: Math.PI * 2,
gravity: -30, lifetime: 1.2, size: 8, type: ‘star’,
colors: [0xfbbf24, 0xf97316, 0xffffff, 0xffd700],
});
}, ring * 100);
}
}

// ── Burst: order expired ──
burstExpire(x, y) {
this.emit(x, y, {
count: 10, speed: 100, spread: Math.PI * 2,
gravity: 100, lifetime: 0.6, size: 6, type: ‘circle’,
colors: [0xef4444, 0xfca5a5, 0xffffff],
});
}

// ── Update (delta in seconds) ──
update(delta) {
for (let i = this.particles.length - 1; i >= 0; i–) {
const p = this.particles[i];
p.life -= delta;
if (p.life <= 0) { this.particles.splice(i, 1); continue; }

```
  const t = p.life / p.maxLife;
  p.x += p.vx * delta;
  p.y += p.vy * delta;
  p.vx += p.ax * delta;
  p.vy += p.ay * delta;
  p.rotation += p.rotSpeed * delta;

  if (p.type === 'smoke') {
    p.vx *= (1 - delta * 2);
    p.size += delta * 12;
    p.alpha = t * 0.5;
  } else if (p.type === 'spark') {
    p.alpha = t;
    p.vx *= (1 - delta * 3);
    p.vy *= (1 - delta * 0.5);
  } else {
    p.alpha = t;
  }
}
```

}

// ── Draw onto Phaser Graphics / Canvas context ──
drawOnGraphics(gfx) {
for (const p of this.particles) {
const r = (p.color >> 16) & 0xff;
const g = (p.color >> 8) & 0xff;
const b = p.color & 0xff;
const hex = p.color;

```
  gfx.fillStyle(hex, p.alpha);
  gfx.lineStyle(0);

  if (p.type === 'star') {
    // Draw 4-pointed star
    gfx.save();
    gfx.translateCanvas(p.x, p.y);
    gfx.fillStyle(hex, p.alpha);
    const s = p.size;
    gfx.fillTriangle(-s*.3,-s, s*.3,-s, 0,-s*.1);
    gfx.fillTriangle(-s*.3,s, s*.3,s, 0,s*.1);
    gfx.fillTriangle(-s,-s*.3, -s,s*.3, -s*.1,0);
    gfx.fillTriangle(s,-s*.3, s,s*.3, s*.1,0);
    gfx.restore();
  } else if (p.type === 'spark') {
    // Thin line spark
    gfx.lineStyle(p.size*.5, hex, p.alpha);
    gfx.strokeLineShape({
      x1: p.x, y1: p.y,
      x2: p.x - p.vx * 0.04,
      y2: p.y - p.vy * 0.04,
    });
  } else if (p.type === 'smoke') {
    gfx.fillStyle(hex, p.alpha * 0.4);
    gfx.fillCircle(p.x, p.y, p.size);
  } else {
    gfx.fillCircle(p.x, p.y, p.size * p.life / p.maxLife);
  }
}
```

}

get count() { return this.particles.length; }
}
/* ═══════════════════════════════════
BootScene.js
═══════════════════════════════════ */
class BootScene extends Phaser.Scene {
constructor() { super(‘BootScene’); }
preload() {
// Generate textures procedurally (no external assets needed)
}
create() {
this.scene.start(‘GameScene’);
}
}
class LoginScene extends Phaser.Scene {
constructor() { super(‘LoginScene’); }
create() {}
}
class CharSelectScene extends Phaser.Scene {
constructor() { super(‘CharSelectScene’); }
create() {}
}
class LocationScene extends Phaser.Scene {
constructor() { super(‘LocationScene’); }
create() {}
}
CharSelectScene
LocationScene
/* ═══════════════════════════════════
GameScene.js — Core Rendering Pipeline
Delta Time Game Loop + Lighting + Particles
═══════════════════════════════════ */
class GameScene extends Phaser.Scene {
constructor() { super({ key: ‘GameScene’, active: false }); }

// ══════════════════════════════
//  CREATE
// ══════════════════════════════
create() {
const W = this.scale.width, H = this.scale.height;
this.W = W; this.H = H;
this.gs = window.GAME_STATE;
this.particles = new ParticleSystem(this);
this.dayTimer = GD.DAY_DURATION / 1000;
this.dayRunning = true;
this.activeOrders = window.ACTIVE_ORDERS;
this._orderIdCtr = window.ORDER_ID_CTR;
this.combo = 0;
this.autoServeTimers = [];
this._shopChars = [];   // animated customer/staff figures
this._cookingItems = {};

```
// ── Scene layers ──
// 1) Background
this.bgGfx = this.add.graphics();
// 2) Shop building
this.shopGfx = this.add.graphics();
// 3) Characters (canvas-drawn)
this.charGfx = this.add.graphics();
// 4) Particles
this.partGfx = this.add.graphics();
// 5) Lighting overlay (multiply blend)
this.lightGfx = this.add.graphics();
// 6) Vignette + top overlay
this.postGfx = this.add.graphics();
// 7) HUD (always on top)
this.hudGfx = this.add.graphics();

// ── DOM UI Panel (bottom, HTML overlay) ──
this._buildDOMPanel();

// ── Ensure shop has default layout ──
this._ensureShopReady();

// ── Start systems ──
this._startOrderSpawner();
this._startAutoServe();
this._startPassiveIncome();
AudioEngine.startBGM();

// ── Input ──
this.input.on('pointerdown', (ptr) => {
  AudioEngine.resume();
  this._handleTap(ptr.x, ptr.y);
});

// ── Day timer event ──
this._dayTimerEvent = this.time.addEvent({
  delay: 1000, loop: true,
  callback: () => {
    if (!this.dayRunning) return;
    this.dayTimer--;
    if (this.dayTimer <= 0) { this.dayRunning = false; this._endDay(); }
  }
});

// ── Init UI ──
this.scene.launch('UIScene');
this.scene.bringToTop('UIScene');
this._refreshUI();

// Intro flash
this.cameras.main.flash(400, 255, 248, 220);
```

}

// ══════════════════════════════
//  UPDATE — Delta Time Loop
// ══════════════════════════════
update(time, delta) {
const dt = delta / 1000; // seconds

```
// Clear all graphics layers each frame
this.bgGfx.clear();
this.shopGfx.clear();
this.charGfx.clear();
this.partGfx.clear();
this.lightGfx.clear();
this.postGfx.clear();
this.hudGfx.clear();

// ── Render passes ──
this._drawBackground(dt);
this._drawShopBuilding(dt);
this._drawCharacters(dt);
this.particles.update(dt);
this._drawParticles();
this._drawLighting(dt);
this._drawVignette();
this._drawHUD();

// Update animated chars
this._updateChars(dt);
```

}

// ══════════════════════════════
//  PASS 1: Background
// ══════════════════════════════
_drawBackground(dt) {
const { W, H, bgGfx } = this;

```
// Sky gradient (comic-warm blue)
const skyH = H * 0.38;
for (let y = 0; y < skyH; y += 2) {
  const t = y / skyH;
  const r = Phaser.Math.Linear(0x6e, 0xb8, t);
  const g = Phaser.Math.Linear(0xc6, 0xe4, t);
  const b = Phaser.Math.Linear(0xf0, 0xf8, t);
  bgGfx.fillStyle(Phaser.Display.Color.GetColor(r, g, b), 1);
  bgGfx.fillRect(0, y, W, 2);
}

// Ground gradient
for (let y = skyH; y < H * 0.62; y += 2) {
  const t = (y - skyH) / (H * 0.24);
  const r = Phaser.Math.Linear(0xf5, 0xe8, t);
  const g = Phaser.Math.Linear(0xe6, 0xd4, t);
  const b = Phaser.Math.Linear(0xc8, 0xa0, t);
  bgGfx.fillStyle(Phaser.Display.Color.GetColor(r, g, b), 1);
  bgGfx.fillRect(0, y, W, 2);
}

// Animated sun
const sunX = W * 0.85, sunY = H * 0.06;
const sunR = 22;
const t = this.time.now / 1000;
// Sun glow
for (let i = 4; i >= 0; i--) {
  bgGfx.fillStyle(0xfbbf24, 0.04 * (5 - i));
  bgGfx.fillCircle(sunX, sunY, sunR + i * 8);
}
bgGfx.fillStyle(0xffd700, 1); bgGfx.fillCircle(sunX, sunY, sunR);
bgGfx.fillStyle(0xfffacd, 0.7); bgGfx.fillCircle(sunX - 4, sunY - 4, sunR * 0.4);

// Ray lines from sun
bgGfx.lineStyle(1.5, 0xfbbf24, 0.35);
for (let i = 0; i < 8; i++) {
  const a = (i / 8) * Math.PI * 2 + t * 0.3;
  bgGfx.strokeLineShape({
    x1: sunX + Math.cos(a) * (sunR + 4),
    y1: sunY + Math.sin(a) * (sunR + 4),
    x2: sunX + Math.cos(a) * (sunR + 14),
    y2: sunY + Math.sin(a) * (sunR + 14),
  });
}

// Animated clouds
this._drawCloud(bgGfx, ((t * 18) % (W + 80)) - 40, H * 0.09, 1.0);
this._drawCloud(bgGfx, ((t * 10 + W * 0.4) % (W + 80)) - 40, H * 0.16, 0.7);

// Sky cross-hatch lines (comic style)
bgGfx.lineStyle(0.8, 0xffffff, 0.08);
for (let x = 0; x < W; x += 14) bgGfx.strokeLineShape({ x1:x, y1:0, x2:x, y2:skyH });
for (let y = 0; y < skyH; y += 14) bgGfx.strokeLineShape({ x1:0, y1:y, x2:W, y2:y });
```

}

_drawCloud(gfx, x, y, scale) {
const s = scale;
gfx.fillStyle(0xffffff, 0.85 * s);
gfx.fillCircle(x, y, 16 * s);
gfx.fillCircle(x + 18 * s, y - 4 * s, 20 * s);
gfx.fillCircle(x + 36 * s, y, 14 * s);
gfx.fillRect(x - 2 * s, y, 40 * s, 16 * s);
// Outline
gfx.lineStyle(1.5, 0x1a0a00, 0.15 * s);
gfx.strokeCircle(x + 18 * s, y - 4 * s, 20 * s);
}

// ══════════════════════════════
//  PASS 2: Shop Building
// ══════════════════════════════
_drawShopBuilding(dt) {
const { W, H, shopGfx } = this;
const shop = this._getShop();
const bW = Math.min(W * 0.92, 340);
const bX = (W - bW) / 2;
const bH = H * 0.42;
const bY = H * 0.58;
this._shopRect = { x: bX, y: bY, w: bW, h: bH };

```
// ── Shadow ──
shopGfx.fillStyle(0x000000, 0.25);
shopGfx.fillRoundedRect(bX + 5, bY + 5, bW, bH, 10);

// ── Main wall ──
// Wall gradient (warm brick red)
for (let row = 0; row < bH; row += 3) {
  const t = row / bH;
  const r = Phaser.Math.Linear(0xd4, 0x9a, t);
  const g = Phaser.Math.Linear(0x52, 0x30, t);
  const b = Phaser.Math.Linear(0x20, 0x10, t);
  shopGfx.fillStyle(Phaser.Display.Color.GetColor(r, g, b), 1);
  shopGfx.fillRect(bX, bY + row, bW, 3);
}

// ── Roof stripe ──
const stripeH = 10;
const stripeW = 22;
for (let sx = bX; sx < bX + bW; sx += stripeW * 2) {
  shopGfx.fillStyle(0xfbbf24, 1); shopGfx.fillRect(sx, bY, stripeW, stripeH);
  shopGfx.fillStyle(0xffffff, 1); shopGfx.fillRect(sx + stripeW, bY, stripeW, stripeH);
}
shopGfx.lineStyle(2, 0x1a0a00, 1); shopGfx.strokeRect(bX, bY, bW, stripeH);

// ── Sign bar ──
const signY = bY + stripeH;
const signH = 28;
shopGfx.fillStyle(0xfbbf24, 1); shopGfx.fillRect(bX, signY, bW, signH);
shopGfx.lineStyle(2, 0x1a0a00, 1); shopGfx.strokeRect(bX, signY, bW, signH);
// Sign text drawn via DOM

// ── Window / Interior grid ──
const gridY = signY + signH + 4;
const gridH = bH - stripeH - signH - 4;
const layout = shop?.layout || [];
const cols = GD.FLOOR_COLS, rows = GD.FLOOR_ROWS;
const cellW = (bW - 8) / cols;
const cellH = (gridH - 6) / rows;

for (let r = 0; r < rows; r++) {
  for (let c = 0; c < cols; c++) {
    const idx = r * cols + c;
    const key = layout[idx];
    const cx = bX + 4 + c * cellW;
    const cy = gridY + 3 + r * cellH;

    // Cell background
    shopGfx.fillStyle(key ? 0xfff0d8 : 0xffe8c0, 0.12);
    shopGfx.fillRoundedRect(cx + 1, cy + 1, cellW - 2, cellH - 2, 3);
    // Cell border
    shopGfx.lineStyle(0.5, 0x1a0a00, 0.2);
    shopGfx.strokeRoundedRect(cx + 1, cy + 1, cellW - 2, cellH - 2, 3);

    // Store cell rects for tap detection
    if (!this._cellRects) this._cellRects = [];
    this._cellRects[idx] = { x: cx, y: cy, w: cellW, h: cellH };
  }
}

// ── Outer border (thick ink) ──
shopGfx.lineStyle(3, 0x1a0a00, 1);
shopGfx.strokeRoundedRect(bX, bY, bW, bH, { tl: 10, tr: 10, bl: 0, br: 0 });

// Store for character layer
this._shopLayout = { bX, bY, bW, bH, gridY, gridH, cellW, cellH };
```

}

// ══════════════════════════════
//  PASS 3: Characters
// ══════════════════════════════
_drawCharacters(dt) {
// Characters are stored as objects and drawn each frame
}

_updateChars(dt) {
const now = this.time.now;
for (let i = this._shopChars.length - 1; i >= 0; i–) {
const ch = this._shopChars[i];
ch.age += dt;

```
  // Walk-in: slide from left
  if (ch.state === 'entering') {
    ch.x = Phaser.Math.Linear(ch.x, ch.targetX, dt * 5);
    if (Math.abs(ch.x - ch.targetX) < 2) { ch.state = 'waiting'; ch.stateAge = 0; }
  }
  // Waiting: gentle bob
  if (ch.state === 'waiting') { ch.stateAge += dt; }
  // Happy: jump
  if (ch.state === 'happy') {
    ch.stateAge += dt;
    if (ch.stateAge > 0.8) { ch.state = 'leaving'; ch.stateAge = 0; }
  }
  // Leaving: slide out
  if (ch.state === 'leaving') {
    ch.stateAge += dt;
    ch.x += dt * 120;
    ch.alpha = Math.max(0, 1 - ch.stateAge * 2);
    if (ch.stateAge > 0.6) { this._shopChars.splice(i, 1); continue; }
  }
  // Angry
  if (ch.state === 'angry') {
    ch.stateAge += dt;
    if (ch.stateAge > 0.6) { ch.state = 'leaving'; ch.stateAge = 0; }
  }

  // Draw char
  this._drawCharFigure(ch, dt);
}
```

}

_drawCharFigure(ch, dt) {
const gfx = this.charGfx;
if (!ch.x || ch.alpha <= 0) return;

```
const bobY = ch.state === 'waiting' ? Math.sin(ch.stateAge * 3) * 2.5 : 0;
const jumpY = ch.state === 'happy' ? -Math.abs(Math.sin(ch.stateAge * Math.PI * 4)) * 12 : 0;
const shakeX = ch.state === 'angry' ? Math.sin(ch.stateAge * 30) * 3 : 0;
const cookRot = ch.role === 'staff' ? Math.sin((this.time.now / 1000) * 8) * 0.15 : 0;

const drawX = ch.x + shakeX;
const drawY = ch.y + bobY + jumpY;
const alpha = ch.alpha ?? 1;
const sz = ch.size ?? 28;

// Shadow
gfx.fillStyle(0x000000, 0.2 * alpha);
gfx.fillEllipse(drawX, ch.y + 2, sz * 0.8, 6);

// Character circle (emoji bg)
gfx.fillStyle(0xffffff, 0.9 * alpha);
gfx.fillCircle(drawX, drawY - sz * 0.5, sz * 0.55);
gfx.lineStyle(2, 0x1a0a00, alpha);
gfx.strokeCircle(drawX, drawY - sz * 0.5, sz * 0.55);

// Speech bubble
if (ch.bubble && ch.age < ch.bubbleLife) {
  const bAlpha = Math.min(1, (ch.bubbleLife - ch.age) * 2) * alpha;
  const bW = ch.bubble.length * 7 + 14;
  const bH = 18;
  const bX = drawX - bW / 2;
  const bY2 = drawY - sz * 1.3 - bH;
  gfx.fillStyle(0xffffff, bAlpha);
  gfx.fillRoundedRect(bX, bY2, bW, bH, 6);
  gfx.lineStyle(2, 0x1a0a00, bAlpha);
  gfx.strokeRoundedRect(bX, bY2, bW, bH, 6);
  // Tail
  gfx.fillStyle(0xffffff, bAlpha);
  gfx.fillTriangle(drawX - 4, bY2 + bH, drawX + 4, bY2 + bH, drawX, bY2 + bH + 5);
}

// Sparkle on happy
if (ch.state === 'happy') {
  const t = ch.stateAge;
  gfx.fillStyle(0xfbbf24, Math.max(0, 1 - t * 2));
  gfx.fillStar(drawX + 15, drawY - sz, 5, 6, 3);
  gfx.fillStar(drawX - 14, drawY - sz - 5, 5, 5, 2.5);
}
```

}

addCustomer(order) {
const sl = this._shopLayout;
if (!sl) return;
const targetX = sl.bX + 20 + Math.random() * (sl.bW * 0.6);
const charY = sl.bY + sl.bH - 10;
this._shopChars.push({
id: order.id, role: ‘customer’,
emoji: order.cust,
x: -30, targetX, y: charY,
state: ‘entering’, stateAge: 0, age: 0,
alpha: 1, size: 26,
bubble: ‘我要’ + order.item.name + ‘！’,
bubbleLife: 2.5,
});
}

serveCustomer(orderId) {
const ch = this._shopChars.find(c => c.id === orderId);
if (ch) { ch.state = ‘happy’; ch.stateAge = 0; ch.bubble = ‘謝謝！’; ch.bubbleLife = 0.8; ch.age = 0; }
}

angryCustomer(orderId) {
const ch = this._shopChars.find(c => c.id === orderId);
if (ch) { ch.state = ‘angry’; ch.stateAge = 0; ch.bubble = ‘太慢了！’; ch.bubbleLife = 0.6; ch.age = 0; }
}

// ══════════════════════════════
//  PASS 4: Particles
// ══════════════════════════════
_drawParticles() {
this.particles.drawOnGraphics(this.partGfx);
}

// ══════════════════════════════
//  PASS 5: Dynamic Lighting
// ══════════════════════════════
_drawLighting(dt) {
const { W, H, lightGfx } = this;
const t = this.time.now / 1000;

```
// Warm ambient fill at bottom (shop interior glow)
lightGfx.fillStyle(0xf97316, 0.06);
lightGfx.fillRect(0, H * 0.55, W, H * 0.45);

// Animated warm light over cooking area (pulsing)
const pulse = 0.5 + Math.sin(t * 2) * 0.08;
const sl = this._shopLayout;
if (sl) {
  const cx = sl.bX + sl.bW * 0.75;
  const cy = sl.bY + 60;
  const grad = this.make.graphics({ x: 0, y: 0, add: false });
  // Radial spotlight glow (simulated with concentric circles)
  for (let r = 5; r >= 0; r--) {
    lightGfx.fillStyle(0xf59e0b, 0.03 * pulse * (6 - r));
    lightGfx.fillCircle(cx, cy, 20 + r * 15);
  }
}

// Sign flicker light
const signPulse = 0.5 + Math.sin(t * 4 + 1) * 0.5;
if (sl) {
  for (let r = 3; r >= 0; r--) {
    lightGfx.fillStyle(0xfbbf24, 0.025 * signPulse * (4 - r));
    lightGfx.fillRect(sl.bX - r * 3, sl.bY + 10 - r, sl.bW + r * 6, 28 + r * 2);
  }
}
```

}

// ══════════════════════════════
//  PASS 6: Vignette + Post FX
// ══════════════════════════════
_drawVignette() {
const { W, H, postGfx } = this;

```
// Vignette (dark edges)
const steps = 8;
for (let i = 0; i < steps; i++) {
  const t = i / steps;
  const alpha = t * t * 0.5; // quadratic falloff
  const margin = (1 - t) * W * 0.5;
  postGfx.fillStyle(0x000000, alpha * 0.4);
  // Left
  postGfx.fillRect(0, 0, margin * 0.4, H);
  // Right
  postGfx.fillRect(W - margin * 0.4, 0, margin * 0.4, H);
  // Top
  postGfx.fillRect(0, 0, W, margin * 0.3);
  // Bottom
  postGfx.fillRect(0, H - margin * 0.25, W, margin * 0.25);
}

// Comic ink outline border around entire screen
postGfx.lineStyle(4, 0x1a0a00, 0.3);
postGfx.strokeRect(2, 2, W - 4, H - 4);
```

}

// ══════════════════════════════
//  PASS 7: HUD (canvas)
// ══════════════════════════════
_drawHUD() {
const { W, hudGfx } = this;
const gs = this.gs;

```
// Day progress bar (thin strip at very top)
const barY = 0, barH = 4;
const total = GD.DAY_DURATION / 1000;
const pct = Math.max(0, 1 - this.dayTimer / total);
hudGfx.fillStyle(0x1a0a00, 0.7); hudGfx.fillRect(0, barY, W, barH);
hudGfx.fillStyle(0x10b981, 0.9); hudGfx.fillRect(0, barY, W * pct, barH);
// Glow on progress bar tip
const tipX = W * pct;
hudGfx.fillStyle(0x34d399, 0.5); hudGfx.fillRect(tipX - 3, barY, 6, barH);
```

}

// ══════════════════════════════
//  DOM PANEL (bottom UI)
// ══════════════════════════════
_buildDOMPanel() {
const gs = this.gs;
const shop = this._getShop();
const overlay = document.getElementById(‘ui-overlay’);
if (!overlay) return;
overlay.classList.add(‘interactive’);
overlay.innerHTML = this._hudHTML() + this._panelHTML();
this._attachPanelEvents();
this._refreshShopSign();
}

_hudHTML() {
const gs = this.gs;
const td = DB.getTitle(gs.totalIncome);
const av = gs.char === ‘boy’ ? ‘👦’ : ‘👧’;
const total = GD.DAY_DURATION / 1000;
return `<div id="dom-hud" style=" position:fixed;top:env(safe-area-inset-top,0);left:0;right:0; height:52px;background:rgba(245,158,11,.95); border-bottom:3px solid #1a0a00; display:flex;align-items:center;gap:6px;padding:0 10px; box-shadow:0 3px 0 #1a0a00; font-family:'Noto Sans TC',sans-serif; z-index:50; "> <div onclick="window._gameScene?.showProfile()" style="display:flex;align-items:center;gap:7px;cursor:pointer;flex-shrink:0"> <span style="font-size:1.6rem;filter:drop-shadow(2px 2px 0 rgba(0,0,0,.5))">${av}</span> <div> <div style="color:white;font-weight:900;font-size:.82rem;text-shadow:1px 1px 0 rgba(0,0,0,.4);white-space:nowrap;max-width:60px;overflow:hidden;text-overflow:ellipsis" id="hud-name">${gs.charName}</div> <div style="color:#1a0a00;font-size:.64rem;font-weight:900">Lv.<span id="hud-lv">${td.level}</span> ${td.title}</div> </div> </div> <div style=" flex:1;display:flex;align-items:center;justify-content:center;gap:3px; background:white;border:3px solid #1a0a00;border-radius:18px; padding:3px 10px;box-shadow:3px 3px 0 #1a0a00; font-weight:900;color:#1a0a00;font-size:.88rem; ">💰 <span id="hud-money">${gs.money.toLocaleString()}</span> 元</div> <div style="display:flex;gap:4px;flex-shrink:0"> <button onclick="window._gameScene?.toggleMusicBtn(this)" style=" padding:5px 7px;background:white;border:3px solid #1a0a00;border-radius:8px; font-size:.72rem;cursor:pointer;min-height:32px;min-width:32px; box-shadow:3px 3px 0 #1a0a00;font-weight:900; " id="btn-music">🎵</button> <button onclick="window._gameScene?.showMap()" style=" padding:5px 7px;background:white;border:3px solid #1a0a00;border-radius:8px; font-size:.72rem;cursor:pointer;min-height:32px;min-width:32px; box-shadow:3px 3px 0 #1a0a00; ">🗺️</button> </div> </div> <!-- Day timer info bar --> <div id="dom-daybar" style=" position:fixed;top:calc(env(safe-area-inset-top,0) + 52px);left:0;right:0; background:rgba(29,16,5,.92);border-bottom:2px solid #1a0a00; padding:4px 12px;display:flex;align-items:center;gap:8px; font-family:'Noto Sans TC',sans-serif;z-index:49;height:44px; "> <span style="color:#fbbf24;font-size:.68rem;font-weight:900;flex-shrink:0">⏰</span> <div style="flex:1;height:8px;background:rgba(255,255,255,.1);border:2px solid #1a0a00;border-radius:4px;overflow:hidden"> <div id="dom-dayfill" style="height:100%;width:0%;background:linear-gradient(90deg,#f59e0b,#10b981);transition:width 1s linear;border-radius:2px"></div> </div> <span id="dom-daytime" style="color:white;font-size:.72rem;font-weight:900;flex-shrink:0;min-width:40px;text-align:right">30:00</span> <span style="color:#6b7280;font-size:.65rem">目標<strong id="dom-daygoal" style="color:#fbbf24">$0</strong></span> <span style="color:#6b7280;font-size:.65rem">今日<strong id="dom-dayearned" style="color:#34d399">$0</strong></span> </div> <!-- Orders row (floating above shop) --> <div id="dom-orders" style=" position:fixed;top:calc(env(safe-area-inset-top,0) + 100px); left:0;right:0; display:flex;gap:8px;padding:0 10px; overflow-x:auto;-webkit-overflow-scrolling:touch;scrollbar-width:none; z-index:45;min-height:90px;align-items:flex-start;pointer-events:none; "></div> <!-- Toast --> <div id="dom-toast" style=" position:fixed;top:calc(env(safe-area-inset-top,0) + 56px); left:50%;transform:translateX(-50%); background:white;color:#1a0a00;padding:8px 16px;border-radius:14px; font-size:.8rem;pointer-events:none;opacity:0;transition:opacity .25s; z-index:9999;border:3px solid #1a0a00;white-space:nowrap; max-width:calc(100% - 20px);font-weight:900;box-shadow:4px 4px 0 #1a0a00; font-family:'Noto Sans TC',sans-serif; " id="toast"></div> <!-- Combo flash --> <div id="dom-combo" style=" position:fixed;top:50%;left:50%;transform:translate(-50%,-50%); color:white;font-size:1.6rem;font-weight:900; font-family:'Fredoka One',cursive;pointer-events:none;opacity:0; text-shadow:3px 3px 0 #1a0a00,0 0 20px rgba(245,158,11,.9); z-index:9998;transition:opacity .1s; "></div>`;
}

_panelHTML() {
return `
<!-- Shop sign overlay -->
<div id="dom-sign" style="
position:fixed;
font-family:'Noto Sans TC',sans-serif;
font-weight:900;font-size:.82rem;color:#1a0a00;
text-align:center;pointer-events:none;
z-index:46;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;
text-shadow:none;letter-spacing:.5px;
"></div>

```
<!-- Bottom Panel -->
<div id="dom-panel" style="
  position:fixed;bottom:0;left:0;right:0;
  background:#1c1008;border-top:3px solid #1a0a00;
  height:calc(235px + env(safe-area-inset-bottom,0px));
  display:flex;flex-direction:column;
  font-family:'Noto Sans TC',sans-serif;
  z-index:50;
">
  <!-- Tabs -->
  <div style="display:flex;border-bottom:3px solid #1a0a00;height:40px;background:#2d1a0a;flex-shrink:0">
    <button class="ptab active" data-tab="cook"   onclick="window._gameScene?.switchPanel('cook')"  >🍳 製作</button>
    <button class="ptab"        data-tab="staff"  onclick="window._gameScene?.switchPanel('staff')" >👨‍🍳 員工</button>
    <button class="ptab"        data-tab="buy"    onclick="window._gameScene?.switchPanel('buy')"   >🛒 購買</button>
    <button class="ptab"        data-tab="stats"  onclick="window._gameScene?.switchPanel('stats')" >📊 統計</button>
  </div>
  <!-- Content -->
  <div id="tab-cook"  class="tab-pane active" style="overflow-y:auto;flex:1;padding:8px 10px"></div>
  <div id="tab-staff" class="tab-pane"        style="overflow-y:auto;flex:1;padding:8px 10px;display:none"></div>
  <div id="tab-buy"   class="tab-pane"        style="overflow-y:auto;flex:1;padding:8px 10px;display:none"></div>
  <div id="tab-stats" class="tab-pane"        style="overflow-y:auto;flex:1;padding:8px 10px;display:none"></div>
</div>

<style>
  .ptab{flex:1;border:none;background:transparent;color:#a08060;cursor:pointer;font-family:inherit;font-size:clamp(.64rem,3vw,.74rem);font-weight:900;border-bottom:3px solid transparent;border-right:1px solid rgba(255,255,255,.06);touch-action:manipulation}
  .ptab:last-child{border-right:none}
  .ptab.active{color:#fbbf24;border-bottom-color:#f59e0b;background:rgba(245,158,11,.08)}
  .menu-grid-g{display:grid;grid-template-columns:repeat(auto-fill,minmax(62px,1fr));gap:6px}
  .menu-btn{
    background:#fff8e7;border:3px solid #1a0a00;border-radius:10px;
    padding:6px 3px;text-align:center;cursor:pointer;
    min-height:68px;display:flex;flex-direction:column;align-items:center;justify-content:center;
    box-shadow:3px 3px 0 #1a0a00;touch-action:manipulation;
    transition:transform .1s,box-shadow .1s;position:relative;
  }
  .menu-btn:active{transform:translate(2px,2px);box-shadow:1px 1px 0 #1a0a00}
  .menu-btn.cooking{opacity:.6;pointer-events:none}
  .menu-btn.wanted{border-color:#f59e0b!important;background:#fff8c0!important;box-shadow:3px 3px 0 #f59e0b!important;animation:wantedGlow .6s infinite alternate}
  @keyframes wantedGlow{from{box-shadow:3px 3px 0 #f59e0b}to{box-shadow:3px 3px 0 #f97316,0 0 10px rgba(245,158,11,.5)}}
  .menu-btn .me{font-size:1.4rem;display:block;margin-bottom:2px}
  .menu-btn .mn{color:#1a0a00;font-size:.58rem;font-weight:900}
  .menu-btn .mp{color:#f97316;font-size:.64rem;font-weight:900}
  .menu-btn .mt{color:#a08060;font-size:.54rem}
  .order-card-g{
    pointer-events:all;
    background:white;border:3px solid #1a0a00;border-radius:12px;
    padding:5px 6px;min-width:68px;max-width:76px;text-align:center;flex-shrink:0;
    box-shadow:3px 3px 0 #1a0a00;
    transform:translateY(-14px) scale(.8);opacity:0;
    transition:transform .3s,opacity .3s;
  }
  .order-card-g.oi{transform:translateY(0) scale(1);opacity:1}
  .order-card-g.od{transform:translateY(-20px) scale(.7);opacity:0;border-color:#10b981;transition:all .3s}
  .order-card-g.oe{transform:translateY(8px) scale(.8);opacity:0;border-color:#ef4444;transition:all .3s}
  .order-card-g.urgent{animation:urgG .35s infinite alternate;border-color:#ef4444}
  @keyframes urgG{from{box-shadow:3px 3px 0 #ef4444}to{box-shadow:3px 3px 0 #ef4444,0 0 10px rgba(239,68,68,.6)}}
  .ot{height:4px;background:#e0d0b0;border:1px solid #1a0a00;border-radius:2px;overflow:hidden;margin-top:4px}
  .otb{height:100%;width:100%;background:#22c55e;transition:width 1s linear,background .3s;border-radius:1px}
  .staff-card{display:flex;align-items:center;gap:9px;background:#fff8e7;border:3px solid #1a0a00;border-radius:10px;padding:8px;box-shadow:3px 3px 0 #1a0a00;margin-bottom:7px}
  .buy-card{display:flex;align-items:center;gap:9px;background:#fff8e7;border:3px solid #1a0a00;border-radius:10px;padding:8px;box-shadow:3px 3px 0 #1a0a00;margin-bottom:7px}
  .game-btn{padding:7px 11px;border:3px solid #1a0a00;border-radius:8px;color:white;font-weight:900;font-size:.7rem;cursor:pointer;font-family:inherit;min-height:34px;box-shadow:3px 3px 0 #1a0a00;touch-action:manipulation}
  .game-btn:active{transform:translate(2px,2px);box-shadow:1px 1px 0 #1a0a00}
  .game-btn.green{background:#22c55e}
  .game-btn.amber{background:#f59e0b}
  .game-btn.red{background:#ef4444}
  .game-btn:disabled{background:#9ca3af;cursor:not-allowed;transform:none;box-shadow:3px 3px 0 #1a0a00;opacity:.6}
  .stat-g{display:grid;grid-template-columns:1fr 1fr 1fr;gap:6px;margin-bottom:8px}
  .stat-card-g{background:#fff8e7;border:3px solid #1a0a00;border-radius:9px;padding:7px;text-align:center;box-shadow:3px 3px 0 #1a0a00}
  .goal-card-g{background:#fff8e7;border:3px solid #1a0a00;border-radius:10px;padding:10px;box-shadow:3px 3px 0 #1a0a00}
</style>
`;
```

}

_attachPanelEvents() {
window._gameScene = this;
this._buildMenuTab();
this._buildStaffTab();
this._buildBuyTab();
this._buildStatsTab();
this._updateDayBar();
}

// ══════════════════════════════
//  MENU TAB
// ══════════════════════════════
_buildMenuTab() {
const el = document.getElementById(‘tab-cook’); if (!el) return;
el.innerHTML = `<div class="menu-grid-g" id="menu-grid-g"></div>`;
const grid = document.getElementById(‘menu-grid-g’); if (!grid) return;
GD.MENU.forEach(item => {
const btn = document.createElement(‘div’);
btn.className = ‘menu-btn’; btn.id = ‘mbtn-’ + item.id;
btn.innerHTML = `<span class="me">${item.emoji}</span><div class="mn">${item.name}</div><div class="mp">$${item.price}</div><div class="mt">${item.time}秒</div>`;
btn.onclick = () => this._cookItem(item);
grid.appendChild(btn);
});
}

// ══════════════════════════════
//  STAFF TAB
// ══════════════════════════════
_buildStaffTab() {
const el = document.getElementById(‘tab-staff’); if (!el) return;
let html = ‘’;
if (this.gs.hiredStaff.length) {
html += ‘<div style="color:#fbbf24;font-size:.72rem;font-weight:900;margin-bottom:6px">✅ 在職員工</div>’;
this.gs.hiredStaff.forEach((s, i) => {
const cat = GD.STAFF.find(c => c.id === s.staffId); if (!cat) return;
html += `<div class="staff-card"> <span style="font-size:1.4rem">${cat.emoji}</span> <div style="flex:1"> <div style="color:#1a0a00;font-size:.8rem;font-weight:900">${cat.name}</div> <div style="color:#7c3d00;font-size:.67rem;font-weight:700">${cat.desc}</div> <div style="color:#f97316;font-size:.68rem;font-weight:900">日薪 $${cat.salary}</div> </div> <button class="game-btn red" onclick="window._gameScene?._fireStaff(${i})">解雇</button> </div>`;
});
html += ‘<div style="color:#fbbf24;font-size:.72rem;font-weight:900;margin:8px 0 6px">💼 應徵員工</div>’;
} else {
html += ‘<div style="color:#fbbf24;font-size:.72rem;font-weight:900;margin-bottom:6px">💼 應徵員工</div>’;
}
GD.STAFF.forEach(cat => {
const hired = this.gs.hiredStaff.some(s => s.staffId === cat.id);
const canAfford = this.gs.money >= cat.salary * 2;
html += `<div class="staff-card"> <span style="font-size:1.4rem">${cat.emoji}</span> <div style="flex:1"> <div style="color:#1a0a00;font-size:.8rem;font-weight:900">${cat.name} ${cat.badge}</div> <div style="color:#7c3d00;font-size:.67rem;font-weight:700">${cat.desc}</div> <div style="color:#f97316;font-size:.68rem;font-weight:900">日薪 $${cat.salary}</div> </div> <button class="game-btn ${hired||!canAfford?'':'amber'}" ${hired||!canAfford?'disabled':''} onclick="window._gameScene?._hireStaff('${cat.id}')"> ${hired?'已聘':canAfford?'聘用':'錢不足'} </button> </div>`;
});
el.innerHTML = html;
}

// ══════════════════════════════
//  BUY TAB
// ══════════════════════════════
_buildBuyTab() {
const el = document.getElementById(‘tab-buy’); if (!el) return;
let html = ‘<div style="color:#fbbf24;font-size:.72rem;font-weight:900;margin-bottom:6px">🛒 購買設備（放入店面）</div>’;
Object.entries(GD.EQUIP).filter(([, v]) => !v.free).forEach(([key, item]) => {
const owned = this.gs.purchasedItems.includes(key);
html += `<div class="buy-card"> <span style="font-size:1.4rem">${item.emoji}</span> <div style="flex:1"> <div style="color:#1a0a00;font-size:.8rem;font-weight:900">${item.name}${owned?' ✅':''}</div> <div style="color:#7c3d00;font-size:.67rem;font-weight:700">${item.desc}</div> <div style="color:#f97316;font-size:.7rem;font-weight:900">${owned?'已購買':'$'+item.cost.toLocaleString()}</div> </div> <button class="game-btn ${owned?'':'amber'}" ${owned?'disabled':''} onclick="window._gameScene?._buyEquip('${key}')"> ${owned?'擁有':'購買'} </button> </div>`;
});
el.innerHTML = html;
}

// ══════════════════════════════
//  STATS TAB
// ══════════════════════════════
_buildStatsTab() {
const el = document.getElementById(‘tab-stats’); if (!el) return;
const gs = this.gs;
const pct = gs.dayGoal > 0 ? Math.min(100, Math.floor(gs.dayRevenue / gs.dayGoal * 100)) : 0;
el.innerHTML = `<div class="stat-g"> <div class="stat-card-g"><span>🏪</span><div style="color:#1a0a00;font-weight:900">${gs.branches.length}</div><div style="color:#7c3d00;font-size:.6rem">分店數</div></div> <div class="stat-card-g"><span>📦</span><div style="color:#1a0a00;font-weight:900">${gs.totalCooked}</div><div style="color:#7c3d00;font-size:.6rem">總銷售</div></div> <div class="stat-card-g"><span>💵</span><div style="color:#1a0a00;font-weight:900">$${gs.totalIncome.toLocaleString()}</div><div style="color:#7c3d00;font-size:.6rem">累積收入</div></div> <div class="stat-card-g"><span>⭐</span><div style="color:#1a0a00;font-weight:900">${gs.rating.toFixed(1)}</div><div style="color:#7c3d00;font-size:.6rem">評分</div></div> <div class="stat-card-g"><span>🔥</span><div style="color:#1a0a00;font-weight:900">${gs.bestCombo}</div><div style="color:#7c3d00;font-size:.6rem">最高Combo</div></div> <div class="stat-card-g"><span>👥</span><div style="color:#1a0a00;font-weight:900">${gs.hiredStaff.length}</div><div style="color:#7c3d00;font-size:.6rem">員工數</div></div> </div> <div class="goal-card-g"> <div style="color:#1a0a00;font-size:.82rem;font-weight:900;margin-bottom:6px">🏆 今日展店目標</div> <div style="display:flex;justify-content:space-between;font-size:.72rem;color:#7c3d00;margin-bottom:4px;font-weight:700"> <span>今日需達：<strong style="color:#f97316">$${gs.dayGoal.toLocaleString()}</strong></span> <span>已賺：<strong style="color:#22c55e">$${gs.dayRevenue.toLocaleString()}</strong></span> </div> <div style="height:14px;background:#e0d0b0;border:2px solid #1a0a00;border-radius:7px;overflow:hidden;position:relative;margin-bottom:7px"> <div style="height:100%;width:${pct}%;background:linear-gradient(90deg,#f59e0b,#22c55e);border-radius:5px;transition:width .8s"></div> <span style="position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);color:#1a0a00;font-size:.6rem;font-weight:900">${pct}%</span> </div> <button id="btn-expand" class="game-btn amber" style="width:100%;min-height:40px" onclick="window._gameScene?.showMap()" ${this._canExpand()?'':'disabled'}> 🗺️ 前往開立分店 </button> </div>`;
}

// ══════════════════════════════
//  GAME LOGIC
// ══════════════════════════════
_cookItem(item) {
const btn = document.getElementById(‘mbtn-’ + item.id);
if (btn?.classList.contains(‘cooking’)) return;
if (btn) btn.classList.add(‘cooking’);

```
AudioEngine.SFX.sizzle();
// Sizzle particles at shop cooking area
const sl = this._shopLayout;
if (sl) this.particles.burstSizzle(sl.bX + sl.bW * 0.7, sl.bY + 60);

const spd = Math.max(0.2, 1 - (this._getSpeedBonus()));
const ms = item.time * 1000 * spd;

this.time.delayedCall(ms, () => {
  if (btn) btn.classList.remove('cooking');
  const fulfilled = this._fulfillOrder(item.id);
  if (!fulfilled) {
    const earned = Math.floor(item.price * 0.7);
    this.gs.money += earned; this.gs.totalIncome += earned; this.gs.dayRevenue += earned;
    this.gs.totalCooked++; this.gs.combo = 0;
    AudioEngine.SFX.complete(); AudioEngine.SFX.coin();
    this._toast(`${item.emoji} 零散販售 +$${earned}（無訂單）`, 1800);
    if (sl) this.particles.burstCoin(sl.bX + sl.bW * 0.5, sl.bY + 40);
    this._save(); this._refreshUI();
  }
});
```

}

_startOrderSpawner() {
this._spawnOrder();
this._orderSpawnEvent = this.time.addEvent({
delay: 4000, loop: true,
callback: () => {
if (this.activeOrders.length < GD.MAX_ORDERS && this.dayRunning) this._spawnOrder();
}
});
}

_spawnOrder() {
if (!this.dayRunning) return;
const item = GD.MENU[Math.floor(Math.random() * GD.MENU.length)];
const cust = GD.CUST_EMOJIS[Math.floor(Math.random() * GD.CUST_EMOJIS.length)];
const oid = ++this._orderIdCtr;
const tmax = GD.ORDER_TIMER + (this.gs.purchasedItems.includes(‘tv’) ? 5 : 0);

```
// DOM card
const card = document.createElement('div');
card.className = 'order-card-g'; card.id = 'oc-' + oid;
card.innerHTML = `
  <div style="font-size:1rem;line-height:1;margin-bottom:2px">${cust}</div>
  <div style="font-size:1.35rem;line-height:1">${item.emoji}</div>
  <div style="color:#1a0a00;font-size:.56rem;font-weight:900;margin:2px 0 1px;overflow:hidden;white-space:nowrap;text-overflow:ellipsis">${item.name}</div>
  <div style="color:#f97316;font-size:.6rem;font-weight:900">+$${item.price}</div>
  <div class="ot"><div class="otb" id="otb-${oid}"></div></div>
`;
const row = document.getElementById('dom-orders');
if (row) row.appendChild(card);
requestAnimationFrame(() => card.classList.add('oi'));

// Countdown
let rem = tmax;
const ti = this.time.addEvent({
  delay: 1000, loop: true,
  callback: () => {
    rem--;
    const bar = document.getElementById('otb-' + oid);
    const pct = (rem / tmax) * 100;
    if (bar) { bar.style.width = pct + '%'; bar.style.background = pct > 50 ? '#22c55e' : pct > 25 ? '#f59e0b' : '#ef4444'; }
    if (rem <= 5) card.classList.add('urgent');
    if (rem <= 0) { ti.remove(); this._expireOrder(oid); }
  }
});

this.activeOrders.push({ id: oid, item, cust, timerEvent: ti, el: card, rem: tmax, tmax });
AudioEngine.SFX.doorbell();
this.addCustomer({ id: oid, item, cust });
this._updateWanted();
```

}

_expireOrder(oid) {
const idx = this.activeOrders.findIndex(o => o.id === oid); if (idx < 0) return;
const o = this.activeOrders[idx];
o.timerEvent?.remove();
o.el.classList.add(‘oe’);
setTimeout(() => o.el?.remove(), 400);
this.activeOrders.splice(idx, 1);
this.gs.combo = 0; this.gs.rating = Math.max(1, this.gs.rating - 0.1);
this.angryCustomer(oid);
AudioEngine.SFX.timeout();
const sl = this._shopLayout;
if (sl) this.particles.burstExpire(sl.bX + sl.bW * 0.3, sl.bY + 60);
this._toast(‘😤 顧客等太久走了！’, 1600);
this._save(); this._refreshUI(); this._updateWanted();
}

_fulfillOrder(itemId) {
const idx = this.activeOrders.findIndex(o => o.item.id === itemId); if (idx < 0) return false;
const o = this.activeOrders[idx];
o.timerEvent?.remove();
const speedPct = o.rem / o.tmax;
const bonus = speedPct > 0.6 ? Math.floor(o.item.price * 0.3) : 0;
const earned = o.item.price + bonus;
this.gs.money += earned; this.gs.totalIncome += earned; this.gs.dayRevenue += earned;
this.gs.totalCooked++; this.gs.xp += o.item.xp;
this.gs.combo = (this.gs.combo || 0) + 1;
if (this.gs.combo > this.gs.bestCombo) this.gs.bestCombo = this.gs.combo;

```
o.el.classList.add('od');
setTimeout(() => o.el?.remove(), 400);
this.activeOrders.splice(idx, 1);

this.serveCustomer(o.id);
AudioEngine.SFX.correct(); AudioEngine.SFX.coin();

// Particles
const sl = this._shopLayout;
if (sl) {
  this.particles.burstComplete(sl.bX + sl.bW * 0.5, sl.bY + 50);
  if (bonus > 0) this.particles.burstCoin(sl.bX + sl.bW * 0.6, sl.bY + 40);
}

const msg = bonus > 0 ? `${o.item.emoji} 快速送餐！+$${earned}（獎勵$${bonus}）` : `${o.item.emoji} ${o.item.name} 完成！+$${earned}`;
this._toast(msg, 1800);
if (this.gs.combo >= 3) this._showCombo(this.gs.combo);

// Level check
const nt = DB.getTitle(this.gs.totalIncome);
if (nt.level > this.gs.level) {
  this.gs.level = nt.level;
  AudioEngine.SFX.levelUp();
  if (sl) this.particles.burstLevelUp(this.W * 0.5, this.H * 0.4);
  this.cameras.main.flash(300, 255, 215, 0);
  setTimeout(() => this._toast(`🎊 升級！「${nt.title}」Lv.${nt.level}！`, 3000), 400);
}

this._save(); this._refreshUI(); this._updateWanted();
return true;
```

}

_hireStaff(staffId) {
const cat = GD.STAFF.find(c => c.id === staffId); if (!cat) return;
if (this.gs.hiredStaff.some(s => s.staffId === staffId)) { this._toast(‘⚠️ 已聘用此員工’); return; }
const deposit = cat.salary * 2;
if (this.gs.money < deposit) { this._toast(`💸 需要 $${deposit}（兩天薪資保證金）`); return; }
this.gs.money -= deposit;
this.gs.hiredStaff.push({ staffId, branch: this.gs.activeBranchIdx });
AudioEngine.SFX.hire ? AudioEngine.SFX.hire() : AudioEngine.SFX.complete();
this._toast(`✅ 已聘用 ${cat.name}！`);
this._save(); this._refreshUI(); this._startAutoServe();
this._buildStaffTab();
}

_fireStaff(idx) {
const s = this.gs.hiredStaff[idx]; if (!s) return;
const cat = GD.STAFF.find(c => c.id === s.staffId);
this.gs.hiredStaff.splice(idx, 1);
this._toast(`👋 ${cat?.name || '員工'} 已離職`);
this._save(); this._refreshUI(); this._startAutoServe();
this._buildStaffTab();
}

_buyEquip(key) {
const it = GD.EQUIP[key]; if (!it || it.free) return;
if (this.gs.purchasedItems.includes(key)) { this._toast(‘⚠️ 已購買’); return; }
if (this.gs.money < it.cost) { this._toast(‘💸 金錢不足！’); return; }
this.gs.money -= it.cost;
this.gs.purchasedItems.push(key);
AudioEngine.SFX.place();
this._toast(`✅ 購買「${it.name}」成功！`);
const sl = this._shopLayout;
if (sl) this.particles.burstCoin(this.W * 0.5, sl.bY + 40);
this._save(); this._refreshUI();
this._buildBuyTab();
}

_startAutoServe() {
this.autoServeTimers.forEach(e => e.remove());
this.autoServeTimers = [];
this.gs.hiredStaff.forEach(s => {
const cat = GD.STAFF.find(c => c.id === s.staffId);
if (cat?.autoServe && cat.autoInterval) {
const ev = this.time.addEvent({
delay: cat.autoInterval * 1000, loop: true,
callback: () => {
if (this.activeOrders.length > 0) {
this._fulfillOrder(this.activeOrders[0].item.id);
}
}
});
this.autoServeTimers.push(ev);
}
});
}

_startPassiveIncome() {
this.time.addEvent({
delay: 30000, loop: true,
callback: () => {
if (this.gs.branches.length <= 1) return;
let passive = 0;
this.gs.branches.slice(1).forEach(b => {
const c = GD.CITIES[b.cityId]; if (c) passive += Math.floor(c.passive / 120);
});
if (passive > 0) {
this.gs.money += passive; this.gs.totalIncome += passive;
this._toast(`💼 分店被動 +$${passive}`, 1200);
this._save(); this._refreshUI();
}
}
});
}

_endDay() {
if (this._dayEnded) return; this._dayEnded = true;
AudioEngine.SFX.dayEnd();
// Stop orders
this._orderSpawnEvent?.remove();
this.activeOrders.forEach(o => { o.timerEvent?.remove(); o.el?.remove(); });
this.activeOrders.length = 0;
// Pay staff
let salary = 0;
this.gs.hiredStaff.forEach(s => { const c = GD.STAFF.find(x => x.id === s.staffId); if (c) salary += c.salary; });
this.gs.money = Math.max(0, this.gs.money - salary);
const metGoal = this.gs.dayRevenue >= this.gs.dayGoal;
const pct = this.gs.dayGoal > 0 ? Math.min(100, Math.floor(this.gs.dayRevenue / this.gs.dayGoal * 100)) : 100;
// Update branch progress
if (metGoal) {
GD.EXPAND.forEach(e => {
if (!this.gs.branches.find(b => b.cityId === e.cityId)) {
if (this.gs.dayRevenue >= e.dayRevTarget * GD.BRANCH_PCT) {
this.gs.branchProgress[e.cityId] = (this.gs.branchProgress[e.cityId] || 0) + 1;
}
}
});
}
this._save();
this.cameras.main.fade(400, 0, 0, 0);
this.time.delayedCall(600, () => this._showDayEndModal(metGoal, pct, salary));
}

_showDayEndModal(metGoal, pct, salary) {
const overlay = document.getElementById(‘ui-overlay’); if (!overlay) return;
const modal = document.createElement(‘div’);
modal.style.cssText = ‘position:fixed;inset:0;background:rgba(0,0,0,.8);z-index:9000;display:flex;align-items:center;justify-content:center;padding:20px;animation:fadeIn .3s’;
modal.innerHTML = `<style>@keyframes fadeIn{from{opacity:0}to{opacity:1}}</style> <div style="background:white;border:4px solid #1a0a00;border-radius:20px;padding:24px;text-align:center;width:100%;max-width:310px;box-shadow:8px 8px 0 #1a0a00;font-family:'Noto Sans TC',sans-serif"> <div style="font-size:3rem;margin-bottom:8px;filter:drop-shadow(3px 3px 0 rgba(0,0,0,.3))">${metGoal ? '🎊' : '😓'}</div> <div style="color:#1a0a00;font-size:1.3rem;font-weight:900;margin-bottom:8px">第 ${this.gs.dayCount} 天結束</div> <div style="color:#7c3d00;font-size:.84rem;font-weight:700;line-height:1.7;margin-bottom:14px"> 今日營收：<strong style="color:#f97316">$${this.gs.dayRevenue.toLocaleString()}</strong><br> 今日目標：<strong style="color:#1a0a00">$${this.gs.dayGoal.toLocaleString()}</strong><br> 達成率：<strong style="color:${metGoal ? '#22c55e' : '#ef4444'}">${pct}%</strong><br> ${salary > 0 ?`員工薪資：<strong style="color:#ef4444">-$${salary}</strong><br>` : ''} ${metGoal ? '<span style="color:#22c55e">🎉 目標達成！展店進度增加！</span>' : '<span>💪 繼續加油！</span>'} </div> <button onclick="window._gameScene?._nextDay(this.closest('[style*=fixed]'))" style=" width:100%;padding:13px;background:linear-gradient(135deg,#f59e0b,#f97316); border:3px solid #1a0a00;border-radius:12px;color:white;font-weight:900;font-size:.95rem; cursor:pointer;font-family:inherit;box-shadow:4px 4px 0 #1a0a00; ">前往第 ${this.gs.dayCount + 1} 天 →</button> </div>`;
overlay.appendChild(modal);
}

_nextDay(modalEl) {
modalEl?.remove();
this.gs.dayCount++;
this.gs.dayRevenue = 0;
const br = this._getShop();
if (br) this.gs.dayGoal = Math.floor((GD.CITIES[br.cityId]?.avgPrice || 40) * 50 * (1 + this.gs.branches.length * 0.1));
this.dayTimer = GD.DAY_DURATION / 1000;
this.dayRunning = true; this._dayEnded = false;
this._save(); this._refreshUI();
AudioEngine.SFX.dayStart();
this.cameras.main.flash(400, 255, 248, 220);
this._startOrderSpawner();
this._startAutoServe();
}

// ══════════════════════════════
//  UI HELPERS
// ══════════════════════════════
switchPanel(tab) {
AudioEngine.SFX.tap();
document.querySelectorAll(’.ptab’).forEach(b => b.classList.toggle(‘active’, b.dataset.tab === tab));
[‘cook’,‘staff’,‘buy’,‘stats’].forEach(t => {
const el = document.getElementById(‘tab-’ + t);
if (el) el.style.display = t === tab ? ‘block’ : ‘none’;
});
if (tab === ‘stats’) this._buildStatsTab();
if (tab === ‘staff’) this._buildStaffTab();
if (tab === ‘buy’)   this._buildBuyTab();
}

_refreshUI() {
const gs = this.gs;
const td = DB.getTitle(gs.totalIncome);
this._setText(‘hud-money’, gs.money.toLocaleString());
this._setText(‘hud-name’, gs.charName);
this._setText(‘hud-lv’, td.level);
this._updateDayBar();
this._refreshShopSign();
}

_updateDayBar() {
const total = GD.DAY_DURATION / 1000;
const pct = Math.max(0, (1 - this.dayTimer / total)) * 100;
const fill = document.getElementById(‘dom-dayfill’);
if (fill) fill.style.width = pct + ‘%’;
const m = Math.floor(this.dayTimer / 60), s = Math.floor(this.dayTimer % 60);
this._setText(‘dom-daytime’, (m < 10 ? ‘0’ : ‘’) + m + ‘:’ + (s < 10 ? ‘0’ : ‘’) + s);
this._setText(‘dom-daygoal’, ‘$’ + (this.gs.dayGoal || 0).toLocaleString());
this._setText(‘dom-dayearned’, ‘$’ + (this.gs.dayRevenue || 0).toLocaleString());
}

_refreshShopSign() {
const sign = document.getElementById(‘dom-sign’); if (!sign) return;
const sl = this._shopLayout;
if (!sl) { sign.style.display = ‘none’; return; }
const shop = this._getShop();
const name = shop?.shopName || (this.gs.charName + ‘的早餐店’);
const safeT = parseInt(getComputedStyle(document.documentElement).getPropertyValue(’–safe-t’) || ‘0’) || 0;
sign.textContent = name;
sign.style.cssText = `position:fixed; left:${sl.bX}px;top:${sl.bY + 18}px; width:${sl.bW}px;height:28px;line-height:28px; font-family:'Noto Sans TC',sans-serif; font-weight:900;font-size:.8rem;color:#1a0a00; text-align:center;pointer-events:none;z-index:46; overflow:hidden;text-overflow:ellipsis;white-space:nowrap; letter-spacing:.5px;`;
}

_updateWanted() {
GD.MENU.forEach(item => {
const btn = document.getElementById(‘mbtn-’ + item.id); if (!btn) return;
btn.classList.toggle(‘wanted’, this.activeOrders.some(o => o.item.id === item.id));
});
}

_setText(id, val) { const el = document.getElementById(id); if (el) el.textContent = val; }

_toast(msg, dur = 2000) {
const t = document.getElementById(‘toast’) || document.getElementById(‘dom-toast’);
if (!t) return;
if (this._toastTimer) clearTimeout(this._toastTimer);
t.textContent = msg; t.style.opacity = ‘1’;
this._toastTimer = setTimeout(() => { t.style.opacity = ‘0’; }, dur);
}

_showCombo(n) {
const el = document.getElementById(‘dom-combo’); if (!el) return;
el.textContent = `🔥 COMBO ×${n}!`;
el.style.opacity = ‘1’;
el.style.transform = ‘translate(-50%,-50%) scale(1.2)’;
setTimeout(() => { el.style.opacity = ‘0’; el.style.transform = ‘translate(-50%,-50%) scale(1)’; }, 900);
}

showMap() {
AudioEngine.SFX.tap();
this._toast(‘🗺️ 展店功能（敬請期待完整版）’, 2000);
}

showProfile() {
AudioEngine.SFX.tap();
this._toast(‘👤 個人資料（敬請期待完整版）’, 2000);
}

toggleMusicBtn(btn) {
const on = AudioEngine.toggleMusic();
if (btn) btn.textContent = on ? ‘🎵’ : ‘🔇’;
}

// ══════════════════════════════
//  HELPERS
// ══════════════════════════════
_getShop() { return this.gs.branches[this.gs.activeBranchIdx] || this.gs.branches[0]; }
_getSpeedBonus() {
let spd = 0;
this.gs.hiredStaff.forEach(s => { const c = GD.STAFF.find(x => x.id === s.staffId); if (c) spd += c.speed || 0; });
if (this.gs.purchasedItems.includes(‘fridge’)) spd += 0.15;
return Math.min(0.8, spd);
}
_canExpand() {
return GD.EXPAND.some(e => {
if (this.gs.branches.find(b => b.cityId === e.cityId)) return false;
return (this.gs.branchProgress[e.cityId] || 0) >= e.daysNeeded;
});
}
_save() { DB.save(this.gs); }

_ensureShopReady() {
if (!this.gs.branches || this.gs.branches.length === 0) {
// Auto-create a default shop
const cityId = ‘taipei’;
const city = GD.CITIES[cityId];
const layout = new Array(GD.FLOOR_COLS * GD.FLOOR_ROWS).fill(null);
layout[0] = ‘cashier’; layout[1] = ‘stove’;
layout[6] = ‘table1’;  layout[7] = ‘table1’;
layout[12] = ‘counter’;
this.gs.branches = [{
cityId, cityName: city.name,
shopName: this.gs.charName + ‘的台北早餐店’,
layout, dayRevHistory: [], passive: city.passive,
}];
this.gs.dayGoal = city.avgPrice * 50;
this.gs.activeBranchIdx = 0;
}
// Ensure layout not empty
const br = this._getShop();
if (br && (!br.layout || br.layout.filter(x => x !== null).length === 0)) {
const layout = new Array(30).fill(null);
layout[0] = ‘cashier’; layout[1] = ‘stove’;
layout[6] = ‘table1’; layout[7] = ‘table1’;
layout[12] = ‘counter’;
br.layout = layout;
}
this._save();
}

_handleTap(x, y) {
// Future: tap on shop cells
}

shutdown() {
window._gameScene = null;
const overlay = document.getElementById(‘ui-overlay’);
if (overlay) { overlay.innerHTML = ‘’; overlay.classList.remove(‘interactive’); }
this.autoServeTimers.forEach(e => e.remove());
this._orderSpawnEvent?.remove();
this._dayTimerEvent?.remove();
AudioEngine.stopBGM();
}
}
/* ═══════════════════════════════════
UIScene.js — Overlay UI Scene
(Runs in parallel with GameScene)
═══════════════════════════════════ */
class UIScene extends Phaser.Scene {
constructor() { super({ key: ‘UIScene’, active: false }); }

create() {
// UIScene runs on top of GameScene
// All actual UI is DOM-based (see GameScene._buildDOMPanel)
// This scene can be used for Phaser-native HUD elements if needed
this.gameScene = this.scene.get(‘GameScene’);
}

update() {
// Forward daybar updates
if (this.gameScene && this.gameScene.dayRunning) {
this.gameScene._updateDayBar();
}
}
}
/* ═══════════════════════════════════
LOGIN.JS — DOM Login Logic
═══════════════════════════════════ */
function showLoginDOM() {
const el = document.getElementById(‘login-screen’);
if (!el) return;
el.style.display = ‘flex’;
el.style.opacity = ‘0’;
requestAnimationFrame(() => {
requestAnimationFrame(() => { el.style.opacity = ‘1’; });
});
}

function switchLoginTab(tab) {
document.querySelectorAll(’.tab-btn’).forEach(b => b.classList.remove(‘active’));
document.querySelectorAll(’.tab-pane’).forEach(p => p.classList.remove(‘active’));
document.querySelector(`.tab-btn[onclick="switchLoginTab('${tab}')"]`)?.classList.add(‘active’);
document.getElementById(‘pane-’ + tab)?.classList.add(‘active’);
AudioEngine.SFX.tap();
}

function doLogin() {
AudioEngine.resume();
const email = document.getElementById(‘li-email’)?.value.trim() || ‘demo@demo.com’;
let users = {};
try { users = JSON.parse(localStorage.getItem(‘bk2_users’) || ‘{}’); } catch(e) {}
let user = Object.values(users).find(u => u.email === email);
if (!user) {
user = { id: DB.genId(), email, name: email.split(’@’)[0] };
users[user.id] = user;
localStorage.setItem(‘bk2_users’, JSON.stringify(users));
}
localStorage.setItem(‘bk2_lastuser’, JSON.stringify(user));
const saved = DB.load(user.id);
const state = saved || DB.freshState();
state.user = user;
if (!saved) DB.save(state);
window.initPhaser(state);
}

function doRegister() {
AudioEngine.resume();
const name  = document.getElementById(‘rg-name’)?.value.trim();
const email = document.getElementById(‘rg-email’)?.value.trim();
const pass  = document.getElementById(‘rg-pass’)?.value;
if (!name || !email || !pass) { alert(‘請填寫所有欄位’); return; }
if (pass.length < 6) { alert(‘密碼至少6字元’); return; }
let users = {};
try { users = JSON.parse(localStorage.getItem(‘bk2_users’) || ‘{}’); } catch(e) {}
if (Object.values(users).find(u => u.email === email)) { alert(‘此信箱已被使用’); return; }
const user = { id: DB.genId(), email, name };
users[user.id] = user;
localStorage.setItem(‘bk2_users’, JSON.stringify(users));
localStorage.setItem(‘bk2_lastuser’, JSON.stringify(user));
const state = DB.freshState();
state.user = user;
DB.save(state);
window.initPhaser(state);
}

function doFBLogin() {
AudioEngine.resume();
let fbId = localStorage.getItem(‘bk2_fb_id’);
if (!fbId) { fbId = ‘FB’ + DB.genId(); localStorage.setItem(‘bk2_fb_id’, fbId); }
const u = { id: fbId, email: ‘fb_’ + fbId + ‘@fb.com’, name: ‘Facebook用戶’ };
let users = {};
try { users = JSON.parse(localStorage.getItem(‘bk2_users’) || ‘{}’); } catch(e) {}
users[fbId] = u;
localStorage.setItem(‘bk2_users’, JSON.stringify(users));
localStorage.setItem(‘bk2_lastuser’, JSON.stringify(u));
const saved = DB.load(fbId) || DB.freshState();
saved.user = u;
window.initPhaser(saved);
}

// Auto-login on load
// Called automatically when game.js finishes loading (Phaser already loaded)
(function initGame() {
function hideLoading(cb) {
const ls = document.getElementById(‘loading-screen’);
if (ls) { ls.style.opacity = ‘0’; setTimeout(() => { ls.style.display = ‘none’; if(cb) cb(); }, 400); }
else { if(cb) cb(); }
}

setLoadProgress(60, ‘初始化遊戲系統…’);
setTimeout(() => setLoadProgress(85, ‘準備場景系統…’), 200);
setTimeout(() => setLoadProgress(100, ‘就緒！’), 500);

setTimeout(() => {
// Auto-login check
try {
const lu = JSON.parse(localStorage.getItem(‘bk2_lastuser’));
if (lu?.id) {
const saved = DB.load(lu.id);
if (saved && saved.branches?.length > 0) {
saved.user = lu;
hideLoading(() => window.initPhaser(saved));
return;
}
}
} catch(e) {}
// Show login
hideLoading(showLoginDOM);
}, 700);
})();
/* ═══════════════════════════════════
MAIN.JS — Phaser 3 Game Config
═══════════════════════════════════ */

// Shared game state
window.GAME_STATE = DB.freshState();
window.ACTIVE_ORDERS = [];
window.ORDER_ID_CTR = 0;

function setLoadProgress(pct, text) {
const bar = document.getElementById(‘load-bar’);
const txt = document.getElementById(‘load-text’);
if (bar) bar.style.width = pct + ‘%’;
if (txt) txt.textContent = text;
}

// Phaser config (created after DOM ready)
function buildPhaserConfig() {
return {
type: Phaser.AUTO,
width: Math.min(window.innerWidth, 430),
height: window.innerHeight,
parent: ‘game-container’,
backgroundColor: ‘#0d0600’,
antialias: true,
powerPreference: ‘high-performance’,
scene: [BootScene, GameScene, UIScene],
scale: {
mode: Phaser.Scale.FIT,
autoCenter: Phaser.Scale.CENTER_BOTH,
},
render: { pixelArt: false, antialias: true, antialiasGL: true },
};
}

// Init Phaser after login
window.initPhaser = function(userState) {
Object.assign(window.GAME_STATE, userState);
const loginEl = document.getElementById(‘login-screen’);
if (loginEl) { loginEl.style.opacity = ‘0’; setTimeout(() => loginEl.style.display = ‘none’, 400); }
if (!window._phaserGame) {
window._phaserGame = new Phaser.Game(buildPhaserConfig());
} else {
window._phaserGame.scene.start(‘GameScene’);
}
};
