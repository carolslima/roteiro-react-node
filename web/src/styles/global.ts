import { createGlobalStyle } from 'styled-components';

import robotoSlabRegular from './fonts/RobotoSlab/RobotoSlab-Regular.ttf';
import robotoSlabMedium from './fonts/RobotoSlab/RobotoSlab-Medium.ttf';
import robotoSlabBold from './fonts/RobotoSlab/RobotoSlab-Bold.ttf';

import 'react-perfect-scrollbar/dist/css/styles.css';
import 'react-datepicker/dist/react-datepicker.css';
import 'react-circular-progressbar/dist/styles.css';

export default createGlobalStyle`
  :root {
    font-size: 60%;

    --color-background-gradient: linear-gradient(-0deg, #ffffff, #e5f0f5);
    --color-blue: #006497;
    --color-blue-light: #009ddb;
    --color-blue-lighter: #0069de;
    --color-blue-dark: #005cef;
    --color-blue-darker: #0000ee;
    --color-red: #C53030;
    --color-green: #2ecc71;
    --color-green-dark: #38a169;
    --color-black: #111111;
    --color-white: #ffffff;
    --color-white-light: rgba(255, 255, 255, 0.9);
    --color-white-lighter: #e5f0f5;
    --color-gray: #666360;
    --color-gray-light: #cccccc;
    --color-gray-lighter: #95a5a6;
    --color-orange: #ff7f00;
    --color-orange-light: #ffaf00;

    --color-nav-top-border: #ecf0f1;
    --color-container-background: rgba(255, 255, 255, 0.7);
    --color-header-list: #f4f6f9;
    --color-input-text: #111111;
    --color-input-background: #f4f6f9;
    --color-input-placeholder: #666666;
    --color-input-disabled: #ff7f00;
    --color-button-background: #f4f6f9;
    --color-button-background-hover: #f0f0f0;
    --color-notification: #e67e22;
    --color-checked: #78e5d5;
    --color-link: #222222;
    --color-box-shadow: -1px 1px 2px 0rem rgba(0, 0, 0, 0.3);
    --color-box-shadow-actions: inset 0 -0.6em 1em -0.35em rgba(0,0,0,0.17),inset 0 0.6em 2em -0.3em rgba(255,255,255,0.15),inset 0 0 0em 0.05em rgba(255,255,255,0.12);

    --color-toast-info: #ff7f00;
    --color-toast-success: #38a169;
    --color-toast-error: #e53e3e;

    --color-text-include: #0000ee;

    --color-line-background-sat: rgba(46, 213, 115, 0.8);
    --color-line-background-satsp: rgba(255, 165, 2, 0.8);
    --color-line-background-swa: rgba(153, 255, 204, 0.8);
    --color-line-background-fibra: rgba(179, 237, 5, 0.8);
    --color-line-background-nexio: rgba(241, 242, 246, 0.8);
    --color-line-background-estado: rgba(255, 255, 0, 0.8);
    --color-line-background-defas: rgba(112, 161, 255, 0.8);
    --color-line-background-falta: rgba(255, 71, 87, 0.8);
    --color-line-background-default: rgba(244, 246, 249, 1);
  }

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    outline: 0;
  }

  *:focus {
    outline: 0;
  }

  html, body #root {
    height: 100vh;
  }

  @font-face {
    font-family: 'Roboto Slab';
    font-weight: 400;
    src: local('Roboto Slab'),
    url(${robotoSlabRegular}) format('truetype'),
    url(${robotoSlabMedium}) format('truetype'),
    url(${robotoSlabBold}) format('truetype');
  }

  body {
    background: var(--color-background-gradient);
    color: var(--color-primary);
    -webkit-font-smoothing: antialiased;
    font-family: 'Roboto Slab', serif;
  }

  /* #root {
    display: flex;
    align-items: center;
    justify-content: center;
  } */

  body,
  input,
  button,
  select,
  textarea {
    font-family: 'Roboto Slab', serif;
    font-size: 1.6rem;
    color: var(--color-black);

    &::placeholder {
      color: #666360;
    }
  }

  .container {
    width: 90vw;
    max-width: 700px;
  }

  h1, h2, h3, h4, h5, h6, strong {
    font-weight: 500;
  }

  a {
    text-decoration: none;
  }

  ul {
    list-style: none;
  }

  button {
    cursor: pointer;
  }

  input:focus, button:focus {
    outline: none;
  }

  @media (min-width: 700px) {
    :root {
      font-size: 62.5%;
    }
  }
`;
