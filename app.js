const express = require("express");
const morgan = require("morgan");
require("@prisma/client");
require("dotenv").config();
const jwtRoute = require("./routes/auth.route");
const userRoute = require("./routes/users.route");
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan("dev"));

app.get("/", (request, response) => {
  response.sendFile(`${__dirname}/views/index.html`);
});

app.use("/jwt", jwtRoute);
app.use("/users", userRoute);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 @ http://localhost:${PORT}`));
