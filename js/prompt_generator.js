/**
 * 電脳和風ブレイクコア＆ハイパーポップ・コンポーザー (Templecore Composer)
 * プロンプト生成エンジンモジュール
 */

import {
  GENRES,
  VOCAL_STYLES,
  JAPANESQUE_ELEMENTS,
  PRODUCTION_ELEMENTS,
  NEGATIVE_OPTIONS,
  DURATIONS
} from './data.js';

export function buildPrompt(state) {
  const isEn = state.lang === 'en';
  const genreObj = GENRES.find(g => g.id === state.genre) || GENRES[0];
  const vocalObj = VOCAL_STYLES.find(v => v.id === state.vocalStyle) || VOCAL_STYLES[0];
  const selectedJapan = JAPANESQUE_ELEMENTS.filter(j => state.japanesque.has(j.id));
  const selectedProd = PRODUCTION_ELEMENTS.filter(p => state.production.has(p.id));

  if (state.aiTarget === 'suno_udio') {
    return buildSunoUdioPrompt(state, genreObj, vocalObj, selectedJapan, selectedProd, isEn);
  }

  if (state.aiTarget === 'flow') {
    return buildFlowPrompt(state, genreObj, vocalObj, selectedJapan, selectedProd, isEn);
  }

  return buildPlainPrompt(state, genreObj, vocalObj, selectedJapan, selectedProd, isEn);
}

function buildSunoUdioPrompt(state, genre, vocal, japan, prod, isEn) {
  const tags = [];

  // 基本ジャンルタグ
  tags.push('Japanese Breakcore');
  tags.push('Kawaii Hyperpop');
  tags.push('Digicore');
  tags.push('Templecore');
  tags.push('Kawaii Terror');
  tags.push(`${state.tempo} BPM`);

  // ボーカルタグの動的振り分け (女の子単独・ボカロ声・子供声 or デュアルグロウル)
  if (vocal.hasGrowl) {
    tags.push('dual vocals');
    tags.push('ultra high-pitched cute anime girl vocals');
    tags.push('moe squeaks');
    tags.push('distorted demonic low-growl male vocals');
  } else {
    tags.push('solo female vocals');
    tags.push('strictly no male vocals');
    tags.push('no low growls');
    if (vocal.id === 'vocaloid_child') {
      tags.push('cute childlike Vocaloid girl vocals');
      tags.push('youthful synthetic squeaks');
      tags.push('playful innocent anime girl voice');
      tags.push('loli vocaloid');
    } else if (vocal.id === 'vocaloid_high_piercing') {
      tags.push('ultra high-pitched piercing Vocaloid female vocals');
      tags.push('extreme autotune electronic highs');
      tags.push('hyper robotic glides');
    } else if (vocal.id === 'vocaloid_glitch_chops') {
      tags.push('hyper-chopped cute Vocaloid child vocal chops');
      tags.push('playful autotune stutters');
    } else {
      tags.push('pure 100% cute anime girl vocals');
      tags.push('moe squeaks');
    }
  }
  tags.push('hypnotic Buddhist chant repetition');
  tags.push('extreme autotune glitch chops');

  // 和モノ＆寺院タグ
  japan.forEach(j => {
    if (j.id === 'mokugyo') tags.push('frantic mokugyo woodblock rolls');
    else if (j.id === 'bonsho') tags.push('deep bonsho temple bell');
    else if (j.id === 'shakuhachi') tags.push('screeching shakuhachi overblow');
    else if (j.id === 'koto') tags.push('glitch koto arpeggios');
    else if (j.id === 'buddhist_chant') tags.push('monk shomyo chant samples');
    else if (j.id === 'odaiko') tags.push('heavy O-Daiko taiko slams');
    else if (j.id === 'kagura_suzu') tags.push('shimmering kagura suzu bells');
    else if (j.id === 'hyoshigi') tags.push('snappy hyoshigi clappers');
  });

  // 音響＆ドロップタグ
  prod.forEach(p => {
    if (p.id === 'sudden_silence') tags.push('sudden absolute silence before drop');
    else if (p.id === 'distorted_808') tags.push('distorted blown-out 808 sub-bass glides');
    else if (p.id === 'laser_synth') tags.push('piercing laser synth leads');
    else if (p.id === 'pitch_riser') tags.push('manic pitch-bending buildups');
    else if (p.id === 'amen_chops') tags.push('chopped amen breakcore drive');
    else if (p.id === 'bitcrush_burst') tags.push('bitcrush glitch bursts');
    else if (p.id === 'gabber_kick') tags.push('distorted gabber kicks');
  });

  tags.push('explosive aggressive EDM drop');
  tags.push('chaotic dopamine-rush mix');

  // ドロップ時のボーカル演出
  const dropVocalBlock = vocal.hasGrowl
    ? `[Aggressive Drop - Blown-out 808, Demonic Low-Growl & Laser Synth]
(EXPLOSIVE brostep bass detonate with speaker-tearing distorted 808 slides)
(Demonic low-growl roaring mantras colliding with galloping mokugyo woodblocks)
(Piercing laser synths shooting across chaotic stereo field)`
    : `[Aggressive Drop - Blown-out 808, Kawaii Vocaloid Chops & Laser Synth]
(EXPLOSIVE hyperpop bass detonate with speaker-tearing distorted 808 slides)
(Ultra-cute childlike Vocaloid vocal chops screaming mantras at breakneck speed: "南無阿弥陀！きゅるるん！")
(Frantically galloping mokugyo woodblocks and piercing laser synths, strictly solo cute girl vocals)`;

  // 構成ブロック
  let structure = `
[Intro - Whispering Temple Shadows & Bonsho Bell]
(Low-drone Buddhist monk chant and delicate mokugyo ticks echoing in darkness)
(Intimate sweet anime whisper in ear: "ねぇ...脳汁、ドバドバ出してあげる♡")

[Build-up - 172 BPM Chopped Amen Breaks & Rising Pitch]
(Manic breakcore amen chops accelerating violently)
(Breathless cute anime girl repeating: "南無阿弥陀！きゅるるん！南無阿弥陀！")
(Extreme pitch-bending riser ascending to unbearable euphoria)

[Pre-Drop - SUDDEN ABSOLUTE SILENCE]
[DEAD SILENCE // 0.5s Complete Stop - No Sound // 息をのむ完全無音]

${dropVocalBlock}

[Hyperpop Melodic Hook - Ultra High-Pitched Anime Female Vocals]
(Sweet, hyper-addictive childlike anime girl melody singing at breakneck speed: "極楽浄土で脳破壊♡")
(Glitch koto arpeggios and high-frequency Kagura Suzu bell cascades)

[Speedcore Outro - Distorted Gabber Kicks & Bitcrushed Monk Fade]
(Violent distorted 4-on-the-floor gabber kicks, cute anime squeaks, fading into bonsho bell resonance)`;

  const titleHeader = state.trackTitle ? `### Track Title: ${state.trackTitle}\n\n` : '';

  return `${titleHeader}=== [Style & Instrumentation Tags] ===
${tags.join(', ')}

=== [Track Structure & Arrangement] ===
${structure.trim()}`;
}

