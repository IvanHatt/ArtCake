const products = [
  {
    name: 'Chocolate Dream',
    image: '/images/cake-chocolate.jpg',
    category: 'Cake',
    description:
      'A perfect cake for chocolate lovers. The cake is coated in buttercream, topped with chocolate ganache',

    allergens: 'eggs, almonds, peanut',
    dimensions: '40 cm diameter',
    servings: '12 persons',
    veganOpt: true,
    glutenFreeOpt: false,
    price: 189.99,
    inStock: false,
    rating: 4.5,
    numReviews: 4,
  },
  {
    name: 'Cake Bee Honey',
    image: '/images/cake-bee.jpg',
    category: 'Cake',
    description:
      'Aenean viverra pulvinar mauris, et condimentum quam volutpat vel. Curabitur in venenatis ipsum, ac pellentesque eros. Aenean nec libero eget augue sodales rhoncus. Aliquam imperdiet purus quis porta tempor. In hac habitasse platea dictumst. Integer feugiat sed quam et egestas',

    allergens: 'eggs, milk, peanut, honey',
    dimensions: '40 cm diameter',
    servings: '12 persons',
    veganOpt: false,
    glutenFreeOpt: true,

    price: 150,
    inStock: true,
    rating: 4.5,
    numReviews: 12,
  },
  {
    name: 'Cake Sugar Coated',
    image: '/images/cake-azucar.jpg',
    category: 'Cake',
    description:
      'Aenean viverra pulvinar mauris, et condimentum quam volutpat vel. Curabitur in venenatis ipsum, ac pellentesque eros. Aenean nec libero eget augue sodales rhoncus. Aliquam imperdiet purus quis porta tempor. In hac habitasse platea dictumst. Integer feugiat sed quam et egestas',

    allergens: 'eggs, milk, peanut, cinnammon',
    dimensions: '40 cm diameter',
    servings: '12 persons',
    veganOpt: true,
    glutenFreeOpt: true,

    price: 180,
    inStock: true,
    rating: 3.5,
    numReviews: 2,
  },
  {
    name: 'Cake for Birthday',
    image: '/images/cake-birthday.jpg',
    category: 'Cake',
    description:
      'Aenean viverra pulvinar mauris, et condimentum quam volutpat vel. Curabitur in venenatis ipsum, ac pellentesque eros. Aenean nec libero eget augue sodales rhoncus. Aliquam imperdiet purus quis porta tempor. In hac habitasse platea dictumst. Integer feugiat sed quam et egestas',

    allergens: 'eggs, milk, peanut',
    dimensions: '30 cm diameter',
    servings: '10 persons',
    veganOpt: true,
    glutenFreeOpt: true,

    price: 190,
    inStock: true,
    rating: 4,
    numReviews: 4,
  },
  {
    name: 'Budin Cake',
    image: '/images/cake-budin.jpg',
    category: 'Cake',
    description:
      'Aenean viverra pulvinar mauris, et condimentum quam volutpat vel. Curabitur in venenatis ipsum, ac pellentesque eros. Aenean nec libero eget augue sodales rhoncus. Aliquam imperdiet purus quis porta tempor. In hac habitasse platea dictumst. Integer feugiat sed quam et egestas',

    allergens: 'eggs, milk, cinnammon',
    dimensions: '25 cm diameter',
    servings: '10 persons',
    veganOpt: false,
    glutenFreeOpt: true,

    price: 90,
    inStock: true,
    rating: 5,
    numReviews: 3,
  },
  {
    name: 'Cherry Cake',
    image: '/images/cake-ceereza.jpg',
    category: 'Cake',
    description:
      'Aenean viverra pulvinar mauris, et condimentum quam volutpat vel. Curabitur in venenatis ipsum, ac pellentesque eros. Aenean nec libero eget augue sodales rhoncus. Aliquam imperdiet purus quis porta tempor. In hac habitasse platea dictumst. Integer feugiat sed quam et egestas',

    allergens: 'eggs, milk, peanut, cherry',
    dimensions: '35 cm diameter',
    servings: '8 persons',
    veganOpt: true,
    glutenFreeOpt: true,

    price: 145,
    inStock: true,
    rating: 3,
    numReviews: 4,
  },
  {
    name: 'Cake Canela',
    image: '/images/cake-cinnamon.jpg',
    category: 'Cake',
    description:
      'Aenean viverra pulvinar mauris, et condimentum quam volutpat vel. Curabitur in venenatis ipsum, ac pellentesque eros. Aenean nec libero eget augue sodales rhoncus. Aliquam imperdiet purus quis porta tempor. In hac habitasse platea dictumst. Integer feugiat sed quam et egestas',

    allergens: 'eggs, milk, peanut, cinnammon',
    dimensions: '35 cm diameter',
    servings: '12 persons',
    veganOpt: false,
    glutenFreeOpt: true,

    price: 135,
    inStock: true,
    rating: 4.5,
    numReviews: 4,
  },
  {
    name: 'Colorful Cake',
    image: '/images/cake-colores.jpg',
    category: 'Cake',
    description:
      'Aenean viverra pulvinar mauris, et condimentum quam volutpat vel. Curabitur in venenatis ipsum, ac pellentesque eros. Aenean nec libero eget augue sodales rhoncus. Aliquam imperdiet purus quis porta tempor. In hac habitasse platea dictumst. Integer feugiat sed quam et egestas',

    allergens: 'eggs, milk',
    dimensions: '40 cm diameter',
    servings: '12 persons',
    veganOpt: true,
    glutenFreeOpt: true,

    price: 200,
    inStock: false,
    rating: 4,
    numReviews: 2,
  },
  {
    name: 'Cake Flan',
    image: '/images/cake-flan.jpg',
    category: 'Cake',
    description:
      'Aenean viverra pulvinar mauris, et condimentum quam volutpat vel. Curabitur in venenatis ipsum, ac pellentesque eros. Aenean nec libero eget augue sodales rhoncus. Aliquam imperdiet purus quis porta tempor. In hac habitasse platea dictumst. Integer feugiat sed quam et egestas',

    allergens: 'eggs, milk',
    dimensions: '40 cm diameter',
    servings: '8 persons',
    veganOpt: false,
    glutenFreeOpt: true,

    price: 85,
    inStock: true,
    rating: 5,
    numReviews: 5,
  },
  {
    name: 'Cake Forest Fruit',
    image: '/images/cake-frutosrojos.jpg',
    category: 'Cake',
    description:
      'Aenean viverra pulvinar mauris, et condimentum quam volutpat vel. Curabitur in venenatis ipsum, ac pellentesque eros. Aenean nec libero eget augue sodales rhoncus. Aliquam imperdiet purus quis porta tempor. In hac habitasse platea dictumst. Integer feugiat sed quam et egestas',

    allergens: 'eggs, milk',
    dimensions: '35 cm diameter',
    servings: '10 persons',
    veganOpt: true,
    glutenFreeOpt: true,

    price: 185,
    inStock: true,
    rating: 4.5,
    numReviews: 2,
  },
  {
    name: 'Red velvet',
    image: '/images/cake-red.jpg',
    category: 'Cake',
    description:
      'Aenean viverra pulvinar mauris, et condimentum quam volutpat vel. Curabitur in venenatis ipsum, ac pellentesque eros. Aenean nec libero eget augue sodales rhoncus. Aliquam imperdiet purus quis porta tempor. In hac habitasse platea dictumst. Integer feugiat sed quam et egestas',

    allergens: 'eggs, milk, honey',
    dimensions: '40 cm diameter',
    servings: '12 persons',
    veganOpt: true,
    glutenFreeOpt: true,

    price: 205,
    inStock: true,
    rating: 5,
    numReviews: 10,
  },
  {
    name: 'Cupcake',
    image: '/images/cup-bee.jpg',
    category: 'Cup',
    description:
      'Aenean viverra pulvinar mauris, et condimentum quam volutpat vel. Curabitur in venenatis ipsum, ac pellentesque eros. Aenean nec libero eget augue sodales rhoncus. Aliquam imperdiet purus quis porta tempor. In hac habitasse platea dictumst. Integer feugiat sed quam et egestas',

    allergens: 'eggs, milk, peanut, honey',
    dimensions: '10 cm diameter',
    servings: '1 person',
    veganOpt: false,
    glutenFreeOpt: true,

    price: 12,
    inStock: true,
    rating: 4,
    numReviews: 1,
  },
  {
    name: 'Cupcake',
    image: '/images/cup-bee.jpg',
    category: 'Cup',
    description:
      'Aenean viverra pulvinar mauris, et condimentum quam volutpat vel. Curabitur in venenatis ipsum, ac pellentesque eros. Aenean nec libero eget augue sodales rhoncus. Aliquam imperdiet purus quis porta tempor. In hac habitasse platea dictumst. Integer feugiat sed quam et egestas',

    allergens: 'eggs, milk, peanut, honey',
    dimensions: '10 cm diameter',
    servings: '1 person',
    veganOpt: false,
    glutenFreeOpt: true,

    price: 12,
    inStock: true,
    rating: 4,
    numReviews: 1,
  },
  {
    name: 'Chocolate Cupcake',
    image: '/images/cup-chocolate.jpg',
    category: 'Cupcake',
    description:
      'Aenean viverra pulvinar mauris, et condimentum quam volutpat vel. Curabitur in venenatis ipsum, ac pellentesque eros. Aenean nec libero eget augue sodales rhoncus. Aliquam imperdiet purus quis porta tempor. In hac habitasse platea dictumst. Integer feugiat sed quam et egestas',

    allergens: 'eggs, milk, peanut',
    dimensions: '10 cm diameter',
    servings: '1 person',
    veganOpt: false,
    glutenFreeOpt: true,

    price: 10,
    inStock: true,
    rating: 4,
    numReviews: 2,
  },
  {
    name: 'Violet Cupcake',
    image: '/images/cup-violeta.jpg',
    category: 'Cupcake',
    description:
      'Aenean viverra pulvinar mauris, et condimentum quam volutpat vel. Curabitur in venenatis ipsum, ac pellentesque eros. Aenean nec libero eget augue sodales rhoncus. Aliquam imperdiet purus quis porta tempor. In hac habitasse platea dictumst. Integer feugiat sed quam et egestas',

    allergens: 'eggs, milk',
    dimensions: '10 cm diameter',
    servings: '1 person',
    veganOpt: true,
    glutenFreeOpt: true,

    price: 15,
    inStock: true,
    rating: 3.5,
    numReviews: 6,
  },
  {
    name: 'Christmas Cupcake',
    image: '/images/cup-navidad.jpg',
    category: 'Cupcake',
    description:
      'Aenean viverra pulvinar mauris, et condimentum quam volutpat vel. Curabitur in venenatis ipsum, ac pellentesque eros. Aenean nec libero eget augue sodales rhoncus. Aliquam imperdiet purus quis porta tempor. In hac habitasse platea dictumst. Integer feugiat sed quam et egestas',

    allergens: 'eggs, milk',
    dimensions: '10 cm diameter',
    servings: '1 person',
    veganOpt: false,
    glutenFreeOpt: true,

    price: 12,
    inStock: true,
    rating: 4,
    numReviews: 1,
  },
  {
    name: 'Vanilla Cupcake',
    image: '/images/cup-vainilla.jpg',
    category: 'Cupcake',
    description:
      'Aenean viverra pulvinar mauris, et condimentum quam volutpat vel. Curabitur in venenatis ipsum, ac pellentesque eros. Aenean nec libero eget augue sodales rhoncus. Aliquam imperdiet purus quis porta tempor. In hac habitasse platea dictumst. Integer feugiat sed quam et egestas',

    allergens: 'eggs, milk',
    dimensions: '10 cm diameter',
    servings: '1 person',
    veganOpt: false,
    glutenFreeOpt: true,

    price: 12,
    inStock: true,
    rating: 4,
    numReviews: 1,
  },
]

export default products
