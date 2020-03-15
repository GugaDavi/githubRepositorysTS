import React, { useState, ChangeEvent, FormEvent, useEffect } from "react";
import { FaGithubAlt, FaPlus, FaSpinner } from "react-icons/fa";
import { Link } from "react-router-dom";

import api from "../../services/api";

import Container from "../../components/Container/";
import { Form, SubmitButton, List } from "./styles";

import { IRepository } from "../../types/dataTypes";

export default function Main() {
  const [newRepo, setNewRepo] = useState<string>("");
  const [repositorys, setRepositorys] = useState<IRepository[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    const repos = localStorage.getItem("repositories");
    if (repos) {
      setRepositorys(JSON.parse(repos));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("repositories", JSON.stringify(repositorys));
  }, [repositorys]);

  function handleInputChange(e: ChangeEvent<HTMLInputElement>): void {
    setNewRepo(e.target.value);
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);

    try {
      const repoExist = repositorys.find(
        repo =>
          repo.full_name.toLocaleLowerCase() === newRepo.toLocaleLowerCase()
      );

      if (repoExist) {
        throw new Error("Repositório duplicado");
      }

      const { data } = await api.get<IRepository>(`/repos/${newRepo}`);

      setRepositorys([...repositorys, data]);
      setNewRepo("");
    } catch (e) {
      console.log(e);
      setError(true);
      setLoading(false);
    }
  }

  return (
    <Container>
      <h1>
        <FaGithubAlt />
        Repositórios
      </h1>
      <Form onSubmit={handleSubmit} error={error}>
        <div>
          <input
            type="text"
            placeholder="Adicionar repositório"
            value={newRepo}
            onFocus={() => setError(false)}
            onChange={handleInputChange}
          />

          <SubmitButton disabled={loading}>
            {loading ? (
              <FaSpinner color="#fff" size={14} />
            ) : (
              <FaPlus color="#fff" size={14} />
            )}
          </SubmitButton>
        </div>
        {error && <span>Repositório não encontrado ou duplicado</span>}
      </Form>

      <List>
        {repositorys.map(repository => (
          <li key={repository.full_name}>
            <span>{repository.full_name}</span>
            <Link
              to={`/repository/${encodeURIComponent(repository.full_name)}`}
            >
              Detalhes
            </Link>
          </li>
        ))}
      </List>
    </Container>
  );
}
