let textLine =
  "there have been the greatest changes in the life surroundings and conditions of human being during the present century";

let searchLine = "greatest";

console.log(markIt(textLine, searchLine));

function markIt(text, search) {
  let pointer = 0;
  let outputLine = "";
  while (pointer < text.length) {
    let line = text;
    let test = line.slice(pointer, search.length + pointer);
    if (test === search) {
      outputLine += `<mark>${search}</mark>`;
    } else {
      outputLine += text[pointer];
    }
    pointer++;
  }
  return outputLine;
}
