/**
 * 電脳和風ブレイクコア＆ハイパーポップ・コンポーザー (Templecore Composer)
 * Web Audio API リアルタイムシンセ・試聴エンジン
 * 172BPM ブレイクビーツ × 木魚連打 × 梵鐘 × 歪み808 × レーザーシンセ
 */

class TemplecoreAudioEngine {
  constructor() {
    this.ctx = null;
    this.isPlaying = false;
    this.timerId = null;
    this.currentStep = 0;
    this.totalSteps = 16;
    this.masterGain = null;
    this.distortionCurve = this.createDistortionCurve(30);
  }

  initContext() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      this.ctx = new AudioCtx();
      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.value = 0.5;
      this.masterGain.connect(this.ctx.destination);
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  setVolume(val) {
    if (this.masterGain) {
      this.masterGain.gain.value = Math.max(0, Math.min(1, val));
    }
  }

  createDistortionCurve(amount = 20) {
    const k = amount;
    const n = 22050;
    const curve = new Float32Array(n);
    const deg = Math.PI / 180;
    for (let i = 0; i < n; ++i) {
      const x = (i * 2) / n - 1;
      curve[i] = ((3 + k) * x * 20 * deg) / (Math.PI + k * Math.abs(x));
    }
    return curve;
  }

  // 木魚 (Mokugyo) サウンド
  playMokugyo(time, pitch = 700) {
    if (!this.ctx) return;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    const filter = this.ctx.createBiquadFilter();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(pitch, time);
    osc.frequency.exponentialRampToValueAtTime(pitch * 0.5, time + 0.04);

    filter.type = 'bandpass';
    filter.frequency.value = pitch * 1.2;
    filter.Q.value = 8;

    gain.gain.setValueAtTime(0.7, time);
    gain.gain.exponentialRampToValueAtTime(0.001, time + 0.06);

    osc.connect(filter);
    filter.connect(gain);
    gain.connect(this.masterGain);

    osc.start(time);
    osc.stop(time + 0.07);
  }

  // 梵鐘 (Bonsho Bell) - FM合成による金属倍音
  playBonsho(time) {
    if (!this.ctx) return;
    const carrier = this.ctx.createOscillator();
    const mod = this.ctx.createOscillator();
    const modGain = this.ctx.createGain();
    const gain = this.ctx.createGain();

    const baseFreq = 140; // 深い金属の基音
    carrier.type = 'sine';
    carrier.frequency.setValueAtTime(baseFreq, time);

    mod.type = 'sine';
    mod.frequency.setValueAtTime(baseFreq * 2.76, time); // 非調和比

    modGain.gain.setValueAtTime(400, time);
    modGain.gain.exponentialRampToValueAtTime(10, time + 1.8);

    gain.gain.setValueAtTime(0.8, time);
    gain.gain.exponentialRampToValueAtTime(0.001, time + 2.4);

    mod.connect(modGain);
    modGain.connect(carrier.frequency);
    carrier.connect(gain);
    gain.connect(this.masterGain);

    mod.start(time);
    carrier.start(time);
    mod.stop(time + 2.5);
    carrier.stop(time + 2.5);
  }

  // 歪み808ベース (Distorted 808 Glide)
  playDistorted808(time, noteFreq = 50, duration = 0.25) {
    if (!this.ctx) return;
    const osc = this.ctx.createOscillator();
    const shaper = this.ctx.createWaveShaper();
    const gain = this.ctx.createGain();
    const filter = this.ctx.createBiquadFilter();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(noteFreq * 1.6, time);
    osc.frequency.exponentialRampToValueAtTime(noteFreq, time + 0.08);

    shaper.curve = this.distortionCurve;
    shaper.oversample = '2x';

    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(1200, time);
    filter.frequency.exponentialRampToValueAtTime(280, time + duration);

    gain.gain.setValueAtTime(0.75, time);
    gain.gain.exponentialRampToValueAtTime(0.001, time + duration);

    osc.connect(shaper);
    shaper.connect(filter);
    filter.connect(gain);
    gain.connect(this.masterGain);

    osc.start(time);
    osc.stop(time + duration + 0.05);
  }

  // レーザーシンセリード (Laser Synth)
  playLaser(time, startFreq = 2200, endFreq = 250) {
    if (!this.ctx) return;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(startFreq, time);
    osc.frequency.exponentialRampToValueAtTime(endFreq, time + 0.07);

    gain.gain.setValueAtTime(0.5, time);
    gain.gain.exponentialRampToValueAtTime(0.001, time + 0.08);

    osc.connect(gain);
    gain.connect(this.masterGain);

    osc.start(time);
    osc.stop(time + 0.09);
  }

  // アーメン風スネア／ブレイクコアスネア (Amen Snare)
  playSnare(time, isGhost = false) {
    if (!this.ctx) return;
    // ノイズバッファ
    const bufferSize = this.ctx.sampleRate * 0.1;
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = Math.random() * 2 - 1;
    }

    const noise = this.ctx.createBufferSource();
    noise.buffer = buffer;

