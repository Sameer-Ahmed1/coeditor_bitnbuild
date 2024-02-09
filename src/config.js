const config = {
  base_url:
    process.env.NODE_ENV === "production"
      ? "https://your-production-url.com"
      : "http://localhost:4001",
};
export default config;
