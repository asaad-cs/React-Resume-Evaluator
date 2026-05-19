function Body() {


  return (
    <>
      <main id="center">


        <div className="hero">
          <div className="base"></div>
          <div className="framework"></div>
          <div className="vite"></div>
        </div>

        <h1>Resume Evaluator</h1>

        <section>
          <form id="myform">
            <br />

            <fieldset>
              <label htmlFor="username" id="urname">Your Name</label>
              <br />
              <input type="text" id="username" />

              <br />
              <label htmlFor="password" id="urpas">Your Password</label>
              <br />
              <input type="password" id="password" />

              <br />
              <button type="submit" id="sub" className="counter">Submit</button>
              <button type="reset" id="res" className="counter">Reset</button>
            </fieldset>

            <div className='des-job'>
              <label htmlFor="job-desc">Job Description</label>
              <textarea id="job-desc" placeholder="Paste the job description here..."></textarea>
            </div>
          </form>
        </section>


        <fieldset className="ticks">
          <div>
            <p>Resume will be uploaded here</p>
            <input id="file" type="file" />
          </div>
        </fieldset>


        <section id="next-steps">
          <div id="docs">
            <h2>Results</h2>
            <p id="results-area">Results will appear here...</p>
          </div>

          <div>
            <h3>Next Steps</h3>
            <ul>
              <li>
                <a href="#docs">
                  <span className="button-icon">📄</span> Documentation
                </a>
              </li>
            </ul>
          </div>
        </section>

        <div id="spacer"></div>
      </main>
    </>


  )
}
export default Body