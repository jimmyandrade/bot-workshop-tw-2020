const express = require('express');

const ActionMediator = require('./src/actionMediator');
const { actionHandlers } = require('./src/actionHandlers');
const { webhookPaylodValidator } = require("./src/validators");

const app = express();

/* Middlewares*/
app.use(express.json());

app.use((req, res, next) => {
  console.log(`${req.method} ${req.originalUrl} ${JSON.stringify(req.body)}`);
  next();
})

/* Endpoints */
app.get('/health', (req, res) => {
  res.json({
    status: 'healthy',
  });
});

app.post('/api/webhook', async (req, res) => {
  const { isValid, errorMessage } = webhookPaylodValidator.validate(
    req.body
  );
  if (!isValid) {
    res.status(400).json({ message: errorMessage });
    return;
  }

  const mediator = new ActionMediator(actionHandlers);

  try {
    const result = await mediator.send(req.body);
    res.json(result);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Oops, something went wrong :(" });
  }
});

module.exports = app;
