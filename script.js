const operatorSymbols={"+":"+","-":"−","*":"×","/":"÷"};

function calculate(operator){
    let num1=document.getElementById("num1").value;
    let num2=document.getElementById("num2").value;
    if(num1==="" || num2===""){
        showResult("Please enter both values");
        return;
    }
    num1=Number(num1);
    num2=Number(num2);
    if(isNaN(num1) || isNaN(num2)){
        showResult("Invalid input");
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
                showResult("Cannot divide by zero");
                return;
            }
            ans=num1/num2;
            break;
    }
    showResult(`Result: ${ans}`);
    addHistory(`${num1} ${operatorSymbols[operator]} ${num2} = ${ans}`);
}

function showResult(text){
    const result=document.getElementById("result");
    result.innerHTML=text;
    result.classList.remove("pulse");
    void result.offsetWidth;
    result.classList.add("pulse");
}

function applyTheme(theme){
    document.documentElement.setAttribute("data-theme", theme);
    document.getElementById("themeIcon").textContent = theme === "dark" ? "☀️" : "🌙";
    localStorage.setItem("calculatorTheme", theme);
}

function toggleTheme(){
    const icon=document.getElementById("themeIcon");
    const current = document.documentElement.getAttribute("data-theme") === "dark" ? "dark" : "light";
    applyTheme(current === "dark" ? "light" : "dark");
    icon.classList.remove("spin");
    void icon.offsetWidth;
    icon.classList.add("spin");
}

function goToHistory(){
    document.getElementById("pages").classList.add("show-history");
}

function goToCalculator(){
    document.getElementById("pages").classList.remove("show-history");
}

function addRipple(e){
    const button=e.currentTarget;
    const circle=document.createElement("span");
    const diameter=Math.max(button.clientWidth, button.clientHeight);
    const radius=diameter/2;
    const rect=button.getBoundingClientRect();
    circle.style.width=circle.style.height=`${diameter}px`;
    circle.style.left=`${e.clientX-rect.left-radius}px`;
    circle.style.top=`${e.clientY-rect.top-radius}px`;
    circle.classList.add("ripple");
    const existing=button.querySelector(".ripple");
    if(existing) existing.remove();
    button.appendChild(circle);
    circle.addEventListener("animationend", () => circle.remove());
}

function getHistory(){
    try{
        return JSON.parse(localStorage.getItem("calculatorHistory")) || [];
    }catch(e){
        return [];
    }
}

function addHistory(entry){
    const history=getHistory();
    history.unshift(entry);
    if(history.length>20) history.length=20;
    localStorage.setItem("calculatorHistory", JSON.stringify(history));
    renderHistory();
}

function clearHistory(){
    localStorage.removeItem("calculatorHistory");
    renderHistory();
}

function renderHistory(){
    const list=document.getElementById("historyList");
    const history=getHistory();
    list.innerHTML="";
    if(history.length===0){
        const empty=document.createElement("li");
        empty.className="history-empty";
        empty.textContent="No calculations yet";
        list.appendChild(empty);
        return;
    }
    history.forEach(entry=>{
        const li=document.createElement("li");
        li.textContent=entry;
        list.appendChild(li);
    });
}

(function initTheme(){
    const saved = localStorage.getItem("calculatorTheme");
    const prefersDark = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
    applyTheme(saved ? saved : (prefersDark ? "dark" : "light"));
})();

document.querySelectorAll("button").forEach(btn => {
    btn.addEventListener("click", addRipple);
});

renderHistory();