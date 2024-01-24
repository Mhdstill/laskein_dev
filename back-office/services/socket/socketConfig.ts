import autoUpdateListArticle from './article.socket';
import autoUpdateListBanner from './banner.socket';
import autoUpdateListBox from './box.socket';
import autoUpdateListBoxParams from './boxParams.socket';
import autoUpdateListBoxType from './boxType.socket';
import autoUpdateListCategory from './category.socket';
import autoUpdateGameList from './game.socket';
import autoUpdateListHistorical from './historical.socket';
import autoUpdateListMember from './member.socket';
import autoUpdateListModel from './model.socket';
import autoUpdateListNewsLetter from './newsLetter.socket';
import autoUpdateListOffer from './offer.socket';
import autoUpdateListOrder from './order.socket';
import autoUpdateOuterTransactionList from './outerTransaction.socket';
import autoUpdateListPermission from './permission.socket';
import autoUpdateListPost from './post.socket';
import autoUpdateListPrice from './price.socket';
import autoUpdateListProvider from './provider.socket';
import autoUpdateListRole from './role.socket';
import autoUpdateListSubCategory from './subCategory.socket';
import autoUpdateListSubscription from './subscription.socket';
import autoUpdateListTemoignage from './temoignage.socket';
import autoUpdateTransactionList from './transaction.socket';
import autoUpdateListUnitySize from './unitySize.socket';
import autoUpdateListUtilisateur from './utilisateur.socket';

const socketConfig = [
  {
    namespace: '/provider',
    events: [{ name: 'sync-list-provider', action: autoUpdateListProvider }],
  },
  {
    namespace: '/article',
    events: [{ name: 'sync-list-article', action: autoUpdateListArticle }],
  },
  {
    namespace: '/price',
    events: [{ name: 'sync-list-price', action: autoUpdateListPrice }],
  },
  {
    namespace: '/category',
    events: [{ name: 'sync-list-category', action: autoUpdateListCategory }],
  },
  {
    namespace: '/sub-category',
    events: [
      { name: 'sync-list-sub-category', action: autoUpdateListSubCategory },
    ],
  },
  {
    namespace: '/box',
    events: [{ name: 'sync-list-box', action: autoUpdateListBox }],
  },
  {
    namespace: '/box-type',
    events: [{ name: 'sync-list-box-type', action: autoUpdateListBoxType }],
  },
  {
    namespace: '/user',
    events: [{ name: 'sync-list-user', action: autoUpdateListUtilisateur }],
  },
  {
    namespace: '/offer',
    events: [{ name: 'sync-list-order', action: autoUpdateListOrder }],
  },
  {
    namespace: '/temoignage',
    events: [
      { name: 'sync-list-temoignage', action: autoUpdateListTemoignage },
    ],
  },
  {
    namespace: '/offer',
    events: [{ name: 'sync-list-offer', action: autoUpdateListOffer }],
  },
  {
    namespace: '/subscription',
    events: [
      { name: 'sync-list-subscription', action: autoUpdateListSubscription },
    ],
  },
  {
    namespace: '/models',
    events: [{ name: 'sync-list-models', action: autoUpdateListModel }],
  },
  {
    namespace: '/permission',
    events: [
      { name: 'sync-list-permission', action: autoUpdateListPermission },
    ],
  },
  {
    namespace: '/role',
    events: [{ name: 'sync-list-role', action: autoUpdateListRole }],
  },
  {
    namespace: '/historical',
    events: [
      { name: 'sync-list-historical', action: autoUpdateListHistorical },
    ],
  },
  {
    namespace: '/unity-size',
    events: [{ name: 'sync-list-unity-size', action: autoUpdateListUnitySize }],
  },
  {
    namespace: '/news-letter',
    events: [
      { name: 'sync-list-news-letter', action: autoUpdateListNewsLetter },
    ],
  },
  {
    namespace: '/post',
    events: [{ name: 'sync-list-post', action: autoUpdateListPost }],
  },
  {
    namespace: '/banner-image',
    events: [{ name: 'sync-list-banner-image', action: autoUpdateListBanner }],
  },

  {
    namespace: '/box-params',
    events: [{ name: 'sync-list-box-params', action: autoUpdateListBoxParams }],
  },
  {
    namespace: '/user',
    events: [{ name: 'sync-list-user', action: autoUpdateListMember }],
  },
  {
    namespace: '/game',
    events: [{ name: 'sync-list-game', action: autoUpdateGameList }],
  },
  {
    namespace: '/transaction',
    events: [{ name: 'sync-transaction', action: autoUpdateTransactionList }],
  },
  {
    namespace: '/outer-transaction',
    events: [
      {
        name: 'sync-outer-transaction',
        action: autoUpdateOuterTransactionList,
      },
    ],
  },
];

export default socketConfig;
