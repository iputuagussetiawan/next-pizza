import { Prisma, PrismaClient } from '@prisma/client';
import { hashSync } from 'bcrypt';

const prisma = new PrismaClient();

const randomDecimalNumber = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min) * 10 + min * 10) / 10;
};

// Define a function named generateProductItem that takes an object as an argument
const generateProductItem = ({
    productId,         // Extract productId from the input object
    pizzaType,         // Extract pizzaType from the input object, optional
    size,              // Extract size from the input object, optional
}: {
    productId: number; // Specify that productId must be a number
    pizzaType?: number; // Specify that pizzaType is an optional number
    size?: number;      // Specify that size is an optional number
}) => {
    // Return an object representing a product item
    return {
        productId,                        // Include the productId in the returned object
        price: randomDecimalNumber(190, 600), // Set price using a function to generate a random decimal number between 190 and 600
        pizzaType,                        // Include pizzaType in the returned object (can be undefined)
        size,                             // Include size in the returned object (can be undefined)
    } as Prisma.ProductItemUncheckedCreateInput; // Type assertion to specify that the return type matches the Prisma input type
};

const ingredients = [
    {
        name: 'Cheese Stuffed Crust',
        price: 179,
        imageUrl:
        'https://cdn.dodostatic.net/static/Img/Ingredients/99f5cb91225b4875bd06a26d2e842106.png',
    },
    {
        name: 'Creamy Mozzarella',
        price: 79,
        imageUrl:
        'https://cdn.dodostatic.net/static/Img/Ingredients/cdea869ef287426386ed634e6099a5ba.png',
    },
    {
        name: 'Cheddar and Parmesan Cheese',
        price: 79,
        imageUrl: 'https://cdn.dodostatic.net/static/Img/Ingredients/000D3A22FA54A81411E9AFA69C1FE796',
    },
    {
        name: 'Spicy Jalapeno Peppers',
        price: 59,
        imageUrl:
        'https://cdn.dodostatic.net/static/Img/Ingredients/11ee95b6bfdf98fb88a113db92d7b3df.png',
    },
    {
        name: 'Tender Chicken',
        price: 79,
        imageUrl: 'https://cdn.dodostatic.net/static/Img/Ingredients/000D3A39D824A82E11E9AFA5B328D35A',
    },
    {
        name: 'Mushrooms',
        price: 59,
        imageUrl: 'https://cdn.dodostatic.net/static/Img/Ingredients/000D3A22FA54A81411E9AFA67259A324',
    },
    {
        name: 'Ham',
        price: 79,
        imageUrl: 'https://cdn.dodostatic.net/static/Img/Ingredients/000D3A39D824A82E11E9AFA61B9A8D61',
    },
    {
        name: 'Spicy Pepperoni',
        price: 79,
        imageUrl: 'https://cdn.dodostatic.net/static/Img/Ingredients/000D3A22FA54A81411E9AFA6258199C3',
    },
    {
        name: 'Spicy Chorizo',
        price: 79,
        imageUrl: 'https://cdn.dodostatic.net/static/Img/Ingredients/000D3A22FA54A81411E9AFA62D5D6027',
    },
    {
        name: 'Pickled Cucumbers',
        price: 59,
        imageUrl: 'https://cdn.dodostatic.net/static/Img/Ingredients/000D3A21DA51A81211E9EA89958D782B',
    },
    {
        name: 'Fresh Tomatoes',
        price: 59,
        imageUrl: 'https://cdn.dodostatic.net/static/Img/Ingredients/000D3A39D824A82E11E9AFA7AC1A1D67',
    },
    {
        name: 'Red Onion',
        price: 59,
        imageUrl: 'https://cdn.dodostatic.net/static/Img/Ingredients/000D3A22FA54A81411E9AFA60AE6464C',
    },
    {
        name: 'Juicy Pineapples',
        price: 59,
        imageUrl: 'https://cdn.dodostatic.net/static/Img/Ingredients/000D3A21DA51A81211E9AFA6795BA2A0',
    },
    {
        name: 'Italian Herbs',
        price: 39,
        imageUrl:
        'https://cdn.dodostatic.net/static/Img/Ingredients/370dac9ed21e4bffaf9bc2618d258734.png',
    },
    {
        name: 'Sweet Bell Peppers',
        price: 59,
        imageUrl: 'https://cdn.dodostatic.net/static/Img/Ingredients/000D3A22FA54A81411E9AFA63F774C1B',
    },
    {
        name: 'Feta Cheese Cubes',
        price: 79,
        imageUrl: 'https://cdn.dodostatic.net/static/Img/Ingredients/000D3A39D824A82E11E9AFA6B0FFC349',
    },
    {
        name: 'Meatballs',
        price: 79,
        imageUrl:
        'https://cdn.dodostatic.net/static/Img/Ingredients/b2f3a5d5afe44516a93cfc0d2ee60088.png',
    },
].map((obj, index) => ({ id: index + 1, ...obj }));

