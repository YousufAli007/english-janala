const loadLesson =() =>{
    fetch('https://openapi.programming-hero.com/api/levels/all') //promise 
    .then( res => res.json()) // promise response 
    .then(json => displayLesson(json.data))
}
const lessonWord =(id) =>{
    fetch(`https://openapi.programming-hero.com/api/level/${id}`)
   .then(res =>res.json())
  .then(json => displayWord(json.data))
  
}

// {
//     "id": 5,
//     "level": 1,
//     "word": "Eager",
//     "meaning": "আগ্রহী",
//     "pronunciation": "ইগার"
// }

const displayWord = word =>{
    console.log(word)
    const lessonWord =document.getElementById('lesson-word');
    lessonWord.innerHTML ='';

    word.forEach( word =>{
        const divWord =document.createElement('div');
        divWord.innerHTML= `
          <div class=" pt-10 pb-5 px-5 shadow-sm text-center bg-white rounded-md  space-y-3">
            <h1 class="text-[22px] font-bold">${word.word}</h1>
            <p class="">Meaning/ Prnounciation</p>
            <h3 class="text-[22px] font-semibold bangla-font"> ${word.meaning}/ ${word.pronunciation}"</h3>
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