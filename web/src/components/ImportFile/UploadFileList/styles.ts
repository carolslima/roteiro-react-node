import styled from 'styled-components';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { VscFile } from "react-icons/vsc";

export const Container = styled.ul`
  display: flex;
  flex-direction: column;

  width: 98%;
  margin: 0 auto;

  li {
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: var(--color-gray-lighter);

    & + li {
      margin-top: 15px;
    }
  }
`;

export const Scroll = styled(PerfectScrollbar)`
  max-height: 52vh;
`;

export const FileInfo = styled.div`
  display: flex;
  align-items: center;

  div {
    display: flex;
    flex-direction: column;

    span {
      font-size: 12px;
      color: var(--color-gray-lighter);
      margin-top: 5px;

      button {
        border: 0;
        background: transparent;
        color: var(--color-red);
        font-size: 12px;
        margin-left: 5px;
        cursor: pointer;
      }
    }
  }
`;

export const FileIcon = styled(VscFile)`
  width: 26px;
  height: 26px;
  margin-right: 10px;
  margin-top: -10px;
  color: var(--color-blue);
`;

export const FileName = styled.strong`
  color: var(--color-blue);
`;
