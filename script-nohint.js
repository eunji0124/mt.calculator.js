// 전역 변수 선언
let currentInput = '0';  // 현재 입력된 값
let previousInput = '';  // 이전 값
let operation = null;    // 현재 연산자
let shouldResetScreen = false;  // 화면을 리셋해야 하는지 여부
let history = [];  // 히스토리 값 받아올 배열

// 디스플레이 업데이트 함수 - 화면 채우기
function updateDisplay() {
    const display = document.getElementById('display');
    display.textContent = currentInput;
}

// 입력 값 삭제 버튼 기능 - 화면 비우기
function clearDisplay() {
    currentInput = '0';
    previousInput = '';
    operation = null;
    shouldResetScreen = false;
    updateDisplay();
}

// JS-1: 숫자 입력 함수 구현
function appendNumber(number) {
    //화면 리셋하고 값 넣기
    if(shouldResetScreen){
        currentInput = number;
        //화면 비우지않기 처리
        shouldResetScreen = false;
    }else if(currentInput === '0'){ //입력되어있는값이 0이면 number 받기
        currentInput = number;
    }else{ //입력되어있는값이 있으면 뒤에 number 붙이기
        currentInput += number;
    }
    //화면에 업데이트 함
    updateDisplay();
    
}

// JS-2: 연산자 입력 함수 구현
function appendOperator(op) {
    //이전에 연산자가 있으면 이전 연산 계산 처리
    if(operation !== null && !shouldResetScreen ){
        calculate();
    }
    //입력된 값 이전 값으로 옮기기
    previousInput = currentInput;
    //받은 연산자 저장하기
    operation = op;
    //화면 비우기 처리
    shouldResetScreen = true;
    
}

// JS-3: 계산 함수 구현
function calculate() {
    // 연산자가 없으면 리턴
    // 입력된 값이 없으면 리턴
    if( operation === '' || previousInput === '' || currentInput === '') {
        return
    }
    //입력받은 문자 값 숫자로 형 변환하기
    let prev =  Number(previousInput);
    let current =  Number(currentInput);
    let result;
    //연산자 연산 시키기
    switch(operation){
        case '+':
            result = prev + current
            break;
        case '-':
            result = prev - current
            break;
        case '*':
            result = prev * current
            break;
        case '/':
            //0으로 나누기 예외처리
            if(current === 0){
                alert('0으로 나눌 수 없습니다')
                return
            }
            result = prev / current
            break;
        default: return;
    }
    let historyList = `${prev} ${operation} ${current} = ${result}`;
    history.push(historyList);
    
    currentInput = result.toString();
    operation = null;
    previousInput = '';
    shouldResetScreen = true;

    updateDisplay();
    calculateHistory();
       
}

// JS-4: 소수점 추가 함수 구현 (도전 과제)
function appendDecimal() {
    // 여기에 코드 작성

}
// JS-6: 계산 히스토리(심화 문제)
function calculateHistory(){
    //값 넣을 위치 확인하기
    let historyDiv = document.getElementById('history');
    //요소 만들어서 추가하기
    historyDiv.innerHTML = history.map((calculatorList) => `<div class = 'history_list'>${calculatorList}</div>`).join('')
    //3개까지만 보이게 하기
    if(history.length > 3){
        history.shift();
    }
}

//다크모드
let body = document.body
let colorChange = document.getElementById('color_mode');
function toggleClass(obj, className) {
    obj.classList.toggle(className); 
}
colorChange.addEventListener('click', function() {
    toggleClass(body, 'dark');
});
// 초기 디스플레이 설정
updateDisplay();
