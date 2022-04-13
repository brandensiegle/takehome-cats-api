import { getCatImageUrl } from "./client";
import axios from "axios";
import { CORS_HEADERS } from "./constants";

import type { APIGatewayProxyResult, APIGatewayProxyHandler } from "aws-lambda";
import { NoCatImageFoundError } from "./errors";

export const handler: APIGatewayProxyHandler =
  async (): Promise<APIGatewayProxyResult> => {
    try {
      const {
        data: catImageBlob,
        headers: { "content-type": contentType },
      } = await axios.request({
        url: await getCatImageUrl(),
        responseType: "arraybuffer",
      });

      return {
        statusCode: 200,
        headers: {
          ...CORS_HEADERS,
          "content-type": contentType,
        },
        body: Buffer.from(catImageBlob, "binary").toString("base64"),
        isBase64Encoded: true,
      };
    } catch (error) {
      console.error(error);

      if (error instanceof NoCatImageFoundError) {
        return {
          statusCode: 404,
          headers: {
            ...CORS_HEADERS,
          },
          body: "CAT NOT FOUND 😿",
        };
      }

      return {
        statusCode: 500,
        headers: {
          ...CORS_HEADERS,
        },
        body: "SERVER ERROR 🙀",
      };
    }
  };
