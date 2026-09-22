/**
 * ドパガキ電脳和風ブレイクコア＆Kawaiiハイパーポップ・コンポーザー
 * (Dopagaki Cyber Kawaii Breakcore Composer)
 * 設定データ定義モジュール
 */

// サブジャンル・基軸スタイル (ドパガキ＆Kawaiiアニメ声特化)
export const GENRES = [
  {
    id: 'templecore_breakcore',
    ja: 'ドパガキ電脳寺院ブレイクコア (Dopagaki Temple Breakcore)',
    en: 'Japanese Dopagaki Templecore Breakcore fusing chaotic 172 BPM chopped Amen breaks, frantic mokugyo woodblocks, ultra-cute anime girl chant squeaks, and bonsho temple bells for a dopamine-rush frenzy',
    tag: 'Templecore, Kawaii Breakcore, Dopagaki',
    desc: 'BPM 168〜176。超あざと可愛いアニメ声と木魚の超高速連打、粉砕アーメンビーツでお経を連呼し、ドパガキの脳汁を限界突破させる。'
  },
  {
    id: 'kawaii_terror_digicore',
    ja: 'あざと可愛いKawaiiテラー (Kawaii Terror Digicore)',
    en: 'hyper-aggressive Kawaii Terror and Digicore driven by manic pitch-bent anime girl vocals, ear-piercing laser synths, blown-out 808 bass distortion, and addictive dopamine hooks',
    tag: 'Kawaii Terror, Digicore, Moe Hyperpop',
    desc: 'BPM 160〜175。とろけるような高音ロリ萌え声と、耳をつんざくレーザーシンセ＆極悪歪み808が脳を直撃する危険な合法ドラッグ。'
  },
  {
    id: 'buddhist_brostep_drop',
    ja: '仏滅ドパガキ・EDMドロップ (Dopamine Void Dubstep Drop)',
    en: 'Buddhist dubstep and hybrid trap featuring dramatic rising pitch buildups, a sudden absolute silence gap, followed by an explosive heavy bass drop with demonic male growls and screaming anime vocals',
    tag: 'Dopamine Dubstep, Aggressive EDM Drop',
    desc: 'BPM 160〜170。可愛いアニメ声とお経で焦らし、0.5秒の「完全無音（Dead Silence）」直後に極悪808が脳天を叩き割る爆発的ドロップ。'
  },
  {
    id: 'jcore_speed_mantra',
    ja: '電波萌え声×ガバ曼荼羅 (Moe Voice Speedcore Mantra)',
    en: 'ferocious J-Core and Speedcore stomping with heavily distorted 4-on-the-floor gabber kicks, hyper-manic high-pitched anime female dual shouts, and hypnotic Buddhist mantra loops',
    tag: 'J-Core, Speedcore, Moe Gabber',
    desc: 'BPM 175〜185。電波ソング級の超高音アニメ声と歪みガバキックが床を破壊。お経マントラ連呼でドパガキが卒倒する極限スピード。'
  },
  {
    id: 'cyber_kaidan_witch',
    ja: '病みかわ電脳怪談ダークウェーブ (Yamikawaii Cyber Kaidan)',
    en: 'eerie cyber Japanesque Witch House blending haunted shakuhachi screeches, yamikawaii anime girl ghost whispers, distorted low-growls, and heavy industrial trap basslines',
    tag: 'Yamikawaii Kaidan, Cyber Witch House',
    desc: 'BPM 150〜168。地雷系・病みかわ少女の甘い囁きから、突如として悪魔グロウルと808ベースが襲いかかる情緒不安定サウンド。'
  },
  {
    id: 'hyper_anime_trap',
    ja: 'あざと狂乱アニメトラップ (Hyper Kawaii Anime Trap)',
    en: 'manic Japanese Kawaii Hyperpop trap with lightning-fast anime girl vocal rapping, pitch-shifted formant glitches, heavy 808 glides, and frantic temple bell sprinkles',
    tag: 'Hyper Anime Trap, Glitchcore, Dopamine',
    desc: 'BPM 160〜172。早口あざと可愛いアニメ声ラップと琴の高速アルペジオ、跳ねる808スライドが脳を焼き尽くすTikTok/Shorts直系サウンド。'
  }
];

