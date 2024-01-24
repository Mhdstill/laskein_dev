import {
  EnumStatusGame,
  EnumStatusTransaction,
  EnumTypeMode,
  EnumTypeTransaction,
  ITransaction,
  IUser,
} from 'src/app/store/user/user.interface';

export const transactionInstance: ITransaction = {
  type: EnumTypeTransaction.DEPOSIT,
  date: '2023-08-29T12:00:00Z',
  amount: 50.99,
  status: EnumStatusTransaction.PENDING,
  walletId: 'wallet456',
  shoppingCart: {
    winningDate: '2023-08-30T12:00:00Z',
    game: {
      id: 'game789',
      reference: 'game-ref-123',
      startDate: '2023-08-28T00:00:00Z',
      endDate: '2023-08-31T23:59:59Z',
      status: EnumStatusGame.RUNNING,
      article: {
        reference: 'article-xyz',
        designation: 'Sample Article',
        type: EnumTypeMode.MAN,
        size: 'L',
        color: 'Blue',
        productUrl: 'https://example.com/sample-article',
        observation: 'No special observations',
        winningChance: 0.05,
        providerId: 'provider-abc',
        unitySizeid: 'size-123',
        subCategoryId: 'subcategory-456',
        boxId: 'box123',
      },
    },
    userId: 'user123',
    transaction: {} as ITransaction, // Placeholder, circular reference needs to be resolved
  },
  bankId: 'bank789',
};

export function getRandomProductName() {
  const adjectives = [
    'Cool',
    'Sleek',
    'Elegant',
    'Modern',
    'Stylish',
    'Luxury',
    'Classic',
    'Unique',
    'Chic',
  ];
  const nouns = [
    'Watch',
    'Shoes',
    'Bag',
    'Phone',
    'Laptop',
    'Camera',
    'Dress',
    'Sunglasses',
    'Headphones',
  ];
  const randomAdjective =
    adjectives[Math.floor(Math.random() * adjectives.length)];
  const randomNoun = nouns[Math.floor(Math.random() * nouns.length)];
  return `${randomAdjective} ${randomNoun}`;
}
