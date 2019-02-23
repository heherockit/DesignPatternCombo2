import ProxyBase from '../ProxyBase';
import { ServiceProxyConfig } from '../../../configuration';

class ArticleProxy extends ProxyBase {
  posts() {
    return this.get({});
  }

  postsError() {
      return this.get({});
  }
}

const articleProxy = new ArticleProxy(ServiceProxyConfig.CMS.Article.ServiceUrl);
export default articleProxy;
