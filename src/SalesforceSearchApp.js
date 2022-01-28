import {
  connect,
  SalesforceAccountSearchResult,
  SalesforceConnection,
  SalesforceContactSearchResult,
  SalesforceSearchQuery,
  SalesforceSearchResult,
} from '@openfin/salesforce';
import React, { useState } from 'react';
import ReactDOM from 'react-dom';

let salesforce;

export const SalesforceSearchApp: React.FC = () => {
  const [connected, setConnected] = useState(false);
  const [consumerKey, setConsumerKey] = useState('');
  const [salesforceUrl, setSalesforceUrl] = useState('');
  const [salesforceResults, setSalesforceResults] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  const connectHandler = async () => {
    if (!salesforceUrl || !consumerKey) {
      return;
    }
    // Connect to salesforce org at the provided url using the provided consumer key
    salesforce = await connect(salesforceUrl, consumerKey);
    setConnected(true);
  };

  const disconnectHandler = async () => {
    if (!salesforce) {
      return;
    }
    // Disconnect from salesforce and revoke stored auth tokens
    await salesforce.disconnect();
    setConnected(false);
    setSalesforceResults(null);
    setSearchTerm('');
  };

  const searchHandler = async () => {
    if (!salesforce || !searchTerm) {
      return;
    }
    // Search salesforce with entered query text returning max 25 results
    const query = {
      limit: 25,
      text: searchTerm,
    };
    const searchResults = await salesforce.search(query);
    setSalesforceResults(searchResults);
  };

  return (
    <div style={{ backgroundColor: '#fff' }}>
      {!connected && (
        <div>
          <div>
            <input
              placeholder="Salesforce org URL"
              value={salesforceUrl}
              onInput={(event) => setSalesforceUrl(event.currentTarget.value)}
            />
          </div>
          <div>
            <input
              placeholder="Connected app key"
              value={consumerKey}
              onInput={(event) => setConsumerKey(event.currentTarget.value)}
            />
          </div>
          <div>
            <button onClick={connectHandler}>Connect</button>
          </div>
        </div>
      )}
      {connected && (
        <div>
          <p>
            Connected to {salesforce?.orgUrl}
            <br />
            <button onClick={disconnectHandler}>Disconnect</button>
          </p>
          <form onSubmit={(event) => event.preventDefault()}>
            <input
              placeholder="Enter a search term"
              value={searchTerm}
              onInput={(event) => setSearchTerm(event.currentTarget.value)}
            />
            <div>
              <button type="submit" onClick={searchHandler}>
                Search
              </button>
            </div>
            <ul>
              {salesforceResults?.map((result) => (
                <li key={result.Id}>
                  {result.Id}: {result.Name}(
                  {result.objectType})
                </li>
              ))}
            </ul>
          </form>
        </div>
      )}
    </div>
  );
};
