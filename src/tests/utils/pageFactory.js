import {LaunchApp} from '../pageObjects/LaunchApplication';
import PageUtils from './Pageutils';

function getPages(page) {
  return {
    launchApp: new LaunchApp(page),
    pageUtils:new PageUtils(page)
  };
}

export default getPages;
