// import * as _ from 'lodash';

// _.chunk(2);

const NUM = 45;

interface Cat {
	name: String,
	sex: String
}

function touchCat(cat: Cat) {
	console.log(cat.name);
}

touchCat({
	name: 'test-name',
	sex: 'test-sex'
});

export {};
