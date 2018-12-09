let domData = {
  commentTemplate: document.getElementById('commentTemplate').innerHTML.trim(),
  comments: document.getElementById('comments'),
  noData: document.getElementById('noData'),
  currentLanguage: 'en',
  cmbLanguages: document.getElementById('cmbLanguage'),
  comment: document.getElementById('txtComment')
};
const cogUrl =
  'https://ikemtz-cognitiveservices.azurewebsites.net/api/comments';

let languages = {
  en: 'English',
  es: 'Spanish',
  fr: 'French',
  it: 'Italian',
  de: 'German',
  el: 'Greek',
  'pt-PT': 'Portugese'
};

// Validates and submits a comment to cognitive service
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
        language: domData.currentLanguage,
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
      addCommentToPreviousGrid(
        txt,
        domData.currentLanguage,
        JSON.parse(resp).score
      );
    }
  }
}

//Adds an individual comment to grid
function addCommentToPreviousGrid(comment, language, score) {
  if (!domData.noData.classList.contains('d-none')) {
    domData.noData.classList.add('d-none');
  }
  let rounded = Math.round(score * 100);
  let color = 'success';
  let lang = languages[language];

  if (rounded < 33) {
    color = 'danger';
  } else if (rounded < 66) {
    color = 'warning';
  }
  domData.comments.innerHTML = `${domData.commentTemplate
    .replace(/{{[\s]?Comment[\s]?}}/i, comment)
    .replace(/{{[\s]?score[\s]?}}/i, `${rounded}`)
    .replace(/{{[\s]?language[\s]?}}/i, `${lang}`)
    .replace(/{{[\s]?color[\s]?}}/i, `${color}`)}${domData.comments.innerHTML}`;
}

//Adding list of lanugages declared above as options in cmbLangues.
function addLanguagesToDropDown() {
  for (const lang in languages) {
    const opt = document.createElement('option');
    opt.text = languages[lang];
    opt.value = lang;
    domData.cmbLanguages.add(opt);
  }
}

(async () => {
  const resp = await httpRequestWrapper(cogUrl);
  const previousData = JSON.parse(resp);
  addLanguagesToDropDown();
  previousData.forEach(x => {
    addCommentToPreviousGrid(x.text, x.language, x.score);
  });
})();
