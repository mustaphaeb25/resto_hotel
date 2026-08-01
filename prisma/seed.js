import prisma from '../src/config/database.js';
import { hashPassword } from '../src/utils/password.js';

const rooms = [
  { id: 1, name: 'Heritage Deluxe Room', category: 'room', badge: 'Popular', price: 220, size: '38 m²', bed: '1 King Bed', maxGuests: 2, description: 'Featuring traditional handcrafted furnishings, private marble bath, and stunning courtyard garden views.', features: ['Free High-Speed Wi-Fi', 'Breakfast Included', 'Smart TV'], image: 'https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=600&q=80' },
  { id: 2, name: 'Executive Suite', category: 'suite', badge: 'Suite', price: 340, size: '58 m²', bed: '1 Super King', maxGuests: 3, description: 'Expansive suite with a separate lounge living area, private terrace, and deep soaking bathtub.', features: ['Private Terrace', 'Free Wi-Fi', 'Espresso Machine'], image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=600&q=80' },
  { id: 3, name: 'Saffron Royal Villa', category: 'villa', badge: 'Exclusive', price: 550, size: '110 m²', bed: '2 King Beds', maxGuests: 4, description: 'Ultimate luxury featuring a private plunge pool, dedicated butler service, and panoramic lake views.', features: ['Private Plunge Pool', '24/7 Butler', 'Airport Transfer'], image: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=600&q=80' },
  { id: 4, name: 'Lakeview Terrace Room', category: 'room', badge: 'New', price: 260, size: '42 m²', bed: '1 King Bed', maxGuests: 2, description: 'Wake up to breathtaking lake views from your private terrace, with modern minimalist décor and a rain shower.', features: ['Lake View Terrace', 'Free Wi-Fi', 'Rain Shower'], image: 'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?auto=format&fit=crop&w=600&q=80' },
  { id: 5, name: 'Garden Honeymoon Suite', category: 'suite', badge: 'Romantic', price: 380, size: '65 m²', bed: '1 Super King', maxGuests: 2, description: 'An intimate retreat surrounded by lush gardens, featuring a freestanding bathtub and private balcony.', features: ['Freestanding Bathtub', 'Private Balcony', 'Champagne Welcome'], image: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?auto=format&fit=crop&w=600&q=80' },
  { id: 6, name: 'Heritage Presidential Suite', category: 'villa', badge: 'Premium', price: 720, size: '150 m²', bed: '2 King Beds', maxGuests: 5, description: 'Our finest accommodation with hand-painted frescoes, a private dining room, personal chef, and wraparound terrace with panoramic views.', features: ['Personal Chef', 'Private Dining', 'Wraparound Terrace'], image: 'https://images.unsplash.com/photo-1564078516393-cf04bd966897?auto=format&fit=crop&w=600&q=80' },
];

const menuItems = [
  { id: 1, name: 'Saffron Butter Lobster', price: 38, category: 'mains', description: 'Fresh rock lobster poached in saffron-infused butter with micro greens.', image: '/lobster.jpeg', tags: [{ label: 'Chef Special', type: 'chef' }, { label: 'Gluten Free', type: 'gf' }] },
  { id: 2, name: 'Truffle Mushroom Risotto', price: 28, category: 'mains', description: 'Arborio rice, wild forest mushrooms, black truffle shavings, and aged parmesan.', image: 'https://images.unsplash.com/photo-1633964913295-ceb43826e7c9?auto=format&fit=crop&w=300&q=80', tags: [{ label: 'Vegetarian', type: 'vegan' }] },
  { id: 3, name: 'Seared Scallops', price: 30, category: 'starter', description: 'Pan-seared sea scallops served with cauliflower puree and crispy pancetta.', image: 'https://images.unsplash.com/photo-1532550907401-a500c9a57435?auto=format&fit=crop&w=300&q=80', tags: [{ label: 'Gluten Free', type: 'gf' }] },
  { id: 4, name: 'Chocolate Fondant', price: 16, category: 'dessert', description: 'Warm dark chocolate cake with a molten center, served with pistachios and gelato.', image: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=300&q=80', tags: [{ label: 'Popular', type: 'chef' }] },
  { id: 5, name: 'Saffron & Sea Bass', price: 34, category: 'mains', description: 'Pan-seared sea bass with saffron velouté, asparagus, heirloom tomatoes.', image: 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?auto=format&fit=crop&w=300&q=80', tags: [{ label: 'Chef Special', type: 'chef' }] },
  { id: 6, name: 'Royal Saffron Elixir', price: 18, category: 'drinks', description: 'Artisanal gin infused with saffron threads, cardamom, fresh citrus, and gold leaf.', image: 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&w=300&q=80', tags: [{ label: 'Signature Drink', type: 'chef' }] },
];

const experiences = [
  { id: 1, name: 'Heritage Walking Tour', category: 'cultural', duration: '3 Hours', groupSize: 'Up to 8', price: 45, unit: 'person', description: "Explore the narrow lanes of Udaipur's old city, visit centuries-old havelis, and discover hidden temples with our expert local guide.", image: '/This.jpeg' },
  { id: 2, name: 'Cooking Masterclass', category: 'culinary', duration: '4 Hours', groupSize: 'Up to 6', price: 85, unit: 'person', description: 'Learn the secrets of Rajasthani cuisine from Chef Arjun. Prepare classic dishes like Dal Bati Churma and Laal Maas in a hands-on session.', image: '/Cooking Class.jpeg' },
  { id: 3, name: 'Rooftop Sunset Cocktails', category: 'adventure', duration: '2 Hours', groupSize: 'Up to 12', price: 35, unit: 'person', description: 'Watch the sun dip behind the Aravalli hills while sipping handcrafted saffron cocktails on our exclusive rooftop terrace.', image: '/roof.jpeg' },
  { id: 4, name: 'Private Lake Cruise', category: 'adventure', duration: '2.5 Hours', groupSize: 'Up to 4', price: 120, unit: 'couple', description: 'Glide across the serene waters of Lake Pichola on a traditional wooden boat, passing the iconic Lake Palace and Jag Mandir.', image: '/lake.jpeg' },
  { id: 5, name: 'Ayurvedic Spa Journey', category: 'wellness', duration: '3 Hours', groupSize: 'Individual', price: 95, unit: 'person', description: 'A holistic wellness experience combining traditional Abhyanga massage, herbal steam bath, and guided meditation session.', image: '/Vaidyam.jpeg' },
  { id: 6, name: 'Stargazing Night', category: 'cultural', duration: '2 Hours', groupSize: 'Up to 10', price: 30, unit: 'person', description: 'Join our astronomer on the rooftop for a guided tour of the night sky, complete with telescopes, warm chai, and Rajasthani snacks.', image: 'https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?auto=format&fit=crop&w=600&q=80' },
];

const galleryItems = [
  { id: 1, category: 'rooms', label: 'Heritage Deluxe Room', image: 'https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=600&q=80' },
  { id: 2, category: 'dining', label: 'Signature Dishes', image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=600&q=80' },
  { id: 3, category: 'rooms', label: 'Executive Suite', image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=600&q=80' },
  { id: 4, category: 'wellness', label: 'Spa & Wellness', image: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&w=600&q=80' },
  { id: 5, category: 'dining', label: 'Restaurant Ambiance', image: 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?auto=format&fit=crop&w=600&q=80' },
  { id: 6, category: 'events', label: 'Private Events', image: 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=600&q=80' },
  { id: 7, category: 'rooms', label: 'Saffron Royal Villa', image: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=600&q=80' },
  { id: 8, category: 'dining', label: 'Wine & Spirits', image: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&w=600&q=80' },
  { id: 9, category: 'wellness', label: 'Infinity Pool', image: '/pool.jpeg' },
  { id: 10, category: 'events', label: 'Rooftop Celebrations', image: 'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?auto=format&fit=crop&w=600&q=80' },
  { id: 11, category: 'dining', label: 'Saffron Butter Lobster', image: '/lobster.jpeg' },
  { id: 12, category: 'rooms', label: 'Saffron House Exterior', image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=600&q=80' },
  { id: 13, category: 'wellness', label: 'Morning Yoga', image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=600&q=80' },
  { id: 14, category: 'dining', label: 'Chocolate Fondant', image: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=600&q=80' },
  { id: 15, category: 'events', label: 'Festive Celebrations', image: 'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?auto=format&fit=crop&w=600&q=80' },
  { id: 16, category: 'dining', label: 'Private Dining', image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=600&q=80' },
];

const reviews = [
  { target: 'DISH', itemId: 1, rating: 5, comment: 'The saffron butter lobster is pure indulgence. Perfectly cooked and beautifully plated.', asAdmin: true },
  { target: 'DISH', itemId: 1, rating: 4, comment: 'Rich and buttery, loved the micro greens on top.' },
  { target: 'DISH', itemId: 2, rating: 5, comment: 'Creamiest risotto I have ever tasted. The truffle aroma is incredible.' },
  { target: 'DISH', itemId: 3, rating: 4, comment: 'Beautifully seared scallops with a crispy finish.' },
  { target: 'DISH', itemId: 4, rating: 5, comment: 'Molten center was perfect. A must for dessert lovers.' },
  { target: 'DISH', itemId: 5, rating: 5, comment: 'The sea bass melted in my mouth. The saffron velouté is a masterpiece.' },
  { target: 'DISH', itemId: 6, rating: 5, comment: 'Elegant, aromatic, and subtly sweet. A signature drink for a reason.' },
  { target: 'ROOM', itemId: 1, rating: 5, comment: 'Beautiful heritage room with a gorgeous garden view.' },
  { target: 'ROOM', itemId: 2, rating: 4, comment: 'Spacious suite, loved the private terrace.' },
  { target: 'ROOM', itemId: 3, rating: 5, comment: 'The private plunge pool and butler service were unforgettable.' },
  { target: 'ROOM', itemId: 4, rating: 4, comment: 'Stunning lake views, very serene.' },
  { target: 'ROOM', itemId: 5, rating: 5, comment: 'A romantic paradise. The freestanding bathtub was a dream.' },
  { target: 'EXPERIENCE', itemId: 1, rating: 5, comment: 'Fascinating tour, our guide was incredibly knowledgeable.' },
  { target: 'EXPERIENCE', itemId: 2, rating: 5, comment: 'Learned so much from Chef Arjun. Hands-on and delicious.' },
  { target: 'EXPERIENCE', itemId: 3, rating: 4, comment: 'Gorgeous sunset and the saffron cocktails were amazing.' },
  { target: 'EXPERIENCE', itemId: 5, rating: 5, comment: 'The most relaxing three hours of our entire trip.' },
];

async function seed() {
  console.log('Seeding database...');

  await prisma.roomReservation.deleteMany();
  await prisma.diningReservation.deleteMany();
  await prisma.experienceBooking.deleteMany();
  await prisma.contactInquiry.deleteMany();
  await prisma.newsletterSubscriber.deleteMany();
  await prisma.upload.deleteMany();
  await prisma.galleryItem.deleteMany();
  await prisma.experience.deleteMany();
  await prisma.menuItem.deleteMany();
  await prisma.room.deleteMany();
  await prisma.user.deleteMany();

  console.log('Cleared existing data');

  const adminPassword = await hashPassword('admin123');
  const admin = await prisma.user.create({
    data: {
      name: 'Admin',
      email: 'admin@saffronhouse.com',
      password: adminPassword,
      role: 'ADMIN',
    },
  });
  console.log('Created admin user (admin@saffronhouse.com / admin123)');

  for (const room of rooms) {
    await prisma.room.create({ data: room });
  }
  console.log(`Seeded ${rooms.length} rooms`);

  for (const item of menuItems) {
    await prisma.menuItem.create({ data: item });
  }
  console.log(`Seeded ${menuItems.length} menu items`);

  for (const exp of experiences) {
    await prisma.experience.create({ data: exp });
  }
  console.log(`Seeded ${experiences.length} experiences`);

  for (const item of galleryItems) {
    await prisma.galleryItem.create({ data: item });
  }
  console.log(`Seeded ${galleryItems.length} gallery items`);

  await prisma.$executeRawUnsafe(`SELECT setval(pg_get_serial_sequence('rooms', 'id'), COALESCE(max(id), 0) + 1, false) FROM rooms`);
  await prisma.$executeRawUnsafe(`SELECT setval(pg_get_serial_sequence('menu_items', 'id'), COALESCE(max(id), 0) + 1, false) FROM menu_items`);
  await prisma.$executeRawUnsafe(`SELECT setval(pg_get_serial_sequence('experiences', 'id'), COALESCE(max(id), 0) + 1, false) FROM experiences`);
  await prisma.$executeRawUnsafe(`SELECT setval(pg_get_serial_sequence('gallery_items', 'id'), COALESCE(max(id), 0) + 1, false) FROM gallery_items`);
  console.log('Reset auto-increment sequences');

  for (const review of reviews) {
    await prisma.review.create({
      data: {
        target: review.target,
        itemId: review.itemId,
        rating: review.rating,
        comment: review.comment,
        userId: review.asAdmin ? admin.id : null,
      },
    });
  }
  console.log(`Seeded ${reviews.length} reviews`);

  console.log('Seeding complete!');
}

seed()
  .catch(e => {
    console.error('Seed error:', e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