function buildFlowPrompt(state, genre, vocal, japan, prod, isEn) {
  const titlePart = state.trackTitle ? (isEn ? `Track Title: "${state.trackTitle}"\n` : `曲名: 「${state.trackTitle}」\n`) : '';
  const vocalVibeEn = vocal.hasGrowl
    ? 'featuring contrasting high-pitched anime girl and distorted low-growl male dual vocals'
    : 'strictly solo cute female vocals featuring childlike Vocaloid-style high pitch, with absolutely zero male vocals and no low growls';
  const vocalVibeJa = vocal.hasGrowl
    ? '超あざと可愛い高音アニメ声と、地獄の底から響く悪魔の咆哮が交錯する究極のドパガキ仕様。'
    : '悪魔低音グロウルは一切入れず、あざと可愛いボカロ風子供声・超高音アニメ声のみに純化した中毒仕様。';

  if (isEn) {
    return `${titlePart}Generate a dopamine-rush Japanese Kawaii Hyperpop and Breakcore track (Templecore) driven at ${state.tempo} BPM.
- Core Genre: ${genre.en}.
- Vocal Architecture: ${vocal.en} (${vocalVibeEn}).
- Japanesque & Temple Samplings: ${japan.map(j => j.en).join('; ')}.
- Bass & Production Elements: ${prod.map(p => p.en).join('; ')}.
- Dynamics & Drop: Starts with sweet anime whispered chants and temple bonsho bells, surging into manic 172 BPM Amen breakcore rhythms and rising pitch-bending buildups with hyper-cute anime screams. Abruptly cut into a sudden absolute dead silence gap (0.5 seconds of pure zero audio // 息をのむ完全無音), immediately detonating into an explosive, blown-out distorted 808 EDM drop with frantically clattering mokugyo woodblocks, piercing laser synth leads, and a hyper-addictive cute anime female vocal hook ("極楽浄土で脳破壊♡"). Chaotic dopamine-rush master designed for maximum addiction.`;
  }

  return `${titlePart}【音楽ジャンル・世界観】
ドパガキ向け和風ブレイクコア × Kawaiiハイパーポップ／デジコア × 寺院エスニック「${genre.ja}」。
テンポは脳が焼き尽くされる超高速${state.tempo} BPM。

【ボーカル設計 (${vocal.ja})】
${vocal.desc}
${vocalVibeJa}

【和モノ・寺院サンプリング音響】
${japan.map(j => `・${j.ja}`).join('\n')}

【電脳音響＆ドロップ・ベース構造】
${prod.map(p => `・${p.ja}`).join('\n')}

【展開・ダイナミクス指定】
172BPM高速粉砕アーメンブレイクとお経の呪術的リフレイン、無限上昇ピッチライザーであざと可愛いアニメ声が絶叫しながら限界まで緊張感を煽った直後、一瞬の「完全な静寂（0.5秒の無音）」へ突入。その直後に歪みきった極悪808スライドベース、木魚の16分超高速連打、脳天を貫くレーザーシンセ、${vocal.hasGrowl ? '低音デスボイスグロウル' : '細切れ子供声ボカロチョップ'}が炸裂する爆発的EDMドロップを展開。脳汁ドバドバ分泌の電脳カオス・ミックス。`;
}

