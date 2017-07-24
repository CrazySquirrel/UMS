import {InMemoryDbService} from 'angular-in-memory-web-api';

export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const users = [
      {
        id: 0,
        firstName: 'Sergey',
        lastName: 'Yastrebov',
        photo: 'https://pp.userapi.com/c628727/v628727924/1d646/a6Q1g25fH6Q.jpg',
        groups: {
          0: true
        }
      },
      {
        id: 1,
        firstName: 'Jürgen',
        lastName: 'Hofmeister',
        photo: 'https://inassets1-internationsgmbh.netdna-ssl.com/image/80_80/2007/10/16/0b0a7ae6049df50c256fb70acabd9903_jrgen_u_8088_u.jpg',
        groups: {
          1: true
        }
      },
      {
        id: 2,
        firstName: 'Caroline',
        lastName: 'Hayes',
        photo: 'https://inassets1-internationsgmbh.netdna-ssl.com/image/80_80/2007/09/27/53e2d9aeeb77a9899bc7b4da24d42d12_u_6981_hayes_caroline_testjpg_u_6981_u.jpg',
        groups: {
          2: true
        }
      },
    ];

    const groups = [
      {
        id: 0,
        name: 'Rambler&Co',
        logo: 'https://rambler-co.ru/templates/images/&_black.svg',
        users: {
          0: true
        }
      },
      {
        id: 1,
        name: 'Webprofy',
        logo: 'https://webprofy.ru/local/templates/webprofy/images/webprofy_logo@2x.png',
        users: {
          1: true
        }
      },
      {
        id: 2,
        name: 'KokocGroup',
        logo: 'http://kokocgroup.ru/bitrix/templates/kokoc/images/logotype@2x.png',
        users: {
          2: true
        }
      }
    ];

    return {
      users,
      groups
    };
  }
}
