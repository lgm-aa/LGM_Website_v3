import React from "react";
import { Link } from "react-router-dom";
import "./Button.css";

export default function Button({
  variant = "primary",
  href,
  children,
  className = "",
  newTab = false,
  ...rest
}) {
  const classes = `btn btn__${variant} ${className}`.trim();

  return (
    <a 
      className={classes} 
      href={href} 
      target={newTab ? "_blank" : undefined}
      rel={newTab ? "noreferrer" : undefined}
      {...rest}
    >
      {children}
    </a>
  )
  
}
