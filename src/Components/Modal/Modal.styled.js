import styled from "@emotion/styled";

export const Modal = styled.div`
  max-width: calc(100vw - 200px);
  max-height: calc(100vh - 50px);
  input {
    width: 320px;
    height: 50px;
    margin-top: 5%;
    margin-left: auto;
    margin-right: auto;
    padding: 15px;
    font-size: 16px;
    font-family: "Abel", sans-serif;
    color: #5e6472;
    outline: none;
    border: 2px solid rgb(14, 124, 124);
    border-radius: 0px 5px 5px 0px;
    transition: 0.2s linear;
  }
  button {
    display: inline-block;
    color: rgb(14, 124, 124);
    font-size: 16px;
    font-weight: 600;
    width: 280px;
    height: 50px;
    padding: 0 10px;
    background: #fff;
    border-radius: 5px;
    outline: none;
    border: 2px solid rgb(14, 124, 124);
    cursor: pointer;
    text-align: center;
    transition: all 0.2s linear;
    margin: 7% auto;
    letter-spacing: 0.05em;
    &:hover {
      transform: translatey(3px);
      box-shadow: none;
      animation: ani9 0.4s ease-in-out infinite alternate;
    }
  }
`;
export const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.8);
  z-index: 1200;
`;
