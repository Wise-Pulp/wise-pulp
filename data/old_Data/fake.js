
  function fixDates(BadlyFormattedDate) {
	  var regEx = BadlyFormattedDate.replace(/\-/g, '++');
	  console.log('this is regex', regEx);
	  regEx = regEx.replace(/\//g, '++');
	  console.log('this is regex2', regEx);
  	  var storage = [];
	  var results = '';
	  var temp = regEx.split('++');
    storage.push(temp[1], temp[2], temp[0]);
    
	  results = storage.join('-').toString();
	  console.log(JSON.stringify(results));
  	
	  return Date.parse(results);
	  // return results;
  }
