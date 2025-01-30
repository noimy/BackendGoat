const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = (req, res) => {
  const { url } = req.query;
  if (!url) {
    return res.status(400).json({ error: "Missing URL parameter" });
  }

  return createProxyMiddleware({
    target: url,
    changeOrigin: true,
    followRedirects: true,
  })(req, res);
};
