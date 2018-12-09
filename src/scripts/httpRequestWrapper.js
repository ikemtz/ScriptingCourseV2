'Strict Mode';
// My own code that allows me simply the making of XHR requests
// TODO: Need to refactor to Async.
function httpRequestWrapper(url, body = null, headers = []) {
  return new Promise((resp, err) => {
    const req = new XMLHttpRequest();
    req.timeout = 30000;
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
    //Handling HTTP Gets
    if (!body) {
      req.open('get', url, true);
      req.send();
    } else {
      //Handling HTTP Posts
      req.open('post', url, true);
      headers.forEach(x => {
        req.setRequestHeader(x.name, x.value);
      });
      req.send(body);
    }
  });
}
