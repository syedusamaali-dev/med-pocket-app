import { Component } from '@angular/core';
import { LAB_REPORTS, LabReport } from './mock-data';

@Component({
  selector: 'app-medical-records',
  standalone: true,
  template: `
    <section class="page">
      <div class="page-head">
        <div>
          <h1>Medical Records</h1>
          <p>Lab reports and patient medical history</p>
        </div>
        <button class="add-btn">+ Upload Record</button>
      </div>

      <div class="card">
        <table>
          <thead>
            <tr>
              <th>Report ID</th><th>Patient</th><th>Test</th><th>Date</th><th>Result</th><th>Status</th><th>Actions</th>
            </tr>
          </thead>
          <tbody>
            @for (r of reports; track r.id) {
              <tr>
                <td class="mono">{{ r.id }}</td>
                <td class="pname">{{ r.patient }}</td>
                <td>{{ r.test }}</td>
                <td class="muted">{{ r.date }}</td>
                <td>{{ r.result }}</td>
                <td>
                  <span class="st" [class.st-normal]="r.status==='Normal'" [class.st-abnormal]="r.status==='Abnormal'" [class.st-pending]="r.status==='Pending'">
                    {{ r.status }}
                  </span>
                </td>
                <td class="actions">
                  <button class="act view">View</button>
                  <button class="act dl">Download</button>
                </td>
              </tr>
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
    .add-btn { background: #ECE8FE; color: #816BEE; border: none; padding: 11px 20px; border-radius: 12px; font-weight: 700; cursor: pointer; font-size: 13px; }
    .add-btn:hover { background: #ddd5fa; }
    .card { background: #fff; border-radius: 18px; padding: 20px; box-shadow: 0 4px 18px rgba(20,40,60,0.06); }
    table { width: 100%; border-collapse: collapse; }
    th { text-align: left; font-size: 11px; text-transform: uppercase; letter-spacing: .04em; color: #6B7280; padding: 8px 10px; border-bottom: 1px solid #f0f1f3; }
    td { padding: 12px 10px; border-bottom: 1px solid #f5f6f8; font-size: 13px; color: #1A1D26; }
    tr:last-child td { border-bottom: none; }
    .mono { font-family: monospace; color: #816BEE; font-weight: 600; }
    .pname { font-weight: 600; }
    .muted { color: #6B7280; }
    .st { padding: 4px 10px; border-radius: 20px; font-size: 11px; font-weight: 600; }
    .st-normal { background: rgba(0,210,160,.15); color: #00A878; }
    .st-abnormal { background: rgba(255,107,107,.15); color: #E04545; }
    .st-pending { background: rgba(255,184,0,.15); color: #C98900; }
    .actions { display: flex; gap: 8px; }
    .act { border: none; padding: 6px 12px; border-radius: 8px; cursor: pointer; font-size: 12px; font-weight: 600; }
    .act.view { background: #ECE8FE; color: #816BEE; }
    .act.view:hover { background: #ddd5fa; }
    .act.dl { background: #F3F4F6; color: #6B7280; }
    .act.dl:hover { background: #e5e7eb; }
  `],
})
export class MedicalRecordsComponent {
  reports: LabReport[] = LAB_REPORTS;
}
