const mongoose = require('mongoose');
const connectDB = require('./db');
const Campaign = require('./models/Campaign');

const seedData = [
    {
        name: 'Humanitarna pomoć za decu',
        description: 'Kupovina školskog pribora i hrane za ugroženu decu',
        eth_address: '0x5e1C114f9DfCBD12fB8eEae2D3EA71833F582664',
        usdc_address: '0x9999abcd9999abcd9999abcd9999abcd9999abcd',
        goal: 5,
        collected: 2.3,
        is_active: true,
        tags: ['deca', 'obrazovanje'],
        imageUrl: 'https://hendikepmagazin.rs/wp-content/uploads/2022/08/srbizasrbe.jpg'
    },
    {
        name: 'Zdravstvena pomoć',
        description: 'Sakupljanje sredstava za terapije i lekove',
        eth_address: '0x5678abcd5678abcd5678abcd5678abcd5678abcd',
        usdc_address: '0x8888abcd8888abcd8888abcd8888abcd8888abcd',
        goal: 10,
        collected: 7.1,
        is_active: true,
        tags: ['zdravlje', 'pomoc'],
        imageUrl: 'https://dzns.rs/wp-content/uploads/2015/12/Prva-pomoc.png'
    },
    {
        name: 'Pomoć porodicama iz poplavljenih područja',
        description: 'Obezbeđivanje osnovnih sredstava za život',
        eth_address: '0x5D22dB17bAdAf1252eD7Fc235AFDD6f4A67C8Fb2',
        usdc_address: '0x7777abcd7777abcd7777abcd7777abcd7777abcd',
        goal: 15,
        collected: 15,
        is_active: false,
        tags: ['katastrofa', 'porodice'],
        imageUrl: 'https://static.rtv.rs/slike/2023/07/20/pomoc-porodicama-sa-troje-ili-cetvoro-dece-04.jpg'
    }
];

const seed = async () => {
    await connectDB();
    await Campaign.deleteMany({});
    await Campaign.insertMany(seedData);
    console.log('Seed done.');
    mongoose.disconnect();
};

seed().catch(err => {
    console.error(err);
    mongoose.disconnect();
});