function buildPlainPrompt(state, genre, vocal, japan, prod, isEn) {
  const titlePart = state.trackTitle ? `"${state.trackTitle}" - ` : '';
  const vocalSummaryEn = vocal.hasGrowl
    ? 'distorted low-growl male and ultra high-pitched cute anime-style female dual vocals'
    : 'ultra high-pitched childlike Vocaloid-style cute female solo vocals (strictly no male growls)';
  const vocalSummaryJa = vocal.hasGrowl
    ? '超あざと可愛いアニメ声と歪んだ低音デスボイスの極端デュアルボーカル'
    : 'ボカロ風子供声・超高音アニメ声（悪魔グロウル一切なし・女の子単独）';

  if (isEn) {
    return `${titlePart}Dopagaki Hyper Japanese kawaii hyperpop with ${vocalSummaryEn}, glitch processing and chant-like repetition, manic ${state.tempo} BPM breakcore drive, sudden absolute silence into an explosive aggressive EDM drop, pitch-bending buildups, distorted 808s, heavy bass, glitch chops, mokugyo woodblock, frantic temple bells, laser synth leads, Buddhist chant samples, chaotic dopamine-rush mix.`;
  }
  return `${titlePart}${state.tempo} BPMのドパガキ専用・電脳和風Kawaiiハイパーポップ＆ブレイクコア。${vocalSummaryJa}、お経の呪術的反復、木魚の超高速連打と梵鐘、粉砕アーメンビーツ。一瞬の完全静寂直後に爆発する歪み808極悪EDMドロップとレーザーシンセが炸裂する脳汁分泌カオスサウンド。`;
}

export function buildNegativePrompt(state) {
  if (!state.negatives || state.negatives.size === 0) {
    return '';
  }

  const selected = NEGATIVE_OPTIONS.filter(opt => state.negatives.has(opt.id));
  if (selected.length === 0) return '';

  if (state.lang === 'ja') {
    const list = selected.map(s => `・${s.ja}`).join('\n');
    return `【完全除外指示（Negative Prompt）】\n${list}\n※上記のような生ぬるい・退屈な要素は一切排除し、ドパガキが卒倒する過激で刺激的なKawaiiブレイクコア／ハイパーポップに仕上げること。`;
  }

  return selected.map(s => s.en).join(', ');
}

