
const GetKladr = {

  getKladrArray(term){
     return fetch(`/kladr/${term}`)
    .then(res => {return res.json()})
  }

  /*getKladrArray(term){
     return fetch(`/kladr/${term}`)
    .then(response => response.json())
    .then(parsedJSON => console.log(parsedJSON.results))
    .catch(error => console.log('error'))
      })
  }*/

};

export default GetKladr;
