const crateElement =(arry) =>{
    const htmElements= arry.map(x => `<span class="btn"> ${x}</span>`)
    console.log(htmElements.join(' '))
}
const array =["hello","hi","by"];
crateElement(array);