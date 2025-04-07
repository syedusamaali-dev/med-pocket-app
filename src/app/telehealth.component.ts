import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-telehealth',
  standalone: true,
  template: `
    <section class="page">
      <div class="page-head">
        <div>
          <h1>Telehealth Call</h1>
          <p>Secure video consultation with your patient</p>
        </div>
        <div class="call-timer">
          <span class="live-dot"></span>
          <span>{{ timer() }}</span>
        </div>
      </div>

      <div class="call-stage">
        <div class="patient-view">
          <div class="vid-bg patient-bg">
            <div class="vid-label">
              <span class="rec-dot"></span> Patient — Emily Carter
            </div>
            <div class="vid-center">
              <div class="vid-avatar">EC</div>
              <span class="vid-name">Emily Carter</span>
              <span class="vid-sub">@emily.carter</span>
            </div>
          </div>

          <div class="pip">
            <div class="vid-bg doc-bg pip-inner">
              <div class="pip-label">You (Dr. Ronald)</div>
              <div class="pip-avatar">DR</div>
            </div>
          </div>
        </div>

        <div class="side-panel">
          <h3>Call Info</h3>
          <div class="info-row"><span class="ikey">Patient</span><span class="ival">Emily Carter</span></div>
          <div class="info-row"><span class="ikey">Reason</span><span class="ival">Routine follow-up</span></div>
          <div class="info-row"><span class="ikey">Duration</span><span class="ival">{{ timer() }}</span></div>
          <div class="info-row"><span class="ikey">Connection</span><span class="ival pos">Strong</span></div>

          <h3 class="notes-h">Quick Notes</h3>
          <textarea class="notes" placeholder="Type notes during the call..."></textarea>
        </div>
      </div>

      <div class="controls">
        <button class="ctrl" [class.ctrl-off]="!muted()" (click)="muted.set(!muted())" title="Mute">
          <span class="ctrl-ico">{{ muted() ? '\u{1F507}' : '\u{1F3A4}' }}</span>
          <span class="ctrl-txt">{{ muted() ? 'Unmute' : 'Mute' }}</span>
        </button>
        <button class="ctrl" [class.ctrl-off]="!camOn()" (click)="camOn.set(!camOn())" title="Camera">
          <span class="ctrl-ico">{{ camOn() ? '\u{1F4F7}' : '\u{1F6AB}' }}</span>
          <span class="ctrl-txt">{{ camOn() ? 'Camera' : 'Cam Off' }}</span>
        </button>
        <button class="ctrl" title="Share Screen">
          <span class="ctrl-ico">\u{1F4BB}</span>
          <span class="ctrl-txt">Share</span>
        </button>
        <button class="ctrl end" (click)="endCall()" title="End Call">
          <span class="ctrl-ico">\u{1F534}</span>
          <span class="ctrl-txt">End Call</span>
        </button>
      </div>

      @if (ended()) {
        <div class="ended-banner">Call ended. Duration: {{ timer() }}</div>
      }
    </section>
  `,
  styles: [`
    .page { display: flex; flex-direction: column; gap: 20px; }
    .page-head { display: flex; justify-content: space-between; align-items: flex-end; }
    .page-head h1 { margin: 0 0 4px; font-size: 24px; font-weight: 700; color: #1A1D26; }
    .page-head p { margin: 0; color: #6B7280; font-size: 14px; }
    .call-timer { display: flex; align-items: center; gap: 8px; background: #fff; padding: 8px 14px; border-radius: 12px;
      box-shadow: 0 4px 14px rgba(20,40,60,.06); font-weight: 700; color: #1A1D26; font-variant-numeric: tabular-nums; }
    .live-dot { width: 9px; height: 9px; border-radius: 50%; background: #FF6B6B; animation: pulse 1.4s infinite; }
    @keyframes pulse { 0%,100% { opacity: 1; } 50% { opacity: .3; } }

    .call-stage { display: grid; grid-template-columns: 1fr 280px; gap: 20px; }
    .patient-view { position: relative; border-radius: 18px; overflow: hidden; min-height: 420px; }
    .vid-bg { width: 100%; height: 100%; min-height: 420px; display: flex; flex-direction: column; }
    .patient-bg { background: linear-gradient(160deg, #1b2a4a 0%, #2d4a7a 50%, #3C6CE7 100%); }
    .vid-label { display: flex; align-items: center; gap: 8px; padding: 14px 18px; color: #fff; font-weight: 600; font-size: 13px; }
    .rec-dot { width: 8px; height: 8px; border-radius: 50%; background: #FF6B6B; animation: pulse 1.4s infinite; }
    .vid-center { flex: 1; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 8px; color: #fff; }
    .vid-avatar { width: 88px; height: 88px; border-radius: 50%; background: rgba(255,255,255,.18); border: 2px solid rgba(255,255,255,.4);
      display: grid; place-items: center; font-size: 30px; font-weight: 700; }
    .vid-name { font-size: 20px; font-weight: 700; }
    .vid-sub { font-size: 13px; opacity: .75; }

    .pip { position: absolute; bottom: 18px; right: 18px; width: 180px; height: 130px; border-radius: 14px;
      overflow: hidden; box-shadow: 0 8px 24px rgba(0,0,0,.35); border: 2px solid rgba(255,255,255,.5); }
    .pip-inner { min-height: 130px; position: relative; }
    .doc-bg { background: linear-gradient(160deg, #2d1b4e 0%, #5a3fa0 50%, #816BEE 100%); }
    .pip-label { position: absolute; top: 8px; left: 10px; color: #fff; font-size: 10px; font-weight: 600; text-shadow: 0 1px 2px rgba(0,0,0,.4); }
    .pip-avatar { position: absolute; inset: 0; display: grid; place-items: center; color: #fff; font-size: 28px; font-weight: 700;
      background: rgba(255,255,255,.1); }

    .side-panel { background: #fff; border-radius: 18px; padding: 20px; box-shadow: 0 4px 18px rgba(20,40,60,.06); display: flex; flex-direction: column; gap: 10px; }
    .side-panel h3 { margin: 0 0 6px; font-size: 15px; font-weight: 700; color: #1A1D26; }
    .info-row { display: flex; justify-content: space-between; font-size: 13px; padding: 6px 0; border-bottom: 1px solid #f5f6f8; }
    .ikey { color: #6B7280; }
    .ival { font-weight: 600; color: #1A1D26; }
    .ival.pos { color: #00A878; }
    .notes-h { margin-top: 8px; }
    .notes { border: 1px solid #e8eaee; background: #F3F4F6; border-radius: 12px; padding: 10px; font-size: 13px; min-height: 90px; resize: vertical; font-family: inherit; }
    .notes:focus { outline: none; border-color: #816BEE; background: #fff; }

    .controls { display: flex; justify-content: center; gap: 14px; background: #fff; border-radius: 18px; padding: 16px; box-shadow: 0 4px 18px rgba(20,40,60,.06); }
    .ctrl { display: flex; flex-direction: column; align-items: center; gap: 4px; border: none; background: #F3F4F6; color: #1A1D26;
      padding: 12px 20px; border-radius: 14px; cursor: pointer; min-width: 84px; transition: background .15s, transform .15s; }
    .ctrl:hover { background: #e5e7eb; transform: translateY(-2px); }
    .ctrl-ico { font-size: 22px; }
    .ctrl-txt { font-size: 11px; font-weight: 600; }
    .ctrl-off { background: #FF6B6B; color: #fff; }
    .ctrl-off:hover { background: #e84545; }
    .end { background: #FF6B6B; color: #fff; }
    .end:hover { background: #e84545; }

    .ended-banner { text-align: center; background: rgba(255,107,107,.1); color: #E04545; padding: 12px; border-radius: 12px; font-weight: 600; }

    @media (max-width: 900px) {
      .call-stage { grid-template-columns: 1fr; }
      .pip { width: 120px; height: 90px; }
    }
  `],
})
export class TelehealthComponent {
  muted = signal(false);
  camOn = signal(true);
  ended = signal(false);
  seconds = signal(0);
  timer(): string {
    const s = this.seconds();
    const m = Math.floor(s / 60);
    const r = s % 60;
    return `${String(m).padStart(2, '0')}:${String(r).padStart(2, '0')}`;
  }
  constructor() {
    setInterval(() => {
      if (!this.ended()) this.seconds.update(v => v + 1);
    }, 1000);
  }
  endCall() {
    this.ended.set(true);
  }
}
