
const GetKladr = {

  getKladrArray(term){
     return fetch(`/kladr/${term}`)
    .then(res => {return res.json()})
  }

  /*getKladrArray(term){
    return
      })
  }*/

};

export default GetKladr;
