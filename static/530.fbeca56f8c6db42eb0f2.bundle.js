webpackJsonp([530],{1495:function(module,exports){module.exports="import eyes from 'eyes.it';\nimport {breadcrumbsTestkitFactory, getStoryUrl, waitForVisibilityOf} from '../../testkit/protractor';\n\ndescribe('Breadcrumbs', () => {\n  const storyUrl = getStoryUrl('Core', 'Breadcrumbs');\n\n  eyes.it('should display breadcrumbs', () => {\n    const driverNoLinks = breadcrumbsTestkitFactory({dataHook: 'story-breadcrumbs-no-links'});\n    const driverWithLinks = breadcrumbsTestkitFactory({dataHook: 'story-breadcrumbs-with-links'});\n\n    const breadcrumbsItems = ['first item', 'second item', 'third item'];\n    const breadcrumbsLinkItems = ['Wix', 'Google', 'Yahoo'];\n\n    browser.get(storyUrl);\n\n    waitForVisibilityOf([driverNoLinks.element(), driverWithLinks.element()], 'Cannot find Breadcrumbs')\n    .then(() => {\n      breadcrumbsItems.map((item, idx) =>\n        expect(driverNoLinks.breadcrumbContentAt(idx)).toBe(item)\n      );\n\n      breadcrumbsLinkItems.map((item, idx) =>\n        expect(driverWithLinks.breadcrumbContentAt(idx)).toBe(item)\n      );\n    });\n  });\n\n  eyes.it('should show active item once clicked upon', () => {\n    const driver = breadcrumbsTestkitFactory({dataHook: 'story-breadcrumbs-active'});\n    const breadcrumbsItems = ['first item', 'second item', 'third item'];\n    const itemToSelect = 2;\n\n    browser.get(storyUrl);\n\n    waitForVisibilityOf(driver.element(), 'Cannot find Breadcrumbs')\n    .then(() => {\n      breadcrumbsItems.map((item, idx) =>\n        expect(driver.breadcrumbContentAt(idx)).toBe(item)\n      );\n\n      expect(driver.getActiveItemId()).toBe(-1);\n      driver.clickBreadcrumbAt(itemToSelect);\n      expect(driver.getActiveItemId()).toBe(itemToSelect);\n    });\n  });\n\n  it('should call func on item click', () => {\n    const driver = breadcrumbsTestkitFactory({dataHook: 'story-breadcrumbs-onclick'});\n    const breadcrumbsItems = ['first item', 'second item', 'third item'];\n    const idxToClick = 1;\n\n    browser.get(storyUrl);\n\n    waitForVisibilityOf(driver.element(), 'Cannot find Breadcrumbs')\n    .then(() => {\n      breadcrumbsItems.map((item, idx) =>\n        expect(driver.breadcrumbContentAt(idx)).toBe(item)\n      );\n\n      driver.clickBreadcrumbAt(idxToClick);\n      const EC = protractor.ExpectedConditions;\n      browser.wait(EC.alertIsPresent(), 10000, 'Alert is not getting present :(')\n        .then(() => {\n          expect(browser.switchTo().alert().getText()).toBe(`clicked element is: {\"id\":\"${idxToClick + 1}\",\"value\":\"${breadcrumbsItems[idxToClick]}\"}`);\n          browser.switchTo().alert().accept();\n        });\n    });\n  });\n});\n"}});