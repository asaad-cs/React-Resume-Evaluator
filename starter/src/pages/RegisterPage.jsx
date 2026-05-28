function RegisterPage(){
return(
  <>
  
  <body>
    <main>
      <section>
        <h1>Create your bootcamp account</h1>
        <p>
          Complete the form below. The browser will validate required fields
          before submission.
        </p>

        <form action="/register" method="post">
          <fieldset>
            <legend>Personal information</legend>

            <label for="full-name">Full name</label>
            <input
              type="text"
              id="full-name"
              name="fullName"
              required
              minlength="3"
              maxlength="60"
              placeholder="Jane Doe"
            />

            <label for="email">Email address</label>
            <input
              type="email"
              id="email"
              name="email"
              required
              placeholder="jane@example.com"
            />

            <label for="birthdate">Birthdate</label>
            <input type="date" id="birthdate" name="birthdate" required />

            <label for="phone">Phone number</label>
            <input
              type="tel"
              id="phone"
              name="phone"
              pattern="[0-9()+\-\s]{8,20}"
              placeholder="+55 11 99999-9999"
            />
          </fieldset>

          <fieldset>
            <legend>Account setup</legend>

            <label for="username">Username</label>
            <input
              type="text"
              id="username"
              name="username"
              required
              minlength="3"
              maxlength="20"
              pattern="[A-Za-z0-9_]+"
              placeholder="letters, numbers, underscores"
            />

            <label for="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              required
              minlength="8"
              placeholder="At least 8 characters"
            />

            <p>Study track</p>
            <input
              type="radio"
              id="track-frontend"
              name="track"
              value="frontend"
              required
            />
            <label for="track-frontend">Frontend</label>

            <input
              type="radio"
              id="track-fullstack"
              name="track"
              value="fullstack"
            />
            <label for="track-fullstack">Full stack</label>

            <label for="country">Country</label>
            <select id="country" name="country" required>
              <option value="">-- Select a country --</option>
              <option value="br">Brazil</option>
              <option value="us">United States</option>
              <option value="ca">Canada</option>
              <option value="sa">saudi </option>
            </select>

            <label for="goal">Learning goal</label>
            <textarea
              id="goal"
              name="goal"
              rows="4"
              minlength="20"
              placeholder="I want to build accessible HTML pages..."
            ></textarea>

            <input type="checkbox" id="terms" name="terms" required />
            <label for="terms">I agree to the bootcamp terms</label>
          </fieldset>

          <button type="submit">Create account</button>
          <button type="reset">Clear form</button>
        </form>
      </section>
    </main>
  </body>

  
  </>
)



}
export default RegisterPage;