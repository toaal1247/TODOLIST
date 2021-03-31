var toDoForm = document.querySelector(".js-toDoForm"); //html에서 필요한 것을 얻다 = qureySelector
var toDoInput = toDoForm.querySelector("input");
var toDoList = document.querySelector(".js-toDoList");
var completion = document.querySelector(".js-complecated");

var TODOS_ARRAY_NAME = "toDos";
var CLEANTODOS_ARRAY_NAME = "done";

var toDos = []; // 할 일이 생성되었을 때 array에 추가
var doneList = []; // finishButton을 누른 li를 넣어둔다

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


//함수 completedList : 완료한 항목들을 넣은 배열을 localstorage에 저장한다
function completedWork(){

    localStorage.setItem(CLEANTODOS_ARRAY_NAME,JSON.stringify(doneList)); // 완료한 항목들을 모은 배열을 localstorage에 저장 

} 


// 함수 loadDoneList : localstorage에 저장된 배열을 불러오고 각각의 text를 그릴 수 있도록 함수 호출
function loadDoneList(){
    var loadedDoneList = localStorage.getItem(CLEANTODOS_ARRAY_NAME); // 완료한 항목들을 모은 배열을 localstorage에서 가져온다

    if( loadedDoneList != null){
        var parsedDoneList = JSON.parse(loadedDoneList);    

        parsedDoneList.forEach(function(done){
            paintDone(done.text);
        });           

    }
}

// 함수 paintDone : finish버튼을 누른 li를 다시 화면에 보여주며 객체로 만들어 doneList라는 배열에 넣는다
function paintDone(text){

    var li = document.createElement("li"); 
    var delButton=document.createElement("button"); 
    delButton.innerText = "❌"; 
    var span = document.createElement("span"); 
    span.innerText=text;
    var newid = doneList.length + 1 ; 
    li.appendChild(delButton);
    li.appendChild(span); 
    li.id = newid;
    completion.appendChild(li); 

    var doneObj = {
        text: text,
        id : newid
    };

    doneList.push(doneObj);

    completedWork(doneList);

    delButton.addEventListener("click",deleteDone);

}

// 함수 deleteDone : del버튼을 누른 li를 화면에서 지우고 다시 doneList를 만들어 새롭게 저장한다. 
function deleteDone(event){

    var button = event.target;
    var li = button.parentNode;
    completion.removeChild(li);

    var againDone = doneList.filter(function(done){
        return done.id !== parseInt(li.id)
    });

    doneList = againDone;
    completedWork();
}


 ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  

//함수 deleteToDo : li안에 있는 delButton을 눌렀을 때 li를 지우는 함수 
function deleteToDo(event){

    //화면에서만 지운다 (localstorage에는 그대로)
    var button = event.target; // 클릭된 delButton을 가져온다
    var li = button.parentNode; // 위에서 가져온 delButton 즉 button의 부모 element를 가져온다
    toDoList.removeChild(li); // toDoList: html에서 ul , removeChild: 자식 element를 화면에서 삭제

    li.removeChild(button); // 📌를 지워준다.
    var span = li.innerText; // 📌가 없어져 안에 글자만 남아있다.
    paintDone(span);

    //지워지고 남은 배열
    var againToDos = toDos.filter(function(toDo){ 
        return toDo.id !== parseInt(li.id); // toDo.id(베열 toDos)에서 li.id(delButton을 누른 것)와 다른 것을 반환해줌
    });

    toDos = againToDos; //againToDos를 다시 toDos에 넣어준다
    saveToDos(); // 다시 저장

}

//함수 saveToDos : toDos 배열을 localstorage에 저장 (자바스크립트의 데이터는 저장 X , 타입을 string으로 변환)
function saveToDos(){
    //localStorage.setItem(key:string ,value:string)
    localStorage.setItem(TODOS_ARRAY_NAME,JSON.stringify(toDos)); // JSON.stringify() = string으로 변환
}

// 함수 paintToDo : consloe과 document에 li들을 보여준다
function paintToDo(text){
    console.log(text);
    var li = document.createElement("li"); // html에서 엘리멘트(li) 생성
    var finishButton=document.createElement("button"); // html에서 엘리먼트 (button) 생성
    finishButton.innerText = "📌"; // 버튼 값 = X
    var span = document.createElement("span"); // html에서 엘리먼트 (span) 생성
    span.innerText=text;
    var newid = toDos.length + 1 ; // 0부터가 아닌 1부터 시작하도록 만든다
    li.appendChild(finishButton);
    li.appendChild(span); // 무언가를 그것의 father element넣는 것 = appendChild
    li.id = newid; // html에 li의 id를 생성 , 삭제할 때 어떤 것을 삭제할 지 알기 위해
    toDoList.appendChild(li); // toDoList = html에서 ul에 준 class

    // object = 객체 (key : value)
    var toDosObj = {
        text: text,
        id : newid
    };

    toDos.push(toDosObj); // doDos라는 배열에 toDoObj이라는 객체를 추가해준다

    saveToDos();

    finishButton.addEventListener("click",deleteToDo);
}

// 함수 handleSumit : submit이 실행될 때 refresh방지 
function handleSubmit(event){
    event.preventDefault(); // submit은 form안에 있는 input 등을 전송 > refresh ( refresh를 방지 = preventDefault )
    var currentValue = toDoInput.value; // currentValue = html에서 input에 들어온 값
    paintToDo(currentValue); // input에 들어온 값을 보내며 paintToDo 함수 실행
    toDoInput.value=""; // input에 들어온 값을 보내고 다시 빈 상태로 돌리기
}

// 함수 loadToDos : localStorage에서 toDos배열 가져오기
function loadToDos(){
    //getItem(key:string)
    var loadedToDos = localStorage.getItem(TODOS_ARRAY_NAME); 
    if (loadedToDos !== null){
        var parsedToDos = JSON.parse(loadedToDos); //JSON.parse = string을 object로 바꿔준다
        console.log(parsedToDos);
        // forEach = for문과 같이 반복적으로 수행, 각각의 object를 거쳐간다. (function(element)는 필수)
        parsedToDos.forEach(function(toDo){
            paintToDo(toDo.text);
        });           
    }
}

//함수 init : 가장 첫번째로 실행되는 함수
function init(){
    loadToDos(); 
    loadDoneList();
    toDoForm.addEventListener("submit", handleSubmit); // document내에 특정요소에 event를 등록할때 사용 = addEventListener
}


 ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


init(); // 첫번재로 함수 init() 실행