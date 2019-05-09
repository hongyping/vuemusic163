const _baseUrl = 'http://musicapi.duapp.com/api.php';
const _baseUrl2 = 'https://api.imjad.cn/cloudmusic/';
const _baseUrl3 = 'http://musicapi.leanapp.cn/';
export default{
    getPlaylist(id){
        return _baseUrl2 + '?type=playlist&id=' + id;
    },
    getSong(id){
        return _baseUrl2 + '?type=song&id=' + id;
    },
    getSongDetail(id){
        return _baseUrl2 + '?type=detail&id=' + id;
    },
    getSongComment(id){
        return _baseUrl2 + '?type=comments&id=' + id;
    },
    getComment(url,id){
        return _baseUrl3 + 'comment/'+url+'?id=' + id;
    },
    getLyric(id){
        return _baseUrl2 + '?type=lyric&id=' + id;
    },
    getSearch(id){
        return _baseUrl2 + '?type=search&s=' + id;
        //return _baseUrl3 + 'search?keywords=' + id;
    },
    getSugest(id){
        return _baseUrl3 + 'search/suggest?keywords=' + id;
    },
    getUser(url,id){
        return _baseUrl3 + 'user/'+url+'?uid=' + id;
    }
}