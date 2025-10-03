import React from "react";
import styles from "./Button.module.css";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "destructive" | "outline";
  size?: "default" | "sm" | "lg" | "icon";
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = "default", size = "default", className = "", asChild = false, ...props }, ref) => {
    const Comp = asChild ? "span" : "button";

    const classes = `${styles.button} ${styles[`button-${variant}`]} ${styles[`button-${size}`]} ${className}`;

    return <Comp className={classes} ref={ref} {...props} />;
  }
);

Button.displayName = "Button";

export { Button };
