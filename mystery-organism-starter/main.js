// Returns a random DNA base
const returnRandBase = () => {
  const dnaBases = ['A', 'T', 'C', 'G'];
  return dnaBases[Math.floor(Math.random() * 4)];
};

// Returns a random single stand of DNA containing 15 bases
const mockUpStrand = () => {
  const newStrand = [];
  for (let i = 0; i < 15; i++) {
    newStrand.push(returnRandBase());
  }
  return newStrand;
};


function pAequorFactory(specimenNum, dna) {
  return {
    specimenNum,
    dna,
    mutate() {
      const idxBaseToMutate = Math.floor(Math.random() * this.dna.length);
      let newBase;
      do {
          newBase = returnRandBase();  
      } while (newBase === this.dna[idxBaseToMutate]);
      return this.dna[idxBaseToMutate] = newBase;
    },
    compareDNA(pAequor) {
      const commonBases = this.dna.reduce((acc, currentBase, index) => {
        currentBase === pAequor.dna[index] ?  acc++ : acc;
      return acc;
     }, 0)

    const commonDNA = (commonBases / (this.dna.length) * 100).toFixed(2)
      console.log(`Specimen #${this.specimenNum} and specimen #${pAequor.specimenNum} have ${commonDNA}% DNA in common`);
      return commonDNA;
    },
    willLikelySurvive() {
      const numberOfGsOrCs = this.dna.reduce((acc, currentBase) => {
        currentBase === 'C' || currentBase === 'G' ? acc++ : acc;
          return acc;
      }, 0) / this.dna.length;
      return numberOfGsOrCs  > 0.6;
    },
    complementStrand() {
      const complementStrand = this.dna.map(base => {
        if(base === 'A'){
          return 'T';
        } else if(base === 'T') {
          return 'A';
        } else if(base === 'C') {
          return 'G';
        } else {
          return 'C';
        }
      });
      return complementStrand;
    }
  }
}

const pAequor1 = pAequorFactory(1, mockUpStrand());
console.log(pAequor1.dna);
console.log(pAequor1.complementStrand());
const pAequor2 = pAequorFactory(2, mockUpStrand(););
console.log(pAequor1.dna);
console.log(pAequor1.mutate());
console.log(pAequor1.dna);
console.log(pAequor2.dna);
console.log(pAequor1.willLikelySurvive());
console.log(pAequor2.willLikelySurvive());

const pAequorInstances = [];
let specimenNum = 0;

while(pAequorInstances.length < 30) {
  let pAequor = pAequorFactory(specimenNum, mockUpStrand());
  if(pAequor.willLikelySurvive()) {
    pAequorInstances.push(pAequor);
    specimenNum++;
  }
 }

 console.log(pAequorInstances.length)

 let twoMostRelated = 0;

const mostRelatedOrganisms = pAequorInstances.reduce((matchRecord, specimen, index) => {
  for(let i = index + 1; i < pAequorInstances.length; i++){
    let currentMatch = specimen.compareDNA(pAequorInstances[i]);
    if(currentMatch > twoMostRelated){
      twoMostRelated = currentMatch;
      matchRecord = {
        'specimen_1': specimen,
        'specimen_2': pAequorInstances[i],
        'match': currentMatch
      }
    }
  }
  return matchRecord;
}, {})

 console.log(mostRelatedOrganisms);


 for(let i = 0; i < pAequorInstances.length; i++) {
  console.log(pAequorInstances[i].willLikelySurvive());
 }


//  for(let i = 0; i < pAequorInstances.length; i++) {
//   console.log(pAequorInstances[i].dna);
//  }