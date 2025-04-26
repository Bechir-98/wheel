import React, { useState } from "react";
import PropTypes from "prop-types";
import "bootstrap/dist/css/bootstrap.min.css";

/**
 * Badge component with customizable variants
 */
export const Badge = ({ children, className = "", variant = "primary", pill = false, ...rest }) => (
  <span
    className={`badge bg-${variant} ${pill ? "rounded-pill" : ""} ${className}`}
    {...rest}
  >
    {children}
  </span>
);

Badge.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  variant: PropTypes.oneOf([
    "primary",
    "secondary",
    "success",
    "danger",
    "warning",
    "info",
    "light",
    "dark",
  ]),
  pill: PropTypes.bool,
};

Badge.defaultProps = {
  className: "",
  variant: "primary",
  pill: false,
};

/**
 * Button component with Bootstrap styling
 */
export const Button = ({
  children,
  onClick,
  variant = "primary",
  className = "",
  size = "",
  disabled = false,
  type = "button",
  ...rest
}) => (
  <button
    type={type}
    onClick={onClick}
    disabled={disabled}
    className={`btn btn-${variant} ${size ? `btn-${size}` : ""} ${className}`}
    {...rest}
  >
    {children}
  </button>
);

Button.propTypes = {
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func,
  variant: PropTypes.oneOf([
    "primary",
    "secondary",
    "success",
    "danger",
    "warning",
    "info",
    "light",
    "dark",
    "link",
  ]),
  className: PropTypes.string,
  size: PropTypes.oneOf(["sm", "lg", ""]),
  disabled: PropTypes.bool,
  type: PropTypes.oneOf(["button", "submit", "reset"]),
};

Button.defaultProps = {
  onClick: null,
  variant: "primary",
  className: "",
  size: "",
  disabled: false,
  type: "button",
};

/**
 * Card component with Bootstrap styling
 */
export const Card = ({
  children,
  className = "",
  style = {},
  hover = false,
  ...rest
}) => (
  <div
    className={`card ${hover ? "shadow-hover transition-transform transform hover:scale-105" : "shadow"} ${className}`}
    style={style}
    {...rest}
  >
    {children}
  </div>
);

Card.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  style: PropTypes.object,
  hover: PropTypes.bool,
};

Card.defaultProps = {
  className: "",
  style: {},
  hover: false,
};

/**
 * Card subcomponents for better structure
 */
Card.Header = ({ children, className = "", ...rest }) => (
  <div className={`card-header ${className}`} {...rest}>
    {children}
  </div>
);

Card.Body = ({ children, className = "", ...rest }) => (
  <div className={`card-body ${className}`} {...rest}>
    {children}
  </div>
);

Card.Footer = ({ children, className = "", ...rest }) => (
  <div className={`card-footer ${className}`} {...rest}>
    {children}
  </div>
);

Card.Header.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

Card.Body.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

Card.Footer.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

Card.Header.defaultProps = {
  className: "",
};

Card.Body.defaultProps = {
  className: "",
};

Card.Footer.defaultProps = {
  className: "",
};

/**
 * Tooltip component with Bootstrap styling
 */
export const Tooltip = ({
  children,
  content,
  placement = "top",
  className = "",
  ...rest
}) => {
  const [show, setShow] = useState(false);

  return (
    <div 
      className={`d-inline-block position-relative ${className}`}
      onMouseEnter={() => setShow(true)}
      onMouseLeave={() => setShow(false)}
      {...rest}
    >
      {children}
      {show && (
        <div
          className={`tooltip bs-tooltip-${placement} position-absolute show`}
          role="tooltip"
          style={{
            // Positioning based on placement
            ...(placement === "top" && { bottom: "100%", left: "50%", transform: "translateX(-50%)", marginBottom: "0.5rem" }),
            ...(placement === "bottom" && { top: "100%", left: "50%", transform: "translateX(-50%)", marginTop: "0.5rem" }),
            ...(placement === "left" && { right: "100%", top: "50%", transform: "translateY(-50%)", marginRight: "0.5rem" }),
            ...(placement === "right" && { left: "100%", top: "50%", transform: "translateY(-50%)", marginLeft: "0.5rem" }),
            zIndex: 1070
          }}
        >
          <div className="tooltip-arrow" 
            style={{
              position: "absolute",
              ...(placement === "top" && { bottom: "-0.4rem", left: "50%", transform: "translateX(-50%)" }),
              ...(placement === "bottom" && { top: "-0.4rem", left: "50%", transform: "translateX(-50%)" }),
              ...(placement === "left" && { right: "-0.4rem", top: "50%", transform: "translateY(-50%)" }),
              ...(placement === "right" && { left: "-0.4rem", top: "50%", transform: "translateY(-50%)" })
            }} 
          />
          <div className="tooltip-inner">{content}</div>
        </div>
      )}
    </div>
  );
};

Tooltip.propTypes = {
  children: PropTypes.node.isRequired,
  content: PropTypes.node.isRequired,
  placement: PropTypes.oneOf(["top", "bottom", "left", "right"]),
  className: PropTypes.string
};

Tooltip.defaultProps = {
  placement: "top",
  className: ""
};