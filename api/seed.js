const mongoose = require('mongoose');
const connectDB = require('./db');
const Campaign = require('./models/Campaign');

const seedData = [
    {
        name: 'Humanitarna pomoć za decu',
        description: 'Kupovina školskog pribora i hrane za ugroženu decu',
        eth_address: '0x5e1C114f9DfCBD12fB8eEae2D3EA71833F582664',
        goal: 5,
        collected: 2.3,
        is_active: true,
        tags: ['Children', 'Education'],
        imageUrl: 'https://hendikepmagazin.rs/wp-content/uploads/2022/08/srbizasrbe.jpg'
    },
    {
        name: 'Pomoć porodicama iz poplavljenih područja',
        description: 'Obezbeđivanje osnovnih sredstava za život',
        eth_address: '0x5D22dB17bAdAf1252eD7Fc235AFDD6f4A67C8Fb2',
        goal: 15,
        collected: 10,
        is_active: true,
        tags: ['Catastrophy', 'families'],
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
