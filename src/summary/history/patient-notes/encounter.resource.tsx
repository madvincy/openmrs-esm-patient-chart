import { openmrsFetch } from "@openmrs/esm-api";
import { mockPatientEncounters } from "../../../../__mocks__/encounters.mock";

export function encounterResource(
  patientIdentifer: string,
  abortController: AbortController
) {
  return Promise.resolve(mockPatientEncounters);
}
//  {
//   return openmrsFetch(
//     `/ws/fhir/Encounter?patient.identifier=${patientIdentifer}`,
//     { signal: abortController.signal }
//   );
// }
