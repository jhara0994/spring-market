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
        { firstName: "Shaq", lastName: "Denobe", username: "Shaq", email: "shaq@gmail.com", password: "shaq01" },
        { firstName: "Jrod", lastName: "Rivera",username: "Jrod", email: "jrod@yahoo.com", password: "jrod29" },
        { firstName: "Rita", lastName: "Hendo", username: "Rita", email: "rita@gmail.com", password: "rita123"}
    ])
    console.log('************ Users seeded! ************');


    // Before completion, may be able to add multiple categories to arts. Will require change to Art Model.
    await Art.deleteMany()
    await Art.insertMany([
        {
            title: "Shaka",
            description: "Custom made statue named after Shaka Zulu.",
            price: 2500,
            image: "Shaka.JPG",
            category: categories[0]._id
        },
        {
            title: "Savannah",
            description: "Cotton haired lady",
            price: 3500,
            image: "Savanna.JPG",
            category: categories[0]._id
        },
        {
            title: "Jane",
            description: "Sculpture of a lady made with beads and an assortment of homegoods.",
            price: 2500,
            image: "Jane.JPG",
            category: categories[0]._id
        },
        {
            title: "Delta Girl",
            description: "Sculpture of a lady made with beads and an assortment of homegoods.",
            price: 2500,
            image: "Delta.JPG",
            category: categories[0]._id
        },
        {
            title: "Palms in Pretty Pots (Small)",
            description: "North American indoor palms adorned with a beautiful custom pot.",
            price: 100,
            image: "",
            category: categories[2]._id
        },
        {
            title: "Palms in Pretty Pots (Medium)",
            description: "North American indoor palms adorned with a beautiful custom pot.",
            price: 150,
            image: "",
            category: categories[2]._id
        },
        {
            title: "Palms in Pretty Pots (Large)",
            description: "North American indoor palms adorned with a beautiful custom pot.",
            price: 200,
            image: "",
            category: categories[2]._id
        },
    ])
    console.log('************ Products seeded! ************');

    process.exit()

})