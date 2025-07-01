const mongoose = require('mongoose');
const connectDB = require('./db');
const Campaign = require('./models/Campaign');

const seedData = [
    {
        name: 'Budi Human',
        description: 'Pomoć deci oboleloj od raka',
        eth_address: '0x46D4c737CA1e3bAd29b4af57a28c54DF4a1c7d58',
        goal: 100,
        collected: 0,
        is_active: true,
        tags: ['Charity', 'families'],
        imageUrl: 'https://scontent.fbeg5-1.fna.fbcdn.net/v/t39.30808-1/298221314_2294820470674517_1096907072172283472_n.jpg?stp=dst-jpg_s480x480_tt6&_nc_cat=108&ccb=1-7&_nc_sid=2d3e12&_nc_ohc=o91ZI8xLHUgQ7kNvwGTU5Zf&_nc_oc=AdlEmf_CKvOKmZeYISuV6dWF1PBZz8Sua7pEkznq9lyhcHJfn4EFzGEJ7ygi3_Bom-w&_nc_zt=24&_nc_ht=scontent.fbeg5-1.fna&_nc_gid=cRSj_8wxInIIIwUGXpRU8Q&oh=00_AfPoGJxF4GtQ6fcX7sawcKlt5i84e1_nNyWOryxRT6GPew&oe=6867080D'
    },
    {
        name: 'Trojka iz Bloka',
        description: 'Humanitarna akcija prikupljanja sredstava za decu bez roditelja.',
        eth_address: '0xcCD09f2E14273bB21369C7d9D5D8ba6F1a9b8456',
        goal: 100,
        collected: 0,
        is_active: true,
        tags: ['Charity', 'Kids'],
        imageUrl: 'https://scontent.fbeg5-1.fna.fbcdn.net/v/t39.30808-6/352218500_278358441230615_6742274929287891272_n.jpg?_nc_cat=109&ccb=1-7&_nc_sid=6ee11a&_nc_ohc=V__BumSErt0Q7kNvwHBC9WJ&_nc_oc=Adma8bgQiMvyImNMy3eX9nWGqH6VcQIlbUbuzAasuL78nGthy59wDFiig6ZBFg1ADhg&_nc_zt=23&_nc_ht=scontent.fbeg5-1.fna&_nc_gid=sRVyiqGZad6A20r6nE68YA&oh=00_AfPwpdQD2jgX7Mx4mvVBGtfMP-0Qaf52vPOfKyOrl1vlEA&oe=6866F37B'
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
