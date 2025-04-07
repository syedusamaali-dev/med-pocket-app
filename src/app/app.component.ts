import { Component, signal } from '@angular/core';
import { DashboardComponent } from './dashboard.component';
import { PatientsComponent } from './patients.component';
import { AppointmentsComponent } from './appointments.component';
import { PrescriptionsComponent } from './prescriptions.component';
import { MedicalRecordsComponent } from './medical-records.component';
import { TelehealthComponent } from './telehealth.component';

type Tab = 'Dashboard' | 'Patients' | 'Appointments' | 'Prescriptions' | 'Medical Records' | 'Telehealth Call';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [DashboardComponent, PatientsComponent, AppointmentsComponent, PrescriptionsComponent, MedicalRecordsComponent, TelehealthComponent],
  template: `
    <div class="app-shell">
      <header class="topbar">
        <div class="brand">
          <span class="logo-mark">+</span>
          <span class="logo-text">Med Pocket</span>
        </div>

        <nav class="tabs">
          @for (t of tabs; track t) {
            <button class="tab" [class.active]="active()===t" (click)="active.set(t)">{{ t }}</button>
          }
        </nav>

        <div class="search-wrap">
          <input class="search" placeholder="Search patients, records..." />
          <span class="search-ico">&#128269;</span>
        </div>

        <div class="profile">
          <span class="bell">&#128276;</span>
          <span class="prof-avatar">DR</span>
        </div>
      </header>

      <main class="content">
        @switch (active()) {
          @case ('Dashboard') { <app-dashboard /> }
          @case ('Patients') { <app-patients /> }
          @case ('Appointments') { <app-appointments /> }
          @case ('Prescriptions') { <app-prescriptions /> }
          @case ('Medical Records') { <app-medical-records /> }
          @case ('Telehealth Call') { <app-telehealth /> }
        }
      </main>
    </div>
  `,
  styles: [`
    :host { display: block; }
    .app-shell { min-height: 100vh; background: linear-gradient(160deg, #72D9C2 0%, #EAF7F5 100%); }
    .topbar { display: flex; align-items: center; gap: 20px; padding: 14px 28px; background: rgba(255,255,255,.85);
      backdrop-filter: blur(12px); position: sticky; top: 0; z-index: 50; border-bottom: 1px solid rgba(255,255,255,.6);
      box-shadow: 0 2px 12px rgba(20,40,60,.04); }
    .brand { display: flex; align-items: center; gap: 10px; }
    .logo-mark { width: 36px; height: 36px; border-radius: 11px; background: linear-gradient(135deg, #816BEE, #6d54e8);
      color: #fff; display: grid; place-items: center; font-size: 22px; font-weight: 800;
      box-shadow: 0 4px 12px rgba(129,107,238,.35); }
    .logo-text { font-size: 20px; font-weight: 800; color: #1A1D26; letter-spacing: -.02em; }
    .tabs { display: flex; gap: 8px; margin-left: 12px; flex-wrap: wrap; }
    .tab { border: none; background: #F3F4F6; color: #6B7280; padding: 9px 18px; border-radius: 24px;
      font-weight: 600; font-size: 13px; cursor: pointer; transition: all .2s; white-space: nowrap; }
    .tab:hover { background: #e8e9ed; color: #1A1D26; }
    .tab.active { background: #816BEE; color: #fff; box-shadow: 0 4px 14px rgba(129,107,238,.4); }
    .search-wrap { margin-left: auto; position: relative; }
    .search { border: 1px solid #e8eaee; background: #F3F4F6; border-radius: 12px; padding: 9px 14px 9px 36px;
      font-size: 13px; color: #1A1D26; width: 240px; }
    .search:focus { outline: none; border-color: #816BEE; background: #fff; }
    .search-ico { position: absolute; left: 12px; top: 50%; transform: translateY(-50%); font-size: 14px; opacity: .5; }
    .profile { display: flex; align-items: center; gap: 14px; }
    .bell { font-size: 18px; cursor: pointer; }
    .prof-avatar { width: 38px; height: 38px; border-radius: 50%; background: linear-gradient(135deg, #00BFA5, #3C6CE7);
      color: #fff; display: grid; place-items: center; font-weight: 700; font-size: 13px; cursor: pointer; }
    .content { padding: 28px; max-width: 1320px; margin: 0 auto; }

    @media (max-width: 980px) {
      .topbar { flex-wrap: wrap; gap: 12px; padding: 12px 16px; }
      .tabs { order: 3; width: 100%; overflow-x: auto; margin-left: 0; }
      .search-wrap { margin-left: 0; }
      .search { width: 180px; }
      .content { padding: 16px; }
    }
  `],
})
export class App {
  tabs: Tab[] = ['Dashboard', 'Patients', 'Appointments', 'Prescriptions', 'Medical Records', 'Telehealth Call'];
  active = signal<Tab>('Dashboard');
}
