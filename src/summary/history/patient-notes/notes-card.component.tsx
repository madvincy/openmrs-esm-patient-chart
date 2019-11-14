import React from "react";
import { match } from "react-router";

import dayjs from "dayjs";
import { createErrorHandler } from "@openmrs/esm-error-handling";

import { getEncounters } from "./encounter.resource";
import SummaryCard from "../../cards/summary-card.component";
import style from "./notes-card-style.css";
import { Link } from "react-router-dom";

export default function NotesCard(props: NotesCardProps) {
  const defaultHeaders = {
    date: "Date",
    notes: "Encounter Type,",
    location: "Location",
    author: "Author"
  };
  const [patientNotes, setPatientNotes] = React.useState(null);
  const [notesHeaders, setNotesHeaders] = React.useState(defaultHeaders);
  const [width, setWidth] = React.useState("45.5rem");
  const [showMore, setShowMore] = React.useState(false);

  React.useEffect(() => {
    const abortController = new AbortController();
    if (props.properties) {
      setWidth(props.properties.width);
      setShowMore(props.properties.showMore);
      setNotesHeaders(props.properties.Headers);
    }
    getEncounters(props.currentPatient.identifier[0].value, abortController)
      .then(({ data }) => {
        if (data.total > 0) {
          setPatientNotes(getNotes(data.entry));
        }
      })
      .catch(createErrorHandler());
    return () => abortController.abort();
  }, [props.currentPatient.identifier[0].value]);

  return (
    <SummaryCard name="Notes" match={props.match} styles={{ width: width }}>
      <table className={style.table}>
        <thead>
          <tr className={style.tableRow}>
            <th className={`${style.tableHeader} ${style.tableDates}`}>
              {notesHeaders.date}
            </th>
            <th className={style.tableHeader}>
              {notesHeaders.notes}{" "}
              {showMore && (
                <svg
                  className="omrs-icon"
                  fill="var(--omrs-color-ink-low-contrast)"
                >
                  <use xlinkHref="#omrs-icon-arrow-downward" />
                </svg>
              )}{" "}
              {notesHeaders.location}
            </th>
            <th className={style.tableHeader}>{notesHeaders.author}</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {patientNotes &&
            patientNotes
              .slice(0, showMore ? patientNotes.length : 2)
              .map(note => {
                return (
                  <tr key={note.id} className={style.tableRow}>
                    <td
                      className={style.tableData}
                      style={{ textAlign: "start" }}
                    >
                      <span style={{ fontWeight: 500 }}>
                        {convertDate(note.location[0].period.end)}
                      </span>{" "}
                    </td>
                    <td
                      className={style.tableData}
                      style={{ textAlign: "start" }}
                    >
                      <span style={{ fontWeight: 500 }}>
                        {note.type[0].coding[0].display}
                      </span>
                      <br></br>
                      <span
                        style={{
                          fontWeight: 500,
                          color: "var(--omrs-color-ink-medium-contrast)"
                        }}
                      >
                        {note.location[0].location.display}
                      </span>{" "}
                    </td>
                    <td
                      className={style.tableData}
                      style={{ textAlign: "start" }}
                    >
                      <span style={{ fontWeight: 500 }}>
                        {getAuthorName(note.extension)}
                      </span>{" "}
                    </td>

                    <td style={{ textAlign: "end" }}>
                      <svg
                        className="omrs-icon"
                        fill="var(--omrs-color-ink-low-contrast)"
                      >
                        <use xlinkHref="#omrs-icon-chevron-right" />
                      </svg>
                    </td>
                  </tr>
                );
              })}
        </tbody>
        {!showMore ? (
          <tfoot>
            <tr className={style.tfoot}>
              <td className={style.moreNotes}>
                <Link
                  to={`/patient/${props.currentPatient.id}/chart/notes`}
                  className={style.moreNotes}
                >
                  <svg className="omrs-icon">
                    <use
                      xlinkHref="#omrs-icon-chevron-right"
                      fill="var(--omrs-color-ink-low-contrast)"
                    ></use>
                  </svg>{" "}
                  {"See all"}
                </Link>
              </td>
            </tr>
          </tfoot>
        ) : (
          <tfoot>
            <tr className={style.moreNotes}>
              <td className={style.moreNotes}>
                <svg className="omrs-icon">
                  <use
                    xlinkHref="#omrs-icon-chevron-right"
                    fill="var(--omrs-color-ink-low-contrast)"
                  ></use>
                </svg>{" "}
                {"Pagination"}
              </td>
            </tr>
          </tfoot>
        )}
      </table>
    </SummaryCard>
  );
}
function getNotes(notes) {
  return notes.map(note => note.resource);
}
function getAuthorName(extension: any): string {
  const author = extension.find(ext => ext.url === "changedBy");
  return author ? author.valueString.toUpperCase() : "";
}
function convertDate(date: string): string {
  const unprocessedDate = dayjs(date);
  if (unprocessedDate.format("DD-MMM-YYYY") === dayjs().format("DD-MMM-YYYY")) {
    return "Today   ".concat(unprocessedDate.format("h:mm a"));
  } else if (unprocessedDate.format("YYYY") === dayjs().format("YYYY")) {
    return unprocessedDate.format("DD-MMM h:mm a");
  }
  return unprocessedDate.format("DD-MMM-YYYY h:mm a");
}

type NotesCardProps = {
  match: match;
  currentPatient: fhir.Patient;
  width?: string;
  showMore?: boolean;
  properties?: any;
};
