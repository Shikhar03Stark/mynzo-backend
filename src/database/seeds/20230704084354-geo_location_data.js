'use strict';
const CSVReadableStream = require('csv-reader');
const AutoDetectDecoderStream = require('autodetect-decoder-stream');
const path = require('path');
const fs = require('fs');
const uuid = require('uuid');
const {
  UUID
} = require('sequelize/lib/data-types');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */

    const countries = await parseCountriesAndMappings();

    const geolocationCountries = countries.data.map(country => Object.assign({}, {
      id: countries.idMapping.get(country.id),
      value: country.name.toUpperCase(),
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    }));
    await queryInterface.bulkInsert('country', geolocationCountries);

    const states = await parseStatesAndMappings();

    const geolocationStates = states.data.map(state => Object.assign({}, {
      id: states.idMapping.get(state.id),
      value: state.name.toUpperCase(),
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      country_id: countries.idMapping.get(state.country_id),
    }));

    await queryInterface.bulkInsert('state', geolocationStates);

    const cities = await parseCitiesAndMappings();

    const geolocationCities = cities.data.map(city => Object.assign({}, {
      id: cities.idMapping.get(city.id),
      value: city.name.toUpperCase(),
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      state_id: states.idMapping.get(city.state_id),
    }));

    await queryInterface.bulkInsert('city', geolocationCities);
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */

    await queryInterface.bulkDelete('countries', null, {});
    await queryInterface.bulkDelete('states', null, {});
    await queryInterface.bulkDelete('cities', null, {});

  }
};

const parseCountriesAndMappings = () => {
  const countriesFilePath = path.resolve('data', 'countries.csv');
  const inputStream = fs.createReadStream(countriesFilePath)
    .pipe(new AutoDetectDecoderStream({
      defaultEncoding: 'utf8'
    }));
  const parser = new CSVReadableStream({
    asObject: true,
    trim: true
  });

  let countries = [];
  let countryIdToUUID = new Map();

  return new Promise((resolve, reject) => {
    inputStream
      .pipe(parser)
      .on('data', (row) => {
        // console.dir(row)
        const v4 = uuid.v4();
        countryIdToUUID.set(row.id, v4);
        countries.push(row);
      })
      .on('close', () => {

        console.log(`Total ${countries.length} countries`);

        resolve({
          data: countries,
          idMapping: countryIdToUUID
        });
      });
  });
}


const parseStatesAndMappings = () => {
  const statesFilePath = path.resolve('data', 'states.csv');
  const inputStream = fs.createReadStream(statesFilePath)
    .pipe(new AutoDetectDecoderStream({
      defaultEncoding: 'utf8'
    }));
  const parser = new CSVReadableStream({
    asObject: true,
    trim: true
  });

  let states = [];
  let stateIdToUUID = new Map();

  return new Promise((resolve, reject) => {
    inputStream
      .pipe(parser)
      .on('data', (row) => {
        // console.dir(row)
        const v4 = uuid.v4();
        stateIdToUUID.set(row.id, v4);
        states.push(row);
      })
      .on('close', () => {

        console.log(`Total ${states.length} states`);

        resolve({
          data: states,
          idMapping: stateIdToUUID
        });
      });
  });
}

const parseCitiesAndMappings = () => {
  const citiesFilePath = path.resolve('data', 'cities.csv');
  const inputStream = fs.createReadStream(citiesFilePath)
    .pipe(new AutoDetectDecoderStream({
      defaultEncoding: 'utf8'
    }));
  const parser = new CSVReadableStream({
    asObject: true,
    trim: true
  });

  let cities = [];
  let cityIdToUUID = new Map();

  return new Promise((resolve, reject) => {
    inputStream
      .pipe(parser)
      .on('data', (row) => {
        // console.dir(row)
        const v4 = uuid.v4();
        cityIdToUUID.set(row.id, v4);
        cities.push(row);
      })
      .on('close', () => {

        console.log(`Total ${cities.length} citites`);

        resolve({
          data: cities,
          idMapping: cityIdToUUID
        });
      });
  });
}