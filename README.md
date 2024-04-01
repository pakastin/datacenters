# Data center locations
## Install
```bash
npm i @pakastin/datacenters
```
## Usage
```js
import { cloudflare, hetzner, upcloud } from '@pakastin/datacenters';

console.log(cloudflare['HEL']);
–> 
{
  "city": "Helsinki",
  "country": "Finland",
  "lat": 60.1674881,
  "lng": 24.9427473
}
```
