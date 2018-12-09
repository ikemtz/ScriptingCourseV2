let domData = {
  commentTemplate: document.getElementById('commentTemplate').innerHTML.trim(),
  comments: document.getElementById('comments'),
  noData: document.getElementById('noData'),
  language: 'en',
  comment: document.getElementById('txtComment')
};
const cogUrl =
  'https://ikemtz-cognitiveservices.azurewebsites.net/api/comments';
async function submitComment() {
  var txt = domData.comment.value.trim();
  if (txt.length < 15) {
    domData.comment.classList.add('border');
    domData.comment.classList.add('border-danger');
    alert(`Minimum length is 15 characters, current count: ${txt.length}.`);
  } else if (txt.length > 1000) {
    domData.comment.classList.add('border');
    domData.comment.classList.add('border-danger');
    alert(`Maximum length is 1000 characters, current count: ${txt.length}.`);
  } else {
    domData.comment.value = '';
    const resp = await httpRequestWrapper(
      cogUrl,
      JSON.stringify({
        language: domData.language,
        text: txt
      }),
      [
        {
          name: 'Content-Type',
          value: 'application/json'
        }
      ]
    );
    if (resp) {
      addCommentToPreviousGrid(txt, domData.language, JSON.parse(resp).score);
    }
  }
}
function addCommentToPreviousGrid(comment, language, score) {
  if (!domData.noData.classList.contains('d-none')) {
    domData.noData.classList.add('d-none');
  }
  let rounded = Math.round(score * 100);
  let color = 'success';
  let lang;
  switch (language) {
    case 'en':
      lang = 'English';
      break;
    case 'es':
      lang = 'Spanish';
      break;
    case 'fr':
      lang = 'French';
      break;
    case 'it':
      lang = 'Italian';
      break;
    case 'de':
      lang = 'German';
      break;
    case 'el':
      lang = 'Greek';
      break;
    case 'pt-PT':
      lang = 'Portugese';
      break;
  }
  if (rounded < 33) {
    color = 'danger';
  } else if (rounded < 66) {
    color = 'warning';
  }
  domData.comments.innerHTML = `${domData.commentTemplate
    .replace('{{comment}}', comment)
    .replace('{{score}}', `${rounded}`)
    .replace('{{language}}', `${lang}`)
    .replace('{{color}}', `${color}`)}${domData.comments.innerHTML}`;
}
(async () => {
  const resp = await httpRequestWrapper(cogUrl);
  const previousData = JSON.parse(resp);
  previousData.forEach(x => {
    addCommentToPreviousGrid(x.text, x.language, x.score);
  });
})();
