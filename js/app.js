/**
 * 電脳和風ブレイクコア＆ハイパーポップ・コンポーザー (Templecore Composer)
 * メイン制御・UIイベントバインディング
 */

import {
  GENRES,
  VOCAL_STYLES,
  JAPANESQUE_ELEMENTS,
  PRODUCTION_ELEMENTS,
  NEGATIVE_OPTIONS,
  TEMPOS,
  DURATIONS,
  TITLE_SUGGESTIONS
} from './data.js';

import {
  buildPrompt,
  buildNegativePrompt,
  buildTimelineData,
  buildSocialMetadata
} from './prompt_generator.js';

import { templecoreAudio } from './audio_preview.js';

import {
  saveLastState,
  loadLastState,
  getPresets,
  savePreset,
  deletePreset,
  exportPresetsAsJSON,
  importPresetsFromJSON,
  getShareURL,
  loadFromURLHash
} from './storage.js';

const state = {
  trackTitle: '南無阿弥陀808 (Namu Amida 808)',
  genre: 'templecore_breakcore',
  vocalStyle: 'dual_contrast',
  japanesque: new Set(['mokugyo', 'bonsho', 'buddhist_chant', 'koto']),
  production: new Set(['sudden_silence', 'distorted_808', 'laser_synth', 'amen_chops', 'pitch_riser']),
  negatives: new Set(['tame_chill', 'gentle_acoustic', 'boring_chords', 'slow_tempo']),
  tempo: 172,
  duration: '60',
  lang: 'ja',
  aiTarget: 'suno_udio'
};

function flash(msg) {
  const f = document.getElementById('flash');
  if (!f) return;
  f.textContent = msg;
  f.classList.add('show');
  setTimeout(() => f.classList.remove('show'), 1600);
}

function buildSingleChips(container, items, currentId, onSelect) {
  if (!container) return;
  container.innerHTML = '';
  items.forEach(item => {
    const b = document.createElement('button');
    b.type = 'button';
    b.className = 'chip' + (item.id === currentId ? ' on' : '');
    b.textContent = item.ja.split(' (')[0];
    b.title = item.desc || item.ja;
    b.addEventListener('click', () => {
      [...container.children].forEach(c => c.classList.remove('on'));
      b.classList.add('on');
      onSelect(item.id);
    });
    container.appendChild(b);
  });
}

function buildMultiChips(container, items, stateSet, onChange) {
  if (!container) return;
  container.innerHTML = '';
  items.forEach(item => {
    const b = document.createElement('button');
    b.type = 'button';
    b.className = 'chip' + (stateSet.has(item.id) ? ' on' : '');
    b.textContent = item.ja.split(' (')[0];
    b.title = item.ja;
    b.addEventListener('click', () => {
      if (stateSet.has(item.id)) {
        stateSet.delete(item.id);
      } else {
        stateSet.add(item.id);
      }
      b.classList.toggle('on');
      onChange?.();
    });
    container.appendChild(b);
  });
}

function renderTimeline() {
  const container = document.getElementById('timeline');
  if (!container) return;

  const sections = buildTimelineData(state);
  container.innerHTML = '';

  sections.forEach(sec => {
    const row = document.createElement('div');
    row.className = 'screen-row';
    row.innerHTML = `
      <div class="screen-time">${sec.time}</div>
      <div class="screen-body">
        <span class="lab">${sec.label}</span>
        <span class="desc">${sec.desc}</span>
      </div>
    `;
    container.appendChild(row);
  });
}

function renderSocialBox() {
  const vTitle = document.getElementById('socialVideoTitle');
  const vDesc = document.getElementById('socialDescription');

  if (!vTitle || !vDesc) return;

  const meta = buildSocialMetadata(state);
  vTitle.value = meta.videoTitle;
  vDesc.value = meta.desc;
}

