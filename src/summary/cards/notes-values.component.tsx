import React from "react";
import styles from "./notes-values.css";
import { BooleanLiteral } from "@babel/types";

export default function NotesValues(props: NotesValuesProps) {
  return (
    <div className={styles.root}>
      {props.date && (
        <label
          className={props.dateClassName || "omrs-type-body-regular"}
          style={props.dateStyles}
        >
          {props.date}
          {props.specialKey && <sup>{"\u002A"}</sup>}
        </label>
      )}
      {!props.header && (
        <div className={styles.verticalLabelValue}>
          <label
            className={
              props.labelClassName || `omrs-type-body-small ${styles.label}`
            }
          >
            {props.label}
          </label>
          <div
            className={props.locationClassName}
            style={props.locationStyles}
            title={props.label}
          >
            {props.location || "\u2014"}
          </div>
        </div>
      )}
      {props.header && (
        <div className={styles.root2}>
          <label
            className={props.labelClassName || "omrs-type-body-regular"}
            style={props.labelStyles}
          >
            {props.label}
            {props.specialKey && <sup>{"\u002A"}</sup>}
          </label>
          <div
            className={props.valueClassName || "omrs-type-body-regular"}
            style={props.valueStyles}
          >
            {props.value || "\u2014"}
          </div>
        </div>
      )}

      {props.author && (
        <div
          className={props.authorClassName || "omrs-type-body-regular"}
          style={props.authorStyles}
        >
          {props.author || "\u2014"}
        </div>
      )}
    </div>
  );
}

NotesValues.defaultProps = {
  dateStyles: {},
  authorStyles: {},
  labelStyles: {},
  className: "",
  specialKey: false
};

type NotesValuesProps = {
  date?: string;
  label: string;
  location?: React.ReactNode;
  header?: boolean;
  author?: any;
  authorStyles?: React.CSSProperties;
  locationStyles?: React.CSSProperties;
  dateStyles?: React.CSSProperties;
  specialKey: boolean;
  labelClassName?: string;
  value?: React.ReactNode;
  valueStyles?: React.CSSProperties;
  labelStyles?: React.CSSProperties;
  valueClassName?: string;
  locationClassName?: string;
  dateClassName?: string;
  authorClassName?: string;
  detailsClassName?: string;
};
