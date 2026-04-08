import { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [loaded, setLoaded] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => setLoaded(true), 80);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      if (email && password) {
        navigate("/admin/dashboard");
      } else {
        setError("Please enter your credentials.");
      }
    }, 1200);
  };

  // Flower SVG petal angles
  const petalAngles = [0, 45, 90, 135, 180, 225, 270, 315];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;0,700;1,400;1,700&family=DM+Sans:wght@300;400;500;600&display=swap');

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        html, body { height: 100%; background: #faf7f2; }

        .rml-page {
          min-height: 100vh;
          display: flex;
          font-family: 'DM Sans', sans-serif;
          background: #faf7f2;
          overflow: hidden;
        }

        /* ══════════════════════════════
           LEFT PANEL
        ══════════════════════════════ */
        .rml-left {
          width: 42%;
          flex-shrink: 0;
          position: relative;
          background: #1e3a1e;
          overflow: hidden;
          opacity: 0;
          transform: translateX(-24px);
          transition: opacity 0.85s cubic-bezier(.22,1,.36,1),
                      transform 0.85s cubic-bezier(.22,1,.36,1);
        }
        .rml-left.in { opacity: 1; transform: translateX(0); }

        /* Amber/orange wave shape cutting into right — like reference image */
        .rml-left-wave {
          position: absolute; top: 0; right: -1px; bottom: 0;
          width: 80px; z-index: 5;
          background: #faf7f2;
          clip-path: ellipse(80px 55% at 100% 50%);
        }

        /* Deep green radial atmosphere */
        .rml-left-glow {
          position: absolute; inset: 0; z-index: 1;
          background:
            radial-gradient(ellipse 90% 70% at 40% 40%, rgba(90,140,60,0.25) 0%, transparent 65%),
            radial-gradient(ellipse 70% 80% at 60% 70%, rgba(40,80,30,0.4) 0%, transparent 70%);
        }

        /* Big flower outline watermark */
        .rml-flower-wm {
          position: absolute;
          top: 50%; left: 50%;
          transform: translate(-50%, -50%);
          width: 85%; z-index: 2; opacity: 0.12;
          pointer-events: none;
        }

        /* Logo */
        .rml-logo {
          display: flex;
            flex-direction: column;
            align-items: center;
        }
        .rml-logo-icon {
          font-size: 22px; line-height: 1;
          filter: drop-shadow(0 2px 8px rgba(0,0,0,0.5));
        }
        .rml-logo-name {
          font-family: 'Cormorant Garamond', serif;
          font-size: 24px; font-weight: 700; font-style: italic;
          color: #fff; letter-spacing: 0.1em;
          text-shadow: 0 2px 14px rgba(0,0,0,0.5);
          margin-top: 3px;
        
        }
        .rml-logo-tag {
          font-size: 8.5px; letter-spacing: 0.35em; text-transform: uppercase;
          color: rgba(180,220,140,0.7); margin-top: 3px;
        }

        /* Food cards stacked */


        /* Zigzag bolts */
        .rml-zbolt {
          position: absolute; z-index: 10;
          color: rgba(200,230,160,0.6); font-size: 20px; font-weight: 900;
          pointer-events: none;
          animation: zbPulse 2.8s ease-in-out infinite;
        }
        @keyframes zbPulse {
          0%,100% { opacity: 0.5; transform: scale(1) rotate(0deg); }
          50% { opacity: 1; transform: scale(1.2) rotate(8deg); }
        }

        /* ══════════════════════════════
           RIGHT PANEL
        ══════════════════════════════ */
        .rml-right {
          flex: 1;
          display: flex; align-items: center; justify-content: center;
          padding: 40px 48px 40px 64px;
          position: relative; overflow: hidden;
          background: #faf7f2;
          opacity: 0;
          transform: translateX(24px);
          transition: opacity 0.85s cubic-bezier(.22,1,.36,1) 0.15s,
                      transform 0.85s cubic-bezier(.22,1,.36,1) 0.15s;
        }
        .rml-right.in { opacity: 1; transform: translateX(0); }

        /* Amber top-right accent blob — like reference orange bg */
        .rml-amber-blob {
          position: absolute; top: -60px; right: -60px;
          width: 300px; height: 220px;
          background: linear-gradient(135deg, #e8a020, #f4c040);
          border-radius: 50% 0 50% 50%;
          opacity: 0.13; z-index: 0; pointer-events: none;
          transform: rotate(-10deg);
        }
        .rml-amber-blob2 {
          position: absolute; bottom: -80px; left: -40px;
          width: 220px; height: 200px;
          background: linear-gradient(135deg, #c8e8a0, #a8d070);
          border-radius: 50%;
          opacity: 0.1; z-index: 0; pointer-events: none;
        }

        /* Flower watermarks */
        .rml-wm-br {
          position: absolute; bottom: -70px; right: -70px;
          width: 320px; height: 320px;
          opacity: 0.07; z-index: 0; pointer-events: none;
        }
        .rml-wm-tl {
          position: absolute; top: -50px; left: -50px;
          width: 220px; height: 220px;
          opacity: 0.05; z-index: 0; pointer-events: none;
          transform: rotate(22deg);
        }

        /* Right bolts */
        .rml-rz {
          position: absolute; z-index: 1;
          color: #c8a030; font-size: 18px; font-weight: 900; opacity: 0.4;
          pointer-events: none;
        }

        /* Form */
        .rml-form-wrap {
          position: relative; z-index: 2;
          width: 100%; max-width: 320px;
        }

        .rml-heading {
          margin-bottom: 30px;
        }
        .rml-heading-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: 34px; font-weight: 700; line-height: 1.1;
          color: #1a2e1a; letter-spacing: 0.01em;
        }
        .rml-heading-title .green { color: #4a8028; }
        .rml-heading-sub {
          font-size: 12.5px; color: #8a9a78; font-weight: 300;
          margin-top: 7px; letter-spacing: 0.03em;
        }

        .rml-field { margin-bottom: 13px; }
        .rml-input {
          width: 100%;
          background: #eeeae0;
          border: 1.5px solid transparent;
          border-radius: 10px;
          padding: 13px 44px 13px 16px;
          font-family: 'DM Sans', sans-serif;
          font-size: 13.5px; font-weight: 300; color: #2a3a20;
          outline: none; letter-spacing: 0.02em;
          transition: border-color 0.22s, background 0.22s, box-shadow 0.22s;
        }
        .rml-input::placeholder { color: #a8b490; }
        .rml-input:focus {
          border-color: #4a8028;
          background: #fff;
          box-shadow: 0 0 0 3px rgba(74,128,40,0.1);
        }
        .rml-pw-wrap { position: relative; }
        .rml-eye {
          position: absolute; right: 14px; top: 50%; transform: translateY(-50%);
          background: none; border: none; cursor: pointer;
          font-size: 14px; color: #a0b080; padding: 0;
          transition: color 0.2s;
        }
        .rml-eye:hover { color: #4a8028; }


        .rml-forgot-row { text-align: right; margin: 4px 0 20px; }
        .rml-forgot {
          font-size: 12px; color: #7aaa40;
          background: none; border: none; cursor: pointer;
          font-family: 'DM Sans', sans-serif; font-weight: 400;
          transition: color 0.2s;
        }
        .rml-forgot:hover { color: #4a8028; }

        .rml-error {
          margin-bottom: 12px; padding: 10px 14px;
          background: rgba(180,40,40,0.07);
          border: 1px solid rgba(180,60,60,0.2);
          border-radius: 9px; font-size: 12px; color: rgba(160,40,40,0.85);
        }

        .rml-btn {
          width: 100%; padding: 13.5px;
          background: linear-gradient(135deg, #5a9030 0%, #4a7828 100%);
          border: none; border-radius: 10px;
          font-family: 'DM Sans', sans-serif;
          font-size: 14px; font-weight: 600;
          color: #fff; cursor: pointer; letter-spacing: 0.06em;
          position: relative; overflow: hidden;
          transition: transform 0.18s, box-shadow 0.18s;
          box-shadow: 0 5px 20px rgba(74,128,40,0.32);
          margin-bottom: 16px;
        }
        .rml-btn:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 10px 28px rgba(74,128,40,0.4);
        }
        .rml-btn:active:not(:disabled) { transform: translateY(0); }
        .rml-btn:disabled { opacity: 0.65; cursor: default; }
        .rml-btn-shimmer {
          position: absolute; inset: 0;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.15), transparent);
          transform: translateX(-100%);
          animation: shimmer 2.5s ease-in-out infinite;
        }
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          55% { transform: translateX(100%); }
          100% { transform: translateX(100%); }
        }

        .rml-spinner {
          display: inline-block; width: 13px; height: 13px;
          border: 2px solid rgba(255,255,255,0.3);
          border-top-color: #fff; border-radius: 50%;
          animation: spin 0.65s linear infinite;
          vertical-align: middle; margin-right: 7px;
        }
        @keyframes spin { to { transform: rotate(360deg); } }

        .rml-or {
          display: flex; align-items: center; gap: 10px; margin-bottom: 13px;
        }
        .rml-or-line { flex: 1; height: 1px; background: #ddd7c8; }
        .rml-or-text { font-size: 11px; color: #b0a888; letter-spacing: 0.1em; }

        .rml-social { display: flex; gap: 10px; margin-bottom: 22px; }
        .rml-social-btn {
          flex: 1; padding: 11px 8px;
          display: flex; align-items: center; justify-content: center; gap: 7px;
          background: #fff;
          border: 1.5px solid #ddd8cc; border-radius: 10px;
          font-family: 'DM Sans', sans-serif;
          font-size: 13px; font-weight: 400; color: #2a3a20;
          cursor: pointer;
          transition: border-color 0.2s, box-shadow 0.2s, transform 0.15s;
        }
        .rml-social-btn:hover {
          border-color: #b0c890;
          box-shadow: 0 3px 12px rgba(0,0,0,0.08);
          transform: translateY(-1px);
        }
        .rml-sicon { font-size: 16px; }

        .rml-signup {
          text-align: center;
          font-size: 12.5px; color: #928e80; letter-spacing: 0.02em;
        }
        .rml-signup-link {
          color: #5a9030; font-weight: 500;
          text-decoration: none; transition: color 0.2s;
        }
        .rml-signup-link:hover { color: #3a6818; text-decoration: underline; }

        @media (max-width: 660px) {
          .rml-left { display: none; }
          .rml-right { padding: 40px 28px; }
        }
      `}</style>

      <div className="rml-page">

        {/* ══════════ LEFT ══════════ */}
        <div className={`rml-left ${loaded ? "in" : ""}`}>

          {/* Wave cutout on right edge */}
          <div className="rml-left-wave" />

          {/* Atmosphere glow */}
          <div className="rml-left-glow" />


          {/* Flower watermark */}
          <svg className="rml-flower-wm" viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg"
            fill="none" stroke="#a0d870" strokeWidth="1.4">
            {petalAngles.map((deg, i) => (
              <ellipse key={i} cx="200" cy="112" rx="42" ry="95"
                transform={`rotate(${deg} 200 200)`} strokeOpacity="0.85" />
            ))}
            <circle cx="200" cy="200" r="58" strokeOpacity="0.7" />
            <circle cx="200" cy="200" r="32" strokeOpacity="0.5" />
            {[0,60,120,180,240,300].map((deg,i) => (
              <line key={i} x1="200" y1="148" x2="200" y2="172"
                transform={`rotate(${deg} 200 200)`} strokeOpacity="0.5" />
            ))}
          </svg>

          {/* Logo */}
          <div className="rml-logo">
            <div className="rml-logo-icon"></div>
            <img src ="../src/assets/romdolFlower.png" alt="Logo" style={{width:"100px",height:"100px",marginTop:"10px",filter:"drop-shadow(0 2px 8px rgba(0,0,0,0.5))"}} />
            <div className="rml-logo-name">Romdul</div>
            <div className="rml-logo-tag">Restaurant</div>
          </div>

  

          {/* Food cards */}
          <div className="rml-food-stack">
            <div className="rml-food-card" style={{transform:"rotate(-2deg)"}}>
              <div className="rml-food-inner fc1">
                <img src = "../images/prohok.jpg" alt="Food 1" style={{width:"100%",height:"100%",objectFit:"cover"}} />
              </div>

            </div>
            <div className="rml-food-card" style={{transform:"rotate(1.8deg)",marginLeft:"18px"}}>
              <div className="rml-food-inner fc2"></div>
            </div>
            <div className="rml-food-card" style={{transform:"rotate(-1.2deg)",marginRight:"12px"}}>
              <div className="rml-food-inner fc3"></div>
            </div>
          </div>
        </div>

        {/* ══════════ RIGHT ══════════ */}
        <div className={`rml-right ${loaded ? "in" : ""}`}>

          {/* Blobs */}
          <div className="rml-amber-blob" />
          <div className="rml-amber-blob2" />

          {/* Flower watermarks */}
          <svg className="rml-wm-br" viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg"
            fill="none" stroke="#4a8028" strokeWidth="1.2">
            {petalAngles.map((deg,i) => (
              <ellipse key={i} cx="200" cy="112" rx="42" ry="95"
                transform={`rotate(${deg} 200 200)`} />
            ))}
            <circle cx="200" cy="200" r="58" />
            <circle cx="200" cy="200" r="32" />
          </svg>
          <svg className="rml-wm-tl" viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg"
            fill="none" stroke="#4a8028" strokeWidth="1.2">
            {petalAngles.map((deg,i) => (
              <ellipse key={i} cx="200" cy="112" rx="42" ry="95"
                transform={`rotate(${deg} 200 200)`} />
            ))}
            <circle cx="200" cy="200" r="58" />
          </svg>

          {/* Bolts on right */}
          <span className="rml-rz" style={{top:"11%",right:"11%"}}>⚡️</span>
          <span className="rml-rz" style={{bottom:"17%",left:"7%",fontSize:"14px"}}>⚡️</span>

          <div className="rml-form-wrap">
            <div className="rml-heading">
              <div className="rml-heading-title">
                Romdul<br />
                <span className="green">Restaurant ✿</span>
              </div>
              <div className="rml-heading-sub">Sign in to your Romdul account</div>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="rml-field">
                <input type="email" className="rml-input"
                  placeholder="E-mail"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  required />
              </div>


              <div className="rml-field rml-pw-wrap">
                <input
                  type={showPassword ? "text" : "password"}
                  className="rml-input"
                  placeholder="Password"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  required />
                <button type="button" className="rml-eye"
                  onClick={() => setShowPassword(!showPassword)}>
                  {showPassword ? "🙈" : "👁"}
                </button>
              </div>

              <div className="rml-forgot-row">
                <button type="button" className="rml-forgot">Forgot Password?</button>
              </div>

              {error && <div className="rml-error">⚠️ {error}</div>}

              <button type="submit" className="rml-btn" disabled={submitting}>
                {!submitting && <div className="rml-btn-shimmer" />}
                {submitting
                  ? <><span className="rml-spinner" />connecting...</>
                  : "Login"
                }
              </button>
            </form>

            <div className="rml-or">
              <div className="rml-or-line" />
              <span className="rml-or-text">Or</span>
              <div className="rml-or-line" />
            </div>

            <div className="rml-social">
              <button className="rml-social-btn">
                <span className="rml-sicon"></span> Google
                <img src ="src/assets/image.png" style={{width:"16px",height:"16px"}} />
              </button>
              <button className="rml-social-btn">
                <span className="rml-sicon"></span> Facebook
                <img src="src/assets/fb.png" style={{width:"16px",height:"16px"}} />    
              </button>
            </div>

            <div className="rml-signup">
              Dont you have an existing account?{" "}
              <NavLink to="/register" className="rml-signup-link">
                Sign-in
              </NavLink>
            </div>
          </div>
        </div>

      </div>
    </>
  );
}

export default Login;