function generate() {
  const promptOut = document.getElementById('promptOut');
  const negativeOut = document.getElementById('negativeOut');
  const negativeSection = document.getElementById('negativeSection');

  if (promptOut) {
    promptOut.value = buildPrompt(state);
  }

  const negText = buildNegativePrompt(state);
  if (negativeOut) {
    negativeOut.value = negText;
  }
  if (negativeSection) {
    negativeSection.style.display = negText ? 'block' : 'none';
  }

  renderTimeline();
  renderSocialBox();
}

function maybeRegenerate() {
  saveLastState(state);
  generate();
}

function updatePresetPlaceholder() {
  const pInput = document.getElementById('presetNameInput');
  if (pInput) {
    pInput.placeholder = state.trackTitle
      ? `プリセット名 (空欄なら「${state.trackTitle}」)`
      : 'プリセット名 (例: 狂乱南無阿弥陀)';
  }
}

function renderPresets() {
  const container = document.getElementById('presetChips');
  if (!container) return;
  container.innerHTML = '';

  const presets = getPresets();
  const names = Object.keys(presets);

  if (names.length === 0) {
    const note = document.createElement('span');
    note.style.color = 'var(--text-sub)';
    note.style.fontSize = '0.84rem';
    note.textContent = '保存されたプリセットはありません';
    container.appendChild(note);
    return;
  }

  names.forEach(name => {
    const item = document.createElement('span');
    item.className = 'preset-item';

    const b = document.createElement('button');
    b.type = 'button';
    b.className = 'chip';
    b.textContent = name;
    b.addEventListener('click', () => {
      applyState(presets[name]);
      generate();
      saveLastState(state);
      flash(`「${name}」を読み込みました⛩️`);
    });

    const del = document.createElement('button');
    del.type = 'button';
    del.className = 'preset-del';
    del.textContent = '×';
    del.title = '削除';
    del.addEventListener('click', (e) => {
      e.stopPropagation();
      deletePreset(name);
      renderPresets();
      flash(`「${name}」を削除しました`);
    });

    item.appendChild(b);
    item.appendChild(del);
    container.appendChild(item);
  });
}

function applyState(obj) {
  if (!obj) return;
  state.trackTitle = obj.trackTitle || '';
  state.genre = obj.genre || 'templecore_breakcore';
  state.vocalStyle = obj.vocalStyle || 'dual_contrast';
  state.japanesque = new Set(obj.japanesque || ['mokugyo', 'bonsho', 'buddhist_chant', 'koto']);
  state.production = new Set(obj.production || ['sudden_silence', 'distorted_808', 'laser_synth', 'amen_chops', 'pitch_riser']);
  state.negatives = new Set(obj.negatives || ['tame_chill', 'gentle_acoustic', 'boring_chords', 'slow_tempo']);
  state.tempo = Number(obj.tempo) || 172;
  state.duration = obj.duration || '60';
  state.lang = obj.lang || 'ja';
  state.aiTarget = obj.aiTarget || 'suno_udio';

  const titleInput = document.getElementById('trackTitleInput');
  if (titleInput) titleInput.value = state.trackTitle;
  updatePresetPlaceholder();

  buildSingleChips(document.getElementById('genreChips'), GENRES, state.genre, (id) => {
    state.genre = id;
    maybeRegenerate();
  });

  buildSingleChips(document.getElementById('vocalChips'), VOCAL_STYLES, state.vocalStyle, (id) => {
    state.vocalStyle = id;
    maybeRegenerate();
  });

  buildMultiChips(document.getElementById('japanChips'), JAPANESQUE_ELEMENTS, state.japanesque, maybeRegenerate);
  buildMultiChips(document.getElementById('prodChips'), PRODUCTION_ELEMENTS, state.production, maybeRegenerate);
  buildMultiChips(document.getElementById('negativeChips'), NEGATIVE_OPTIONS, state.negatives, maybeRegenerate);

  // テンポチップ
  const tempoContainer = document.getElementById('tempoChips');
  if (tempoContainer) {
    tempoContainer.innerHTML = '';
    TEMPOS.forEach(t => {
      const b = document.createElement('button');
      b.type = 'button';
      b.className = 'chip' + (Number(state.tempo) === t.value ? ' on' : '');
      b.textContent = t.label;
      b.addEventListener('click', () => {
        state.tempo = t.value;
        [...tempoContainer.children].forEach(c => c.classList.remove('on'));
        b.classList.add('on');
        const tempoRange = document.getElementById('tempoRange');
        const tempoReadout = document.getElementById('tempoReadout');
        if (tempoRange && tempoReadout) {
          tempoRange.value = state.tempo;
          tempoReadout.innerHTML = state.tempo + '<span> BPM</span>';
        }
        maybeRegenerate();
      });
      tempoContainer.appendChild(b);
    });
  }

  // 尺チップ
  const durContainer = document.getElementById('durationChips');
  if (durContainer) {
    durContainer.innerHTML = '';
    DURATIONS.forEach(d => {
      const b = document.createElement('button');
      b.type = 'button';
      b.className = 'chip' + (state.duration === d.id ? ' on' : '');
      b.textContent = d.label;
      b.addEventListener('click', () => {
        state.duration = d.id;
        [...durContainer.children].forEach(c => c.classList.remove('on'));
        b.classList.add('on');
        maybeRegenerate();
      });
      durContainer.appendChild(b);
    });
  }

  // テンポスライダー＆表示
  const tempoRange = document.getElementById('tempoRange');
  const tempoReadout = document.getElementById('tempoReadout');
  if (tempoRange && tempoReadout) {
    tempoRange.value = state.tempo;
    tempoReadout.innerHTML = state.tempo + '<span> BPM</span>';
  }

  // AIターゲット選択
  const aiTargetSelect = document.getElementById('aiTargetSelect');
  if (aiTargetSelect) aiTargetSelect.value = state.aiTarget;

  // 言語トグル
  document.querySelectorAll('#langToggle button').forEach(b => {
    b.classList.toggle('on', b.dataset.lang === state.lang);
  });
}

