const loadLesson =() =>{
    fetch('https://openapi.programming-hero.com/api/levels/all') //promise 
    .then( res => res.json()) // promise response 
    .then(json => displayLesson(json.data))
}


// word add section

const lessonWord =(id) =>{
    fetch(`https://openapi.programming-hero.com/api/level/${id}`)
   .then(res =>res.json())
  .then(json => displayWord(json.data))
  
}


//  condition 




const displayWord = word =>{
    // console.log(word)
    const lessonWord =document.getElementById('lesson-word');
    lessonWord.innerHTML ='';

    if(word.length ===0){
        lessonWord.innerHTML = `
        <div class="  text-center col-span-full .bangla-font space-y-5">

        <img class="mx-auto" src="./assets/alert-error.png" alt="">
            <p class="text-gray-400  font-semibold"> এই Lesson এ এখনো কোনো vocabularies  যুক্ত করা হয়নি</p>
            <h1 class="text-3xl font-bold"> নেক্সট  Lesson যান</h1>
         </div>
        
        
        `;
    }


    
    word.forEach( word =>{
        const divWord =document.createElement('div');
        divWord.innerHTML= `
        <div class=" pt-10 pb-5 px-5 shadow-sm text-center bg-white rounded-md  space-y-3">
            <h1 class="text-[22px] font-bold">${word.word ? word.word :"শব্দ পাওয়া যাইনি"}</h1>
            <p class="">Meaning/ Prnounciation</p>
            <h3 class="text-[22px] font-semibold bangla-font"> ${word.meaning ?word.meaning :'অর্থ পাওয়া যাইনি'}/ ${word.pronunciation ?word.pronunciation:"pronunciation পাওয়া যাইনি"}"</h3>
            <div class="flex justify-between items-center">
            <button class="btn bg-[#1a91ff1a] hover:bg-[#1A91FF80]"><i class="fa-solid fa-circle-info"></i></button>
            <button class="btn bg-[#1A91FF10] hover:bg-[#1A91FF80] "><i class="fa-solid fa-volume-high"></i></button>
            </div>
            </div>
            
            `
            lessonWord.appendChild(divWord);
        })
    }
    
    
    
    const displayLesson =(lessons =>{
        //  1, get the container & empty
    // console.log(lessons);
    const lessonContainer =document.getElementById('lesson-container');
    lessonContainer.innerHTML = '';
    for(const lesson of lessons){
        // create Element
        const divBtn = document.createElement('div');
        divBtn.innerHTML= `
              <button onclick="lessonWord(${lesson.level_no})" class="btn btn-outline btn-primary"> <i class="fa-solid fa-book-open"></i>Lesson - ${lesson.level_no}<button>
        
        `
        lessonContainer.appendChild(divBtn);
    }

    

})
loadLesson()




