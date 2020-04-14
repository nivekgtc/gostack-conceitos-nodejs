const express = require("express");
const cors = require("cors");

const { uuid } = require("uuidv4");

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

app.get("/repositories", (request, response) => {
  // TODO
  return response.json(repositories);
});

app.post("/repositories", (request, response) => {
  // TODO
  const { url, title, techs } = request.body;

  const repository = {
    id: uuid(),
    url,
    title,
    techs,
    likes: 0,
  };

  repositories.push(repository);

  return response.json(repository);
});

app.put("/repositories/:id", (request, response) => {
  // TODO
  const { id } = request.params;
  const { url, title, techs } = request.body;

  const repository = repositories.find((repository) => repository.id === id);

  if (!repository) {
    return response.status(400).send();
  }

  repository.url = url;
  repository.title = title;
  repository.techs = techs;

  const repositoryIndex = repositories.indexOf(repository);

  repositories[repositoryIndex] = repository;

  return response.status(200).json(repository);
});

app.delete("/repositories/:id", (request, response) => {
  // TODO
  const { id } = request.params;

  const repository = repositories.find((repository) => repository.id === id);
  if (!repository) return response.status(400).send();
  const index = repositories.indexOf(repository);

  repositories.splice(index, 1);

  return response.status(204).send();
});

app.post("/repositories/:id/like", (request, response) => {
  // TODO
  const { id } = request.params;
  const repository = repositories.find((repository) => repository.id === id);

  if (!repository) return response.status(400).send();
  repository.likes += 1;

  return response.status(200).json(repository);
});

module.exports = app;
