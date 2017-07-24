import {browser, by, element} from 'protractor';

describe('UMS', () => {

  /**
   * Home redirect
   */

  it('Home redirect', () => {
    browser.get('/');

    browser.getCurrentUrl().then((actualUrl) => {
      expect(actualUrl.indexOf("/search") !== -1).toEqual(true);
    });
  });

  /**
   * Top menu
   */

  it('Users button', () => {
    element(by.css('a.mat-button[routerlink="/users"]')).click().then(() => {
      browser.getCurrentUrl().then((actualUrl) => {
        expect(actualUrl.indexOf("/users") !== -1).toEqual(true);
      });
    });
  });

  it('Groups button', () => {
    element(by.css('a.mat-button[routerlink="/groups"]')).click().then(() => {
      browser.getCurrentUrl().then((actualUrl) => {
        expect(actualUrl.indexOf("/groups") !== -1).toEqual(true);
      });
    });
  });

  it('Search button', () => {
    element(by.css('a.mat-icon-button[routerlink="/search"]')).click().then(() => {
      browser.getCurrentUrl().then((actualUrl) => {
        expect(actualUrl.indexOf("/search") !== -1).toEqual(true);
      });
    });
  });

  /**
   * Home page
   */

  it('Home search', () => {});

  it('Home users pagination', () => {});

  it('Home groups pagination', () => {});

  /**
   * User list page
   */

  it('Users list search', () => {});

  it('Users list pagination', () => {});

  it('Users list delete user', () => {});

  it('Users list user detail page', () => {});

  it('Users list new user page', () => {});

  /**
   * User detail page
   */

  it('User detail page search', () => {});

  it('User detail page pagination', () => {});

  it('User detail page filter groups', () => {});

  it('User detail page toggle groups', () => {});

  it('User detail page back', () => {});

  it('User detail page delete', () => {});

  it('User detail page group detail page', () => {});

  /**
   * New user page
   */

  it('New user page for validation', () => {});

  it('New user page create user', () => {});

  it('New user page back', () => {});

  /**
   * Group list page
   */

  it('Groups list search', () => {});

  it('Groups list pagination', () => {});

  it('Groups list delete group', () => {});

  it('Groups list group detail page', () => {});

  it('Groups list new group page', () => {});

  /**
   * Group detail page
   */

  it('Group detail page search', () => {});

  it('Group detail page pagination', () => {});

  it('Group detail page filter users', () => {});

  it('Group detail page toggle users', () => {});

  it('Group detail page back', () => {});

  it('Group detail page delete', () => {});

  it('Group detail page user detail page', () => {});

  /**
   * New group page
   */

  it('New group page for validation', () => {});

  it('New group page create group', () => {});

  it('New group page back', () => {});

  /**
   * Offline mode
   */

  it('Home page', () => {});

  it('Users list page', () => {});

  it('User detail page', () => {});

  it('New user page', () => {});

  it('Groups list page', () => {});

  it('Group detail page', () => {});

  it('New group page', () => {});
});
