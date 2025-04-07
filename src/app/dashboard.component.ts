import { Component } from '@angular/core';
import { METRICS, PATIENTS, APPOINTMENTS, Patient, Metric, AppointmentSlot } from './mock-data';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  template: `
    <section class="dashboard">
      <div class="dash-left">
        <div class="greeting">
          <h1>Hey, Dr. Ronald! Let's get to work</h1>
          <p>You have 5 appointments scheduled for today.</p>
        </div>

        <div class="metrics">
          @for (m of metrics; track m.label) {
            <div class="metric-card">
              <div class="metric-icon" [attr.data-icon]="m.icon">
                <span class="icon-glyph">{{ iconFor(m.icon) }}</span>
              </div>
              <div class="metric-body">
                <span class="metric-label">{{ m.label }}</span>
                <span class="metric-value">{{ m.value }}</span>
                <span class="metric-delta" [class.pos]="m.positive" [class.neg]="!m.positive">
                  {{ m.delta }}
                </span>
              </div>
            </div>
          }
        </div>

        <div class="card patients-card">
          <div class="card-head">
            <h2>Current Patients</h2>
            <button class="ghost-btn">View all</button>
          </div>
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Status</th>
                <th>Next Visit</th>
                <th>Consultation</th>
                <th>Insurance</th>
              </tr>
            </thead>
            <tbody>
              @for (p of patients; track p.name) {
                <tr>
                  <td class="name-cell">
                    <span class="avatar" [style.background]="avatarColor(p.avatar)">{{ p.avatar }}</span>
                    <span class="pname">{{ p.name }}</span>
                  </td>
                  <td>
                    <span class="badge" [class.badge-easy]="p.status==='Easy'" [class.badge-neutral]="p.status==='Neutral'" [class.badge-hard]="p.status==='Hard'">
                      {{ p.status }}
                    </span>
                  </td>
                  <td class="muted">{{ p.nextVisit }}</td>
                  <td>
                    <span class="ctype">
                      <span class="ctype-ico" [attr.data-type]="p.consultationType">{{ typeGlyph(p.consultationType) }}</span>
                      {{ p.consultationType }}
                    </span>
                  </td>
                  <td>
                    <span class="ins" [class.ins-active]="p.insurance==='Active'" [class.ins-pending]="p.insurance==='Pending'" [class.ins-none]="p.insurance==='None'">
                      {{ p.insurance }}
                    </span>
                  </td>
                </tr>
              }
            </tbody>
          </table>
        </div>
      </div>

      <aside class="schedule-panel">
        <div class="sp-head">
          <h3>Today's Schedule</h3>
          <span class="sp-date">Aug 18, 2026</span>
        </div>
        <div class="sp-list">
          @for (a of appointments; track a.time) {
            <div class="sp-card">
              <span class="sp-dot" [style.background]="a.color"></span>
              <div class="sp-info">
                <span class="sp-time">{{ a.time }}</span>
                <span class="sp-patient">{{ a.patient }}</span>
                <span class="sp-type">{{ a.type }}</span>
              </div>
            </div>
          }
        </div>
        <button class="sp-add">+ Add Appointment</button>
      </aside>
    </section>
  `,
  styles: [`
    .dashboard { display: grid; grid-template-columns: 1fr 320px; gap: 22px; }
    .dash-left { display: flex; flex-direction: column; gap: 22px; }
    .greeting h1 { font-size: 26px; font-weight: 700; color: #1A1D26; margin: 0 0 4px; }
    .greeting p { color: #6B7280; margin: 0; font-size: 14px; }
    .metrics { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; }
    .metric-card { background: #fff; border-radius: 18px; padding: 18px; display: flex; gap: 14px; align-items: center;
      box-shadow: 0 4px 18px rgba(20,40,60,0.06); }
    .metric-icon { width: 46px; height: 46px; border-radius: 14px; display: grid; place-items: center; flex-shrink: 0;
      background: linear-gradient(135deg, #ECE8FE, #D9D2FB); color: #816BEE; font-size: 20px; }
    .metric-body { display: flex; flex-direction: column; gap: 2px; }
    .metric-label { font-size: 12px; color: #6B7280; }
    .metric-value { font-size: 22px; font-weight: 700; color: #1A1D26; }
    .metric-delta { font-size: 12px; font-weight: 600; }
    .metric-delta.pos { color: #00D2A0; }
    .metric-delta.neg { color: #FF6B6B; }
    .card { background: #fff; border-radius: 18px; padding: 20px; box-shadow: 0 4px 18px rgba(20,40,60,0.06); }
    .card-head { display: flex; justify-content: space-between; align-items: center; margin-bottom: 14px; }
    .card-head h2 { font-size: 16px; font-weight: 700; color: #1A1D26; margin: 0; }
    .ghost-btn { border: none; background: #ECE8FE; color: #816BEE; font-weight: 600; padding: 7px 14px;
      border-radius: 10px; cursor: pointer; font-size: 12px; }
    .ghost-btn:hover { background: #ddd5fa; }
    table { width: 100%; border-collapse: collapse; }
    th { text-align: left; font-size: 11px; text-transform: uppercase; letter-spacing: .04em;
      color: #6B7280; padding: 8px 10px; border-bottom: 1px solid #f0f1f3; }
    td { padding: 12px 10px; border-bottom: 1px solid #f5f6f8; font-size: 13px; color: #1A1D26; }
    tr:last-child td { border-bottom: none; }
    .name-cell { display: flex; align-items: center; gap: 10px; }
    .avatar { width: 34px; height: 34px; border-radius: 10px; display: grid; place-items: center;
      color: #fff; font-weight: 700; font-size: 13px; flex-shrink: 0; }
    .pname { font-weight: 600; }
    .muted { color: #6B7280; }
    .badge { padding: 4px 10px; border-radius: 20px; font-size: 11px; font-weight: 600; }
    .badge-easy { background: rgba(0,210,160,.15); color: #00A878; }
    .badge-neutral { background: rgba(255,184,0,.15); color: #C98900; }
    .badge-hard { background: rgba(255,107,107,.15); color: #E04545; }
    .ctype { display: inline-flex; align-items: center; gap: 6px; }
    .ctype-ico { font-size: 14px; }
    .ins { padding: 4px 10px; border-radius: 8px; font-size: 11px; font-weight: 600; }
    .ins-active { background: rgba(0,210,160,.15); color: #00A878; }
    .ins-pending { background: rgba(255,184,0,.15); color: #C98900; }
    .ins-none { background: #F3F4F6; color: #6B7280; }

    .schedule-panel { background: linear-gradient(180deg, #00BFA5 0%, #3C6CE7 100%);
      border-radius: 18px; padding: 22px; color: #fff; height: fit-content;
      box-shadow: 0 8px 28px rgba(0,150,140,.25); position: sticky; top: 90px; }
    .sp-head { display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 18px; }
    .sp-head h3 { margin: 0; font-size: 16px; font-weight: 700; }
    .sp-date { font-size: 12px; opacity: .85; }
    .sp-list { display: flex; flex-direction: column; gap: 12px; }
    .sp-card { background: rgba(255,255,255,.16); backdrop-filter: blur(8px); border: 1px solid rgba(255,255,255,.22);
      border-radius: 14px; padding: 12px 14px; display: flex; gap: 12px; align-items: flex-start;
      transition: transform .2s, background .2s; cursor: pointer; }
    .sp-card:hover { transform: translateY(-2px); background: rgba(255,255,255,.24); }
    .sp-dot { width: 10px; height: 10px; border-radius: 50%; margin-top: 5px; flex-shrink: 0; }
    .sp-info { display: flex; flex-direction: column; gap: 2px; }
    .sp-time { font-size: 12px; font-weight: 700; opacity: .95; }
    .sp-patient { font-size: 14px; font-weight: 600; }
    .sp-type { font-size: 11px; opacity: .8; }
    .sp-add { margin-top: 18px; width: 100%; border: 1px dashed rgba(255,255,255,.5); background: rgba(255,255,255,.1);
      color: #fff; padding: 10px; border-radius: 12px; cursor: pointer; font-weight: 600; font-size: 13px; }
    .sp-add:hover { background: rgba(255,255,255,.2); }

    @media (max-width: 980px) {
      .dashboard { grid-template-columns: 1fr; }
      .metrics { grid-template-columns: 1fr; }
      .schedule-panel { position: static; }
    }
  `],
})
export class DashboardComponent {
  metrics: Metric[] = METRICS;
  patients: Patient[] = PATIENTS;
  appointments: AppointmentSlot[] = APPOINTMENTS;

  avatarColor(seed: string): string {
    const colors = ['#816BEE', '#00BFA5', '#3C6CE7', '#FF6B6B', '#00D2A0', '#F59E0B'];
    const idx = seed.charCodeAt(0) % colors.length;
    return colors[idx];
  }
  iconFor(icon: string): string {
    const map: Record<string, string> = { stethoscope: '\u2695', star: '\u2605', wallet: '\u2756' };
    return map[icon] ?? '\u25CF';
  }
  typeGlyph(t: string): string {
    if (t === 'Phone call') return '\u260E';
    if (t === 'Online') return '\u25C9';
    return '\u25A3';
  }
}