// ボーカル構成＆加工スタイル (かわいいアニメ声・ボカロ高音・ボカロ子供声特化)
export const VOCAL_STYLES = [
  {
    id: 'vocaloid_child',
    ja: 'ボカロ風・子供っぽいロリボイス (幼女電脳合成・舌足らずキュート)',
    en: 'cute childlike Vocaloid-style girl vocals, youthful synthetic squeaks, playful innocent high pitch, strictly no male growls, solo cute anime girl',
    desc: '舌足らずで甘い、幼い子供のような電脳ボカロ声。悪魔グロウルは一切入れず、あざと可愛い純真さで脳を溶かす。',
    hasGrowl: false
  },
  {
    id: 'vocaloid_high_piercing',
    ja: 'ボカロ風・突き抜ける電脳超高音 (ケロケロピッチベンド・ハイトーン)',
    en: 'ultra high-pitched piercing Vocaloid female vocals, aggressive autotune pitch-bends, crystal clear electronic highs, rapid-fire robotic glides, no male vocals',
    desc: '脳天を突き抜けるケロケロ高音ボカロボイス。高速アルペジオのように上下する電脳ハイトーン。',
    hasGrowl: false
  },
  {
    id: 'pure_anime_girl',
    ja: '純度100%・あざと可愛い萌え声 (グロウル完全排除・電波キュート)',
    en: 'pure 100% high-pitched cute anime girl vocals, moe squeaks, breathless hyperpop chanting, completely free of any male growls, solo kawaii female vocals',
    desc: '男声やデスボイスを完全に排除！どこまでも甘くキュートなあざと可愛いアニメ声だけの世界。',
    hasGrowl: false
  },
  {
    id: 'vocaloid_glitch_chops',
    ja: '電脳ロリボカロ・グリッチチョップ (細切れ脳バグ加工・スタッター)',
    en: 'hyper-processed cute childlike Vocaloid vocal glitch chops, extreme autotune stutter effects, micro-chops, playful pitch jumps, no male vocals',
    desc: '細切れにスライスされた子供っぽいボカロ声が、超高速で飛び跳ねる電脳スタッター加工。',
    hasGrowl: false
  },
  {
    id: 'chant_mantra_girl',
    ja: '女の子声のお経・念仏リフレイン (中毒マントラ連呼・グロウルなし)',
    en: 'hypnotic chant-like repetition of rhythmic Buddhist shomyo mantras sung only by ultra-cute anime girl vocals, repeating in a cute trance, strictly no male growls',
    desc: 'あざと可愛い女の子の声だけで「南無阿弥陀仏」「きゅるるん」を連呼する合法トリップ。',
    hasGrowl: false
  },
  {
    id: 'dual_contrast',
    ja: '超あざと可愛い萌え声 ✕ 歪み悪魔デスボイス (光と闇の極端デュアル)',
    en: 'extreme dual vocals featuring ultra high-pitched cute anime-style female vocals colliding violently with heavily distorted demonic low-growl male vocals',
    desc: '天使のような高音萌え声と悪魔グロウルの落差を楽しみたい時のデュアルボーカル構成。',
    hasGrowl: true
  }
];

