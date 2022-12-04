const axios = require("axios").default;
const FormData = require("form-data");
// ES5 example
const { generate_gear_code, convert_scad } = require("./openscad.js");

const AWS_LAMBDA_RUNTIME_API = process.env.AWS_LAMBDA_RUNTIME_API ?? "";
const API = AWS_LAMBDA_RUNTIME_API.substring(
  0,
  AWS_LAMBDA_RUNTIME_API.indexOf(":")
);
const PORT = AWS_LAMBDA_RUNTIME_API.substring(API.length + 1);

function handler({ debug, requestId, request }) {
  const path = request.rawPath;
  const queryStringParameters = request.queryStringParameters;
  const {
    teeth,
    pitch,
    bore = 6,
    pa = 14.5,
    thickness = 6,
  } = queryStringParameters;
  const code = generate_gear_code({
    teeth,
    pitch,
    bore,
    pa,
    thickness,
  });

  const params = {
    teeth: parseInt(teeth),
    pitch: parseFloat(pitch),
    bore: parseFloat(bore),
    pa: parseFloat(pa),
    thickness: parseFloat(thickness),
  };
  const fileName = `SpurGear-T${params.teeth}-P${params.pitch}-pA${params.pa}-b${params.bore}-${params.thickness}mm.stl`;

  return new Promise(async (resolve) => {
    if (path === "/spur/stl") {
      // Create the file name

      convert_scad(code, "stl").then(async (img) => {
        const base64Data = img.toString("base64");
        await result(
          debug,
          requestId,
          {
            data: base64Data,
          },
          {
            "Content-Type": "application/json",
          }
        ).finally(resolve);
      });
    } else if (path === "/spur/preview") {
      // Get the fileName
      convert_scad(code, "png").then(async (img) => {
        const base64Data = img.toString("base64");
        await result(
          debug,
          requestId,
          {
            data: base64Data,
          },
          {
            "Content-Type": "application/json",
          }
        ).finally(resolve);
      });
    } else if (path === "/spur/code") {
      result(debug, requestId, code, {
        "Content-Type": "application/json",
      }).finally(resolve);
    }
  });
}

function result(debug, requestId, payload, headers = {}) {
  if (debug) {
    return new Promise((resolve) => {
      resolve();
    });
  } else {
    return new Promise((resolve) => {
      axios
        .post(
          `http://${AWS_LAMBDA_RUNTIME_API}/2018-06-01/runtime/invocation/${requestId}/response`,
          payload,
          {
            headers: {
              ...headers,
            },
          }
        )
        .finally(resolve);
    });
  }
}

const DEBUG = false;

if (DEBUG) {
  (async function () {
    await handler({
      debug: true,
      requestId: "1337",
      request: {
        rawPath: "/spur/preview",
        queryStringParameters: {
          teeth: 27,
          pitch: 20,
        },
      },
    });
  })();
} else {
  (async function () {
    await axios
      .get(
        `http://${AWS_LAMBDA_RUNTIME_API}/2018-06-01/runtime/invocation/next`
      )
      .then(async (resp) => {
        const requestId = resp.headers["lambda-runtime-aws-request-id"];
        const request = resp.data;

        // Invoke the handler
        await handler({
          debug: false,
          requestId,
          request,
        });

        process.exit(0);
      });
  })();
}
