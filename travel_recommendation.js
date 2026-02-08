
function apiFinder() {
  const term = document.getElementById('term').value.toLowerCase();
  const report = document.getElementById('report');
  report.innerHTML = '';

  fetch('travel_recommendation_api.json')
    .then(response => response.json())
    .then(json => {
      console.error('API Searching...');
      const data = [...json.countries, ...json.temples, ...json.beaches];
      const finder = data.find(item => item.name.toLowerCase().includes(term.toLowerCase()));

      if (finder) {
        let content = '';
        finder.cities.forEach(item => {
          content+=`
          <section class="card col-12 col-md-4 col-lg-3">
            <article class="card-body">
              <h3 class="mb-2 text-center">${item.name}</h3>
              <div class="text-center">
              <img src="img/${item.imageUrl}" alt="${item.name}" width="250" height="150"/>
              </div>
              <p class="my-3">${item.description}</p>
            </article>
          </section>`
        });
        report.innerHTML = content;
      } else {
        console.error('API Search KO => 0 results');
        report.innerHTML = `<code>No results search for <strong>${term}</strong> term!</code>`;
      }
    })
    .catch(error => {
      console.error('API Error:', error);
      report.innerHTML = `<code>API data Error on retrieve data!: ${error}</code>`;
    });
}
document.getElementById('find').addEventListener('click', apiFinder);

function clsForm() {
  document.getElementById("term").value = "";
}
document.getElementById('clear').addEventListener('click', clsForm);
