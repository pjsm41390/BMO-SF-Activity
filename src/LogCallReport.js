import logo from "./logo.svg";
import React, { useEffect, useState } from "react";
import { useNavigate, BrowserRouter } from "react-router-dom";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { connect } from "@openfin/salesforce";
import "./App.css";
import { FormText } from 'react-bootstrap';

let salesforce;

function LogCallReport() {
  const navigate = useNavigate();
  const [Notes, setNotes] = useState("");
  const [Objectives, setObjectives] = useState("");
  const [connected, setConnected] = useState(false);
  let [consumerKey, setConsumerKey] = useState("");
  let [salesforceUrl, setSalesforceUrl] = useState("");

  function validateForm() {
    return true;
  }

  function handleSubmit(event) {
    event.preventDefault();
    salesforceUrl = "https://bmo--devmvp.my.salesforce.com/";
    consumerKey =
      "3MVG9PG9sFc71i9kqDhbn3Umurb1KYUbi8wANw8tbpo4fTpvgXsZfWYRzAD98eELqa5Bl3DcEGlc0eLK_RsuY";

    if (!salesforceUrl || !consumerKey) {
      return;
    }

    (async () => {
      // Connect to salesforce org at the provided url using the provided consumer key
      salesforce = await connect(salesforceUrl, consumerKey, true);

      let test = await salesforce.executeApiRequest(
        "/services/data/vXX.X/sobjects/T1C_Base__Call_Report__c",
        "POST",
        {
          T1C_Base__Client__c: "0016s00000Sda8NAAR",
          T1C_Base__Notes__c: Notes,
          T1C_Base__Subject_Meeting_Objectives__c: Objectives
        }
      );
    })();

    setConnected(true);

    //navigate("./ActivityForm", {replace:true})
  }

  return (
    <div class="container">
      <div className="LogCallReport">
        <h2>New Call Report</h2>
        <div class="row">
          <Form onSubmit={handleSubmit}>
            <div class="col-md-6">
              <Form.Label>Notes: </Form.Label>
              <Form.Control
                text="Notes"
                autoFocus
                value={Notes}
                onChange={e => setNotes(e.target.value)}
              />
            </div>

            <div class="col-md-6">
              <Form.Label>Subject/Objectives</Form.Label>
              <Form.Control
                value={Objectives}
                onChange={e => setObjectives(e.target.value)}
              />

              <div class="form-group">
                <label for="start">Start date:</label>
                <input
                  type="date"
                  id="start"
                  name="trip-start"
                  value={"2022-01-28"}
                  min="2020-01-01"
                  max="2022-12-31"
                />
              </div>
              <div class="form-group">
                <label for="logged">Logged From:</label>
                <select name="logged" id="logged">
                  <option value="Allegro">Allegro</option>
                </select>
              </div>
            </div>

            <Button block size="lg" type="submit">
              Save
            </Button>
          </Form>
        </div>
      </div>
    </div>
  );
}

export default LogCallReport;
