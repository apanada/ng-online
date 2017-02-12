import { OnlineExaminationPage } from './app.po';

describe('online-examination App', function() {
  let page: OnlineExaminationPage;

  beforeEach(() => {
    page = new OnlineExaminationPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
