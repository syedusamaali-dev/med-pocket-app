import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { APPOINTMENTS, AppointmentSlot } from './mock-data';

const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
interface Cell { day: number; date: number; inMonth: boolean; hasEvent: boolean; event?: string; }

@Component({
  imports: [FormsModule],
  selector: 'app-appointments',
  template: `
    <section class="page">
      <div class="page-head">
        <div>
          <h1>Appointments &amp; Calendar</h1>
          <p>August 2026 — your scheduled consultations</p>
        </div>
        <button class="add-btn" (click)="showForm.set(!showForm())">{{ showForm() ? 'Close' : '+ Add Event' }}</button>
      </div>

      @if (showForm()) {
        <div class="card form-card">
          <h3>New Appointment</h3>
          <div class="form-row">
            <input class="field" placeholder="Patient name" [(ngModel)]="draftPatient" />
            <input class="field" placeholder="Type (e.g. Online Checkup)" [(ngModel)]="draftType" />
            <input class="field" placeholder="Time (e.g. 11:00 AM)" [(ngModel)]="draftTime" />
            <button class="save-btn" (click)="addEvent()">Save</button>
          </div>
        </div>
      }

      <div class="grid">
        <div class="card cal-card">
          <div class="cal-head">
            <button class="nav-btn" (click)="prev()">&#8249;</button>
            <span class="month-label">{{ monthLabel() }}</span>
            <button class="nav-btn" (click)="next()">&#8250;</button>
          </div>
          <div class="cal-grid">
            @for (d of DAYS; track d) {
              <div class="dow">{{ d }}</div>
            }
            @for (c of cells(); track $index) {
              <div class="cell" [class.cell-off]="!c.inMonth" [class.cell-today]="c.date===18 && c.inMonth"
                   [class.cell-event]="c.hasEvent">
                <span class="cell-date">{{ c.date }}</span>
                @if (c.hasEvent) { <span class="cell-dot"></span> }
              </div>
            }
          </div>
        </div>

        <div class="card list-card">
          <h3>Upcoming Slots</h3>
          <div class="slot-list">
            @for (a of slots(); track a.time) {
              <div class="slot">
                <span class="slot-dot" [style.background]="a.color"></span>
                <div class="slot-info">
                  <span class="slot-time">{{ a.time }}</span>
                  <span class="slot-patient">{{ a.patient }}</span>
                  <span class="slot-type">{{ a.type }}</span>
                </div>
                <button class="slot-btn">Join</button>
              </div>
            }
          </div>
        </div>
      </div>
    </section>
  `,
  styles: [`
    .page { display: flex; flex-direction: column; gap: 20px; }
    .page-head { display: flex; justify-content: space-between; align-items: flex-end; }
    .page-head h1 { margin: 0 0 4px; font-size: 24px; font-weight: 700; color: #1A1D26; }
    .page-head p { margin: 0; color: #6B7280; font-size: 14px; }
    .add-btn { background: linear-gradient(135deg, #816BEE, #6d54e8); color: #fff; border: none; padding: 11px 20px;
      border-radius: 12px; font-weight: 700; cursor: pointer; font-size: 13px; box-shadow: 0 4px 12px rgba(129,107,238,.3); }
    .card { background: #fff; border-radius: 18px; padding: 20px; box-shadow: 0 4px 18px rgba(20,40,60,0.06); }
    .grid { display: grid; grid-template-columns: 1fr 320px; gap: 20px; }
    .cal-head { display: flex; justify-content: space-between; align-items: center; margin-bottom: 14px; }
    .month-label { font-weight: 700; font-size: 16px; color: #1A1D26; }
    .nav-btn { border: none; background: #F3F4F6; width: 32px; height: 32px; border-radius: 10px; cursor: pointer; font-size: 16px; color: #6B7280; }
    .nav-btn:hover { background: #e5e7eb; }
    .cal-grid { display: grid; grid-template-columns: repeat(7, 1fr); gap: 6px; }
    .dow { text-align: center; font-size: 11px; font-weight: 700; color: #6B7280; padding-bottom: 6px; text-transform: uppercase; }
    .cell { aspect-ratio: 1; border-radius: 10px; display: flex; flex-direction: column; align-items: center; justify-content: center;
      background: #fafbfc; font-size: 13px; color: #1A1D26; position: relative; cursor: pointer; transition: background .15s; }
    .cell:hover { background: #eef0f3; }
    .cell-off { color: #c9cdd4; background: transparent; }
    .cell-today { background: #816BEE; color: #fff; font-weight: 700; }
    .cell-event { background: #ECE8FE; color: #816BEE; font-weight: 600; }
    .cell-dot { width: 6px; height: 6px; border-radius: 50%; background: #00BFA5; margin-top: 3px; }
    .cell-today .cell-dot { background: #fff; }
    .list-card h3 { margin: 0 0 14px; font-size: 16px; font-weight: 700; color: #1A1D26; }
    .slot-list { display: flex; flex-direction: column; gap: 10px; }
    .slot { display: flex; align-items: center; gap: 12px; padding: 12px; border-radius: 12px; background: #f9fafb; }
    .slot:hover { background: #f0f2f5; }
    .slot-dot { width: 10px; height: 10px; border-radius: 50%; flex-shrink: 0; }
    .slot-info { display: flex; flex-direction: column; gap: 1px; flex: 1; }
    .slot-time { font-size: 11px; font-weight: 700; color: #6B7280; }
    .slot-patient { font-size: 14px; font-weight: 600; color: #1A1D26; }
    .slot-type { font-size: 11px; color: #9ca3af; }
    .slot-btn { border: none; background: linear-gradient(135deg, #00BFA5, #3C6CE7); color: #fff; padding: 7px 14px;
      border-radius: 9px; cursor: pointer; font-weight: 600; font-size: 12px; }
    .form-card h3 { margin: 0 0 12px; font-size: 16px; }
    .form-row { display: flex; gap: 10px; flex-wrap: wrap; }
    .field { flex: 1; min-width: 160px; border: 1px solid #e8eaee; background: #F3F4F6; border-radius: 10px; padding: 10px 12px; font-size: 13px; }
    .field:focus { outline: none; border-color: #816BEE; background: #fff; }
    .save-btn { background: #816BEE; color: #fff; border: none; padding: 10px 22px; border-radius: 10px; font-weight: 700; cursor: pointer; }
    @media (max-width: 900px) { .grid { grid-template-columns: 1fr; } }
  `],
})
export class AppointmentsComponent {
  DAYS = DAYS;
  offset = signal(0);
  showForm = signal(false);
  slots = signal<AppointmentSlot[]>([...APPOINTMENTS]);
  draftPatient = '';
  draftType = '';
  draftTime = '';