// 和モノ・寺院エスニックサンプリング
export const JAPANESQUE_ELEMENTS = [
  {
    id: 'mokugyo',
    ja: '木魚 (Mokugyo・16分超高速連打・ポリリズム)',
    en: 'frantic, ultra-fast 16th-note mokugyo Buddhist wooden fish percussion rolls playing hypnotic polyrhythms'
  },
  {
    id: 'bonsho',
    ja: '梵鐘 (Bonsho Bell・腹に響く大寺院の金属重低音倍音)',
    en: 'resonant, colossal Bonsho temple bell strikes resonating with deep sub-bass metallic harmonics'
  },
  {
    id: 'shakuhachi',
    ja: '狂乱尺八 (Shakuhachi・ムラ息と叫びのフリーキーソロ)',
    en: 'screeching, aggressive Shakuhachi bamboo flute with breathy muraiki overblowing techniques and wild pitch slides'
  },
  {
    id: 'koto',
    ja: '電脳箏 (Cyber Koto・超高速グリッチアルペジオ)',
    en: 'hyper-speed Japanese 13-string Koto harp arpeggios chopped with micro-glitches and digital delay'
  },
  {
    id: 'buddhist_chant',
    ja: '声明・僧侶読経サンプリング (Monk Chant Drone)',
    en: 'raw vintage Buddhist monk shomyo chanting samples layered into an ominous drone'
  },
  {
    id: 'odaiko',
    ja: '大太鼓インパクト (O-Daiko 808 Slam・地響きアタック)',
    en: 'massive Japanese O-Daiko taiko drum impacts layered seamlessly with heavy sub-bass hits'
  },
  {
    id: 'kagura_suzu',
    ja: '破邪の神楽鈴 (Kagura Suzu・高周波シャワー)',
    en: 'frantic, shimmering Kagura Suzu brass temple bells shaking in rapid chaotic cascades'
  },
  {
    id: 'hyoshigi',
    ja: '拍子木 (Hyoshigi・空間を切り裂く乾いたクラック音)',
    en: 'piercing, dry wooden Hyoshigi clappers snapping through the mix with sharp transients'
  }
];

// 電脳音響・ドロップ＆ベースプロダクション
export const PRODUCTION_ELEMENTS = [
  {
    id: 'sudden_silence',
    ja: '一瞬の完全静寂 (Absolute Silence・息をのむ0.5秒の無音直後ドロップ)',
    en: 'sudden total silence cutting off all audio for a split second before detonating into an explosive drop'
  },
  {
    id: 'distorted_808',
    ja: '歪み極悪808スライドベース (Blown-out 808 Glide)',
    en: 'heavily saturated, blown-out 808 bass slides bending wildly with speaker-tearing distortion'
  },
  {
    id: 'laser_synth',
    ja: '脳天貫通レーザーシンセリード (Piercing Laser Leads)',
    en: 'piercing high-frequency laser synth leads ripping through the high end with hyper-energy'
  },
  {
    id: 'pitch_riser',
    ja: '無限上昇ピッチライザー (Endless Pitch-Bending Buildup)',
    en: 'shepard-tone style manic pitch-bending risers building tension to an unbearable breaking point'
  },
  {
    id: 'amen_chops',
    ja: '粉砕アーメンブレイク・スタッター (Chopped Amen Glitch)',
    en: 'micro-sliced Amen breakcore drum chops, glitch stutters, and reverse snare machine-gun rolls'
  },
  {
    id: 'bitcrush_burst',
    ja: 'ビットクラッシュ＆逆再生バースト (Bitcrushed Bursts)',
    en: 'aggressive 8-bit digital bitcrusher degradation, glitch artifacts, and sudden reverse sound bursts'
  },
  {
    id: 'gabber_kick',
    ja: '歪みガバキック連打 (Distorted Gabber Kick Roll)',
    en: 'brutal overdriven 909 gabber kicks punching through the floor with hardstyle distortion'
  }
];

