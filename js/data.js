/**
 * 電脳和風ブレイクコア＆ハイパーポップ・コンポーザー (Templecore Composer)
 * 設定データ定義モジュール
 */

// サブジャンル・基軸スタイル
export const GENRES = [
  {
    id: 'templecore_breakcore',
    ja: '電脳寺院ブレイクコア (Templecore Breakcore)',
    en: 'Japanese Templecore Breakcore fusing chaotic 172 BPM chopped Amen breaks, frenetic mokugyo woodblocks, bonsho temple bell reverberations, and manic glitch chops',
    tag: 'Templecore, Japanese Breakcore',
    desc: 'BPM 165〜176。木魚の超高速連打とお経サンプリングが粉砕アーメンビーツと激突する、神聖と狂気のブレイクコア。'
  },
  {
    id: 'kawaii_terror_digicore',
    ja: '狂乱カワイイ・テラー (Kawaii Terror Digicore)',
    en: 'hyper-aggressive Kawaii Terror and Digicore driven by manic pitch-bent vocal chops, ear-piercing laser synths, blown-out 808 distortion, and cute anime girl chants',
    tag: 'Kawaii Terror, Digicore, Hyperpop',
    desc: 'BPM 160〜175。甘くとろける超高音アニメ声と、耳をつんざくレーザーシンセ＆極悪歪み808が脳内麻薬を分泌させる。'
  },
  {
    id: 'buddhist_brostep_drop',
    ja: '仏滅リディム・EDMドロップ (Buddhist Riddim / Dubstep Drop)',
    en: 'Buddhist dubstep and hybrid trap featuring dramatic rising pitch buildups, a sudden absolute silence gap, followed by an explosive heavy bass drop with metallic screeches',
    tag: 'Buddhist Dubstep, Aggressive EDM Drop',
    desc: 'BPM 160〜170。お経とピッチ上昇で極限まで焦らし、0.5秒の「完全な無音（Silence）」直後に叩き落とす破壊的ドロップ。'
  },
  {
    id: 'jcore_speed_mantra',
    ja: 'J-Core スピードガバ曼荼羅 (J-Core Speedcore Mantra)',
    en: 'ferocious J-Core and Speedcore stomping with heavily distorted 4-on-the-floor gabber kicks, hyper anime female dual shout, and hypnotic Buddhist mantra loops',
    tag: 'J-Core, Speedcore, Gabber',
    desc: 'BPM 175〜185。ディストーション・ガバキックが床を揺らし、お経のリフレインと高速アニメ声がトランス状態へ導く。'
  },
  {
    id: 'cyber_kaidan_witch',
    ja: '電脳怪談ダークウェーブ (Cyber Kaidan Witch House)',
    en: 'eerie cyber Japanesque Witch House blending haunted shakuhachi screeches, cold ghost whispers, distorted low-growls, and heavy industrial trap basslines',
    tag: 'Cyber Kaidan, Japanese Witch House',
    desc: 'BPM 150〜168。暗黒寺院の冷気、尺八の叫び、不気味な囁きから突如として悪魔グロウルと808ベースが襲いかかる。'
  },
  {
    id: 'hyper_anime_trap',
    ja: 'ハイパー・アニメ・トラップ (Hyper Anime Trap)',
    en: 'manic Japanese Hyperpop trap with lightning-fast anime vocal rapping, pitch-shifted formant glitches, heavy 808 glides, and frantic temple bell sprinkles',
    tag: 'Hyper Anime Trap, Glitchcore',
    desc: 'BPM 160〜172。ケロケロボカロ早口ラップと琴の高速アルペジオ、跳ねる808スライドが連鎖する現代インターネット直系サウンド。'
  }
];

// ボーカル構成＆加工スタイル
export const VOCAL_STYLES = [
  {
    id: 'dual_contrast',
    ja: '光と闇の極端対比 (超高音アニメ声 ✕ 歪み低音デスボイス・グロウル)',
    en: 'extreme dual vocals featuring ultra high-pitched cute anime-style female vocals colliding with heavily distorted demonic low-growl male vocals',
    desc: '天使のような高音ロリ声と地獄の底から響く悪魔のグロウルが激しく交錯する究極のカタルシス。'
  },
  {
    id: 'chant_mantra',
    ja: '呪術的お経・念仏リフレイン (声明マントラ反復連呼)',
    en: 'hypnotic chant-like repetition of rhythmic Buddhist shomyo mantras, repeating relentlessly in an intoxicating trance',
    desc: '「南無阿弥陀」や梵字真言をマシンのように連呼し、聴く者を電脳トランスへと引きずり込む。'
  },
  {
    id: 'glitch_vocaloid',
    ja: '電脳ボカロ・グリッチチョップ (極端なピッチベンド＆フォルマント加工)',
    en: 'hyper-processed Vocaloid-style glitch chops with extreme autotune pitch-bends, stutter stutter effects, and radical formant shifts',
    desc: '原形を留めないほど細切れにチョップされ、上下に激しく跳ね回る電脳ボイス。'
  },
  {
    id: 'whisper_shout',
    ja: 'サイコパス囁き ➔ 突発絶叫シャウト (ASMRから鼓膜破壊)',
    en: 'creepy intimate binaural whisper vocals that suddenly explode into a manic, unhinged ear-splitting screaming shout',
    desc: '耳元で冷たく囁いていたかと思うと、次の瞬間に鼓膜を破る狂気のシャウトが炸裂。'
  },
  {
    id: 'manic_rap',
    ja: '超早口・電脳トラップラップ (Digicore高速フロウ)',
    en: 'blistering fast anime cyber-trap rapping delivered with breathless speed and frantic high-energy rhythm',
    desc: '息継ぎなしの超高速ライミングとオートチューンが駆け抜けるインターネット世代のラップ。'
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

// 禁止事項・ネガティブプロンプト（完全除外したい生ぬるい要素）
export const NEGATIVE_OPTIONS = [
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

// ランダム曲名ガチャ（脳がバグる電脳寺院タイトルたち）
export const TITLE_SUGGESTIONS = [
  '南無阿弥陀808 (Namu Amida 808)',
  '電脳曼荼羅Breakcore (Cyber Mandala Breakcore)',
  '超極楽浄土ドロップ (Super Nirvana Drop)',
  '狂乱木魚とレーザーシンセ (Mokugyo Laser Frenzy)',
  '萌え声と悪魔グロウルの輪廻転生 (Samsara Dual Vocals)',
  '梵鐘175BPM (Bonsho 175)',
  '地獄変デジコア (Jigokuhen Digicore)',
  '彼岸花グリッチ・シャウト (Higanbana Glitch Scream)',
  '電子声明・即身仏トランス (Cyber Shomyo Trance)',
  '阿修羅ブレイクビーツ (Ashura Breakbeats)',
  '千手観音ピッチライザー (1000-Armed Pitch Riser)',
  '無間地獄ガバキック (Avici Gabber Kick)',
  '電脳百鬼夜行 (Cyber Hyakki Yagyo)',
  '涅槃寂静サイコパス (Nirvana Psychopath)',
  'お経リピート症候群 (Sutra Repeat Syndrome)',
  '九尾狐レーザーハイパーポップ (Kitsune Laser Hyperpop)'
];
