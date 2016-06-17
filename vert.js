/**
 * Vert
 */
import  jsmediatags from "jsmediatags";
// import  iconv from 'iconv-lite';

const file = process.argv[2];
if(!file) process.exit(1);

console.log('Use :', file);


class Convert{
	vert(t){
		const type = Object.prototype.toString.call(t);
		switch (type) {
			
			// str
			case '[object String]':
				return t
					.split('/')
					.map(v => {return new Buffer(v, 'binary').toString()})
					.join('/');
			
			// array
			case '[object Array]':
				return t.map( v => {return this.vert(v) } )
			
			// object
			case '[object Object]':
				const keys = Object.keys(t);
				return keys.reduce( (o,v) => { o[v] = this.vert(t[v]); return o },{})
			default:
				console.log('type:', type);
				return t
		}
	}
}
const con = new Convert()

const convert = (tag)=>{
	const con = new Convert();
	console.log('from:', JSON.stringify( tag, null, ' '));
	console.log('to:', JSON.stringify( con.vert(tag), null, ' ') );
}


jsmediatags.read( file, {
	onSuccess: convert,
	onError: (error) =>{ console.log(':(', error.type, error.info);},
});

// test
// const str = 'test';
// const str = ['test'];
// const str = { test : 'test' };
// console.log(con.vert(str));


// // 866 cp1251 koi8r win1251
// function cnv (str){
// 	return iconv.decode( new Buffer(str, 'binary'), 'utf8');
// }

// jsmediatags.read("./02 - Мумий Тролль - Прости, Киска!.mp3", {
//   onSuccess: function(tag) {

//     console.log( tag.tags );
//     console.log('---result----');
//     console.log( {
//     tags:{
//     	TIT2: tag.tags.TIT2.map( function(t){
//     		t.data = cnv(t.data);
//     		return t}),
//     }});
//   onError: function(error) {
//     console.log(':(', error.type, error.info);
//   }
// });
