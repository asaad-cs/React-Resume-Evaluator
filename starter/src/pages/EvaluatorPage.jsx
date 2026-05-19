import { useState } from 'react';


export default function EvaluatorPage() {
  const [jobdesc, setJobDescription] = useState('');
  const [prompt, setPrompt] = useState('');
  const [file, setFile] = useState(null);
  const [status, setStatus] = useState('idle');
  const[onSubmit ,setonSubmit ]=useState('')

  const handleSubmit = (e) => {
    e.preventDefault();

    if (jobdesc.trim() === '' || file === null) {
      setStatus('error');
      alert("eroor submit file")
    } 
    else{
      setStatus("loding")
      alert("loading")
    }
  };

  const handleReset = () => {
    setJobDescription('');
    setPrompt('');
    setFile(null);
    setStatus('idle');
  };

  return (
    <>
      <form id="myform" onSubmit={handleSubmit}  >
      <div className='des-job'>
            <label htmlFor="jobdesc">Job Description</label>
            <textarea id="job-desc" placeholder="Paste the job description here..." onChange={(e)=>setJobDescription(e.target.value)} />
           <button className="counter" type='Submit' > click me to be sure</button>
          </div>
           
      <fieldset className="file">
        <div>
          <p>Resume will be uploaded here</p>
          <input id="file" type="file" className='file' onChange={(e) => setFile(e.target.files[0] || null)}/>
          <button className="counter" > click me to be sure for the file</button>
        </div>
      </fieldset>



        </form>
       
    </>
  );
}