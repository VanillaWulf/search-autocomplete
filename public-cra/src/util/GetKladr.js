
const GetKladr = {

  getKladrArray(term){
     return fetch(`/kladr/${term}`)
    .then(res => {
      return res.json();
    //  console.log(res.json());
    });
  }

};

export default GetKladr;
