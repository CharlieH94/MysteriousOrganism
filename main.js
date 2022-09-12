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

// Factory Function

const pAequorFactory = (specimenNum, dna) => {
  return {
    specimenNum,
    dna,
    mutate(){
      let randBase = returnRandBase();
      // console.log(`randBase = ${randBase}`);
      let mutantIndex = Math.floor(Math.random() * this.dna.length); 
      // console.log(`mutatingBase = ${this.dna[mutantIndex]}`);
      while (randBase === this.dna[mutantIndex]){
        randBase = returnRandBase();
      }
      // console.log(`randBase = ${randBase}`);
      this.dna[mutantIndex] = randBase;
      // console.log(`mutatingBase = ${this.dna[mutantIndex]}`);

      return this.dna;
    },
    compareDNA(otherPAequor){
      let counter = 0;
      for (let i = 0; i < this.dna.length; i++) {
        if (otherPAequor.dna[i] === this.dna[i]) {
          counter += 1;
        } 
      }
      const sharedDNAPercent = (counter / this.dna.length) * 100;
      const sharedDNARounded = sharedDNAPercent.toFixed(2);
      return `Specimen numbers ${this.specimenNum} and ${otherPAequor.specimenNum} have ${sharedDNARounded}% DNA in common.`;  
    },
    willLikelySurvive(){
      const baseCorG = this.dna.filter(base => base === 'C' || base === 'G');
      if (baseCorG.length / this.dna.length >= 0.6) {
        return true;
      }
      return false;
    }
  }
};

let survivingStrands = [];
let specimenNumber = 1;
while(survivingStrands.length < 30){
  let specimenToTest = pAequorFactory(specimenNumber, mockUpStrand());
  if (specimenToTest.willLikelySurvive()) {
    survivingStrands.push(specimenToTest);
  }
  specimenNumber++;
}

// const pAequor = pAequorFactory(12, ['A', 'T', 'C', 'G', 'A', 'T', 'C', 'G', 'A', 'T', 'C', 'G', 'A', 'T', 'C']);

// console.log(pAequor.dna);
// let mutantTest = pAequor.mutate();
// console.log(mutantTest);

// const otherPAequor = pAequorFactory(11, [ 'A', 'T', 'C', 'G', 'A', 'T', 'T', 'G', 'A', 'T', 'C', 'G', 'A', 'T', 'C' ])
// console.log(pAequor.compareDNA(otherPAequor));

// const willSurvive = pAequorFactory(10, ['C','C','G','G','G','G','C','C','C','C','G','T','A','T','A'])
// console.log(willSurvive.willLikelySurvive());

console.log(survivingStrands);