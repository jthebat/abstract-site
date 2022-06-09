class Site { 
    constructor() {
        this.boards = [];
    }

    addBoard(board){
       for (let i = 0; i<this.boards.length; i++){ // 배열을 돌면서 확인
           if (board.name === this.boards[i].name){ // 하나의 Site에 동일한 이름의 Board를 추가할 수 없다
               throw new Error('중복입니다.') // 에러처리
           }
       }
       board.registerCheck = true //  board 등록 확인용 플래그
       this.boards.push(board) // board push 
    }

    findBoardByName(name){
        for (let i=0; i<this.boards.length; i++) { // 배열을 돌면서 확인
            if (name === this.boards[i].name) return this.boards[i] //Board name이 일치하는 것이 있으면 해당 Board를 반환 (찾고자 한 Board)        
        }
    }
}

class Board {
    constructor(name) {
        this.name = name 
        this.registerCheck = false
        this.articles = []; 
        if (name === null || name === '' ){
            throw new Error('Error!');
        }
    }

    publish(article){
        const date = new Date()

        if (this.registerCheck === false) { //Site 등록여부를 확인
            throw new Error('Error!'); //  Site 에 추가된 Board만 사용 가능한 것으로 간주하며 사용 불가능한 Board에는 Article을 추가할 수 없다.
        }
         // 규칙은 ${board.name}-${랜덤 값} 를 따른다.
        article.id = `${this.name}-${Math.floor(Math.random())} ` // ID 규칙을 따른다.
        article.createdDate = date.toISOString() //Board에 Article을 추가할 때 Article에 작성 일자가 들어가야 한다.
        article.registerCheck = true  
        this.articles.push(article) 
    }

    getAllArticles(){
        return this.articles //작성된 Article 목록을 조회 할 수 있어야 한다.
    }
}

class Article {
    constructor(article){
        //Article은 subject, content, author 3개의 데이터를 포함해야 하며 null 또는 빈 문자열("")은 허용하지 않는다.
        this.subject = article.subject; 
        this.content = article.content;
        this.author = article.author;

        this.comments = [] 
        this.registerCheck = false

        if (article.subject === '' || article.subject === null) {
                throw new Error('Error!');
        }else if (article.content === '' || article.content === null) {
                throw new Error('Error!');
        }else if (article.author === '' || article.author === null) {
                throw new Error('Error!');
        }
    }

    reply(comment){
        const date = new Date()
        //Board에 추가된 Article만 사용 가능한 것으로 간주하며 사용 불가능한 Article에는 Comment를 추가할 수 없다.
        if (this.registerCheck == false) {
            throw new Error('Error!')
        }
      

        comment.createdDate = date.toISOString() //Article에 Comment를 추가할 때 Comment에 작성 일자가 들어가야 한다
        comment.registerCheck = true //Board에 추가된 Article만 사용 가능한 것으로 간주하며 사용 불가능한 Article에는 Comment를 추가할 수 없다. (4 ms)
        this.comments.push(comment) //Comment는 n개 이상 추가 할 수 있다. 
    }
    getAllComments(){
        return this.comments //작성된 Comment 목록을 조회 할 수 있어야 한다. 
    }
}

class Comment {
    constructor(comment){
        this.comment = comment.content
        this.author = comment.author

        //Comment는 content, author 2개의 데이터를 포함해야 하며 null 또는 빈 문자열("")은 허용하지 않는다.
        if (comment.content === '' || null) {
            throw new Error('Error!');
        }else if (comment.author === '' || null){
            throw new Error('Error!');
        }
    }
}

module.exports = {
    Site,
    Board,
    Article,
    Comment,
};