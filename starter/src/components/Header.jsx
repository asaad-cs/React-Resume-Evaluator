import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
export default function Header() {
  return (
    <>
  
      <h1>Resume-evaluator</h1>

   
      <fieldset>
        <Link to="/login">
          <button>Login</button>
        </Link>

        <Link to="/">
          <button>Register</button>
        </Link>
      </fieldset>
  
    </>
  );
}