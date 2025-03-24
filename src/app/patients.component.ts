import { Component, signal } from '@angular/core';
import { PATIENTS, Patient } from './mock-data';

@Component({
  selector: 'app-patients',
  template: `
    <section class="page">
      <div class="page-head">
        <div>
          <h1>Patients</h1>
          <p>Manage and review your patient records</p>
        </div>
        <button class="add-btn">+ Add Patient</button>
      </div>

      <div class="card">
        <div class="filters">
          <input class="search" placeholder="Search patients..." (input)="onSearch($event)" />
          <select class="filter-sel" (change)="onFilter($event)">
            <option value="All">All statuses</option>
            <option value="Easy">Easy</option>
            <option value="Neutral">Neutral</option>
            <option value="Hard">Hard</option>
          </select>
        </div>

        <table>
          <thead>
            <tr>
              <th>Patient</th><th>Status</th><th>Next Visit</th><th>Consultation</th><th>Insurance</th><th>Actions</th>
            </tr>
          </thead>
          <tbody>
            @for (p of filtered(); track p.name) {
              <tr>
                <td class="name-cell">
                  <span class="avatar" [style.background]="color(p.avatar)">{{ p.avatar }}</span>
                  <div class="np"><span class="pname">{{ p.name }}</span><span class="pid">#PT-{{ p.avatar }}</span></div>
                </td>
                <td><span class="badge" [class.badge-easy]="p.status==='Easy'" [class.badge-neutral]="p.status==='Neutral'" [class.badge-hard]="p.status==='Hard'">{{ p.status }}</span></td>
                <td class="muted">{{ p.nextVisit }}</td>
                <td>{{ p.consultationType }}</td>
                <td><span class="ins" [class.ins-active]="p.insurance==='Active'" [class.ins-pending]="p.insurance==='Pending'" [class.ins-none]="p.insurance==='None'">{{ p.insurance }}</span></td>
                <td><button class="row-btn">View</button></td>
              </tr>
            }
            @if (filtered().length === 0) {
              <tr><td colspan="6" class="empty">No patients match your search.</td></tr>
            }
          </tbody>
        </table>
      </div>
    </section>
  `,
  styles: [`
    .page { display: flex; flex-direction: column; gap: 20px; }
    .page-head { display: flex; justify-content: space-between; align-items: flex-end; }
    .page-head h1 { margin: 0 0 4px; font-size: 24px; font-weight: 700; color: #1A1D26; }
    .page-head p { margin: 0; color: #6B7280; font-size: 14px; }
    .add-btn { background: #ECE8FE; color: #816BEE; border: none; padding: 11px 20px; border-radius: 12px;
      font-weight: 700; cursor: pointer; font-size: 13px; }
    .add-btn:hover { background: #ddd5fa; }
    .card { background: #fff; border-radius: 18px; padding: 20px; box-shadow: 0 4px 18px rgba(20,40,60,0.06); }
    .filters { display: flex; gap: 12px; margin-bottom: 16px; }
    .search { flex: 1; border: 1px solid #e8eaee; background: #F3F4F6; border-radius: 12px; padding: 11px 14px; font-size: 13px; color: #1A1D26; }
    .search:focus { outline: none; border-color: #816BEE; background: #fff; }
    .filter-sel { border: 1px solid #e8eaee; background: #F3F4F6; border-radius: 12px; padding: 11px 14px; font-size: 13px; color: #1A1D26; cursor: pointer; }
    table { width: 100%; border-collapse: collapse; }
    th { text-align: left; font-size: 11px; text-transform: uppercase; letter-spacing: .04em; color: #6B7280; padding: 8px 10px; border-bottom: 1px solid #f0f1f3; }
    td { padding: 12px 10px; border-bottom: 1px solid #f5f6f8; font-size: 13px; color: #1A1D26; }
    tr:last-child td { border-bottom: none; }
    .name-cell { display: flex; align-items: center; gap: 10px; }
    .avatar { width: 36px; height: 36px; border-radius: 10px; display: grid; place-items: center; color: #fff; font-weight: 700; font-size: 13px; flex-shrink: 0; }
    .np { display: flex; flex-direction: column; }
    .pname { font-weight: 600; }
    .pid { font-size: 11px; color: #9ca3af; }
    .muted { color: #6B7280; }
    .badge { padding: 4px 10px; border-radius: 20px; font-size: 11px; font-weight: 600; }
    .badge-easy { background: rgba(0,210,160,.15); color: #00A878; }
    .badge-neutral { background: rgba(255,184,0,.15); color: #C98900; }
    .badge-hard { background: rgba(255,107,107,.15); color: #E04545; }
    .ins { padding: 4px 10px; border-radius: 8px; font-size: 11px; font-weight: 600; }
    .ins-active { background: rgba(0,210,160,.15); color: #00A878; }
    .ins-pending { background: rgba(255,184,0,.15); color: #C98900; }
    .ins-none { background: #F3F4F6; color: #6B7280; }
    .row-btn { border: 1px solid #e8eaee; background: #fff; color: #816BEE; padding: 6px 14px; border-radius: 8px; cursor: pointer; font-size: 12px; font-weight: 600; }
    .row-btn:hover { background: #ECE8FE; }
    .empty { text-align: center; color: #6B7280; padding: 30px; }
  `],
})
export class PatientsComponent {
  patients: Patient[] = PATIENTS;
  query = signal('');
  statusFilter = signal('All');

  filtered() {
    const q = this.query().toLowerCase();
    const f = this.statusFilter();
    return this.patients.filter(p =>
      (f === 'All' || p.status === f) &&
      (q === '' || p.name.toLowerCase().includes(q))
    );
  }
  onSearch(e: Event) { this.query.set((e.target as HTMLInputElement).value); }
  onFilter(e: Event) { this.statusFilter.set((e.target as HTMLSelectElement).value); }
  color(seed: string): string {
    const colors = ['#816BEE', '#00BFA5', '#3C6CE7', '#FF6B6B', '#00D2A0', '#F59E0B'];
    return colors[seed.charCodeAt(0) % colors.length];
  }
}
