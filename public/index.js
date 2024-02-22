let input = document.querySelector(".input");
let searchButton = document.querySelector(".input-button");
let searchPhrase = document.querySelector(".search-phrase");
searchButton.addEventListener("click", handleSearch);

document.body.addEventListener("keypress", (event) => {
  if (event.keyCode === 13) handleSearch();
});

async function handleSearch() {
  let searchText = input.value;
  searchPhrase.textContent = searchText;
  let response = await fetch(`http://127.0.0.1:3003/search?text=${searchText}`);
  response = await response.json();
  console.log(response);

  if (response && response.length > 0) {
    document.querySelector(".search-result-number").textContent =
      response.length;
    while (document.querySelector(".results").firstChild) {
      document.querySelector(".results").firstChild.remove();
    }

    response.forEach((line) => addResultInstance(line, searchText));
  }
  input.value = "";
}

function addResultInstance(instance, searchText) {
  let [ticker, companyName, sector, industry, mc, description] = instance;
  const resultTemplate = document.querySelector("#result-template").content;
  const resultElement = resultTemplate.querySelector(".result").cloneNode(true);
  resultElement.querySelector(".result-ticker").textContent = ticker;
  resultElement.querySelector(".result-companyName").textContent = companyName;
  resultElement.querySelector(".result-sector").textContent = sector;
  resultElement.querySelector(".result-industry").textContent = industry;
  resultElement.querySelector(".result-mc").textContent =
    "USD " + goodNumber(mc) + " mn";
  resultElement.querySelector(".result-description").innerHTML = markIt(
    description,
    searchText
  );
  resultElement
    .querySelector(".result-button-save")
    .addEventListener("click", handleSave);
  resultElement
    .querySelector(".result-button-go")
    .addEventListener("click", handleGoToTickerPage);
  resultElement
    .querySelector(".result-button-remove")
    .addEventListener("click", handleRemove);
  document.querySelector(".results").append(resultElement);
}

function clearResults() {
  let toDelete = document.querySelectorAll(".result");
  Array.from(toDelete).forEach((element) => {
    element.remove();
  });
}

async function handleSave(evt) {
  console.log(evt.target);
  let thisResult = evt.target.closest(".result");
  let targetTicker = thisResult.querySelector(".result-ticker").textContent;
  console.log(targetTicker);
}

async function handleGoToTickerPage(evt) {
  console.log(evt.target);
  console.log("going to ticker page");
}

async function handleRemove(evt) {
  console.log(evt.target);
  let thisResult = evt.target.closest(".result").remove();
}

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

function goodNumber(num, factor = "none") {
  num = parseInt(num);

  switch (factor) {
    case "none":
      num = num;
      break;
    case "mn":
      num = Math.round(num / 1000000);
      break;
    case "bn":
      num = Math.round(num / 1000000000);
      break;
  }
  num = num.toFixed(0).toString();

  if (num.length < 4) {
    return num;
  }

  switch (num.length) {
    case 4:
      num = num.substring(0, 1) + " " + num.substring(1, 4);
      break;
    case 5:
      num = num.substring(0, 2) + " " + num.substring(2, 5);
      break;
    case 6:
      num = num.substring(0, 3) + " " + num.substring(3, 6);
      break;
    case 7:
      num =
        num.substring(0, 1) +
        " " +
        num.substring(1, 4) +
        " " +
        num.substring(4, 7);
      break;
    case 8:
      num =
        num.substring(0, 2) +
        " " +
        num.substring(2, 5) +
        " " +
        num.substring(5, 8);
      break;
    case 9:
      num =
        num.substring(0, 3) +
        " " +
        num.substring(3, 6) +
        " " +
        num.substring(6, 9);
      break;
    case 10:
      num =
        num.substring(0, 1) +
        " " +
        num.substring(1, 4) +
        " " +
        num.substring(4, 7) +
        " " +
        num.substring(7, 10);
      break;
    case 11:
      num =
        num.substring(0, 2) +
        " " +
        num.substring(2, 5) +
        " " +
        num.substring(5, 8) +
        " " +
        num.substring(8, 11);
      break;
    case 12:
      num =
        num.substring(0, 3) +
        " " +
        num.substring(3, 6) +
        " " +
        num.substring(6, 9) +
        " " +
        num.substring(9, 12);
      break;
    case 13:
      num =
        num.substring(0, 1) +
        " " +
        num.substring(1, 4) +
        " " +
        num.substring(4, 7) +
        " " +
        num.substring(7, 10) +
        " " +
        num.substring(10, 13);
      break;
    case 14:
      num =
        num.substring(0, 2) +
        " " +
        num.substring(2, 5) +
        " " +
        num.substring(5, 8) +
        " " +
        num.substring(8, 11) +
        " " +
        num.substring(11, 14);
      break;
    case 15:
      num =
        num.substring(0, 3) +
        " " +
        num.substring(3, 6) +
        " " +
        num.substring(6, 9) +
        " " +
        num.substring(9, 12) +
        " " +
        num.substring(12, 15);
      break;
    default:
      num = num;
      break;
  }
  return num;
}
