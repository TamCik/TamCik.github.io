const API_KEY = "67ad2e84fb0b465db7974e63b5def4d1";
const base_url = "https://api.football-data.org/v2/";
const idLeague = 2021;

// Blok kode yang akan di panggil jika fetch berhasil
function status(response) {
    if (response.status !== 200) {
        console.log(`Error :  ${response.status}`);
        // Method reject() akan membuat blok catch terpanggil
        return Promise.reject(new Error(response.statusText));
    } else {
        // Mengubah suatu objek menjadi Promise agar bisa "di-then-kan"
        return Promise.resolve(response);
    }
}

// Blok kode untuk memparsing json menjadi array JavaScript
function json(response) {
    return response.json();
}

// Blok kode untuk meng-handle kesalahan di blok catch
function error(error) {
    // Parameter error berasal dari Promise.reject()
    console.log(`Error : ${error}`);
}

// Blok kode untuk melakukan request data json (Teams)
function getTeams() {
    fetch(`${base_url}competitions/${idLeague}/teams`, {
            headers: {
                "X-Auth-Token": API_KEY
            }
        })
        .then(status)
        .then(json)
        .then(data => {
            // Objek/array JavaScript dari response.json() masuk lewat data.

            // Menyusun komponen card informasi secara dinamis

            let teamsHTML = "";
            data.teams.forEach(teams => {
                //let imageTeams = teams.crestUrl.replace(/^http:\/\//i, 'https://');
                teamsHTML += `
                <div class="card">
                    <div class="card-content">
                      <span class="card-title truncate">${teams.name}</span>
                      <p>${teams.venue}</p>
                      <p><a href="./detail.html?id=${teams.id}">Detail</a></p>
                    </div>
                </div>
            `;
            });
            // Sisipkan komponen card ke dalam elemen dengan id #content
            document.getElementById("teams").innerHTML = teamsHTML;
        })
        .catch(error);
}

// Blok kode untuk melakukan request data json (Match)
function getMatch() {
    if ("caches" in window) {
        caches.match(`${base_url}competitions/${idLeague}/matches`).then(response => {
            if (response) {
                response.json().then(data => {
                    let matchesHTML = "";
                    data.matches.forEach(matches => {
                        matchesHTML += `
                        <div class="card">
                        <table class="striped responsive-table">
                          <thead>
                           <tr>
                            <th>ID</th>
                            <th>Match Team Name</th>
                            <th>Stage</th>
                            <th>Date</th>
                            <th>Status</th>
                           </tr>
                          </thead>
                          <tbody>
                           <tr>
                            <td>${matches.id}</td>
                            <td>${matches.homeTeam.name}</td>
                            <td>${matches.stage}</td>
                            <td>${matches.utcDate}</td>
                            <td>${matches.status}</td>  
                           </tr>
                          </tbody>
                        </table>
                        </div>
              `;
                    });
                    // Sisipkan komponen card ke dalam elemen dengan id #content
                    document.getElementById("matches").innerHTML = matchesHTML;
                });
            }
        });
    }

    fetch(`${base_url}competitions/${idLeague}/matches`, {
            headers: {
                "X-Auth-Token": API_KEY
            }
        })
        .then(status)
        .then(json)
        .then(data => {
            // Objek/array JavaScript dari response.json() masuk lewat data.

            // Menyusun komponen card informasi secara dinamis

            // let articlesHTML = JSON.stringify(data, undefined, 2);
            let matchesHTML = "";
            data.matches.forEach(matches => {
                matchesHTML += `
                <div class="card">
                <table class="striped responsive-table">
                  <thead>
                   <tr>
                    <th>ID</th>
                    <th>Match Team Name</th>
                    <th>Stage</th>
                    <th>Date</th>
                    <th>Status</th>
                   </tr>
                  </thead>
                  <tbody>
                   <tr>
                    <td>${matches.id}</td>
                    <td>${matches.homeTeam.name}</td>
                    <td>${matches.stage}</td>
                    <td>${matches.utcDate}</td>
                    <td>${matches.status}</td>  
                   </tr>
                  </tbody>
                </table>
                </div>
          `;
            });
            // Sisipkan komponen card ke dalam elemen dengan id #content
            document.getElementById("matches").innerHTML = matchesHTML;
        })
        .catch(error);
}

