import ServiceBase from '../ServiceBase';
import articleProxy from '../../proxies/CMS/ArticleProxy';

class ArticleService extends ServiceBase {

    getPosts() {
        return this.applyMemoryCache("posts")(() => articleProxy.posts());
    }

    getPostsError() {
        return this.retry(() => this.useCircuitBreaker('getPostsError')(() => this.applyMemoryCache('getPostsError')(() => articleProxy.postsError())));
    }
}

const articleService = new ArticleService();
export default articleService;
