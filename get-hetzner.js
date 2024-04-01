const { writeFile } = require('fs/promises');

(async () => {
  // from https://www.hetzner.com/unternehmen/rechenzentrum/
  const datacenters = {
    NBG: {
      city: 'Nuremberg',
      country: 'Germany'
    },
    FSN: {
      city: 'Falkenstein',
      country: 'Germany'
    },
    HEL: {
      city: 'Helsinki',
      country: 'Finland'
    },
    ASH: {
      city: 'Ashburn',
      country: 'Virginia, USA'
    },
    HIL: {
      city: 'Hillsboro',
      country: 'Oregon, USA'
    }
  };

  for (const code in datacenters) {
    const datacenter = datacenters[code];
    const { city, country } = datacenter;

    console.log(`${city}, ${country}`);

    const phrase = encodeURIComponent(`${city},${country}`);
    const url = `https://flyk.com/api/search/${phrase}`;
    const search = await fetch(url).then(res => res.json());
    const { lat, lon: lng } = search[0];

    datacenter.lat = Number(lat);
    datacenter.lng = Number(lng);
  }

  await writeFile('data/hetzner.json', JSON.stringify(datacenters, false, 2), 'utf8');
})();
