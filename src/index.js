import express from "express";
import cors from "cors";

const users = [
  {
    username: "bobesponja",
    avatar:
      "https://super.abril.com.br/wp-content/uploads/2020/09/04-09_gato_SITE.jpg?quality=70&strip=info",
  },
];

const tweets = [
  {
    username: "bobesponja",
    tweet: "eu amo o hub",
  },
];

const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

app.listen(port, console.log(`Servidor ouvindo na porta ${port}`));

app.post("/sign-up", (req, res) => {
  const { username, avatar } = req.body;

  if (!username || !avatar) {
    res.status(422).send("Username ou avatar são obrigatórios");
    return;
  }

  if (typeof username !== "string" || typeof avatar !== "string") {
    res.sendStatus(400);
    return;
  }

  const user = users.find((x) => x.username === username);
  if (user) {
    res.status(409).send("Usuario já cadastrado");
    return;
  }

  users.push({ username, avatar });

  res.status(201).send("OK");
});

app.post("/tweets", (req, res) => {
  const { tweet } = req.body;
  const { username } = req.headers;

  if (!username || !tweet) {
    res.status(422).send("Username ou tweet são obrigatórios");
    return;
  }

  if (typeof username !== "string" || typeof tweet !== "string") {
    res.sendStatus(400);
    return;
  }

  const user = users.find((x) => x.username === username);
  if (user === undefined) {
    res.status(404).send("Usuario não encontrado");
    return;
  }

  tweets.push({ username, tweet });

  res.status(201).send("OK");
});

app.get("/tweets", (req, res) => {
  const paginas = [];

  console.log(tweets.length);

  for (let i = tweets.length - 1; last10Tweets.length < 10 && i >= 0; i--) {
    const tweet = tweets[i];
    console.log(i);
    const user = users.find((x) => x.username === tweet.username);

    if (user === undefined) {
      res.status(404).send("Usuario não encontrado");
      return;
    }

    last10Tweets.push({
      username: user.username,
      avatar: user.avatar,
      tweet: tweet.tweet,
    });
  }

  res.send(last10Tweets);
});

app.get("/tweets/:username", (req, res) => {
  const { username } = req.params;
  const tweetsFiltrados = tweets.filter((t) => t.username === username);
  res.send(tweetsFiltrados);
});
