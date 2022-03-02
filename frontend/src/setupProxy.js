const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = (app) => {
  app.use(
    "/api/",
    createProxyMiddleware({
      target: process.env.REACT_APP_API_BASE_URL, // "http://localhost:3900/api",
      changeOrigin: true,
      secure: false,
      pathRewrite: { ["^/api/"]: "" },     
    })
  );
};
