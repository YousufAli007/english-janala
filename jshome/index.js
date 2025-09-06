const crateElement =(arry) =>{
    const htmElements= arry.map(x => `<span class="btn"> ${x}</span>`)
    return htmElements.join(' ') 
}



// {
//     "id": 101,
//     "level_no": 1,
//     "lessonName": "Basic Vocabulary"
// }

const loadLesson =() =>{
    fetch('https://openapi.programming-hero.com/api/levels/all') //promise 
    .then( res => res.json()) // promise response 
    .then(json => displayLesson(json.data))
     
}
// {
//     "id": 19,
//     "level": 1,
//     "word": "Sincere",
//     "meaning": "সত্‍ / আন্তরিক",
//     "pronunciation": "সিনসিয়ার"
// }


// word add section

const lessonWord =(id) =>{
    fetch(`https://openapi.programming-hero.com/api/level/${id}`)
   .then(res =>res.json())
  .then(json => {
    displayWord(json.data);
    // console.log(json.data)
    removeBg()
    const btnActive =document.getElementById(`btn-click${id}`);
    btnActive.classList.add('active');
  })
  
}

// {
//     "word": "Cautious",
//     "meaning": "সতর্ক",
//     "pronunciation": "কশাস",
//     "level": 2,
//     "sentence": "Be cautious while crossing the road.",
//     "points": 2,
//     "partsOfSpeech": "adjective",
//     "synonyms": [
//         "careful",
//         "alert",
//         "watchful"
//     ],
//     "id": 3
// }



//  wrod Details 

 const wordDetails = async (id) =>{
    const url =`https://openapi.programming-hero.com/api/word/${id}`
     const res = await fetch(url);
     const data =await res.json();
    displayDetails(data.data)
 }

 const displayDetails =word =>{
     const wordDetailsClick = document.getElementById('word-details');
     wordDetailsClick.innerHTML =`
         <div>
      <h1 class="text-3xl font-bold">${word.word} (<i class="fa-solid fa-microphone-lines"></i>:${word.pronunciation})</h1>
     </div>
     <div>
      <h1 class="text-[20px] font-semibold">Meaning</h1>
      <p>${word.meaning}</p>
     </div>
     <div>
      <h1 class="text-[20px] font-semibold">Example</h1>
      <p>${word.sentence}</p>
     </div>
     <div>
      <h1 class="text-[20px] font-semibold">Meaning</h1>
      <p>আগ্রহী</p>
     </div>

     <div>
      <h1 class="text-[20px] font-semibold">সমার্থক শব্দ গুলো</h1>
       <div> ${crateElement(word.synonyms)}</div>
     </div>
     `

     document.getElementById('my_modal').showModal()
 }

// remove Lesson bg
const removeBg =() =>{
    const remove =document.querySelectorAll('.btn-remove');
    // console.log(remove);
    remove.forEach(x => x.classList.remove('active') )
}
// spinner 

const manageSpinner =status=>{
    if(status === true){
        document.getElementById('spinner').classList.remove('hidden');
        document.getElementById('lesson-word').classList.add('hidden');
    }
    else{
        document.getElementById('spinner').classList.add('hidden');
        document.getElementById('lesson-word').classList.remove('hidden');
    }
}


//  condition 

const displayWord = word =>{
    // console.log(word)
     manageSpinner(true)
    const lessonWords =document.getElementById('lesson-word');
    lessonWords.innerHTML ='';

    if(word.length ===0){
        lessonWords.innerHTML = `
        <div class="  text-center col-span-full .bangla-font space-y-5">

        <img class="mx-auto" src="./assets/alert-error.png" alt="">
            <p class="text-gray-400  font-semibold"> এই Lesson এ এখনো কোনো vocabularies  যুক্ত করা হয়নি</p>
            <h1 class="text-3xl font-bold"> নেক্সট  Lesson যান</h1>
         </div>
        `; 
        manageSpinner(false)
        return
    }
 

    
    word.forEach( word =>{
        const divWord =document.createElement('div');
        divWord.innerHTML= `
        <div class=" pt-10 pb-5 px-5 shadow-sm text-center bg-white rounded-md  space-y-3">
            <h1 class="text-[22px] font-bold">${word.word ? word.word :"শব্দ পাওয়া যাইনি"}</h1>
            <p class="">Meaning/ Prnounciation</p>
            <h3 class="text-[22px] font-semibold bangla-font"> ${word.meaning ?word.meaning :'অর্থ পাওয়া যাইনি'}/ ${word.pronunciation ?word.pronunciation:"pronunciation পাওয়া যাইনি"}"</h3>
            <div class="flex justify-between items-center">

            <button onclick="wordDetails(${word.id})" class="btn bg-[#1a91ff1a] hover:bg-[#1A91FF80]"><i class="fa-solid fa-circle-info"></i></button>

            <button class="btn bg-[#1A91FF10] hover:bg-[#1A91FF80] "><i class="fa-solid fa-volume-high"></i></button>
            </div>
            </div>
            
            `
            lessonWords.appendChild(divWord);
        })
      manageSpinner(false)
    }
    
    
    
    const displayLesson = lessons =>{
        //  1, get the container & empty
    // console.log(lessons);
    const lessonContainer =document.getElementById('lesson-container');
    lessonContainer.innerHTML = '';
    for(const lesson of lessons){
        // create Element
        const divBtn = document.createElement('div');
        divBtn.innerHTML= `
              <button id="btn-click${lesson.level_no}" onclick="lessonWord(${lesson.level_no})" class="btn btn-outline btn-primary btn-remove"> <i class="fa-solid fa-book-open"></i>Lesson - ${lesson.level_no}<button>
        
        `
        lessonContainer.appendChild(divBtn);
    }

    

}
loadLesson()




