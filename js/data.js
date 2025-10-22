/* Seed data for B2D KITCHEN */
window.B2D = window.B2D || {};

(function () {
  const PLACEHOLDER_IMAGE = (() => {
    const svg = `
      <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 800 600'>
        <defs>
          <linearGradient id='grad' x1='0' y1='0' x2='1' y2='1'>
            <stop offset='0%' stop-color='#FFF7F2'/>
            <stop offset='100%' stop-color='#FFE0D6'/>
          </linearGradient>
        </defs>
        <rect width='800' height='600' fill='url(#grad)'/>
        <g fill='#FFFFFF' opacity='0.75'>
          <rect x='90' y='110' width='620' height='380' rx='48'/>
        </g>
        <text x='400' y='290' text-anchor='middle' font-family='"Anton", "Montserrat Alternates", sans-serif' font-size='110' fill='#D12D2D'>B2D</text>
        <text x='400' y='360' text-anchor='middle' font-family='Inter, system-ui, sans-serif' font-size='38' fill='#FFB703'>Kitchen Placeholder</text>
      </svg>
    `;
    return `data:image/svg+xml,${encodeURIComponent(svg)}`;
  })();

  const categories = [
    { id: 'burgers', name: 'Burgers', description: 'Juicy smash burgers and stacked signatures.' },
    { id: 'chicken', name: 'Chicken', description: 'Crispy fried, flame grilled and spicy wings.' },
    { id: 'pizza', name: 'Pizza', description: 'Stone-fired pizzas with bold Nigerian toppings.' },
    { id: 'sides', name: 'Sides', description: 'Fries, plantains, salads and more crowd-pleasers.' },
    { id: 'drinks', name: 'Drinks', description: 'Handcrafted coolers, shakes and bottled classics.' },
    { id: 'desserts', name: 'Desserts', description: 'Sweet finishes from brownies to parfaits.' },
    { id: 'breakfast', name: 'Breakfast', description: 'Start strong with wraps, pancakes and oats.' },
    { id: 'family', name: 'Family Meals', description: 'Bundle feasts for every celebration.' },
    { id: 'value', name: 'Value Deals', description: 'Delicious bargains under budget.' },
    { id: 'kids', name: 'Kids', description: 'Kid-approved bites with juice boxes.' },
    { id: 'plant-based', name: 'Plant-Based', description: 'Vibrant vegetarian and vegan picks.' },
    { id: 'grill', name: 'Grill Masters', description: 'Smoked meats and signature suya spice.' }
  ].map(category => ({ ...category, icon: PLACEHOLDER_IMAGE, image: PLACEHOLDER_IMAGE }));

  const baseProducts = [
    { slug: 'fire-grill-burger', name: 'Fire Grill Burger', category: 'burgers', basePrice: 4200, spice: 'medium', description: 'Smoked beef patty, chili aioli, caramelized onions and cheddar on brioche.', rating: 4.8 },
    { slug: 'lagos-jollof-chicken', name: 'Lagos Jollof Chicken', category: 'chicken', basePrice: 4800, spice: 'hot', description: 'Flame-roasted chicken thighs on party jollof rice with pepper relish.', rating: 4.9 },
    { slug: 'naija-supreme-pizza', name: 'Naija Supreme Pizza', category: 'pizza', basePrice: 5200, spice: 'mild', description: 'Charred crust, suya beef, bell peppers, sweet chili drizzle.', rating: 4.7 },
    { slug: 'sweet-plantain-fries', name: 'Sweet Plantain Fries', category: 'sides', basePrice: 1800, spice: 'mild', description: 'Twice-fried plantain batons tossed in ginger sugar and chili salt.', rating: 4.6 },
    { slug: 'zobo-splash-cooler', name: 'Zobo Splash Cooler', category: 'drinks', basePrice: 1600, spice: 'none', description: 'Hibiscus tea with pineapple, lime zest and mint.', rating: 4.5 },
    { slug: 'palm-treat-sundae', name: 'Palm Treat Sundae', category: 'desserts', basePrice: 2200, spice: 'none', description: 'Coconut ice cream, palm kernel crumble, caramel swirl.', rating: 4.9 },
    { slug: 'sunrise-yam-wrap', name: 'Sunrise Yam Wrap', category: 'breakfast', basePrice: 2600, spice: 'mild', description: 'Egg, yam cubes, smoked turkey and ata dindin in soft tortilla.', rating: 4.7 },
    { slug: 'mega-family-bucket', name: 'Mega Family Bucket', category: 'family', basePrice: 13800, spice: 'mixed', description: '12-piece chicken, party jollof, fries, coleslaw, 4 drinks.', rating: 4.8 },
    { slug: 'smart-saver-combo', name: 'Smart Saver Combo', category: 'value', basePrice: 2800, spice: 'mild', description: 'Classic burger, fries and drink for everyday cravings.', rating: 4.4 },
    { slug: 'mini-champ-meal', name: 'Mini Champ Meal', category: 'kids', basePrice: 2400, spice: 'mild', description: 'Chicken poppers, mini bun, apple slices and juice.', rating: 4.5 },
    { slug: 'smoky-suya-tofu', name: 'Smoky Suya Tofu', category: 'plant-based', basePrice: 3900, spice: 'hot', description: 'Grilled tofu skewers with suya spice, kale slaw, peanut dip.', rating: 4.6 },
    { slug: 'cedarwood-rib-stack', name: 'Cedarwood Rib Stack', category: 'grill', basePrice: 7200, spice: 'medium', description: 'Slow-smoked ribs lacquered with honey pepper glaze.', rating: 4.9 }
  ];

  const sizes = ['Single', 'Double'];
  const spiceLevels = ['Mild', 'Medium', 'Hot'];

  const menuItems = baseProducts.flatMap((product, index) =>
    Array.from({ length: 8 }, (_, variantIndex) => {
      const size = sizes[variantIndex % sizes.length];
      const spiceLevel = spiceLevels[(index + variantIndex) % spiceLevels.length];
      const price = product.basePrice + variantIndex * 150;
      return {
        id: `${product.slug}-${variantIndex + 1}`,
        sku: `${product.slug.toUpperCase()}-${String(variantIndex + 1).padStart(3, '0')}`,
        slug: product.slug,
        category: product.category,
        name: `${product.name} ${variantIndex % 2 === 0 ? '' : 'Special'}`.trim(),
        description: product.description,
        price,
        priceFormatted: `₦${price.toLocaleString('en-NG')}`,
        rating: product.rating,
        availability: variantIndex % 7 === 0 ? 'limited' : 'in-stock',
        calories: 320 + variantIndex * 45,
        spiceLevel,
        vegetarian: product.category === 'plant-based',
        halal: product.category !== 'pork',
        image: PLACEHOLDER_IMAGE,
        gallery: Array.from({ length: 3 }, () => PLACEHOLDER_IMAGE),
        variants: sizes.map(option => ({ label: option, value: option.toLowerCase(), price: price + (option === 'Double' ? 600 : 0) })),
        addons: [
          { id: `${product.slug}-cheese`, name: 'Extra Cheese', price: 450 },
          { id: `${product.slug}-pepper`, name: 'Roasted Pepper Relish', price: 350 },
          { id: `${product.slug}-sauce`, name: 'Signature Sauce', price: 300 }
        ],
        nutrition: { protein: 24 + variantIndex, carbs: 40 + variantIndex * 2, fat: 18 + variantIndex, sodium: 780 + variantIndex * 30 },
        allergens: ['Milk', 'Gluten'],
        badges: variantIndex === 0 ? ['Bestseller'] : variantIndex === 3 ? ['New'] : [],
        createdAt: Date.now() - variantIndex * 86400000,
        tags: [product.category, spiceLevel.toLowerCase(), price < 3000 ? 'value' : 'premium']
      };
    })
  );

  const coupons = [
    { code: 'HOTDEAL10', description: '10% off spicy picks', type: 'percent', value: 10, minSpend: 6000, start: '2024-01-01', end: '2024-12-31', usageLimit: 200 },
    { code: 'MEALCOMBO250', description: '₦250 off any combo meal', type: 'fixed', value: 250, minSpend: 3500, start: '2024-05-01', end: '2024-12-31', usageLimit: 300 },
    { code: 'FREESHIP', description: 'Free delivery on orders above ₦8,000', type: 'shipping', value: 0, minSpend: 8000, start: '2024-02-01', end: '2024-12-31', usageLimit: 500 }
  ];

  const locations = [
    { id: 'lekki', name: 'Lekki Phase 1', address: '12 Admiralty Way, Lekki Phase 1, Lagos', hours: 'Mon–Sun: 9am – 11pm', phone: '+234 700 222 2222', map: 'https://maps.example.com/lekki', geo: { lat: 6.4474, lng: 3.4723 } },
    { id: 'ikeja', name: 'Ikeja GRA', address: '88 Isaac John Street, Ikeja GRA, Lagos', hours: 'Mon–Sun: 9am – 10pm', phone: '+234 700 333 3333', map: 'https://maps.example.com/ikeja', geo: { lat: 6.5765, lng: 3.3656 } },
    { id: 'vi', name: 'Victoria Island', address: '5 Bishop Aboyade Cole Street, Victoria Island, Lagos', hours: 'Mon–Sun: 24hrs', phone: '+234 700 111 1111', map: 'https://maps.example.com/vi', geo: { lat: 6.4281, lng: 3.4219 } }
  ].map(location => ({ ...location, image: PLACEHOLDER_IMAGE }));

  const lgas = [
    'Agege', 'Ajeromi-Ifelodun', 'Alimosho', 'Amuwo-Odofin', 'Apapa', 'Badagry', 'Epe', 'Eti-Osa', 'Ibeju-Lekki', 'Ifako-Ijaiye',
    'Ikeja', 'Ikorodu', 'Kosofe', 'Lagos Island', 'Lagos Mainland', 'Mushin', 'Ojo', 'Oshodi-Isolo', 'Shomolu', 'Surulere'
  ];

  const faqs = [
    { question: 'How fast can I get my food delivered?', answer: 'Average delivery time within Lagos is 30 – 45 minutes depending on traffic and weather.' },
    { question: 'Do you offer contactless delivery?', answer: 'Yes, request contactless delivery at checkout and our riders will call once they arrive.' },
    { question: 'Can I schedule orders ahead?', answer: 'Absolutely! Choose a future date and time during checkout and we will prep it fresh.' },
    { question: 'What payment methods do you accept?', answer: 'We accept Paystack, Flutterwave, bank transfers and cash on delivery in select areas.' },
    { question: 'Are your meals halal certified?', answer: 'All chicken and beef used for B2D KITCHEN are halal certified by local partners.' },
    { question: 'Do you cater for events?', answer: 'Yes, email catering@b2dkitchen.ng for curated party trays and private chef experiences.' },
    { question: 'How does the loyalty program work?', answer: 'Earn 5 points for every ₦1,000 spent. Redeem for freebies, upgrades and exclusive merch.' },
    { question: 'Do you have vegetarian or vegan options?', answer: 'Our plant-based lineup features tofu suya, mushroom shawarma and seasonal bowls.' },
    { question: 'Can I edit an order after placing?', answer: 'Contact support within 5 minutes via WhatsApp and we will try our best to help.' },
    { question: 'How do coupons work?', answer: 'Enter valid coupon codes at cart or checkout for instant discounts and freebies.' }
  ];

  const testimonials = [
    { name: 'Jumoke A.', role: 'Food Blogger', quote: 'B2D KITCHEN delivers the crispiest chicken and bold flavors every single time!', rating: 5 },
    { name: 'Segun T.', role: 'Product Manager', quote: 'Order tracking was spot on and the suya pizza blew my mind. Highly recommend.', rating: 5 },
    { name: 'Oma L.', role: 'Fitness Coach', quote: 'Love that there are healthy plant-based bowls without compromising taste.', rating: 4 },
    { name: 'Halima K.', role: 'Mom of 3', quote: 'Family bucket is a lifesaver on busy nights – kids love the mini champ meal.', rating: 5 },
    { name: 'Tunde I.', role: 'Creative Director', quote: 'Sleek packaging, hot delivery, and the zobo cooler is my new obsession.', rating: 5 },
    { name: 'Ada E.', role: 'Entrepreneur', quote: 'Customer support is prompt and the loyalty perks keep me coming back weekly.', rating: 5 }
  ].map(testimonial => ({ ...testimonial, avatar: PLACEHOLDER_IMAGE }));

  const blogPosts = [
    { id: 'chef-tips-for-the-perfect-burger', title: 'Chef Tips for the Perfect Burger', summary: 'Our culinary lead shares secrets for a juicy, flame-kissed burger at home.', published: '2024-04-12' },
    { id: 'exploring-lagos-street-food', title: 'Exploring Lagos Street Food', summary: 'A tasty tour through classic Lagos street snacks and the flavors that inspire us.', published: '2024-03-28' },
    { id: 'fuel-your-team-lunch', title: 'Fuel Your Team Lunch', summary: 'Corporate catering ideas guaranteed to impress your next boardroom meeting.', published: '2024-02-19' },
    { id: 'weekend-brunch-ideas', title: 'Weekend Brunch Ideas', summary: 'Brighten your weekend table with signature breakfast creations.', published: '2024-01-08' }
  ].map(post => ({ ...post, image: PLACEHOLDER_IMAGE }));

  const loyalty = {
    baseMultiplier: 5,
    tiers: [
      { id: 'ember', name: 'Ember', threshold: 0, perk: 'Welcome freebies' },
      { id: 'flame', name: 'Flame', threshold: 5000, perk: 'Priority support' },
      { id: 'inferno', name: 'Inferno', threshold: 12000, perk: 'Exclusive chef table invites' }
    ]
  };

  window.B2D.data = { categories, menuItems, coupons, locations, lgas, faqs, testimonials, blogPosts, loyalty, PLACEHOLDER_IMAGE };
})();