function getTeamById() {
    return new Promise((resolve, reject) => {
        // Ambil nilai query parameter (?id=)
        let urlParams = new URLSearchParams(window.location.search);
        let idParam = urlParams.get("id");

        if ("caches" in window) {
            caches.match(`${base_url}teams/${idParam}`).then(response => {
                if (response) {
                    response.json().then(data => {
                        let detailHTML = `
            <div class="card">
              <div class="card-content">
                <span class="card-title">${data.name}</span>
                <br>
                <span class="card-title">${data.address}</span>
                <br>
                <span class="card-title">${data.phone}</span>
                <br>
                <span class="card-title">${data.email}</span>
              </div>
            </div>
          `;
                        // Sisipkan komponen card ke dalam elemen dengan id #content
                        document.getElementById("body-content").innerHTML = detailHTML;

                        // Kirim objek data hasil parsing json agar bisa disimpan ke indexed db
                        resolve(data);
                    });
                }
            });
        }

        fetch(`${base_url}teams/${idParam}`, {
                headers: {
                    "X-Auth-Token": API_KEY
                }
            })
            .then(status)
            .then(json)
            .then(data => {
                // Objek JavaScript dari response.json() masuk lewat variabel data.
                // Menyusun komponen card informasi secara dinamis
                let detailHTML = `
          <div class="card">
            <div class="card-content">
              <span class="card-title">${data.name}</span>
              <br>
              <span class="card-title">${data.address}</span>
              <br>
              <span class="card-title">${data.phone}</span>
              <br>
              <span class="card-title">${data.email}</span>
            </div>
          </div>
        `;
                // Sisipkan komponen card ke dalam elemen dengan id #content
                document.getElementById("body-content").innerHTML = detailHTML;
                // Kirim objek data hasil parsing json agar bisa disimpan ke indexed db
                resolve(data);
            });
    });
}

function getFavoritTeams() {
    getAll().then(teams => {
        console.log(teams);
        // Menyusun komponen card artikel secara dinamis
        let detailHTML = "";
        teams.forEach(team => {
            detailHTML += `
                  <div class="card">
                    <div class="card-content">
                      <p>${team.name}</p>
                      <p>${team.address}</p>
                      <p>${team.phone}</p>
                      <p>${team.email}</p>
                      <a id="${team.id}" class="btn-small waves-effect waves-light red hapus">Delete</a>
                    </div>
                  </div>
                `;
        });
        // Sisipkan komponen card ke dalam elemen dengan id #content
        document.getElementById("body-content").innerHTML = detailHTML;

        // Logic untuk menghapus Informasi sesuai dengan Id
        let hapus = document.querySelectorAll(".hapus");
        for (let button of hapus) {
            button.addEventListener("click", event => {
                let id = event.target.id;
                deleteTeam(parseInt(id));
            })
        }
    });
}

function getSavedTeamById() {
    let urlParams = new URLSearchParams(window.location.search);
    let idParam = urlParams.get("id");

    getById(idParam).then(team => {
        detailHTML = '';
        let detailHTML = `
    <div class="card">
      <div class="card-content">
        <span class="card-title">${team.name}</span>
        <br>
        <span class="card-title">${team.address}</span>
        <br>
        <span class="card-title">${team.phone}</span>
        <br>
        <span class="card-title">${team.email}</span>
      </div>
    </div>
  `;
        // Sisipkan komponen card ke dalam elemen dengan id #content
        document.getElementById("body-content").innerHTML = detailHTML;
    });
}