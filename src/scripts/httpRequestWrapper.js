'Strict Mode';
// My own code that allows me simply the making of XHR requests
// TODO: Need to refactor to Async.
function httpRequestWrapper(url, body = null, headers = []) {
  return new Promise((resp, err) => {
    const req = new XMLHttpRequest();
    req.timeout = 500;
    req.onreadystatechange = () => {
      if (req.readyState === 4) {
        if (req.status === 200) {
          resp(req.response);
        } else {
          err(req.status);
        }
      }
    };
    req.ontimeout = () => {
      err('error timeout');
    };
    if (!body) {
      req.open('get', url, true);
      req.send();
    } else {
      req.open('post', url, true);
      headers.forEach(x => {
        req.setRequestHeader(x.name, x.value);
      });
      req.send(JSON.stringify(body));
    }
  });
}
