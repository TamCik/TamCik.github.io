const dbPromised = idb.open("football-news", 1, (upgradeDb) => {
    const leaguesObjectStore = upgradeDb.createObjectStore("leagues", {
        keyPath: "id"
    });
    leaguesObjectStore.createIndex("teamLeagues", "teamLeagues", {
        unique: false
    });
});

function saveForLater(league) {
    dbPromised
        .then(db => {
            const tx = db.transaction("leagues", "readwrite");
            const store = tx.objectStore("leagues");
            console.log(league);
            store.put(league);
            return tx.complete;
        })
        .then(() => {
            console.log("Data berhasil di simpan.");
        });
}

function getAll() {
    return new Promise((resolve, reject) => {
        dbPromised
            .then(db => {
                const tx = db.transaction("leagues", "readonly");
                const store = tx.objectStore("leagues");
                return store.getAll();
            })
            .then(leagues => {
                resolve(leagues);
            });
    });
}

function getById(id) {
    return new Promise((resolve, reject) => {
        dbPromised
            .then(db => {
                const tx = db.transaction("leagues", "readonly");
                const store = tx.objectStore("leagues");
                return store.get(id);
            })
            .then(teams => {
                resolve(teams);
            });
    });
}

function deleteTeam(id) {
    dbPromised
        .then(db => {
            const tx = db.transaction("leagues", `readwrite`);
            tx.objectStore("leagues").delete(id);
            return tx.complete;
        }).then(() => {
            console.log("Item dihapus.");
            M.toast({ html: 'Item sudah dihapus, Silakan Reload Halaman yah :)' });
        })

}