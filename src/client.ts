import axios from "axios";
import { getSecretValue } from "./awsClients";
import { CAT_API_KEY_SECRET_NAME } from "./constants";
import { CatUrlFetchError, NoCatImageFoundError } from "./errors";

let apiKey: string;

/**
 * Retrieves the URL to the image of a cat
 *
 * @returns {Promise<string>}
 */
export async function getCatImageUrl(): Promise<string> {
  if (!apiKey) apiKey = await getSecretValue(CAT_API_KEY_SECRET_NAME);

  const { data } = await axios
    .request<
      {
        url: string;
      }[]
    >({
      url: "https://api.thecatapi.com/v1/images/search",
      params: {
        limit: 1,
      },
      method: "GET",
      headers: {
        "x-api-key": apiKey,
      },
    })
    .catch((e) => {
      console.error(e);
      throw new CatUrlFetchError();
    });

  if (data.length === 0 || !data[0].url) throw new NoCatImageFoundError();

  return data[0].url;
}