    const filter = this.ctx.createBiquadFilter();
    filter.type = 'highpass';
    filter.frequency.value = 1000;

    const gain = this.ctx.createGain();
    const vol = isGhost ? 0.25 : 0.65;
    const len = isGhost ? 0.05 : 0.12;

    gain.gain.setValueAtTime(vol, time);
    gain.gain.exponentialRampToValueAtTime(0.001, time + len);

    noise.connect(filter);
    filter.connect(gain);
    gain.connect(this.masterGain);

    noise.start(time);
    noise.stop(time + len + 0.02);
  }

  // ハイハット (Chop Hat)
  playHat(time) {
    if (!this.ctx) return;
    const bufferSize = this.ctx.sampleRate * 0.03;
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = Math.random() * 2 - 1;
    }

    const noise = this.ctx.createBufferSource();
    noise.buffer = buffer;

    const filter = this.ctx.createBiquadFilter();
    filter.type = 'highpass';
    filter.frequency.value = 7500;

    const gain = this.ctx.createGain();
    gain.gain.setValueAtTime(0.28, time);
    gain.gain.exponentialRampToValueAtTime(0.001, time + 0.025);

    noise.connect(filter);
    filter.connect(gain);
    gain.connect(this.masterGain);

    noise.start(time);
    noise.stop(time + 0.03);
  }

  // 1ステップの再生処理
  step(state, stepIndex, time) {
    // ステップ14・15で「一瞬の完全静寂（Absolute Silence）」を演出するパターン
    const isSilenceMode = state.production.has('sudden_silence') && (stepIndex === 14);

    if (isSilenceMode) {
      // 息をのむ完全無音（何も鳴らさない）
      return;
    }

    // 梵鐘 (ステップ0で重厚に鳴る)
    if (stepIndex === 0 && state.japanesque.has('bonsho')) {
      this.playBonsho(time);
    }

    // 木魚 (16分超高速ポリリズム)
    if (state.japanesque.has('mokugyo')) {
      if (stepIndex % 2 === 0 || stepIndex === 7 || stepIndex === 11 || stepIndex === 15) {
        const pitch = (stepIndex % 4 === 0) ? 680 : 750;
        this.playMokugyo(time, pitch);
      }
    }

    // 歪み808 (ステップ0, 6, 8, 12, 15で激しくスライド)
    if (state.production.has('distorted_808')) {
      if (stepIndex === 0) this.playDistorted808(time, 48, 0.35);
      if (stepIndex === 6) this.playDistorted808(time, 58, 0.2);
      if (stepIndex === 8) this.playDistorted808(time, 44, 0.28);
      if (stepIndex === 12) this.playDistorted808(time, 65, 0.18);
    }

    // スネア・アーメンブレイク (ステップ4, 10, 12, 15で粉砕)
    if (state.production.has('amen_chops')) {
      if (stepIndex === 4 || stepIndex === 12) {
        this.playSnare(time, false);
      } else if (stepIndex === 7 || stepIndex === 10 || stepIndex === 15) {
        this.playSnare(time, true); // ゴーストノート
      }
    }

    // レーザーシンセ (ステップ2, 9, 13で突き刺さる)
    if (state.production.has('laser_synth')) {
      if (stepIndex === 2 || stepIndex === 9 || stepIndex === 13) {
        this.playLaser(time, 2400, 300);
      }
    }

    // ハイハット (毎ステップ刻む)
    this.playHat(time);
  }

  start(getState, onStep, onStatusChange) {
    this.initContext();
    if (this.isPlaying) return;

    this.isPlaying = true;
    onStatusChange?.(true);

    let nextStepTime = this.ctx.currentTime + 0.05;
    this.currentStep = 0;

    const schedule = () => {
      if (!this.isPlaying) return;

      const state = getState();
      const tempo = Number(state.tempo) || 172;
      // 16分音符の秒数 (1拍 = 60/BPM, 16分音符 = 1拍/4)
      const stepDuration = (60 / tempo) / 4;

      while (nextStepTime < this.ctx.currentTime + 0.1) {
        const activeStep = this.currentStep;
        this.step(state, activeStep, nextStepTime);

        // UIコールバック
        const delay = Math.max(0, (nextStepTime - this.ctx.currentTime) * 1000);
        setTimeout(() => {
          if (this.isPlaying) {
            onStep?.(activeStep);
          }
        }, delay);

        this.currentStep = (this.currentStep + 1) % this.totalSteps;
        nextStepTime += stepDuration;
      }

      this.timerId = setTimeout(schedule, 25);
    };

    schedule();
  }

  stop(onStatusChange) {
    this.isPlaying = false;
    if (this.timerId) {
      clearTimeout(this.timerId);
      this.timerId = null;
    }
    onStatusChange?.(false);
  }

  toggle(getState, onStep, onStatusChange) {
    if (this.isPlaying) {
      this.stop(onStatusChange);
    } else {
      this.start(getState, onStep, onStatusChange);
    }
  }
}

export const templecoreAudio = new TemplecoreAudioEngine();
