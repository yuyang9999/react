


import Fetch_util from './fetch_utilis';

class Profiles_reqs {
    static getProfiles(cb) {
        Fetch_util.fetchGetRequest("http://localhost:8080/api/profiles", null, cb);
    }

    static createProfile(pname, cb) {
        Fetch_util.fetchGetRequest("http://localhost:8080/api/profile_add", {pname: pname}, cb);
    }

    static deleteProfile(pname, cb) {
        Fetch_util.fetchPostRequest("http://localhost:8080/api/profile_delete", {pname: pname}, null, cb);
    }

    static getProfileStocks(pname, cb) {
        Fetch_util.fetchGetRequest("http://localhost:8080/api/profile_symbols", {pname: pname}, cb);
    }

    static getSymbolSuggestions(sname, cb) {
        Fetch_util.fetchGetRequest("http://localhost:8080/api/queryStocks", {symbol: sname}, cb);
    }

    static createNewProfileStock(pname, stock_symbol, share, price, date, cb) {
        Fetch_util.fetchPostRequest("http://localhost:8080/api/profile_symbol_add", {pname:pname,
            sname:stock_symbol,
            share: share,
            price: price,
            bought_date: date
        }, null, cb);
    }

    static deleteProfileStock(pname, stock_id, cb) {
        Fetch_util.fetchPostRequest("http://localhost:8080/api/profile_symbol_delete", {pname: pname, profile_stock_id:stock_id}, null, cb);
    }

    static getStockHisotory(sname, cb) {
        Fetch_util.fetchGetRequest("http://localhost:8080/api/stockHistory", {symbol:sname}, cb);
    }
}




export default Profiles_reqs;