export function buildTimelineData(state) {
  const dur = state.duration || '60';

  if (dur === '15') {
    return [
      { time: '0:00 - 0:05', label: 'Dark Chant & Pitch Riser', desc: '梵鐘とお経の囁きからアニメ声が急激にピッチ上昇' },
      { time: '0:05 - 0:06', label: 'Sudden Dead Silence (0.5s)', desc: '【息をのむ完全無音】すべての音波が消滅する空白' },
      { time: '0:06 - 0:15', label: 'Explosive 808 Drop', desc: '歪み808＋木魚連打＋デスボイス＋萌え叫び＋レーザー炸裂' }
    ];
  }

  if (dur === '30') {
    return [
      { time: '0:00 - 0:08', label: 'Temple Intro', desc: '暗黒寺院の声明とお経、木魚の刻み、可愛い囁き' },
      { time: '0:08 - 0:15', label: '172BPM Breakcore Buildup', desc: '粉砕アーメンビーツとあざと可愛いアニメ声の早口リフレイン' },
      { time: '0:15 - 0:16', label: 'Absolute Dead Silence', desc: '【0.5秒の完全無音】息をのむ漆黒の静寂' },
      { time: '0:16 - 0:26', label: 'Aggressive EDM Drop', desc: '歪んだ808スライドベースと悪魔グロウル、木魚16分連打' },
      { time: '0:26 - 0:30', label: 'Glitch Outro', desc: 'アニメ声スタッターと神楽鈴の余韻' }
    ];
  }

  if (dur === '60') {
    return [
      { time: '0:00 - 0:12', label: 'Intro - Bonsho & Sweet Whisper', desc: '大梵鐘の倍音とお経、耳元のあまあま囁き「脳汁出してあげる♡」' },
      { time: '0:12 - 0:24', label: 'Build-up - Manic Amen Chops', desc: '172BPM粉砕ビーツ加速、無限上昇ピッチライザーとアニメ絶叫' },
      { time: '0:24 - 0:25', label: 'Pre-Drop - SUDDEN DEAD SILENCE', desc: '【0.5秒の完全静寂】落差で脳がバグる漆黒の空白' },
      { time: '0:25 - 0:42', label: 'Drop - Blown-out 808 & Mokugyo', desc: '極悪歪み808＋悪魔グロウル＋木魚超高速ポリリズム＋レーザー' },
      { time: '0:42 - 0:54', label: 'Hook - Ultra-Cute Anime Melody', desc: '超高音あざと可愛いアニメ声サビメロディ＋電脳琴グリッチ' },
      { time: '0:54 - 1:00', label: 'Speedcore Gabber Outro', desc: '歪みガバキック連打と逆再生バースト、梵鐘の余韻' }
    ];
  }

  // フル尺・長尺 (90秒〜)
  return [
    { time: '0:00 - 0:15', label: 'Prologue - Dark Shrine Shomyo', desc: '暗黒寺院の冷気、声明読経ドローン、大太鼓の地響き' },
    { time: '0:15 - 0:30', label: 'Section A - Glitch Rap & Mokugyo', desc: 'あざと可愛いアニメ声早口電脳ラップと木魚のポクポク刻み' },
    { time: '0:30 - 0:45', label: 'Buildup - Shepard Tone Riser', desc: '無限上昇ピッチライザーと175BPM粉砕アーメンブレイク' },
    { time: '0:45 - 0:46', label: 'The Void - ABSOLUTE SILENCE', desc: '【0.5秒の完全停止】すべての音波が消滅' },
    { time: '0:46 - 1:05', label: 'Drop 1 - Brostep Bass & Demonic Growl', desc: '重力崩壊808スライド＋悪魔グロウル絶叫＋レーザーシンセ' },
    { time: '1:05 - 1:20', label: 'Section B - Euphoric Anime Hook', desc: '高音アニメ声と電脳琴アルペジオが疾走する多幸感サビ' },
    { time: '1:20 - 1:30', label: 'Drop 2 - J-Core Gabber Mantra', desc: '歪みガバキック4つ打ちとお経マントラ連呼の狂気' }
  ];
}

export function buildSocialMetadata(state) {
  const title = state.trackTitle || 'ドパガキ極楽浄土808 (Dopagaki Nirvana 808)';
  return {
    videoTitle: `${title} 🧠⚡⛩️ [Kawaii Japanese Breakcore / Dopagaki]`,
    desc: `⚡ ドパガキ専用！脳汁ドバドバKawaiiブレイクコア＆ハイパーポップ (172 BPM)
超あざと可愛いアニメ声 ✕ 悪魔デスボイス ✕ 木魚16分連打 ✕ 歪み808 ✕ 0.5秒完全静寂ドロップ！

🎧 脳破壊ポイント:
- Ultra-Cute Anime Girl & Distorted Low-Growl Dual Vocals
- 172 BPM Manic Breakcore Amen Chops
- 0.5s Sudden Absolute Silence into Explosive 808 Drop
- Frantic Mokugyo Woodblock Polyrhythm & Buddhist Sutra Mantra

🏷️ Tags:
#ドパガキ #ブレイクコア #ハイパーポップ #kawaiiterror #breakcore #hyperpop #templecore #japanesebreakcore #amenbreak #808bass #animecore #脳汁`,
    hashtags: '#ドパガキ #ブレイクコア #ハイパーポップ #kawaiiterror #templecore #脳汁'
  };
}
