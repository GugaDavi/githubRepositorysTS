import styled from "styled-components";

import { ButtonProps } from "../../types/stylesTypes";

export const Pagination = styled.div`
  flex: 1;
  display: flex;
  align-self: stretch;
  justify-content: space-between;
  align-items: center;
  margin-top: 15px;
`;

export const Loading = styled.div`
  color: #fff;
  font-size: 30px;
  font-weight: bold;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

export const Owner = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  div {
    flex: 1;
    width: 100%;
    display: flex;
    justify-content: space-evenly;
    margin-top: 15px;
    align-items: center;
  }

  a {
    color: #7159c1;
    font-size: 16px;
    text-decoration: none;
  }

  img {
    width: 120px;
    border-radius: 50%;
    margin-top: 20px;
  }

  h1 {
    font-size: 24px;
    margin-top: 10px;
  }

  p {
    margin-top: 5px;
    font-size: 14px;
    color: #666;
    line-height: 1.4;
    text-align: center;
    max-width: 400px;
  }
`;

export const IssueList = styled.ul`
  padding-top: 30px;
  margin-top: 30px;
  border-top: 1px solid #eee;

  li {
    display: flex;
    padding: 15px 10px;
    border: 1px solid #eee;

    & + li {
      margin-top: 10px;
    }

    img {
      width: 42px;
      height: 42px;
      border-radius: 50%;
      border: 2px solid #eee;
    }

    div {
      flex: 1;
      margin-left: 15px;

      strong {
        font-size: 16px;

        a {
          text-decoration: none;
          color: #333;

          &:hover {
            color: #7159c1;
          }
        }

        span {
          background-color: #eee;
          color: #333;
          border-radius: 2px;
          font-size: 12px;
          font-weight: 600;
          height: 20px;
          padding: 3px 4px;
          margin-left: 10px;
        }
      }

      p {
        margin-top: 5px;
        font-size: 12px;
        color: #999;
      }
    }
  }
`;

export const FilterButton = styled.button<ButtonProps>`
  color: ${props => (props.active ? "#7159c1" : "#fff")};
  background-color: ${props => (props.active ? "#fff" : "#7159c1")};
  border: ${props => (props.active ? "1px solid #7159c1" : "none")};
  padding: 10px 15px;
  border-radius: 4px;
  transition: 200ms linear all;

  &:hover {
    background-color: #573ea8;
    color: #fff;
  }

  &[disabled] {
    opacity: 0.6;
  }
`;

export const PageButton = styled.button<ButtonProps>`
  color: ${props => (props.active ? "#7159c1" : "#fff")};
  background-color: ${props => (props.active ? "#fff" : "#7159c1")};
  border: ${props => (props.active ? "1px solid #7159c1" : "none")};
  padding: 10px 15px;
  border-radius: 4px;
  transition: 200ms linear all;

  &:hover {
    background-color: #573ea8;
    color: #fff;
  }

  &[disabled] {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;
