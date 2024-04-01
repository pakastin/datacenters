const { writeFile } = require('fs/promises');

(async () => {
  // from https://upcloud.com/data-centres
  const datacenters = {
    SYD: {
      city: 'Sydney',
      country: 'Australia'
    },
    FRA: {
      city: 'Frankfurt',
      country: 'Germany'
    },
    HEL: {
      city: 'Helsinki',
      country: 'Finland'
    },
    MAD: {
      city: 'Madrid',
      country: 'Spain'
    },
    AMS: {
      city: 'Amsterdam',
      country: 'Netherlands'
    },
    WAW: {
      city: 'Warsaw',
      country: 'Poland'
    },
    STO: {
      city: 'Stockholm',
      country: 'Sweden'
    },
    SIN: {
      city: 'Singapore',
      country: 'Singapore'
    },
    LON: {
      city: 'London',
      country: 'UK'
    },
    CHI: {
      city: 'Chicago',
      country: 'USA'
    },
    NYC: {
      city: 'New York',
      country: 'USA'
    },
    SJO: {
      city: 'San Jose',
      country: 'USA'
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

  await writeFile('data/upcloud.js', `export const upcloud = ${JSON.stringify(datacenters, false, 2)}`, 'utf8');
})();
