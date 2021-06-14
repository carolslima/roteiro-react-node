import styled from 'styled-components';
import PerfectScrollbar from 'react-perfect-scrollbar';

export const Container = styled.div`
  display: flex;
  flex-direction: column;

  width: 98%;
  margin: 40px auto;

  ul {
    -webkit-box-shadow: var(--color-box-shadow);
    -moz-box-shadow: var(--color-box-shadow);
    box-shadow: var(--color-box-shadow);

    border-radius: 4px;
  }
`;

export const HeaderChecklist = styled.div`
  display: grid;
  grid-template-columns: 60px 1fr 100px 100px 1fr;
  flex-direction: row;

  border-top-left-radius: 0.4rem;
  border-top-right-radius: 0.4rem;

  font-size: 1.2rem;
  font-weight: 500;
  color: var(--color-blue);

  background: var(--color-header-list);

  height: 4rem;
  width: 100%;
  margin: 0;
  padding: 1rem;

  div {
    text-align: center;
    align-items: center;
    align-self: center;
    justify-content: center;
  }
`;

export const Scroll = styled(PerfectScrollbar)`
  max-height: 74vh;
  border-radius: 4px;
`;

export const Material = styled.li`
  display: grid;
  grid-template-columns: 60px 1fr 100px 100px 1fr;
  border-radius: 4px;

  padding: 5px;
  margin: 1px 0 0 0;

  align-items: center;
  align-self: center;
  vertical-align: middle;

  span {
    display: block;
    margin: 0 5px;
    font-size: 12px;
    font-weight: 500;
    color: var(--color-black);
  }

  span input {
    align-items: center;
    align-self: center;
    vertical-align: middle;

    padding: 10px;
    margin: 5px 0;

    background-color: var(--color-white-lighter);

    border: 0;
    border-radius: 4px;

    width: 100%;

    font-size: 12px;
    font-weight: 500;

    color: var(--color-black);
  }

  span input.disabled {
    align-items: center;
    align-self: center;
    vertical-align: middle;

    padding: 10px;
    margin: 5px 0;

    background-color: transparent;

    width: 100%;

    font-size: 12px;
    font-weight: 500;

    color: var(--color-black);
  }

  .uppercase {
    text-transform: uppercase;
  }

  .center {
    text-align: center;
  }

  &:hover {
    opacity: 0.9;
  }
`;

export const CheckSend = styled.li`
  display: flex;
  justify-content: flex-end;
  padding: 10px 0;

  background: var(--color-white-lighter);

  border-bottom-left-radius: 4px;
  border-bottom-right-radius: 4px;

  align-items: center;
  align-self: center;
  vertical-align: middle;
`;

export const Select = styled.select`
  align-items: center;
  align-self: center;
  vertical-align: middle;

  padding: 10px;
  margin-right: 10px;

  background-color: var(--color-input-background);

  border: 1px solid var(--color-blue);
  border-radius: 4px;

  font-size: 12px;
  font-weight: 500;

  color: var(--color-input-text);
`;

export const Button = styled.button`
  padding: 5px 10px;
  margin-right: 10px;

  height: 40px;
  background: var(--color-blue);

  font-size: 16px;
  font-weight: normal;
  color: var(--color-white);

  border: 0;
  border-radius: 4px;
  transition: background 0.2s;

  &:hover {
    opacity: 0.8;
  }
`;
