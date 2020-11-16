document.addEventListener("DOMContentLoaded", () => {
    let urlParams = new URLSearchParams(window.location.search);
    let isFromSaved = urlParams.get("saved");

    let save = document.getElementById("save");

    if (isFromSaved) {
        // Hide fab jika dimuat dari indexed db
        save.style.display = 'none';

        // ambil artikel lalu tampilkan
        getSavedTeamById();
    } else {
        var item = getTeamById();
    }

    save.onclick = () => {
        console.log("Tombol FAB di klik.");
        item.then(leagues => {
            saveForLater(leagues);
        });
    };
});