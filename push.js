var webPush = require('web-push');

const vapidKeys = {
    "publicKey": "BK-gFob_NWUpoRlZtVTEfz0U4nn_-HE3vR3_KjSmGqGl_cvRkSYzPwC3ZKZVyoX9RukwBtLB9I4cv28ex1y17OM",
    "privateKey": "RV_sTREK2XsiSBasnVl-XBmeEr2l1xxaYYz5HlWZhe4"
};


webPush.setVapidDetails(
    'mailto:tamcik27@gmail.com',
    vapidKeys.publicKey,
    vapidKeys.privateKey
)
var pushSubscription = {
    "endpoint": "https://fcm.googleapis.com/fcm/send/eOPaqXHG5Xs:APA91bGBIXpXJGl3gVlWUmuozeBBQHVaKzLOwCD-4B9PanQ_lLK_xEK8UBbrFzvryAdA62ePcG07I6jW59qMai2WQUCJhV_9nnxcl1ylU5CLD2QhNwa4bWrvzchpRXvHyWzXftmVVgBU",
    "keys": {
        "p256dh": "BDyWtpi7eydywkdIYeZISS2BHqo3ZpDYwi5sqC654qwxzjMojlVI7EjkFXKEIsHZ96m8+m2TmU2jDhKohIbT/tk=",
        "auth": "GKa6F9wNhu41LOl9dbNmfw=="
    }
};
var payload = 'Selamat! Aplikasi Anda sudah dapat menerima push notifikasi!';

var options = {
    gcmAPIKey: '248273847727',
    TTL: 60
};
webPush.sendNotification(
    pushSubscription,
    payload,
    options
);