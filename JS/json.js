function pronounceWord(word) {
    const utterance = new SpeechSynthesisUtterance(word);
    utterance.lang = 'en-EN'; // Japanese
    window.speechSynthesis.speak(utterance);
  }

function removeActiveClass(){
    const activeButtons= document.getElementsByClassName("active");

    for (const btn of activeButtons) {
        btn.classList.remove("active");
    }
    

}


function loadlesson(){
    fetch("https://openapi.programming-hero.com/api/levels/all")
    .then((response)=>response.json())
    .then((data)=>{
        displaylesson(data.data)
    })
}

function loadlessonbox(){
    fetch("https://openapi.programming-hero.com/api/words/all")
    .then((response)=>response.json())
    .then((data)=>{
        displaylessonboxs(data.data)
    })
}

const loadcategorybox=(id)=>{

    const lessonboxContainer = document.getElementById("lessonbox-container");

    lessonboxContainer.innerHTML = `
        <div class="col-span-full flex justify-center items-center py-5">
            <div>
            <span class="loading loading-dots loading-xs"></span>
            <span class="loading loading-dots loading-sm"></span>
            <span class="loading loading-dots loading-md"></span>
            <span class="loading loading-dots loading-lg"></span>
            </div>
        </div>
    `;



    fetch(`https://openapi.programming-hero.com/api/level/${id}`)
    .then((response)=>response.json())
    .then((data)=>{
        removeActiveClass();
        const clickedbutton= document.getElementById(`btn-${id}`);
        clickedbutton.classList.add("active")
        //displaylessonboxs(data.data);
        setTimeout(() => {
            displaylessonboxs(data.data);
        },300);
    });
}

const loadmodalData =(id)=> {
    const modalBody= document.getElementById("modal_body");
    modalBody.innerHTML="";

    fetch(`https://openapi.programming-hero.com/api/word/${id}`)
    .then((response)=>response.json())
    .then((data)=>{

        const modalmeaning = data.data.meaning ? data.data.meaning : "অর্থ নেই";

        const synonymsData=data.data.synonyms.map(synonym =>`
            <span class="btn btn-outline">${synonym}</span>
            `).join('');
       
       modalBody.innerHTML=`
            <h2 class="text-xl font-bold">${data.data.word} (<span class="font-mono"><i class="fa-solid fa-microphone-lines"></i>: ${data.data.pronunciation}</span>)</h2>
              <p class="font-bold mt-2">Meaning</p>
              <p>${modalmeaning}</p>
              
              <p class="font-bold mt-2">Example</p>
              <p>${data.data.sentence}</p>
              
              <p class="font-bold mt-2">সমার্থক শব্দ গুলো</p>
              <div class="flex gap-4 mt-2">
                ${synonymsData}
              </div>
       `;
        
    })
}


function displaylesson(lessons){
   
    const lessonbtnContainer=document.getElementById('lessonbtn-container');
 
    for (let lessn of lessons) {
    
    const lessonDiv=document.createElement('div');
    lessonDiv.innerHTML=`
    
    <button id="btn-${lessn.level_no}" onclick="loadcategorybox(${lessn.level_no})" class="btn border-[#422AD5] border-2 text-[#422AD5] hover:bg-[#422AD5] hover:text-white" ><img src="assets/fa-book-open.png" alt="">Lesson-${lessn.level_no}</button>
    
    `;
 
    lessonbtnContainer.append(lessonDiv);
    }
 
 }


 const displaylessonboxs=(lessonboxs)=>{
    const lessonboxContainer= document.getElementById('lessonbox-container');
    lessonboxContainer.innerHTML="";

    if(lessonboxs.length==0){
        lessonboxContainer.innerHTML=`
        <div class="col-span-full text-center flex flex-col justify-center items-center">
                <img src="assets/alert-error.png" alt="">
                <h3 class="text-sm font-normal">এই Lesson এ এখনো কোন Vocabulary যুক্ত করা হয়নি।</h3>
                <h2 class="text-3xl font-medium">নেক্সট Lesson এ যান</h2>
            </div> 
        `;
        return;
    }

    lessonboxs.forEach((lessonbox) => {
       

        const lessonCard=document.createElement('div');

        const meaningText = lessonbox.meaning ? lessonbox.meaning : "অর্থ নেই";

        lessonCard.innerHTML=`
         <div class="card mx-auto bg-white  p-5 text-center space-y-4 hover:bg-cyan-100">
            <h2 class="text-2xl font-bold">${lessonbox.word}</h2>
            <p class="text-sm text-gray-500">Meaning /Pronounciation</p>
            <p class="text-xl font-semibold text-gray-800">"${meaningText} /${lessonbox.pronunciation}"</p>
            <div class="flex justify-between items-center mt-4">
                <button onclick="my_modal_1.showModal(),loadmodalData(${lessonbox.id})" class="btn btn-ghost btn-circle">
                    <i class="fa-solid fa-info"></i>
                </button>
                <button onclick="pronounceWord('${lessonbox.word}')" class="btn btn-ghost btn-circle">
                    <i class="fa-solid fa-volume-high"></i>
                </button>
            </div>
        </div>
        `;
        lessonboxContainer.append(lessonCard)
    });
 }

 




loadlesson();