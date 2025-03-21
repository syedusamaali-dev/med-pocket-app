export interface Patient {
  name: string;
  avatar: string;
  status: 'Easy' | 'Neutral' | 'Hard';
  nextVisit: string;
  consultationType: 'Phone call' | 'Online' | 'Offline';
  insurance: 'Active' | 'Pending' | 'None';
}

export interface Metric {
  label: string;
  value: string;
  delta: string;
  positive: boolean;
  icon: string;
}

export interface AppointmentSlot {
  time: string;
  patient: string;
  type: string;
  color: string;
}

export interface Prescription {
  id: string;
  patient: string;
  medication: string;
  dosage: string;
  date: string;
  status: 'Active' | 'Completed' | 'Pending';
}

export interface LabReport {
  id: string;
  patient: string;
  test: string;
  date: string;
  result: string;
  status: 'Normal' | 'Abnormal' | 'Pending';
}

export const METRICS: Metric[] = [
  { label: 'Consultations', value: '148', delta: '+23.5%', positive: true, icon: 'stethoscope' },
  { label: 'Satisfaction', value: '4.8/5', delta: '+0.3', positive: true, icon: 'star' },
  { label: 'Revenue', value: '$8.1k', delta: '+12.2%', positive: true, icon: 'wallet' },
];

export const PATIENTS: Patient[] = [
  { name: 'Emily Carter', avatar: 'EC', status: 'Easy', nextVisit: 'Aug 20, 2026', consultationType: 'Online', insurance: 'Active' },
  { name: 'James Wilson', avatar: 'JW', status: 'Hard', nextVisit: 'Aug 21, 2026', consultationType: 'Phone call', insurance: 'Pending' },
  { name: 'Sophia Martinez', avatar: 'SM', status: 'Neutral', nextVisit: 'Aug 22, 2026', consultationType: 'Offline', insurance: 'Active' },
  { name: 'Liam Johnson', avatar: 'LJ', status: 'Easy', nextVisit: 'Aug 23, 2026', consultationType: 'Online', insurance: 'None' },
  { name: 'Olivia Brown', avatar: 'OB', status: 'Neutral', nextVisit: 'Aug 24, 2026', consultationType: 'Phone call', insurance: 'Active' },
  { name: 'Noah Davis', avatar: 'ND', status: 'Hard', nextVisit: 'Aug 25, 2026', consultationType: 'Offline', insurance: 'Pending' },
];

export const APPOINTMENTS: AppointmentSlot[] = [
  { time: '09:00 AM', patient: 'Emily Carter', type: 'Online Checkup', color: '#00D2A0' },
  { time: '10:30 AM', patient: 'James Wilson', type: 'Follow-up Call', color: '#3C6CE7' },
  { time: '01:00 PM', patient: 'Sophia Martinez', type: 'In-person Visit', color: '#816BEE' },
  { time: '03:30 PM', patient: 'Liam Johnson', type: 'Online Consult', color: '#00BFA5' },
  { time: '05:00 PM', patient: 'Olivia Brown', type: 'Phone Consult', color: '#FF6B6B' },
];

export const PRESCRIPTIONS: Prescription[] = [
  { id: 'RX-1024', patient: 'Emily Carter', medication: 'Amoxicillin', dosage: '500mg, 2x/day', date: 'Aug 12, 2026', status: 'Active' },
  { id: 'RX-1025', patient: 'James Wilson', medication: 'Lisinopril', dosage: '10mg, 1x/day', date: 'Aug 13, 2026', status: 'Pending' },
  { id: 'RX-1026', patient: 'Sophia Martinez', medication: 'Metformin', dosage: '850mg, 2x/day', date: 'Aug 14, 2026', status: 'Active' },
  { id: 'RX-1027', patient: 'Liam Johnson', medication: 'Atorvastatin', dosage: '20mg, 1x/day', date: 'Aug 15, 2026', status: 'Completed' },
  { id: 'RX-1028', patient: 'Olivia Brown', medication: 'Cetirizine', dosage: '10mg, 1x/day', date: 'Aug 16, 2026', status: 'Active' },
];

export const LAB_REPORTS: LabReport[] = [
  { id: 'LAB-551', patient: 'Emily Carter', test: 'Complete Blood Count', date: 'Aug 10, 2026', result: 'Normal range', status: 'Normal' },
  { id: 'LAB-552', patient: 'James Wilson', test: 'Lipid Panel', date: 'Aug 11, 2026', result: 'High cholesterol', status: 'Abnormal' },
  { id: 'LAB-553', patient: 'Sophia Martinez', test: 'Glucose Tolerance', date: 'Aug 12, 2026', result: 'Pending analysis', status: 'Pending' },
  { id: 'LAB-554', patient: 'Liam Johnson', test: 'Thyroid Function', date: 'Aug 13, 2026', result: 'Normal range', status: 'Normal' },
  { id: 'LAB-555', patient: 'Olivia Brown', test: 'Liver Function', date: 'Aug 14, 2026', result: 'Slight elevation', status: 'Abnormal' },
];
