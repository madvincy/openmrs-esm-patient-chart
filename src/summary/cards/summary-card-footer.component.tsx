import React from "react";
import { match, Link } from "react-router-dom";
import styles from "./summary-card-row.css";

export default function SummaryCardFooter(props: SummaryCardFooterProps) {
  if (!props.linkTo) {
    return <div className={styles.row}>{props.children}</div>;
  }
  return (
    <Link to={props.linkTo} className={styles.row}>
      {props.children}
    </Link>
  );
}

type SummaryCardFooterProps = {
  linkTo?: string;
  children: React.ReactNode;
};
