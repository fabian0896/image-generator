require('dotenv').config();
const { initializeApp, cert } = require('firebase-admin/app');
const { getFirestore } = require('firebase-admin/firestore');
const algoliasearch = require('algoliasearch');

const serviceAccount = require('../serviceAccountKey.json');
const ALGOLIA_API_KEY = process.env.ALGOLIA_API_KEY;
const ALGOLIA_APPLICATION_ID = process.env.ALGOLIA_APPLICATION_ID;

initializeApp({
  credential: cert(serviceAccount),
  databaseURL: 'https://image-generator-e7858-default-rtdb.firebaseio.com'
});


const db = getFirestore();

const client = algoliasearch(ALGOLIA_APPLICATION_ID, ALGOLIA_API_KEY);
const index = client.initIndex('images');

(async () => {
  console.log('Buscando las imagenes en la base de datos...');
  const dbResponse = await db.collection('images').get();
  const images = dbResponse.docs.map((image) => image.data());

  const totalImages = images.length;
  console.log(`Se encontraron ${totalImages} imagenes en la base de datos`);


  console.log('Empieza la configuración de Algolia...')
  await index.setSettings({
    searchableAttributes: [
      'productName',
      'category',
      'selltype',
      'currency',
      'ref',
    ],
    attributesForFaceting: [
      'category',
      'selltype',
      'currency',
    ]
  });
  console.log('Se configuró Algolia correctamente');


  const imagesFormattedForAlgolia = images.map((image) => ({
    objectID: image.id,
    productName: image.productName,
    category: image.category,
    selltype: image.selltype,
    currency: image.price.currency,
    ref: image.ref,
  }));

  let counter = 0;
  for (let imageObject of imagesFormattedForAlgolia) {
    console.clear();
    console.log(`Progreso ${counter}/${totalImages}`);
    await index.saveObject(imageObject);
    await delay(150);
    counter += 1;
  }
  console.log('Sincronización finalizada con exito!!');
})();

function delay(time) {
  return new Promise((resolve) => {
    setTimeout(resolve, time);
  });
}