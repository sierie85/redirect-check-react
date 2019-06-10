import Papa from "papaparse";

const awaitPapa = async file => {
  const papaPromise = new Promise((complete, error) =>
    Papa.parse(file, { header: true, skipEmptyLines: true, complete, error })
  );
  return await papaPromise.then(parsedData => parsedData);
};

const redirectCheck = async (domain, resource, redirect) => {
  const rawResponse = await fetch(
    // "https://redirect-tool.herokuapp.com/check-redirect",
    "http://localhost:5000/check-redirect",
    {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ domain, resource, redirect })
    }
  );
  return await rawResponse.json();
};

export { awaitPapa, redirectCheck };
