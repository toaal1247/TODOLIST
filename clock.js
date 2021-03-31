

function clock(){

    var date = new Date(); //현재 시간과 날짜를 가지는 객체 리턴

    var h = date.getHours();
    var m = date.getMinutes();
    var s = date.getSeconds();

    // 삼항 조건 연산자를 이용해서 ex) 01시, 06시 등을 만들 수 있게 함
    // javascript에서는 string+int 허용한다 단, 비교할 땐 불가능
    var hour = h<10 ? "0"+h : h;
    var minute = m<10? "0"+m : m;
    var second = s<10? "0"+s : s;

    var nowTime = document.getElementById("nowTime"); // html파일에서 id가 nowtime인 것을 가져온다
         
    nowTime.innerText = hour + ":" + minute + ":" + second ; 

    setInterval(clock,1000); //1초마다 함수 clock을 실행
    
}
