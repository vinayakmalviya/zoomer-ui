import { API_URL } from "../constants";

const parseJSON = (response) =>
  new Promise((resolve) =>
    response.json().then((json) =>
      resolve({
        status: response.status,
        ok: response.ok,
        json,
      })
    )
  );

const requestAPI = (route, options = {}) =>
  new Promise((resolve, reject) => {
    fetch(`${API_URL}${route}`, options)
      .then(parseJSON)
      .then((response) => {
        if (response.ok) {
          return resolve(response.json);
        }
        // Extracting error from response object
        return reject(response.json);
      })
      .catch((error) => reject(error));
  });

export default requestAPI;
