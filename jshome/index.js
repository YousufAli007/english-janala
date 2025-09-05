const loadLesson =() =>{
    fetch('https://openapi.programming-hero.com/api/levels/all') //promise 
    .then( res => res.json()) // promise response 
    .then(json => displayLesson(json.data))
}

const displayLesson =(lessons =>{
    //  1, get the container & empty
    console.log(lessons);
    const lessonContainer =document.getElementById('lesson-container');
    lessonContainer.innerHTML = '';
    for(const lesson of lessons){
        // create Element
        const divBtn = document.createElement('div');
        divBtn.innerHTML= `
              <button  class="btn btn-outline btn-primary"> <i class="fa-solid fa-book-open"></i>Lesson - ${lesson.
level_no
}<button>
        
        `
        lessonContainer.appendChild(divBtn);
    }

    

})
loadLesson()