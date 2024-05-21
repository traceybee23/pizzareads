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
    <div className='footer-container'>
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
        tracey beard
        </div>
      </span>
      <span>
        the tech:
        <div className="plugs">
          <a href='#'><IoLogoJavascript /></a>
          <a href='#'><SiExpress /></a>
          <a href='#'><SiPostgresql /></a>
          <a href='#'><FaReact /></a>
          <a href='#'><SiRedux /></a>
          <a href='#'><SiSequelize /></a>
          <a href='#'><FaHtml5 /></a>
          <a href='#'><FaCss3Alt /></a>
        </div>
      </span>
      <span>
        the code:
        <div className="plugs">
        <a href='https://github.com/traceybee23/pizzareads' rel="noreferrer" target='_blank'><FaGithubAlt /></a>
        </div>
      </span>
    </div>
  )
}

export default Footer;
