const distances = {
  Toshkent: {
    Andijon: 350,
    Buxoro: 580,
    Guliston: 115,
    Jizzax: 200,
    Qarshi: 430,
    Navoiy: 480,
    Namangan: 290,
    Nukus: 1150,
    Samarqand: 300,
    Termiz: 680,
    "Farg'ona": 310,
    Urganch: 1000,
  },
  Andijon: {
    Toshkent: 350,
    Buxoro: 860,
    Guliston: 395,
    Jizzax: 525,
    Qarshi: 750,
    Navoiy: 765,
    Namangan: 61,
    Nukus: 1400,
    Samarqand: 590,
    Termiz: 970,
    "Farg'ona": 71,
    Urganch: 1300,
  },
  Buxoro: {
    Toshkent: 580,
    Andijon: 860,
    Guliston: 470,
    Jizzax: 363,
    Qarshi: 167,
    Navoiy: 120,
    Namangan: 800,
    Nukus: 550,
    Samarqand: 265,
    Termiz: 440,
    "Farg'ona": 820,
    Urganch: 440,
  },
  Guliston: {
    Toshkent: 115,
    Andijon: 395,
    Buxoro: 470,
    Jizzax: 110,
    Qarshi: 360,
    Navoiy: 375,
    Namangan: 345,
    Nukus: 1005,
    Samarqand: 210,
    Termiz: 577,
    "Farg'ona": 370,
    Urganch: 890,
  },
  Jizzax: {
    Toshkent: 200,
    Andijon: 525,
    Buxoro: 363,
    Guliston: 110,
    Qarshi: 250,
    Navoiy: 265,
    Namangan: 450,
    Nukus: 900,
    Samarqand: 100,
    Termiz: 467,
    "Farg'ona": 470,
    Urganch: 785,
  },
  Qarshi: {
    Toshkent: 430,
    Andijon: 750,
    Buxoro: 167,
    Guliston: 360,
    Jizzax: 250,
    Navoiy: 250,
    Namangan: 700,
    Nukus: 710,
    Samarqand: 150,
    Termiz: 273,
    "Farg'ona": 725,
    Urganch: 600,
  },
  Navoiy: {
    Toshkent: 480,
    Andijon: 765,
    Buxoro: 120,
    Guliston: 375,
    Jizzax: 265,
    Qarshi: 250,
    Namangan: 705,
    Nukus: 645,
    Samarqand: 155,
    Termiz: 495,
    "Farg'ona": 730,
    Urganch: 531,
  },
  Namangan: {
    Toshkent: 290,
    Andijon: 61,
    Buxoro: 800,
    Guliston: 345,
    Jizzax: 450,
    Qarshi: 700,
    Navoiy: 705,
    Nukus: 1300,
    Samarqand: 530,
    Termiz: 905,
    "Farg'ona": 80,
    Urganch: 1225,
  },
  Nukus: {
    Toshkent: 1150,
    Andijon: 1400,
    Buxoro: 550,
    Guliston: 1005,
    Jizzax: 900,
    Qarshi: 710,
    Navoiy: 645,
    Namangan: 1300,
    Samarqand: 790,
    Termiz: 985,
    "Farg'ona": 1300,
    Urganch: 136,
  },
  Samarqand: {
    Toshkent: 300,
    Andijon: 590,
    Buxoro: 265,
    Guliston: 210,
    Jizzax: 100,
    Qarshi: 150,
    Navoiy: 155,
    Namangan: 530,
    Nukus: 790,
    Termiz: 378,
    "Farg'ona": 550,
    Urganch: 680,
  },
  Termiz: {
    Toshkent: 680,
    Andijon: 970,
    Buxoro: 440,
    Guliston: 577,
    Jizzax: 467,
    Qarshi: 273,
    Navoiy: 495,
    Namangan: 905,
    Nukus: 985,
    Samarqand: 378,
    "Farg'ona": 945,
    Urganch: 870,
  },
  "Farg'ona": {
    Toshkent: 310,
    Andijon: 71,
    Buxoro: 820,
    Guliston: 370,
    Jizzax: 470,
    Qarshi: 725,
    Navoiy: 730,
    Namangan: 80,
    Nukus: 1300,
    Samarqand: 550,
    Termiz: 945,
    Urganch: 1200,
  },
  Urganch: {
    Toshkent: 1000,
    Andijon: 1300,
    Buxoro: 440,
    Guliston: 890,
    Jizzax: 785,
    Qarshi: 600,
    Navoiy: 600,
    Namangan: 1225,
    Nukus: 136,
    Samarqand: 680,
    Termiz: 870,
    "Farg'ona": 1200,
  },
};
function getDistance(start, end) {
  if (distances[start] && distances[start][end] !== undefined) {
    return distances[start][end];
  } else {
    return `Distance between ${start} and ${end} is not available.`;
  }
}

console.log(getDistance("Toshkent", "Urganch"));