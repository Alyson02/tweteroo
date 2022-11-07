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
  {
    username: "bobesponja",
    tweet: "eu amo o hub",
  },
  {
    username: "bobesponja",
    tweet: "eu amo o hub",
  },
  {
    username: "bobesponja",
    tweet: "eu amo o hub",
  },
  {
    username: "bobesponja",
    tweet: "eu amo o hub",
  },
  {
    username: "bobesponja",
    tweet: "eu amo o hub",
  },
  {
    username: "bobesponja",
    tweet: "eu amo o hub",
  },
  {
    username: "bobesponja",
    tweet: "eu amo o hub",
  },
  {
    username: "bobesponja",
    tweet: "eu amo o hub",
  },
  {
    username: "bobesponja",
    tweet: "eu amo o hub",
  },
  {
    username: "bobesponja",
    tweet: "eu amo o hub",
  },
  {
    username: "bobesponja",
    tweet: "eu amo o hub",
  },
  {
    username: "bobesponja",
    tweet: "eu amo o hub",
  },
  {
    username: "bobesponja",
    tweet: "eu amo o hub",
  },
  {
    username: "bobesponja",
    tweet: "eu amo o hub",
  },
  {
    username: "bobesponja",
    tweet: "eu amo o hub",
  },
  {
    username: "bobesponja",
    tweet: "eu amo o hub",
  },
  {
    username: "bobesponja",
    tweet: "eu amo o hub",
  },
  {
    username: "bobesponja",
    tweet: "eu amo o hub",
  },
  {
    username: "bobesponja",
    tweet: "eu amo o hub",
  },
  {
    username: "bobesponja",
    tweet: "eu amo o hub",
  },
  {
    username: "bobesponja",
    tweet: "eu amo o hub",
  },
  {
    username: "bobesponja",
    tweet: "eu amo o hub",
  },
  {
    username: "bobesponja",
    tweet: "eu amo o hub",
  },
  {
    username: "bobesponja",
    tweet: "eu amo o hub",
  },
  {
    username: "bobesponja",
    tweet: "eu amo o hub",
  },
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
  let page = req.query.page;
  const pages = [];
  const tweetsReverse = tweets.slice().reverse();

  const pageParsed = parseInt(page);
  if (isNaN(pageParsed) || pageParsed < 1) {
    res.status(400).send({ message: "Informe uma página válida!" });
    return;
  }

  for (let i = 0; i <= tweetsReverse.length; i += 10) {
    pages.push(tweetsReverse.slice(i, i + 10));
  }

  const top10tweetsPaginated = [];
  pages.forEach((p, numeroPagina) => {
    numeroPagina++;
    const page = { numeroPagina: numeroPagina, lst: [] };

    p.forEach((t) => {
      const user = users.find((x) => x.username === t.username);

      if (user === undefined) {
        res.status(404).send("Usuario não encontrado");
        return;
      }

      page.lst.push({
        username: user.username,
        avatar: user.avatar,
        tweet: t.tweet,
      });
    });

    top10tweetsPaginated.push(page);
  });

  res.send(
    top10tweetsPaginated.find((x) => x.numeroPagina === Number(page))?.lst
  );
});

app.get("/tweets/:username", (req, res) => {
  const { username } = req.params;
  const tweetsFiltrados = tweets.filter((t) => t.username === username);
  const tweetsUser = [];

  tweetsFiltrados.forEach((t) => {
    const user = users.find((x) => x.username === t.username);
    tweetsUser.push({
      username: user.username,
      avatar: user.avatar,
      tweet: t.tweet,
    });
  });

  res.send(tweetsUser);
});
