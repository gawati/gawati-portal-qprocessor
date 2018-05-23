const axios = require("axios");
const servicehelper = require("./utils/ServiceHelper");

/**
 * Post status of pkg processed by the Portal
 */
const toEditor = (statusObj) => {
  console.log(" IN: toEditor");
  console.log(statusObj.iri);
  const statusApi = servicehelper.getApi("editorQProc", "status");
  const {url, method} = statusApi;

  //For testing.
  const data = {
    "iri": statusObj.iri,
    "status": "published"
  }

  axios({
    method:method,
    url: url,
    data: {data}
  })
  .then(res => console.log(res.data))
  .catch(err => console.log(err));
};

module.exports.toEditor = toEditor;