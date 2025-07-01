export namespace main {
	
	export class Question {
	    word: string;
	    translation: string;
	
	    static createFrom(source: any = {}) {
	        return new Question(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.word = source["word"];
	        this.translation = source["translation"];
	    }
	}

}

