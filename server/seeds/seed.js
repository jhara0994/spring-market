const db = require('../config/connection');
const { Category, Art, User } = require('../models');

db.once('open', async () => {
    await Category.deleteMany()

    const categories = await Category.insertMany([
        { name: 'Sculptures'},
        { name: 'Prints'},
        { name: 'Pots & Plants'},
    ]);
    console.log('************ Categories seeded! ************');

    await User.deleteMany()
    const users = await User.insertMany([
        { username: "Shaq", email: "shaq@gmail.com", password: "shaq01" },
        { username: "Jrod", email: "jrod@yahoo.com", password: "jrod29" },
        { username: "Rita", email: "rita@gmail.com", password: "rita123"}
    ])
    console.log('************ Users seeded! ************');


    await Art.deleteMany()
    await Art.insertMany([
        {
            title: "Shaka",
            description: "Custom made statue named after Shaka Zulu.",
            price: 2500,
            image: "",
            category: [categories[0]._id, categories[1]._id]
        },
        {
            title: "Savannah",
            description: "Cotton haired lady",
            price: 3500,
            image: "",
            category: [categories[0]._id, categories[1]._id]
        },
        {
            title: "Jane",
            description: "Sculpture of a lady made with beads and an assortment of homegoods.",
            price: 2500,
            image: "",
            category: [categories[0]._id, categories[1]._id]
        },
        {
            title: "Palms in Pretty Pots",
            description: "North American indoor palms adorned with a beautiful custom pot.",
            price: 100,
            image: "",
            category: categories[2]._id
        },
    ])
    console.log('************ Products seeded! ************');

    process.exit()

})