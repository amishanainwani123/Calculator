function calculate(operator){

    let num1=document.getElementById("num1").value;
    let num2=document.getElementById("num2").value;
    let result=document.getElementById("result");

    if(num1==="" || num2===""){
        result.innerHTML="Please enter both values";
        return;
    }

    num1=Number(num1);
    num2=Number(num2);

    if(isNaN(num1) || isNaN(num2)){
        result.innerHTML="Invalid input";
        return;
    }

    let ans;

    switch(operator){

        case "+":
            ans=num1+num2;
            break;

        case "-":
            ans=num1-num2;
            break;

        case "*":
            ans=num1*num2;
            break;

        case "/":
            if(num2===0){
                result.innerHTML="Error";
                return;
            }
            ans=num1/num2;
            break;
    }

    result.innerHTML=`Result: ${ans}`;
}