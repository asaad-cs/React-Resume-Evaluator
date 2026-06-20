import { useState } from 'react';
import { useEvaluator } from '../hooks/useEvaluator';

export default function EvaluatorPage() {
  const [jobDesc, setJobDesc] = useState('');
  const [prompt, setPrompt] = useState('');
  const [resumeFile, setResumeFile] = useState(null);
  const { result, loading, error, evaluate } = useEvaluator();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!resumeFile) {
      alert('Please select a PDF resume file before submitting.');
      return;
    }
    evaluate(jobDesc, prompt, resumeFile);
  };

  const handleReset = () => {
    setJobDesc('');
    setPrompt('');
    setResumeFile(null);
  };

  return (
    <main>
      <h1>Resume Evaluator</h1>

      <form id="myform" onSubmit={handleSubmit}>
        <div className="des-job">
          <label htmlFor="job-desc">Job Description</label>
          <textarea
            id="job-desc"
            value={jobDesc}
            onChange={(e) => setJobDesc(e.target.value)}
            placeholder="Paste the job description here…"
            required
          />
        </div>

        <div className="des-job">
          <label htmlFor="prompt">Additional Instructions (optional)</label>
          <textarea
            id="prompt"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="e.g. Focus on leadership and Python skills"
          />
        </div>

        <fieldset className="file">
          <legend style={{ color: 'white', fontWeight: 'bold', fontSize: '1.1rem' }}>
            Upload Resume (PDF only)
          </legend>
          <input
            id="resume"
            type="file"
            accept=".pdf,application/pdf"
            required
            onChange={(e) => setResumeFile(e.target.files[0] || null)}
          />
          {resumeFile && (
            <p style={{ color: '#d0f0c0', margin: '6px 0 0', fontSize: '0.9rem' }}>
              ✓ {resumeFile.name} ({(resumeFile.size / 1024).toFixed(1)} KB)
            </p>
          )}
        </fieldset>

        <button id="sub" type="submit" className="counter" disabled={loading}>
          {loading ? 'Evaluating…' : 'Evaluate Resume'}
        </button>
        <button id="res" type="button" className="counter" onClick={handleReset}>
          Reset
        </button>
      </form>

      {error && (
        <p style={{ color: 'red', background: '#fff0f0', padding: '10px', borderRadius: '6px' }}>
          {error}
        </p>
      )}

      {result && (
        <section id="next-steps">
          <div id="docs">
            <h2>Evaluation Result</h2>
            <pre
              id="results-area"
              style={{
                whiteSpace: 'pre-wrap',
                fontFamily: 'inherit',
                margin: 0,
                lineHeight: 1.6,
              }}
            >
              {result}
            </pre>
          </div>
        </section>
      )}
    </main>
  );
}
