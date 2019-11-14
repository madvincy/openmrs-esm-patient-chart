import React from "react";
import { match } from "react-router";
import NotesCard from "./notes-card.component";
import Styles from "./patient-notes-style.css";
import { getEncounters } from "./encounter.resource";

export default function PatientNotes(props: PatientNotesCardProps) {
  const properties = {
    showMore: true,
    width: "100.0rem",
    Headers: {
      date: "DATE",
      notes: "NOTE",
      location: "LOCATION",
      author: "AUTHOR"
    }
  };
  return <div className={Styles.notesSummary}>{displayNotes()}</div>;
  function displayNotes() {
    return (
      <NotesCard
        match={props.match}
        properties={properties}
        currentPatient={props.currentPatient}
      />
    );
  }
}

type PatientNotesCardProps = {
  match: match;
  currentPatient: fhir.Patient;
};