  monthLabel(): string {
    const months = ['January','February','March','April','May','June','July','August','September','October','November','December'];
    const base = new Date(2026, 7, 1);
    base.setMonth(base.getMonth() + this.offset());
    return `${months[base.getMonth()]} ${base.getFullYear()}`;
  }
  cells(): Cell[] {
    const base = new Date(2026, 7, 1);
    base.setMonth(base.getMonth() + this.offset());
    const year = base.getFullYear();
    const month = base.getMonth();
    const first = new Date(year, month, 1).getDay();
    const days = new Date(year, month + 1, 0).getDate();
    const prevDays = new Date(year, month, 0).getDate();
    const cells: Cell[] = [];
    const eventDays = [5, 12, 18, 22, 25];
    for (let i = 0; i < first; i++) {
      cells.push({ day: -1, date: prevDays - first + i + 1, inMonth: false, hasEvent: false });
    }
    for (let d = 1; d <= days; d++) {
      cells.push({ day: d, date: d, inMonth: true, hasEvent: eventDays.includes(d) });
    }
    while (cells.length % 7 !== 0) {
      cells.push({ day: -1, date: cells.length - days - first + 1, inMonth: false, hasEvent: false });
    }
    return cells;
  }
  prev() { this.offset.update(v => v - 1); }
  next() { this.offset.update(v => v + 1); }
  addEvent() {
    if (!this.draftPatient || !this.draftTime) return;
    this.slots.update(s => [...s, { time: this.draftTime, patient: this.draftPatient, type: this.draftType || 'Consultation', color: '#816BEE' }]);
    this.draftPatient = ''; this.draftType = ''; this.draftTime = '';
    this.showForm.set(false);
  }
}
