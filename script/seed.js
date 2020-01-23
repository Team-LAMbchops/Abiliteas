'use strict'

const db = require('../server/db')
const {User, Order, Tea, OrderProduct} = require('../server/db/models')

async function seed() {
  await db.sync({force: true})
  console.log('db synced!')

  const users = await Promise.all([
    User.create({
      firstName: 'Ming',
      lastName: 'Chen',
      address: '652 Annadale Street, New York, NY 10003',
      email: 'ming@email.com',
      password: '123',
      isAdmin: true
    }),
    User.create({
      firstName: 'Ariana',
      lastName: 'Hwang',
      address: '674 Cypress Avenue, New York, NY 10031',
      email: 'ariana@email.com',
      password: '123',
      isAdmin: true
    }),
    User.create({
      firstName: 'Laura',
      lastName: 'Barger',
      address: '755 Creek Road, Brooklyn, NY 11201',
      email: 'laura@email.com',
      password: '123',
      isAdmin: true
    }),
    User.create({
      firstName: 'Lizzo',
      lastName: 'Einstein',
      address: '535 Proctor Lane, Brooklyn, NY 11236',
      email: 'lizzo@email.com',
      password: '123',
      isAdmin: false
    })
  ])

  const products = await Promise.all([
    Tea.create({
      name: 'Telekinesis',
      flavor: 'Patagonian Wild Guava',
      description:
        'User can influence/manipulate/move objects/matter with their mind. Telekinesis is one of the basis of many superpowers that are based on "controlling/manipulating", and may evolve to the point that a Telekinetic can control anything at a subatomic, particle and universal level. This tea gives you the ability to control anything at a subatomic level with your mind',
      price: 1000000,
      inventory: 100,
      imageUrl:
        'https://s3.amazonaws.com/cdn.rishi-tea.com/images/uploads/BulkTea_PatagonianWildGuava_LG.jpg'
    }),
    Tea.create({
      name: 'Telepathy',
      flavor: 'Blueberry Rooibos',
      description:
        "User can read/sense another person's thoughts, communicate with them mentally or affect their minds/thoughts. Telepathy has two common abilities or categories; Telepathic Communication, which is the ability to transmit information from one mind to another and Telepathic Perception, which is the ability to receive information from another mind knowing an opponent’s moves and attacks.  This tea gives you the ability of Telepathic Perception",
      price: 1000000,
      inventory: 200,
      imageUrl:
        'https://s3.amazonaws.com/cdn.rishi-tea.com/images/uploads/BulkTea_BlueberryRooibos_LG.jpg'
    }),
    Tea.create({
      name: 'Invisibility',
      flavor: 'Chamomile Medley',
      description:
        'User can render themselves unseen by the naked eye and become invisible in visible spectrum. The user can move about an environment unseen by others and act without being observed. Some users can choose to let certain people see them, while staying invisible to others. This tea gives you the ability to be see-through',
      price: 30000,
      inventory: 4000,
      imageUrl:
        'https://s3.amazonaws.com/cdn.rishi-tea.com/images/uploads/BulkTea_ChamomileMedley_LG.jpg'
    }),
    Tea.create({
      name: 'Mind-control',
      flavor: 'Blue Jasmine',
      description:
        'User can control the minds of others with targets being completely subject to their mental control. If the victims were placed into a semi-conscious state, they may not have any recollection of the previous actions that they performed while under its effect. This tea gives you the ability to control the minds of others',
      price: 100000000,
      inventory: 10,
      imageUrl:
        'https://s3.amazonaws.com/cdn.rishi-tea.com/images/uploads/bluejasmineleaf.jpg'
    }),
    Tea.create({
      name: 'Immortality',
      flavor: 'Hibiscus',
      description:
        'User possesses immortality: an infinite life span, as they can never die, never age, and can shrug off virtually any kind of physical damage. Some users are the defensive type, simply preventing all damages, to appear physically invulnerable, while others are the regenerative type, surviving and quickly recovering from anything you throw at them while at the same time they are capable of resurrecting themselves instantly after death and completely self-sustaining, free from all bodily necessities. This tea gives you the ability to live forever',
      price: 100000,
      inventory: 10000,
      imageUrl:
        'https://s3.amazonaws.com/cdn.rishi-tea.com/images/uploads/BulkTea_Hibiscus_LG.jpg'
    }),
    Tea.create({
      name: 'Supernatural Strength',
      flavor: 'Valerian Dream',
      description:
        "Users are glaringly, obviously and super/unnaturally stronger than their race because their capabilities are pushed beyond the natural level; making them immensely stronger than normal members of their species (in that 'verse) can be achieved by any method of training.  This tea gives you the ability to have super-human stregth, meant for a good workout",
      price: 5000,
      inventory: 50000,
      imageUrl:
        'https://s3.amazonaws.com/cdn.rishi-tea.com/images/uploads/BulkTea_ValerianDream_LG.jpg'
    }),

    Tea.create({
      name: 'Shapeshifting',
      flavor: 'Mushroom Hero',
      description:
        'This tea gives the user the ability to shapeshift their form.  The user can shapeshift their form, transforming and reshaping themselves potentially down to their genetic and cellular structure. They can impersonate others or enhance their own body for combat, either by turning into animals, humanoids, monsters, etc. or by making the body stronger. User with particularly flexible abilities can manipulate their form at will, combining abilities, traits, etc, even being able to form limbs into weapons and reforming after being blown apart by explosives.',
      price: 100000,
      inventory: 10000,
      imageUrl:
        'https://s3.amazonaws.com/cdn.rishi-tea.com/images/uploads/2138_2169_large.jpg'
    }),

    Tea.create({
      name: 'Fire Control',
      flavor: 'Peppermint Sage',
      description:
        "The psychic ability to generate, absorb and control fire is called pyrokinesis. It's widely used in comics, but if you want to be a little different only give your character a certain aspect of this gift. For example, maybe they can't generate fire, but can control fire or only absorb the extreme heat from a fire and transfer it to another in the form of a 'hot punch'.  This tea gives you the ability to control fire",
      price: 100000,
      inventory: 10000,
      imageUrl:
        'https://s3.amazonaws.com/cdn.rishi-tea.com/images/uploads/2233_2310_large.jpg'
    }),

    Tea.create({
      name: 'X-ray Vision',
      flavor: 'Ginger',
      description:
        'This tea gives you the ability to have x-ray vision. The user can see x-rays, electromagnetic waves of high energy and very short wavelength, which is able to pass through many materials opaque to light. This can be used for medical purposes such as the detection of cancers, tumors, blackened lungs, etc. The skill of perceiving a specific location (i.e. artery) is given by partial reflection of the ray from each specific surface surveyed.',
      price: 100000,
      inventory: 10000,
      imageUrl:
        'https://s3.amazonaws.com/cdn.rishi-tea.com/images/uploads/BulkTea_Ginger_LG.jpg'
    }),

    Tea.create({
      name: 'Flight',
      flavor: 'Hibiscus Berry',
      description:
        'User can fly or otherwise move through the air using various methods. Some possibilities include using one or more forms of energy, wings or similar structures, harnessing anti-gravitons, or even mimicking or becoming an animal that can fly. Users are generally able to Levitate, and Glide as well. This tea gives you the ability to fly.',
      price: 100000,
      inventory: 10000,
      imageUrl:
        'https://s3.amazonaws.com/cdn.rishi-tea.com/images/uploads/BulkTea_HibiscusBerry_LG.jpg'
    }),

    Tea.create({
      name: 'Teleportation',
      flavor: 'Hibiscus Rooibos',
      description:
        'The user can teleport, or transfer matter (beings/objects, including themselves) or energy from one point to another without traversing the physical space between them. This can be achieved by various means, including causing the atoms/molecules to travel at light-speed, warping the space, or use quantum superposition, in which the user teleports by spatially rearranging the subatomic contents of a system.  While teleportation may seem like it is simply for travel, it can be a valuable ability as it can be used offensively (and quite powerful, as a spatial attack) while offering superiority regarding movement speed and distance coverage. A skilled strategist/tactician can use it for many innovative manners. This tea gives the user the ability to teleport',
      price: 100000,
      inventory: 10000,
      imageUrl:
        'https://s3.amazonaws.com/cdn.rishi-tea.com/images/uploads/BulkTea_HibiscusRooibos_LG.jpg'
    }),

    Tea.create({
      name: 'Supernatural Speed',
      flavor: 'Omija Beauty Berry',
      description:
        'Users are glaringly, obviously and super/unnaturally faster over other beings in their universe because their capabilities are pushed far beyond the natural level, making them immensely faster than regular beings (in that verse). This tea gives you the ability to move at a super natural speed, perfect for marathon days.',
      price: 100000,
      inventory: 10000,
      imageUrl:
        'https://s3.amazonaws.com/cdn.rishi-tea.com/images/uploads/1863_1924_large.jpg'
    }),

    Tea.create({
      name: 'Time Travel',
      flavor: 'Omija Berry Blush',
      description:
        'User can travel and send others to future/past. Some users may be limited to remaining on the same spatial spot of a differing timeline, others may be able to move to a different spatial position. This tea gives you the ability to time travel.',
      price: 100000,
      inventory: 10000,
      imageUrl:
        'https://s3.amazonaws.com/cdn.rishi-tea.com/images/uploads/1858_2504_large.jpg'
    }),

    Tea.create({
      name: 'Force Field',
      flavor: 'Patagonia Super Berry',
      description:
        "User can create a shield, wall, or a field formed from energy, elements, the environment, or by manipulating smaller items to form a greater whole. Force-fields aren't usually impenetrable and can be removed by energy drain or extreme force. Some users are also able to throw shields away from themselves or to catch things with them, while other users may be able to create them into any shape.  This tea gives the user the ability to generate a force field",
      price: 100000,
      inventory: 10000,
      imageUrl:
        'https://s3.amazonaws.com/cdn.rishi-tea.com/images/uploads/BulkTea_PatagoniaSuperBerry_LG.jpg'
    }),

    Tea.create({
      name: 'Electricity Manipulation',
      flavor: 'Rooibos',
      description:
        'User can create, shape and manipulate electricity, a form of energy resulting from the movement of charged particles (such as electrons or protons), allowing control over electric fields, all charge carriers (Ions, Electrons, Protons, and Positrons), electronics, and electromagnetic forces.  This tea gives your the ability to manipulate electromagnetic forces.',
      price: 100000,
      inventory: 10000,
      imageUrl:
        'https://s3.amazonaws.com/cdn.rishi-tea.com/images/uploads/BulkTea_Rooibos_LG.jpg'
    }),

    Tea.create({
      name: 'Darkness Manipulation',
      flavor: 'White Ginseng Detox',
      description:
        "User can create, shape and manipulate darkness and shadows. By itself, darkness is mostly used to cloud everything into total darkness, but by accessing a dimension of dark energy it can be channeled to a variety of effects, both as an absence of light and a solid substance: one can also control and manipulate the beings that exist there, create and dispel shields and areas of total darkness, create constructs and weapons, teleport one's self through massive distances via shadows, etc.  This tea gives you the ability to manipulate darkness.",
      price: 100000,
      inventory: 10000,
      imageUrl:
        'https://s3.amazonaws.com/cdn.rishi-tea.com/images/uploads/BulkTea_WhiteGinsengDetox_LG.jpg'
    }),

    Tea.create({
      name: 'Acid Generation',
      flavor: 'Tumeric Chai',
      description:
        'The user can generate acids, bases and other caustic/corrosive substances of various levels of corrosiveness, from weak burning sensations to burning a big hole in even the strongest materials.',
      price: 100000,
      inventory: 10000,
      imageUrl:
        'https://s3.amazonaws.com/cdn.rishi-tea.com/images/uploads/BulkTea_TurmericChai_LG.jpg'
    }),

    Tea.create({
      name: 'Acquatic Breathing',
      flavor: 'Guayusa Cacao',
      description:
        'The user can breathe in both water and air and are capable of staying underwater as long as they like and reemerge ready to breathe oxygen again.',
      price: 100000,
      inventory: 10000,
      imageUrl:
        'https://s3.amazonaws.com/cdn.rishi-tea.com/images/uploads/2135_2161_large.jpg'
    }),

    Tea.create({
      name: 'Supernatural Hearing',
      flavor: 'Saffron Bitters',
      description:
        "The user's sense of hearing is glaringly, obviously and super/unnaturally more acute than other beings in their universe because their capabilities are pushed to a superhuman level. Allowing them to hear anything over incredible distances, hear things that are seemingly too quiet to be discernible as well as being able to hear sounds over an insane range of frequencies. Advanced users are even able to hear individual molecules/atoms and their movements.",
      price: 100000,
      inventory: 10000,
      imageUrl:
        'https://s3.amazonaws.com/cdn.rishi-tea.com/images/uploads/1703_2148_large.jpg'
    }),

    Tea.create({
      name: 'Supernatural Smell',
      flavor: 'Cinnamon Plum',
      description:
        'User has sense of smell that is glaringly, obviously and super/unnaturally more acute than other beings in their universe because their capabilities are pushed to a superhuman level. Allowing them to smell anything over any distance, including space, as well as being able to smell individual molecules/atoms.',
      price: 100000,
      inventory: 10000,
      imageUrl:
        'https://s3.amazonaws.com/cdn.rishi-tea.com/images/uploads/BulkTea_CinnamonPlum_LG.jpg'
    }),

    Tea.create({
      name: 'Supernatural Taste',
      flavor: 'Quince Eucalyptus',
      description:
        'User has sense of taste that is glaringly, obviously and super/unnaturally more acute than other beings in their universe because their capabilities are pushed to a superhuman level. Allowing them to be able to identify unknown things by tasting them, remotely taste everything in their environment from a great distance, and the smallest details; to the extent of molecular distinguishment.',
      price: 100000,
      inventory: 10000,
      imageUrl:
        'https://s3.amazonaws.com/cdn.rishi-tea.com/images/uploads/2122_2153_large.jpg'
    }),
    Tea.create({
      name: 'Supernatural Touch',
      flavor: 'Mystic Mint',
      description:
        'User has sense of touch that is glaringly, obviously and super/unnaturally are more acute than other beings in their universe because their capabilities are pushed to a superhuman level. Allowing them to feel the impressions left on anything including intangible substances/surfaces, as well as touch individual molecules/atoms.',
      price: 100000,
      inventory: 10000,
      imageUrl:
        'https://s3.amazonaws.com/cdn.rishi-tea.com/images/uploads/BulkTea_MysticMint_LG.jpg'
    }),
    Tea.create({
      name: 'Supernatural Vision',
      flavor: 'Tangerine Ginger',
      description:
        'User has sense of sight that is glaringly, obviously and super/unnaturally more acute than other beings of their universe because their capabilities are pushed to a superhuman level. Allowing them to see kilometers away, see in the dark, see the faintest distinctions, and track things too fast for the normal eye.',
      price: 100000,
      inventory: 10000,
      imageUrl:
        'https://s3.amazonaws.com/cdn.rishi-tea.com/images/uploads/BulkTea_TangerineGinger_LG.jpg'
    })
  ])

  const orders = await Promise.all([
    Order.create({
      email: 'email@email.com',
      address: 'Mars',
      date: '01/14/2019',
      status: 'Pending',
      userId: 1
    }),
    Order.create({
      email: 'email@email.com',
      address: 'Venus',
      date: '01/20/2019',
      status: 'Completed',
      userId: 1
    }),
    Order.create({
      email: 'email@email.com',
      address: 'Pluto',
      date: '01/30/2019',
      status: 'Completed',
      userId: 1
    }),
    Order.create({
      email: 'email@email.com',
      address: 'California',
      date: '02/20/2019',
      status: 'Pending',
      userId: 2
    }),
    Order.create({
      email: 'email@email.com',
      address: 'New York',
      date: '02/30/2019',
      status: 'Completed',
      userId: 2
    }),
    Order.create({
      email: 'email@email.com',
      address: 'Avengers Mansion',
      date: '03/20/2019',
      status: 'Pending',
      userId: 3
    }),
    Order.create({
      email: 'email@email.com',
      address: '4 Yancy St',
      date: '02/30/2019',
      status: 'Completed',
      userId: 3
    }),
    Order.create({
      email: 'email@email.com',
      address: 'Denver, CO',
      date: '05/30/2019',
      status: 'Pending',
      userId: 4
    }),
    Order.create({
      email: 'email@email.com',
      address: 'Denver, CO',
      date: '05/30/2019',
      status: 'Completed'
    })
  ])

  const orderProducts = await Promise.all([
    OrderProduct.create({
      quantity: 3,
      orderId: 1,
      teaId: 1
    }),
    OrderProduct.create({
      quantity: 3,
      orderId: 1,
      teaId: 2
    }),
    OrderProduct.create({
      quantity: 3,
      orderId: 1,
      teaId: 3
    }),
    OrderProduct.create({
      quantity: 1,
      orderId: 2,
      teaId: 4
    }),
    OrderProduct.create({
      quantity: 1,
      orderId: 2,
      teaId: 5
    }),
    OrderProduct.create({
      quantity: 1,
      orderId: 3,
      teaId: 6
    }),
    OrderProduct.create({
      quantity: 2,
      orderId: 3,
      teaId: 5
    }),
    OrderProduct.create({
      quantity: 1,
      orderId: 4,
      teaId: 6
    }),
    OrderProduct.create({
      quantity: 2,
      orderId: 4,
      teaId: 5
    }),
    OrderProduct.create({
      quantity: 10,
      orderId: 5,
      teaId: 1
    }),
    OrderProduct.create({
      quantity: 5,
      orderId: 6,
      teaId: 2
    }),
    OrderProduct.create({
      quantity: 3,
      orderId: 7,
      teaId: 1
    }),
    OrderProduct.create({
      quantity: 3,
      orderId: 7,
      teaId: 2
    }),
    OrderProduct.create({
      quantity: 3,
      orderId: 8,
      teaId: 5
    }),
    OrderProduct.create({
      quantity: 3,
      orderId: 9,
      teaId: 5
    })
  ])

  console.log(`seeded ${users.length} users`)
  console.log(`seeded ${products.length} products`)
  console.log(`seeded ${orders.length} orders`)
  console.log(`seeded ${orderProducts.length} order products`)
  console.log(`seeded successfully`)
}

// We've separated the `seed` function from the `runSeed` function.
// This way we can isolate the error handling and exit trapping.
// The `seed` function is concerned only with modifying the database.
async function runSeed() {
  console.log('seeding...')
  try {
    await seed()
  } catch (err) {
    console.error(err)
    process.exitCode = 1
  } finally {
    console.log('closing db connection')
    await db.close()
    console.log('db connection closed')
  }
}

// Execute the `seed` function, IF we ran this module directly (`node seed`).
// `Async` functions always return a promise, so we can use `catch` to handle
// any errors that might occur inside of `seed`.
if (module === require.main) {
  runSeed()
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed
