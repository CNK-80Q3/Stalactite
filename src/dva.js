import dva from 'dva';
import createHistory from 'history/createHashHistory';
// user BrowserHistory
// import createHistory from 'history/createBrowserHistory';

// 1. Initialize
const app = dva({
  history: createHistory(),
});