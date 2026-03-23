export const config = {
  matcher: ['/((?!api|_vercel|favicon).*)'],
};

export default function middleware(request) {
  const authCookie = request.cookies.get('site_auth');
  if (authCookie && authCookie.value === 'authenticated') {
    return;
  }

  return new Response(loginHTML, {
    status: 200,
    headers: { 'Content-Type': 'text/html; charset=utf-8' },
  });
}

const loginHTML = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Optima Shipping — Access</title>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet">
<style>
  *, *::before, *::after { margin: 0; padding: 0; box-sizing: border-box; }
  html, body {
    width: 100%; height: 100%;
    background: #000;
    font-family: 'Inter', sans-serif;
    -webkit-font-smoothing: antialiased;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .login-container {
    text-align: left;
    max-width: 420px;
    width: 100%;
    padding: 2rem;
  }
  .login-line {
    width: 5rem;
    height: 3px;
    background: #fff;
    margin-bottom: 2.5rem;
  }
  .login-title {
    font-size: 2.5rem;
    font-weight: 700;
    line-height: 1.1;
    letter-spacing: -0.025em;
    color: #fff;
    margin-bottom: 0.75rem;
  }
  .login-subtitle {
    font-size: 1rem;
    font-weight: 300;
    color: #737373;
    margin-bottom: 2.5rem;
  }
  .login-input {
    width: 100%;
    padding: 0.85rem 1rem;
    background: transparent;
    border: 1px solid #404040;
    color: #fff;
    font-family: 'JetBrains Mono', monospace;
    font-size: 0.95rem;
    letter-spacing: 0.05em;
    outline: none;
    transition: border-color 0.2s;
    border-radius: 2px;
  }
  .login-input:focus {
    border-color: #737373;
  }
  .login-input::placeholder {
    color: #525252;
  }
  .login-btn {
    width: 100%;
    margin-top: 1rem;
    padding: 0.85rem 1rem;
    background: #fff;
    border: none;
    color: #000;
    font-family: 'Inter', sans-serif;
    font-size: 0.95rem;
    font-weight: 600;
    cursor: pointer;
    border-radius: 2px;
    transition: opacity 0.2s;
  }
  .login-btn:hover { opacity: 0.85; }
  .login-btn:disabled { opacity: 0.4; cursor: default; }
  .login-error {
    margin-top: 1rem;
    font-family: 'JetBrains Mono', monospace;
    font-size: 0.8rem;
    color: #C0392B;
    letter-spacing: 0.05em;
    min-height: 1.2em;
  }
</style>
</head>
<body>
<div class="login-container">
  <div class="login-line"></div>
  <h1 class="login-title">Optima Shipping</h1>
  <p class="login-subtitle">Enter password to view the presentation.</p>
  <form id="loginForm">
    <input class="login-input" type="password" id="pwd" placeholder="Password" autocomplete="off" autofocus>
    <button class="login-btn" type="submit">Enter</button>
  </form>
  <div class="login-error" id="err"></div>
</div>
<script>
  document.getElementById('loginForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const btn = e.target.querySelector('button');
    const err = document.getElementById('err');
    btn.disabled = true;
    err.textContent = '';
    try {
      const res = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password: document.getElementById('pwd').value }),
      });
      if (res.ok) {
        window.location.reload();
      } else {
        err.textContent = 'Invalid password';
        btn.disabled = false;
      }
    } catch {
      err.textContent = 'Connection error';
      btn.disabled = false;
    }
  });
</script>
</body>
</html>`;
