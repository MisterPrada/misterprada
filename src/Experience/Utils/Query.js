import url from 'fast-url-parser';
import defaultConfig from '../DefaultConfig';
// url.queryString = require('querystringparser');

class Query
{
    constructor()
    {
        this.parseQuery();
    }
    parseQuery()
    {
		this.debug = true;
		this.config = defaultConfig;
    }
}
export default new Query();
