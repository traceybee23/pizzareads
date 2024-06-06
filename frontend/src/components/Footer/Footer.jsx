import { FaGithubAlt } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { FaGithubSquare } from "react-icons/fa";
import { IoPizzaOutline } from "react-icons/io5";
import { SiExpress } from "react-icons/si";
import { SiPostgresql } from "react-icons/si";
import { IoLogoJavascript } from "react-icons/io5";
import { FaReact } from "react-icons/fa";
import { SiRedux } from "react-icons/si";
import { SiSequelize } from "react-icons/si";
import { FaHtml5 } from "react-icons/fa";
import { FaCss3Alt } from "react-icons/fa";

import './Footer.css'

const Footer = () => {
  return (
    <span className='footer'>
      <span>
        developed by:
        <div className="plugs">
        <a href="https://www.linkedin.com/in/tracey-beard/" target='_blank' rel="noreferrer">
          <FaLinkedin />
        </a>
        <a href="https://github.com/traceybee23" target='_blank' rel="noreferrer">
          <FaGithubSquare />
        </a>
        <a href='https://traceybee23.github.io' target="_blank" rel="noreferrer">
          <IoPizzaOutline />
        </a>
        <span>tracey beard</span>
        </div>
      </span>
      <span>
        the tech:
        <div className="plugs">
          <a href='https://developer.mozilla.org/en-US/docs/Web/JavaScript'><IoLogoJavascript /></a>
          <a href='https://expressjs.com/'><SiExpress /></a>
          <a href='https://www.postgresql.org/docs/'><SiPostgresql /></a>
          <a href='https://react.dev/'><FaReact /></a>
          <a href='https://redux.js.org/'><SiRedux /></a>
          <a href='https://sequelize.org/'><SiSequelize /></a>
          <a href='https://developer.mozilla.org/en-US/docs/Web/HTML'><FaHtml5 /></a>
          <a href='https://developer.mozilla.org/en-US/docs/Web/CSS'><FaCss3Alt /></a>
        </div>
      </span>
      <span>
        the code:
        <div className="plugs">
        <a href='https://github.com/traceybee23/pizzareads' rel="noreferrer" target='_blank'><FaGithubAlt /></a>
        </div>
      </span>
    </span>
  )
}

export default Footer;
