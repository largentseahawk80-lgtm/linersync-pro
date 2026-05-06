import React, { useMemo, useState } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';

const STORAGE_KEY = 'linersync-pro-roll-logs-v1';

function loadLogs() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
  } catch {
    return [];
  }
}

function saveLogs(logs) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(logs));
}

function App() {
  const [logs, setLogs] = useState(loadLogs);
  const [form, setForm] = useState({
    project: '',
    rollNumber: '',
    rollLengthFt: '',
    usedLengthFt: '',
    panel: '',
    notes: '',
  });

  const remainingFt = useMemo(() => {
    const total = Number(form.rollLengthFt || 0);
    const used = Number(form.usedLengthFt || 0);
    return Math.max(total - used, 0);
  }, [form.rollLengthFt, form.usedLengthFt]);

  function updateField(field, value) {
    setForm((current) => ({ ...current, [field]: value }));
  }

  function addLog() {
    if (!form.rollNumber.trim()) {
      alert('Roll number is required.');
      return;
    }

    const nextLog = {
      id: crypto.randomUUID(),
      ...form,
      rollLengthFt: Number(form.rollLengthFt || 0),
      usedLengthFt: Number(form.usedLengthFt || 0),
      remainingFt,
      createdAt: new Date().toISOString(),
    };

    const nextLogs = [nextLog, ...logs];
    setLogs(nextLogs);
    saveLogs(nextLogs);
    setForm((current) => ({ ...current, usedLengthFt: '', panel: '', notes: '' }));
  }

  function deleteLog(id) {
    const nextLogs = logs.filter((log) => log.id !== id);
    setLogs(nextLogs);
    saveLogs(nextLogs);
  }

  return (
    <main className="app-shell">
      <section className="hero-card">
        <p className="eyebrow">LinerSync Pro</p>
        <h1>Roll Length Tracker</h1>
        <p>Starter field app for tracking liner roll length, used footage, remaining footage, panel assignment, and notes.</p>
      </section>

      <section className="card grid">
        <label>
          Project
          <input value={form.project} onChange={(event) => updateField('project', event.target.value)} placeholder="Project name" />
        </label>
        <label>
          Roll Number
          <input value={form.rollNumber} onChange={(event) => updateField('rollNumber', event.target.value)} placeholder="Example: R-102" />
        </label>
        <label>
          Roll Length ft
          <input type="number" value={form.rollLengthFt} onChange={(event) => updateField('rollLengthFt', event.target.value)} placeholder="Example: 500" />
        </label>
        <label>
          Used Length ft
          <input type="number" value={form.usedLengthFt} onChange={(event) => updateField('usedLengthFt', event.target.value)} placeholder="Example: 120" />
        </label>
        <label>
          Panel
          <input value={form.panel} onChange={(event) => updateField('panel', event.target.value)} placeholder="Example: P-14" />
        </label>
        <label>
          Notes
          <textarea value={form.notes} onChange={(event) => updateField('notes', event.target.value)} placeholder="Field notes" />
        </label>

        <div className="result-box">
          <span>Remaining</span>
          <strong>{remainingFt} ft</strong>
        </div>

        <button onClick={addLog}>Save Roll Log</button>
      </section>

      <section className="card">
        <h2>Latest Logs</h2>
        {logs.length === 0 ? (
          <p className="muted">No roll logs saved yet.</p>
        ) : (
          <div className="logs">
            {logs.map((log) => (
              <article className="log" key={log.id}>
                <div>
                  <strong>{log.rollNumber}</strong>
                  <p>{log.project || 'No project'} • {log.panel || 'No panel'}</p>
                  <p>Used {log.usedLengthFt} ft / Roll {log.rollLengthFt} ft / Remaining {log.remainingFt} ft</p>
                  {log.notes && <p>{log.notes}</p>}
                </div>
                <button className="danger" onClick={() => deleteLog(log.id)}>Delete</button>
              </article>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}

createRoot(document.getElementById('root')).render(<App />);
