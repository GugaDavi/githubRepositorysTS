import React, { useEffect, useState } from "react";
import { Link, RouteComponentProps } from "react-router-dom";
import { AxiosResponse } from "axios";

import api from "../../services/api";
import { IRepository, IIssue } from "../../types/dataTypes";

import Container from "../../components/Container/";
import {
  Pagination,
  Owner,
  IssueList,
  FilterButton,
  PageButton
} from "./styles";

interface IRoute {
  repo: string;
}

enum TypeRquestIssue {
  All = "all",
  OPEN = "open",
  CLOSE = "closed"
}
enum PageControl {
  NEXT,
  PREV
}

export default function Repositorys({ match }: RouteComponentProps<IRoute>) {
  const [repo] = useState(decodeURIComponent(match.params.repo));
  const [repository, setRepository] = useState<IRepository>();
  const [issues, setIssues] = useState<IIssue[]>([]);
  const [page, setPage] = useState(1);
  const [issuesStatus, setIssuesStatus] = useState(TypeRquestIssue.All);

  useEffect(() => {
    async function getRepo() {
      const [respRepo, respIssues] = await Promise.all<
        AxiosResponse<IRepository>,
        AxiosResponse<Array<IIssue>>
      >([
        api.get<IRepository>(`/repos/${repo}`),
        api.get<Array<IIssue>>(`/repos/${repo}/issues`, {
          params: {
            state: issuesStatus,
            per_page: 5,
            page: page
          }
        })
      ]);

      setRepository(respRepo.data);
      setIssues(respIssues.data);
    }

    getRepo();
  }, []);

  async function handleRequestIssues(requestType: TypeRquestIssue) {
    if (requestType !== issuesStatus) {
      const respIssues = await api.get<Array<IIssue>>(`/repos/${repo}/issues`, {
        params: {
          state: requestType,
          per_page: 5
        }
      });

      setIssues(respIssues.data);
      setIssuesStatus(requestType);
      setPage(1);
    }
  }

  async function handleChangePage(pageControl: PageControl) {
    let _page = page;
    if (pageControl === PageControl.PREV) {
      if (page > 1) {
        _page = page - 1;
      }
    } else {
      _page = page + 1;
    }
    const respIssues = await api.get<Array<IIssue>>(`/repos/${repo}/issues`, {
      params: {
        state: issuesStatus,
        per_page: 5,
        page: _page
      }
    });

    setIssues(respIssues.data);
    setPage(_page);
  }

  return (
    <Container>
      <Owner>
        <Link to="/">Voltar aos Repositórios</Link>
        <img
          src={repository?.owner?.avatar_url}
          alt={repository?.owner?.login}
        />
        <h1>{repository?.name}</h1>
        <p>{repository?.description}</p>
        <div>
          <FilterButton
            active={issuesStatus === "all"}
            onClick={() => handleRequestIssues(TypeRquestIssue.All)}
          >
            Todas
          </FilterButton>
          <FilterButton
            active={issuesStatus === "open"}
            onClick={() => handleRequestIssues(TypeRquestIssue.OPEN)}
          >
            Abertas
          </FilterButton>
          <FilterButton
            active={issuesStatus === "closed"}
            onClick={() => handleRequestIssues(TypeRquestIssue.CLOSE)}
          >
            Fechadas
          </FilterButton>
        </div>
      </Owner>

      <IssueList>
        {issues?.map(issue => (
          <li key={String(issue.id)}>
            <img src={issue.user.avatar_url} alt={issue.user.login} />
            <div>
              <strong>
                <a href={issue.html_url}>{issue.title}</a>
                {issue.labels.map(label => (
                  <span key={String(label.id)}>{label.name}</span>
                ))}
              </strong>
              <p>{issue.user.login}</p>
            </div>
          </li>
        ))}
      </IssueList>

      <Pagination>
        <PageButton
          active={page === 1}
          disabled={page === 1}
          onClick={() => handleChangePage(PageControl.PREV)}
        >
          Ant
        </PageButton>
        <strong>Página: {page}</strong>
        <PageButton onClick={() => handleChangePage(PageControl.NEXT)}>
          Prox
        </PageButton>
      </Pagination>
    </Container>
  );
}
