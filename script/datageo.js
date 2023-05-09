const restrooms = [
  {
    id: 1,
    name: 'Central Park Restroom',
    openingHours: '8:00am-10:00pm',
    description: 'A clean public restroom located in Central Park.',
    address: 'Central Park, New York, NY, USA',
    placeType: 'Park',
    latitude: '40.7829',
    longitude: '-73.9654',
    capacity: 10,
    isLocked: false,
    code: '1234',
    isBusy: false,
    lastUpdate: new Date('2022-01-01T10:00:00.000Z'),
    createdAt: new Date('2022-01-01T10:00:00.000Z')
  },
  {
    id: 2,
    name: 'Starbucks Restroom',
    openingHours: '7:00am-9:00pm',
    description: 'A restroom located inside a Starbucks coffee shop.',
    address: '123 Main St, Seattle, WA, USA',
    placeType: 'Coffee Shop',
    latitude: '47.6062',
    longitude: '-122.3321',
    capacity: 5,
    isLocked: true,
    code: '4321',
    isBusy: true,
    lastUpdate: new Date('2022-01-02T10:00:00.000Z'),
    createdAt: new Date('2022-01-02T10:00:00.000Z')
  },
  {
    id: 3,
    name: 'Mall Restroom',
    openingHours: '10:00am-8:00pm',
    description: 'A public restroom located inside a shopping mall.',
    address: '456 Oak St, Los Angeles, CA, USA',
    placeType: 'Shopping Mall',
    latitude: '34.0522',
    longitude: '-118.2437',
    capacity: 15,
    isLocked: false,
    code: '2468',
    isBusy: false,
    lastUpdate: new Date('2022-01-03T10:00:00.000Z'),
    createdAt: new Date('2022-01-03T10:00:00.000Z')
  },
  {
    id: 4,
    name: 'Airport Restroom',
    openingHours: '24/7',
    description: 'A restroom located inside an airport.',
    address: '789 International Blvd, Atlanta, GA, USA',
    placeType: 'Airport',
    latitude: '33.6367',
    longitude: '-84.4281',
    capacity: 20,
    isLocked: true,
    code: '1357',
    isBusy: true,
    lastUpdate: new Date('2022-01-04T10:00:00.000Z'),
    createdAt: new Date('2022-01-04T10:00:00.000Z')
  },
  {
    id: 5,
    name: 'Hotel Restroom',
    openingHours: '24/7',
    description: 'A clean restroom located inside a hotel.',
    address: '987 Broadway, San Francisco, CA, USA',
    placeType: 'Hotel',
    latitude: '37.7749',
    longitude: '-122.4194',
    capacity: 8,
    isLocked: false,
    code: '8642',
    isBusy: false,
    lastUpdate: new Date('2022-01-05T10:00:00.000Z'),
    createdAt: new Date('2022-01-04T10:00:00.000Z')
  }
]

const json2csv = require('json2csv').parse;
const fs = require('fs');

const fields = ['id', 'name', 'openingHours', 'description', 'address', 'placeType', 'latitude', 'longitude', 'capacity', 'isLocked', 'code', 'isBusy', 'lastUpdate', 'createdAt'];
const csv = json2csv(restrooms, { fields });

fs.writeFile('restrooms.csv', csv, (err) => {
  if (err) throw err;
  console.log('CSV file saved.');
});