export default function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { password } = req.body || {};

  if (password === process.env.SITE_PASSWORD) {
    res.setHeader(
      'Set-Cookie',
      'site_auth=authenticated; Path=/; HttpOnly; SameSite=Lax; Max-Age=604800'
    );
    return res.status(200).json({ success: true });
  }

  return res.status(401).json({ error: 'Invalid password' });
}