function init() {
  const urlState = loadFromURLHash();
  const lastState = loadLastState();
  applyState(urlState || lastState || state);

  // 曲名入力
  const titleInput = document.getElementById('trackTitleInput');
  if (titleInput) {
    titleInput.addEventListener('input', (e) => {
      state.trackTitle = e.target.value;
      updatePresetPlaceholder();
      maybeRegenerate();
    });
  }

  // 🎲 曲名ガチャ
  document.getElementById('randomTitleBtn')?.addEventListener('click', () => {
    const rand = TITLE_SUGGESTIONS[Math.floor(Math.random() * TITLE_SUGGESTIONS.length)];
    state.trackTitle = rand;
    if (titleInput) titleInput.value = rand;
    updatePresetPlaceholder();
    maybeRegenerate();
    flash(`「${rand}」をセットしました⚡`);
  });

  // テンポスライダー
  const tempoRange = document.getElementById('tempoRange');
  const tempoReadout = document.getElementById('tempoReadout');
  if (tempoRange && tempoReadout) {
    tempoRange.addEventListener('input', () => {
      state.tempo = Number(tempoRange.value);
      tempoReadout.innerHTML = state.tempo + '<span> BPM</span>';
      // テンポチップのonクラス更新
      document.querySelectorAll('#tempoChips .chip').forEach(c => {
        c.classList.toggle('on', c.textContent.includes(`${state.tempo} BPM`));
      });
      maybeRegenerate();
    });
  }

  // AIターゲット変更
  document.getElementById('aiTargetSelect')?.addEventListener('change', (e) => {
    state.aiTarget = e.target.value;
    maybeRegenerate();
  });

  // 言語切替
  document.querySelectorAll('#langToggle button').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('#langToggle button').forEach(b => b.classList.remove('on'));
      btn.classList.add('on');
      state.lang = btn.dataset.lang;
      saveLastState(state);
      generate();
    });
  });

  // 生成ボタン
  document.getElementById('genBtn')?.addEventListener('click', generate);

  // 🎲 おまかせ電脳破壊
  document.getElementById('randomBtn')?.addEventListener('click', () => {
    function sample(arr, min, max) {
      const n = Math.floor(Math.random() * (max - min + 1)) + min;
      const sh = [...arr].sort(() => Math.random() - 0.5);
      return sh.slice(0, n).map(i => i.id);
    }
    state.trackTitle = TITLE_SUGGESTIONS[Math.floor(Math.random() * TITLE_SUGGESTIONS.length)];
    if (titleInput) titleInput.value = state.trackTitle;
    updatePresetPlaceholder();

    state.genre = GENRES[Math.floor(Math.random() * GENRES.length)].id;
    state.vocalStyle = VOCAL_STYLES[Math.floor(Math.random() * VOCAL_STYLES.length)].id;
    state.japanesque = new Set(sample(JAPANESQUE_ELEMENTS, 2, 4));
    state.production = new Set(sample(PRODUCTION_ELEMENTS, 3, 5));
    // 必須で入れたい要素を補完
    state.production.add('sudden_silence');
    state.production.add('distorted_808');

    state.negatives = new Set(['tame_chill', 'gentle_acoustic', 'boring_chords', 'slow_tempo']);
    state.tempo = [168, 172, 176][Math.floor(Math.random() * 3)];

    applyState(state);
    generate();
    saveLastState(state);
    flash(`🎲 おまかせ電脳寺院トラック「${state.trackTitle}」を調合しました⛩️⚡`);
  });

  // リセット
  document.getElementById('resetBtn')?.addEventListener('click', () => {
    state.trackTitle = '南無阿弥陀808 (Namu Amida 808)';
    state.genre = 'templecore_breakcore';
    state.vocalStyle = 'dual_contrast';
    state.japanesque = new Set(['mokugyo', 'bonsho', 'buddhist_chant', 'koto']);
    state.production = new Set(['sudden_silence', 'distorted_808', 'laser_synth', 'amen_chops', 'pitch_riser']);
    state.negatives = new Set(['tame_chill', 'gentle_acoustic', 'boring_chords', 'slow_tempo']);
    state.tempo = 172;
    state.duration = '60';

    applyState(state);
    generate();
    saveLastState(state);
    flash('設定をリセットしました');
  });

  // プリセット保存
  document.getElementById('savePresetBtn')?.addEventListener('click', () => {
    const input = document.getElementById('presetNameInput');
    let name = input.value.trim();
    if (!name && state.trackTitle) {
      name = state.trackTitle.trim();
    }
    if (!name) {
      flash('プリセット名を入力してください');
      return;
    }
    if (savePreset(name, state)) {
      input.value = '';
      renderPresets();
      flash(`「${name}」を保存しました💾`);
    }
  });

  // プリセット書き出し
  document.getElementById('exportPresetBtn')?.addEventListener('click', () => {
    exportPresetsAsJSON();
    flash('プリセットを書き出しました');
  });

  // プリセット取り込み
  const fileInput = document.getElementById('importPresetFile');
  document.getElementById('importPresetBtn')?.addEventListener('click', () => {
    fileInput?.click();
  });
  fileInput?.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (file) {
      importPresetsFromJSON(file, (success, count, errMsg) => {
        if (success) {
          renderPresets();
          flash(`${count}件のプリセットを取り込みました`);
        } else {
          flash(errMsg || '読み込みに失敗しました');
        }
        fileInput.value = '';
      });
    }
  });

  // 共有URL
  document.getElementById('shareUrlBtn')?.addEventListener('click', async () => {
    const url = getShareURL(state);
    try {
      await navigator.clipboard.writeText(url);
      flash('共有用URLをコピーしました！🔗');
    } catch (e) {
      prompt('以下のURLをコピーしてください:', url);
    }
  });

  // プロンプトコピー
  document.getElementById('copyBtn')?.addEventListener('click', async () => {
    const out = document.getElementById('promptOut');
    if (!out || !out.value) return;
    try {
      await navigator.clipboard.writeText(out.value);
      flash('プロンプトをコピーしました！📋');
    } catch (e) {
      out.select();
      document.execCommand('copy');
      flash('コピーしました！');
    }
  });

  // 除外指示コピー
  document.getElementById('copyNegBtn')?.addEventListener('click', async () => {
    const out = document.getElementById('negativeOut');
    if (!out || !out.value) return;
    try {
      await navigator.clipboard.writeText(out.value);
      flash('除外指示（Negative Prompt）をコピーしました！🚫');
    } catch (e) {
      out.select();
      document.execCommand('copy');
      flash('コピーしました！');
    }
  });

  // SNSタイトル＆説明文コピー
  document.getElementById('copySocialBtn')?.addEventListener('click', async () => {
    const t = document.getElementById('socialVideoTitle')?.value || '';
    const d = document.getElementById('socialDescription')?.value || '';
    const text = `${t}\n\n${d}`;
    try {
      await navigator.clipboard.writeText(text);
      flash('動画タイトル＆説明文をコピーしました！🎥');
    } catch (e) {
      prompt('以下のテキストをコピーしてください:', text);
    }
  });

  // プレビュー再生
  const playBtn = document.getElementById('previewToggleBtn');
  const previewVolume = document.getElementById('previewVolume');
  const stepBulbs = document.querySelectorAll('.step-bulb');

  previewVolume?.addEventListener('input', (e) => {
    templecoreAudio.setVolume(parseFloat(e.target.value));
  });

  playBtn?.addEventListener('click', () => {
    templecoreAudio.toggle(
      () => state,
      (activeStep) => {
        stepBulbs.forEach((bulb, idx) => {
          bulb.classList.toggle('active', idx === activeStep);
        });
      },
      (isPlaying) => {
        if (isPlaying) {
          playBtn.textContent = '■ STOP (狂気停止)';
          playBtn.classList.add('playing');
        } else {
          playBtn.textContent = '▶ PLAY (172BPM ブレイクビーツ＆木魚試聴)';
          playBtn.classList.remove('playing');
          stepBulbs.forEach(b => b.classList.remove('active'));
        }
      }
    );
  });

  // PWA インストール処理
  let deferredPrompt = null;
  const installPwaBtn = document.getElementById('installPwaBtn');
  const installGuideBtn = document.getElementById('installGuideBtn');
  const installModal = document.getElementById('installModal');
  const modalCloseBtn = document.getElementById('modalCloseBtn');
  const modalOkBtn = document.getElementById('modalOkBtn');

  const isStandalone = window.matchMedia('(display-mode: standalone)').matches || window.navigator.standalone === true;
  if (isStandalone) {
    if (installPwaBtn) installPwaBtn.style.display = 'none';
    if (installGuideBtn) installGuideBtn.style.display = 'none';
  }

  window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    deferredPrompt = e;
    if (installPwaBtn && !isStandalone) {
      installPwaBtn.style.display = 'inline-flex';
    }
  });

  installPwaBtn?.addEventListener('click', async () => {
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === 'accepted') {
      flash('アプリのインストールを開始しました！⚡');
    }
    deferredPrompt = null;
    installPwaBtn.style.display = 'none';
  });

  window.addEventListener('appinstalled', () => {
    if (installPwaBtn) installPwaBtn.style.display = 'none';
    if (installGuideBtn) installGuideBtn.style.display = 'none';
    flash('ホーム画面にインストールされました！📱');
  });

  installGuideBtn?.addEventListener('click', () => {
    installModal?.classList.add('show');
  });

  const closeModal = () => {
    installModal?.classList.remove('show');
  };

  modalCloseBtn?.addEventListener('click', closeModal);
  modalOkBtn?.addEventListener('click', closeModal);
  installModal?.addEventListener('click', (e) => {
    if (e.target === installModal) closeModal();
  });

  renderPresets();
  generate();
  saveLastState(state);
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
