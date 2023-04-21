var has_been_clicked = 0;
var editP = document.getElementById("editableP");
var savebtn = document.getElementById("save");

editP.addEventListener("click", cleartest);

function clearit() {
  editP.innerText = "";
  has_been_clicked = has_been_clicked + 1;
  editP.removeEventListener("click", cleartest);
}

function cleartest() {
  if (has_been_clicked === 0) {
    clearit();
  }
}

savebtn.addEventListener("click", save_file);

function save_file() {
  // get the text from the editor
  var text = document.getElementById("editableP").innerHTML;
  // get title
  var title = document.getElementById("texttitle").innerHTML;
  // if title empty, create placeholder
  if (title === "") {
    title = "Untitled";
  }
  // create a blob of the text
  var blob = new Blob([text], { type: "text/rtf" });
  // create a link to the blob
  var url = URL.createObjectURL(blob);
  // create a temporary link
  var tempLink = document.createElement("a");
  tempLink.href = url;
  tempLink.setAttribute("download", `${title}.rtf`);
  tempLink.click();
}

let openbtn = document.getElementById("open");
let fileHandle;
openbtn.addEventListener("click", async () => {
  [fileHandle] = await window.showOpenFilePicker();
  const file = await fileHandle.getFile();
  const contents = await file.text();
  editP.innerHTML = contents;
});

async function getNewFileHandle() {
  const options = {
    types: [
      {
        description: "Text Files",
        accept: {
          "text/rtf": [".rtf", ".txt"],
        },
      },
    ],
  };
  const handle = await window.showSaveFilePicker(options);
  return handle;
}

var titlebtn = document.getElementById("title");

titlebtn.addEventListener("click", titlemenu);

function titlemenu() {
  document.getElementById("myDropdown").classList.toggle("show");
  document.getElementById("texttitle").classList.toggle("show");
}
