const baseUrl = 'http://oscstudent.valenciacollege.edu/imartinez51/';
let folderTemplate;

// PHP API call to get list of folders and files from folders.php
async function getFolder(folderName) {
  let resp = await httpRequestWrapper(
    `${baseUrl}folders.php?fldr=${folderName}`
  );
  try {
    return JSON.parse(resp);
  } catch (x) {
    return null;
  }
}
// Get's the file content from my files.php API
async function getFile(fileName) {
  return await httpRequestWrapper(`${baseUrl}files.php?file=${fileName}`);
}

//Orchestration method to get data from API and display it.
async function getAndDisplayFolder(dirName) {
  let displayDirName = normalizeDirectory(dirName);
  let jsDirName = formatForJs(dirName);

  let arr = await getFolder(dirName);
  if (arr) {
    let rows = arr.filter(t => t !== '.' && t !== '..').map(t => {
      return folderTemplate
        .replace(/{{2}displayName}{2}/gi, t)
        .replace(/{{2}fullPath}{2}/gi, formatForJs(`${dirName}\\${t}`));
    });
    const parentPath = normalizeDirectory(
      dirName.replace(/[a-z.\s_0-9$\(\)~\-]*\\?$/i, '')
    );
    rows.unshift(
      folderTemplate
        .replace(/{{2}displayName}{2}/gi, trimFolderName(displayDirName))
        .replace(/{{2}fullPath}{2}/gi, formatForJs(`${parentPath}\\`))
    );
    var templatedData = rows.join('');
    document.getElementById('file-folder-name').innerHTML = templatedData;
  } else {
    document.getElementById('fileContents').value = await getFile(dirName);
  }
}

// This function is required to remove extra \ placed for javascript compatibility
function normalizeDirectory(s) {
  return s.replace(/\\\\\\/g, '\\').replace(/\\\\/g, '\\');
}

function formatForJs(s) {
  return normalizeDirectory(s)
    .replace(/\\/g, '\\\\')
    .replace(/\\{1,2}$/, '');
}

// Making sure folder names are not too long when displayed
function trimFolderName(s) {
  const i = 20;
  return s.length > i ? `...${s.substring(s.length - i)}` : s;
}

// Initializer
(async () => {
  folderTemplate = document
    .getElementById('file-folder-name')
    .innerHTML.replace(/\s{2,}/gi, '');
  await getAndDisplayFolder('c:\\');
})();