// 禁止事項・ネガティブプロンプト（完全除外したい生ぬるい要素・不要な声）
export const NEGATIVE_OPTIONS = [
  {
    id: 'male_growls',
    ja: '男声デスボイス・低音グロウル・男声シャウト (女の子・ボカロ声のみに純化)',
    en: 'male vocals, deep low growls, demonic roaring, heavy masculine shouting, guttural death growls, aggressive male screaming'
  },
  {
    id: 'tame_chill',
    ja: '生ぬるいチルビート・眠気を誘うイージーリスニング・脱力感',
    en: 'chill lofi, sleepy calm music, gentle background beats, relaxing elevator music, soft ambient drone'
  },
  {
    id: 'gentle_acoustic',
    ja: '穏やかなアコースティックギター・素朴なフォーク・カントリー',
    en: 'soft acoustic guitar strumming, gentle folk, mellow piano chords, campfire song'
  },
  {
    id: 'boring_chords',
    ja: '退屈で無難なポップス・平坦で単調な進行・刺激のないメロディ',
    en: 'boring repetitive pop chords, flat uninspired arrangement, predictable radio pop'
  },
  {
    id: 'clean_smooth_vocals',
    ja: '綺麗で澄んだだけの退屈なボーカル（歪みや狂気のない歌唱）',
    en: 'overly polished clean commercial singing, boring vibrato, polite acoustic vocals'
  },
  {
    id: 'slow_tempo',
    ja: '120BPM以下の遅いテンポ・生ぬるいスローグルーヴ',
    en: 'slow tempo, ballad pace, dragging rhythm, sluggish tempo under 130 BPM'
  }
];

// テンポ設定
export const TEMPOS = [
  { value: 160, label: '160 BPM (トラップ／リディム親和)' },
  { value: 168, label: '168 BPM (高速ハイパーポップ)' },
  { value: 172, label: '172 BPM (王道ブレイクコア・黄金比)' },
  { value: 176, label: '176 BPM (マニック・狂気ドライブ)' },
  { value: 182, label: '182 BPM (J-Core スピードコア極限)' }
];

// 尺（構成タイムライン計算用）
export const DURATIONS = [
  { id: '15', label: '15秒 (TikTok/リール即死ドロップ用)', sec: 15 },
  { id: '30', label: '30秒 (YouTube Shorts/SNS動画用)', sec: 30 },
  { id: '60', label: '60秒 (ブレイクコア標準セッション)', sec: 60 },
  { id: '90', label: '90秒 (起承転結・極楽浄土フル尺)', sec: 90 },
  { id: 'loop', label: 'ループ (永久ドーパミン狂気リピート)', sec: null }
];

// ランダム曲名ガチャ（ドパガキの脳がバグる萌え×寺院タイトルたち）
export const TITLE_SUGGESTIONS = [
  'ドパガキ極楽浄土808 (Dopagaki Nirvana 808)',
  'あざと可愛い南無阿弥陀 (Kawaii Namu Amida)',
  '萌え声お経で脳がバグる (Moe Sutra Brain Melt)',
  '千手観音きゅるるんドロップ (1000-Armed Kyururun Drop)',
  '電脳地雷少女のブレイクコア (Cyber Jirai Girl Breakcore)',
  '鼓膜破壊カワイイテラー (Eardrum Shatter Kawaii Terror)',
  '木魚ポクポク萌えきゅん曼荼羅 (Mokugyo Moe Mandala)',
  '0.5秒の無音で脳汁ドバドバ (0.5s Silence Dopamine Burst)',
  '阿修羅ロリポップ175 (Ashura Lollipop 175)',
  '即身仏萌え萌えトランス (Mummy Moe Shomyo Trance)',
  '悪魔グロウルとアニメ声の心中 (Demon Growl & Anime Girl Shinju)',
  '無間地獄ガバキック電波 (Avici Gabber Kick Radio)',
  'お経リピート萌え中毒 (Sutra Repeat Moe Addiction)',
  '九尾狐レーザーハイパーポップ (Kitsune Laser Hyperpop)',
  '脳破壊ハイテンション声明 (Brain Damage High-Tension Shomyo)',
  '極悪808スライドと萌え叫び (Nasty 808 Glide & Moe Shriek)'
];
