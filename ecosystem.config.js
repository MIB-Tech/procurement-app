module.exports = {
  name: "procurement-app",
  script: "npx",
  interpreter: "none",
  //args: 'serve -s build -p 443 --ssl-cert ./certs/cert.crt --ssl-key ./certs/private.key'
  args: "serve -s build -p 80",
};
