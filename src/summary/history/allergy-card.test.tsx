import React from "react";
import ReactDOM from "react-dom";
import { render, cleanup, wait } from "@testing-library/react";
import AllergyCard from "./allergy-card.component";
import { BrowserRouter } from "react-router-dom";
import { performPatientAllergySearch } from "./allergy-intolerance.resource";
import { act } from "react-dom/test-utils";

const mockPerformPatientAllergySearch = performPatientAllergySearch as jest.Mock;

jest.mock("./allergy-intolerance.resource", () => ({
  performPatientAllergySearch: jest.fn().mockResolvedValue({
    data: {
      results: []
    }
  })
}));

const mockPatientAllergyResult = {
  data: {
    total: 2,
    entry: [
      {
        resource: {
          resourceType: "AllergyIntolerance",
          id: "67a8dad8-0d35-4afd-a838-f96913614c53",
          category: ["medication"],
          criticality: "?",
          code: {
            coding: [
              {
                system: "http://openmrs.org",
                code: "162298AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA",
                display: "ACE inhibitors"
              }
            ],
            text: "ACE inhibitors"
          },
          note: [
            {
              text: "comment"
            }
          ],
          reaction: [
            {
              manifestation: [
                {
                  coding: [
                    {
                      system: "http://openmrs.org",
                      code: "124AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA",
                      display: "AMOEBIASIS"
                    }
                  ],
                  text: "AMOEBIASIS"
                }
              ]
            }
          ]
        }
      },
      {
        resource: {
          resourceType: "AllergyIntolerance",
          id: "b6c8efa1-e823-46ac-ae09-83b2b0b96a48",
          extension: [
            {
              url:
                "http://fhir-es.transcendinsights.com/stu3/StructureDefinition/resource-date-created",
              valueDateTime: "2019-06-21T13:43:47+00:00"
            },
            {
              url:
                "https://purl.org/elab/fhir/StructureDefinition/Creator-crew-version1",
              valueString: "user2"
            }
          ],
          category: ["medication"],
          criticality: "low",
          code: {
            coding: [
              {
                system: "http://openmrs.org",
                code: "162299AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA",
                display: "ARBs (angiotensin II receptor blockers)"
              }
            ],
            text: "ARBs (angiotensin II receptor blockers)"
          },
          reaction: [
            {
              manifestation: [
                {
                  coding: [
                    {
                      system: "http://openmrs.org",
                      code: "124AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA",
                      display: "AMOEBIASIS"
                    }
                  ],
                  text: "AMOEBIASIS"
                }
              ]
            }
          ]
        }
      }
    ]
  }
};

const patient: fhir.Patient = {
  resourceType: "Patient",
  id: "8673ee4f-e2ab-4077-ba55-4980f408773e",
  extension: [
    {
      url:
        "http://fhir-es.transcendinsights.com/stu3/StructureDefinition/resource-date-created",
      valueDateTime: "2017-01-18T09:42:40+00:00"
    },
    {
      url:
        "https://purl.org/elab/fhir/StructureDefinition/Creator-crew-version1",
      valueString: "daemon"
    }
  ],
  identifier: [
    {
      id: "1f0ad7a1-430f-4397-b571-59ea654a52db",
      use: "usual",
      system: "OpenMRS ID",
      value: "10010W"
    }
  ],
  active: true,
  name: [
    {
      id: "efdb246f-4142-4c12-a27a-9be60b9592e9",
      use: "usual",
      family: "Wilson",
      given: ["John"]
    }
  ],
  gender: "male",
  birthDate: "1972-04-04",
  deceasedBoolean: false,
  address: [
    {
      id: "0c244eae-85c8-4cc9-b168-96b51f864e77",
      use: "home",
      line: ["Address10351"],
      city: "City0351",
      state: "State0351tested",
      postalCode: "60351",
      country: "Country0351"
    }
  ]
};

describe("<AllergyCard/>", () => {
  let match, wrapper: any;

  afterEach(cleanup);

  beforeEach(() => {
    match = { params: {}, isExact: false, path: "/", url: "/" };
  });

  it("render AllergyCard without dying", async () => {
    act(() => {
      mockPerformPatientAllergySearch.mockResolvedValue(
        mockPatientAllergyResult
      );
      wrapper = render(
        <BrowserRouter>
          <AllergyCard match={match} currentPatient={patient} />
        </BrowserRouter>
      );
    });

    await wait(() => {
      expect(wrapper).toBeDefined();
    });
  });

  it("should display the patient allergy reaction and manifestation", async () => {
    act(() => {
      mockPerformPatientAllergySearch.mockResolvedValue(
        mockPatientAllergyResult
      );
      wrapper = render(
        <BrowserRouter>
          <AllergyCard match={match} currentPatient={patient} />
        </BrowserRouter>
      );
    });
    await wait(() => {
      expect(wrapper.getByText("ACE inhibitors")).toBeTruthy();
      expect(wrapper.getByText("AMOEBIASIS (—)")).toBeTruthy();
    });
  });
});
