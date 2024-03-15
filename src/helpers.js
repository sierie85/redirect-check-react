import Papa from "papaparse";

/**
 * Parses a CSV file using PapaParse library.
 *
 * @param {File} file - The CSV file to parse.
 * @returns {Promise<Array<Object>>} - A promise that resolves to the parsed data as an array of objects.
 */
const awaitPapa = async (file) => {
  const papaPromise = new Promise((complete, error) =>
    Papa.parse(file, { header: true, skipEmptyLines: true, complete, error })
  );
  return await papaPromise.then((parsedData) => parsedData);
};

/**
 * Parses a CSV file and returns the data.
 *
 * @param {File} file - The CSV file to parse.
 * @returns {Promise<Array<Object>>} - A promise that resolves to the parsed data as an array of objects.
 * @returns {Object} - An object with error and errorMsg properties if the file is empty or invalid.
 *
 */
const getCSVData = async (file) => {
  const redirectJson = await awaitPapa(file);
  const { data } = redirectJson;

  if (data.length === 0) {
    return {
      error: true,
      errorMsg:
        "Empty CSV file or wrong formatted CSV file. Please check the file and try again.",
    };
  }

  if (data[0].RESOURCE === undefined || data[0].REDIRECT === undefined) {
    return {
      error: true,
      errorMsg: "Invalid CSV file. Please check the file and try again.",
    };
  }

  return data;
};

/**
 * Sends a POST request to check for redirects.´
 *
 * @param {string} domain - The domain to check.
 * @param {string} resource - The resource to check.
 * @param {string} redirect - The redirect to check.
 * @returns {Promise<Object>} - A promise that resolves to the response JSON object.
 */
const redirectCheck = async (domain, resource, redirect) => {
  // todo: Replace with env variable.
  try {
    const rawResponse = await fetch(`${import.meta.env.VITE_REDIRECT_API_URL}/v1/check-redirect`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ domain, resource, redirect }),
    });
    if (!rawResponse.ok) {
      throw new Error(`${rawResponse.status} ${rawResponse.statusText}`);
    }

    return await rawResponse.json();
  } catch (error) {
    console.log(error);
  }
};

/**
  * Sends a POST request to check for redirects and returns the response.
  *
  * @param {string} domain - The domain to check.
  * @param {string} resource - The resource to check.
  * @param {string} redirect - The redirect to check.
  * @returns {Promise<Object>} - A promise that resolves to the response JSON object.
  * @returns {Object} - An object with error and errorMsg properties if the server response is not ok.
  */
const awaitRedirectCheck = async (domain, resource, redirect) => {
  const response = await redirectCheck(domain, resource, redirect);
  if (!response) {
    return {
      error: true,
      errorMsg: "Server error.",
    };
  }
  return response;
};

export { getCSVData, awaitRedirectCheck };
