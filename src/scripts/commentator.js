async function submitComment() {
  const element = document.getElementById('txtComment');
  var txt = element.value.trim();
  if (txt.length < 15) {
    element.classList.add('border');
    element.classList.add('border-danger');
    alert('Minimum length is 15');
  } else {
    httpRequestWrapper(
      'https://eastus.api.cognitive.microsoft.com/text/analytics/v2.0/sentiment',
      {
        documents: [
          {
            language: 'en',
            id: '1',
            text: txt
          }
        ]
      },
      [
        {
          name: 'Ocp-Apim-Subscription-Key',
          value: '3fb9c52c649e4123bbaf8840c9811a4d'
        },
        {
          name: 'Content-Type',
          value: 'application/json'
        }
      ]
    );
  }
}
