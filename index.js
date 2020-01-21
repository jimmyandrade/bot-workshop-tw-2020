const server = require("./server.js");

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Server started listening on port ${PORT}`);
});
