import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Mail, Lock, Eye, EyeOff, Sparkles } from "lucide-react";

export default function Login() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    // Temporary frontend login for hackathon UI.
    // Backend authentication can be connected later.
    navigate("/dashboard");
  };

  return (
    <div className="login-page">

      {/* Left Branding Section */}

      <div className="login-brand">

        <div className="login-brand-content">

          <div className="login-logo">
            <Sparkles size={20} />
          </div>

          <p className="login-eyebrow">
            AI-POWERED WORKFORCE OPTIMIZATION
          </p>

          <h1>
            Assign the right
            <span> person </span>
            to the right task.
          </h1>

          <p className="login-brand-description">
            Make smarter workforce decisions with
            AI-powered task assignment, skill matching,
            workload analysis, and explainable recommendations.
          </p>

          <div className="login-feature-list">

            <div>
              <span>01</span>
              <p>AI-powered employee matching</p>
            </div>

            <div>
              <span>02</span>
              <p>Skill and workload analysis</p>
            </div>

            <div>
              <span>03</span>
              <p>Explainable assignment decisions</p>
            </div>

          </div>

        </div>

      </div>

      {/* Login Section */}

      <div className="login-form-section">

        <div className="login-form-wrapper">

          <div className="login-mobile-logo">
            <div className="login-logo">
              <Sparkles size={18} />
            </div>

            <span>Task Assignment System</span>
          </div>

          <div className="login-heading">

            <p className="login-form-eyebrow">
              MANAGER PORTAL
            </p>

            <h2>Welcome back</h2>

            <p>
              Sign in to manage your workforce and
              assign tasks intelligently.
            </p>

          </div>

          <form onSubmit={handleSubmit}>

            {/* Email */}

            <div className="login-field">

              <label htmlFor="email">
                Email address
              </label>

              <div className="login-input-wrapper">

                <Mail size={17} />

                <input
                  id="email"
                  type="email"
                  placeholder="manager@company.com"
                  value={email}
                  onChange={(event) =>
                    setEmail(event.target.value)
                  }
                  required
                />

              </div>

            </div>

            {/* Password */}

            <div className="login-field">

              <div className="login-label-row">

                <label htmlFor="password">
                  Password
                </label>

                <button
                  type="button"
                  className="forgot-password"
                  onClick={() => {}}
                >
                  Forgot password?
                </button>

              </div>

              <div className="login-input-wrapper">

                <Lock size={17} />

                <input
                  id="password"
                  type={
                    showPassword
                      ? "text"
                      : "password"
                  }
                  placeholder="Enter your password"
                  value={password}
                  onChange={(event) =>
                    setPassword(event.target.value)
                  }
                  required
                />

                <button
                  type="button"
                  className="password-toggle"
                  onClick={() =>
                    setShowPassword(!showPassword)
                  }
                  aria-label={
                    showPassword
                      ? "Hide password"
                      : "Show password"
                  }
                >
                  {showPassword ? (
                    <EyeOff size={16} />
                  ) : (
                    <Eye size={16} />
                  )}
                </button>

              </div>

            </div>

            {/* Remember */}

            <div className="login-options">

              <label className="remember-me">

                <input type="checkbox" />

                <span>
                  Remember me
                </span>

              </label>

            </div>

            {/* Submit */}

            <button
              type="submit"
              className="login-submit"
            >
              Sign In
            </button>

          </form>

          <div className="login-footer">

            <span>
              AI-powered workforce optimization
            </span>

          </div>

        </div>

      </div>

    </div>
  );
}