async function up() {
    await prisma.user.createMany({
        data: [
            {
                fullName: 'User',
                email: 'user@test.com',
                password: hashSync('111111', 10),
                verified: new Date(),
                role: 'USER',
            },
            {
                fullName: 'Admin',
                email: 'admin@test.com',
                password: hashSync('111111', 10),
                verified: new Date(),
                role: 'ADMIN',
            },
        ],
    });

    await prisma.category.createMany({
        data: [
            {
                name: 'Pizzas',
            },
            {
                name: 'Breakfast',
            },
            {
                name: 'Snacks',
            },
            {
                name: 'Cocktails',
            },
            {
                name: 'Drinks',
            },
        ],
    });

    await prisma.product.createMany({
        data: [
            {
                name: 'Omelette with Ham and Mushrooms',
                imageUrl:
                'https://media.dodostatic.net/image/r:292x292/11EE7970321044479C1D1085457A36EB.webp',
                categoryId: 2,
            },
            {
                name: 'Omelette with Pepperoni',
                imageUrl:
                'https://media.dodostatic.net/image/r:292x292/11EE94ECF33B0C46BA410DEC1B1DD6F8.webp',
                categoryId: 2,
            },
            {
                name: 'Coffee Latte',
                imageUrl:
                'https://media.dodostatic.net/image/r:292x292/11EE7D61B0C26A3F85D97A78FEEE00AD.webp',
                categoryId: 2,
            },
            {
                name: 'Denwich with Ham and Cheese',
                imageUrl:
                'https://media.dodostatic.net/image/r:292x292/11EE796FF0059B799A17F57A9E64C725.webp',
                categoryId: 3,
            },
            {
                name: 'Chicken Nuggets',
                imageUrl:
                'https://media.dodostatic.net/image/r:292x292/11EE7D618B5C7EC29350069AE9532C6E.webp',
                categoryId: 3,
            },
            {
                name: 'Baked Potatoes with Sauce 🌱',
                imageUrl:
                'https://media.dodostatic.net/image/r:292x292/11EED646A9CD324C962C6BEA78124F19.webp',
                categoryId: 3,
            },
            {
                name: 'Dodster',
                imageUrl:
                'https://media.dodostatic.net/image/r:292x292/11EE796F96D11392A2F6DD73599921B9.webp',
                categoryId: 3,
            },
            {
                name: 'Spicy Dodster 🌶️🌶️',
                imageUrl:
                'https://media.dodostatic.net/image/r:292x292/11EE796FD3B594068F7A752DF8161D04.webp',
                categoryId: 3,
            },
            {
                name: 'Banana Milkshake',
                imageUrl:
                'https://media.dodostatic.net/image/r:292x292/11EEE20B8772A72A9B60CFB20012C185.webp',
                categoryId: 4,
            },
            {
                name: 'Caramel Apple Milkshake',
                imageUrl:
                'https://media.dodostatic.net/image/r:292x292/11EE79702E2A22E693D96133906FB1B8.webp',
                categoryId: 4,
            },
            {
                name: 'Oreo Cookie Milkshake',
                imageUrl:
                'https://media.dodostatic.net/image/r:292x292/11EE796FA1F50F8F8111A399E4C1A1E3.webp',
                categoryId: 4,
            },
            {
                name: 'Classic Milkshake 👶',
                imageUrl:
                'https://media.dodostatic.net/image/r:292x292/11EE796F93FB126693F96CB1D3E403FB.webp',
                categoryId: 4,
            },
            {
                name: 'Irish Cappuccino',
                imageUrl:
                'https://media.dodostatic.net/image/r:292x292/11EE7D61999EBDA59C10E216430A6093.webp',
                categoryId: 5,
            },
            {
                name: 'Caramel Cappuccino',
                imageUrl:
                'https://media.dodostatic.net/image/r:292x292/11EE7D61AED6B6D4BFDAD4E58D76CF56.webp',
                categoryId: 5,
            },
            {
                name: 'Coconut Latte',
                imageUrl:
                'https://media.dodostatic.net/image/r:292x292/11EE7D61B19FA07090EE88B0ED347F42.webp',
                categoryId: 5,
            },
            {
                name: 'Americano',
                imageUrl:
                'https://media.dodostatic.net/image/r:292x292/11EE7D61B044583596548A59078BBD33.webp',
                categoryId: 5,
            },
            {
                name: 'Coffee Latte',
                imageUrl:
                'https://media.dodostatic.net/image/r:292x292/11EE7D61B0C26A3F85D97A78FEEE00AD.webp',
                categoryId: 5,
            },
        ],
    });

    await prisma.ingredient.createMany({
        data: ingredients,
    });

    const pizza1 = await prisma.product.create({
        data: {
            name: 'Pepperoni Fresh',
            imageUrl:
                'https://media.dodostatic.net/image/r:233x233/11EE7D61304FAF5A98A6958F2BB2D260.webp',
            categoryId: 1,
            ingredients: {
                connect: ingredients.slice(0, 5),
            },
        },
    });

    const pizza2 = await prisma.product.create({
        data: {
            name: 'Cheese',
            imageUrl:
                'https://media.dodostatic.net/image/r:233x233/11EE7D610CF7E265B7C72BE5AE757CA7.webp',
            categoryId: 1,
            ingredients: {
                connect: ingredients.slice(5, 10),
            },
        },
    });

    const pizza3 = await prisma.product.create({
        data: {
            name: 'Chorizo Fresh',
            imageUrl:
                'https://media.dodostatic.net/image/r:584x584/11EE7D61706D472F9A5D71EB94149304.webp',
            categoryId: 1,
            ingredients: {
                connect: ingredients.slice(10, 40),
            },
        },
    });

    await prisma.productItem.createMany({
        data: [
            // Пицца "Пепперони фреш"
            generateProductItem({ productId: pizza1.id, pizzaType: 1, size: 20 }),
            generateProductItem({ productId: pizza1.id, pizzaType: 2, size: 30 }),
            generateProductItem({ productId: pizza1.id, pizzaType: 2, size: 40 }),

            // Пицца "Сырная"
            generateProductItem({ productId: pizza2.id, pizzaType: 1, size: 20 }),
            generateProductItem({ productId: pizza2.id, pizzaType: 1, size: 30 }),
            generateProductItem({ productId: pizza2.id, pizzaType: 1, size: 40 }),
            generateProductItem({ productId: pizza2.id, pizzaType: 2, size: 20 }),
            generateProductItem({ productId: pizza2.id, pizzaType: 2, size: 30 }),
            generateProductItem({ productId: pizza2.id, pizzaType: 2, size: 40 }),

            // Пицца "Чоризо фреш"
            generateProductItem({ productId: pizza3.id, pizzaType: 1, size: 20 }),
            generateProductItem({ productId: pizza3.id, pizzaType: 2, size: 30 }),
            generateProductItem({ productId: pizza3.id, pizzaType: 2, size: 40 }),

            // Остальные продукты
            generateProductItem({ productId: 1 }),
            generateProductItem({ productId: 2 }),
            generateProductItem({ productId: 3 }),
            generateProductItem({ productId: 4 }),
            generateProductItem({ productId: 5 }),
            generateProductItem({ productId: 6 }),
            generateProductItem({ productId: 7 }),
            generateProductItem({ productId: 8 }),
            generateProductItem({ productId: 9 }),
            generateProductItem({ productId: 10 }),
            generateProductItem({ productId: 11 }),
            generateProductItem({ productId: 12 }),
            generateProductItem({ productId: 13 }),
            generateProductItem({ productId: 14 }),
            generateProductItem({ productId: 15 }),
            generateProductItem({ productId: 16 }),
            generateProductItem({ productId: 17 }),
        ],
    });

    await prisma.cart.createMany({
        data: [
            {
                userId: 1,
                totalAmount: 0,
            },
            {
                userId: 2,
                totalAmount: 0,
            },
        ],
    });

    await prisma.cartItem.create({
        data: {
            productItemId: 1,
            cartId: 1,
            userId: 1,
            quantity: 1,
            pizzaSize: 20,
            ingredients: {
                connect: [{ id: 1 }, { id: 2 }, { id: 3 }],
            },
        },
    });

    await prisma.story.createMany({
        data: [
            {
                previewImageUrl:
                'https://cdn.inappstory.ru/story/xep/xzh/zmc/cr4gcw0aselwvf628pbmj3j/custom_cover/logo-350x440.webp?k=IgAAAAAAAAAE&v=3101815496',
            },
            {
                previewImageUrl:
                'https://cdn.inappstory.ru/story/km2/9gf/jrn/sb7ls1yj9fe5bwvuwgym73e/custom_cover/logo-350x440.webp?k=IgAAAAAAAAAE&v=3074015640',
            },
            {
                previewImageUrl:
                'https://cdn.inappstory.ru/story/quw/acz/zf5/zu37vankpngyccqvgzbohj1/custom_cover/logo-350x440.webp?k=IgAAAAAAAAAE&v=1336215020',
            },
            {
                previewImageUrl:
                'https://cdn.inappstory.ru/story/7oc/5nf/ipn/oznceu2ywv82tdlnpwriyrq/custom_cover/logo-350x440.webp?k=IgAAAAAAAAAE&v=38903958',
            },
            {
                previewImageUrl:
                'https://cdn.inappstory.ru/story/q0t/flg/0ph/xt67uw7kgqe9bag7spwkkyw/custom_cover/logo-350x440.webp?k=IgAAAAAAAAAE&v=2941222737',
            },
            {
                previewImageUrl:
                'https://cdn.inappstory.ru/story/lza/rsp/2gc/xrar8zdspl4saq4uajmso38/custom_cover/logo-350x440.webp?k=IgAAAAAAAAAE&v=4207486284',
            },
        ],
    });

    await prisma.storyItem.createMany({
        data: [
            {
                storyId: 1,
                sourceUrl:
                'https://cdn.inappstory.ru/file/dd/yj/sx/oqx9feuljibke3mknab7ilb35t.webp?k=IgAAAAAAAAAE',
            },
            {
                storyId: 1,
                sourceUrl:
                'https://cdn.inappstory.ru/file/jv/sb/fh/io7c5zarojdm7eus0trn7czdet.webp?k=IgAAAAAAAAAE',
            },
            {
                storyId: 1,
                sourceUrl:
                'https://cdn.inappstory.ru/file/ts/p9/vq/zktyxdxnjqbzufonxd8ffk44cb.webp?k=IgAAAAAAAAAE',
            },
            {
                storyId: 1,
                sourceUrl:
                'https://cdn.inappstory.ru/file/ur/uq/le/9ufzwtpdjeekidqq04alfnxvu2.webp?k=IgAAAAAAAAAE',
            },
            {
                storyId: 1,
                sourceUrl:
                'https://cdn.inappstory.ru/file/sy/vl/c7/uyqzmdojadcbw7o0a35ojxlcul.webp?k=IgAAAAAAAAAE',
            },
        ],
    });
}

async function down() {
   // Define an array of table names to be truncated
    const tables = [
        'User', 'Product', 'Ingredient', 'Order', 'ProductItem',
        'VerificationCode', 'Category', 'Cart', 'CartItem', 'Story', 'StoryItem'
    ];

    // Start a try block to handle potential errors during execution
    try {
        // Iterate over each table name in the tables array
        for (const table of tables) {
            // Execute a raw SQL command to truncate the current table
            // This will remove all records and reset the auto-incrementing primary key
            // The CASCADE option ensures that related foreign key constraints are also addressed
            await prisma.$executeRawUnsafe(`TRUNCATE TABLE "${table}" RESTART IDENTITY CASCADE;`);
        }
    } catch (error) {
        // If an error occurs, log it to the console with a descriptive message
        console.error('Error truncating tables:', error);
        
        // Re-throw the error to allow higher-level error handling
        throw error; // re-throw to let the calling function handle it
    }
}

async function main() {
    try {
        await down();
        await up();
    } catch (e) {
        console.error(e);
    }
}

main()
    .then(async () => {
        await prisma.$disconnect();
    })
    .catch(async (e) => {
        console.error(e);
        await prisma.$disconnect();
        process.exit(1);
    });
