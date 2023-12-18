async function bodyParser(request) {
  return new Promise((resolve, reject) => {
    let totalData = "";

    request.on("data", (chunk) => {
      totalData += chunk.toString();
    });

    request.on("end", () => {
      try {
        request.body = JSON.parse(totalData);
        resolve();
      } catch (error) {
        reject(error);
      }
    });

    request.on("error", (error) => {
      reject(error);
    });
  });
}

export default bodyParser;
