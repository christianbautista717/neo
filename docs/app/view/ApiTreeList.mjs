import TreeList from '../../../src/list/TreeList.mjs';

/**
 * @class Docs.app.view.ApiTreeList
 * @extends Neo.list.TreeList
 */
class ApiTreeList extends TreeList {
    static getConfig() {return {
        /**
         * @member {String} className='Docs.app.view.ApiTreeList'
         * @private
         */
        className: 'Docs.app.view.ApiTreeList',
        /**
         * @member {String} ntype='api-treelist'
         * @private
         */
        ntype: 'api-treelist'
    }}

    /**
     *
     */
    onConstructed() {
        super.onConstructed();

        let me = this;

        Neo.Xhr.promiseJson({
            url: Neo.config.isExperimental ?
                '../docs/output/structure.json' :
                '../../docs/output/structure.json'
        }).then(data => {
            let vdom     = me.vdom,
                itemRoot = me.getListItemsRoot();

            me.store.items = data.json;
            itemRoot = me.createItems(null, itemRoot, 0);

            me.vdom = vdom;
        });
    }
}

Neo.applyClassConfig(ApiTreeList);

export {ApiTreeList as default};