const api = `https://gist.githubusercontent.com/VasilyMur
/43ef6df83bba694f871f11a16ed7556d/raw/
b6edff674e35452d6c57ec64177a558f7adb432e/moscowSubway.json`;

const stations = [];
fetch(api)
  .then((res) => res.json())
  .then((data) => {
    data.forEach((line) => {
      stations.push(...line.stations);
    });
  });

function getOptions(word, stations) {
  return stations.filter((station) => {
    // определяем совпадвет ли что мы вбили в Input внутри массива
    const regex = new RegExp(word, "gi"); // g - все совпаления в строке, i - режим игнорирования регистра

    return station.name.match(regex);
  });
}

const searchInput = document.querySelector(".search");
const searchOptions = document.querySelector(".options");

function displayOptions() {
  console.log("thisValue >>>", this.value);

  const options = getOptions(this.value, stations);

  const html = options
    .map((station) => {
      const regex = new RegExp(this.value, "gi");
      const stationName = station.name.replace(
        regex,
        `<span class="highlight">${this.value}</span >`
      );
      return `<li><span>${stationName}</span></li>`;
    })
    .slice(0, 5)
    .join("");

  searchOptions.innerHTML = html;
}

searchInput.addEventListener("change", displayOptions);
searchInput.addEventListener("keyup", displayOptions);
