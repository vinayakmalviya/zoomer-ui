import { API_URL } from "../constants";

interface ParsedResp {
  status: number;
  ok: boolean;
  [k: string]: any;
}

interface APIResponse {
  [k: string]: any;
}

const parseJSON = (response: Response) =>
  new Promise<ParsedResp>((resolve) =>
    response.json().then((json: any) =>
      resolve({
        status: response.status,
        ok: response.ok,
        json,
      })
    )
  );

const requestAPI = (route: string, options = {}) =>
  new Promise<APIResponse>((resolve, reject) => {
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
