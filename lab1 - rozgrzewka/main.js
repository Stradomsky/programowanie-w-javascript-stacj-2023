function calculate(){
    

    let a = parseInt(document.querySelector("#a").value);
    let b = parseInt(document.querySelector("#b").value);
    let c = parseInt(document.querySelector("#c").value);
    let d = parseInt(document.querySelector("#d").value);

    let sum = a + b + c + d;
    let sred = (a + b + c + d) / 4;
    let min = Math.min(a, b, c, d);
    let max = Math.max(a, b, c, d);

    document.getElementById("sum").value = sum;
    document.getElementById("sred").value = sred;
    document.getElementById("min").value = min;
    document.getElementById("max").value = max;
}

let inputs = document.querySelectorAll("input");
inputs.forEach(input => input.addEventListener("change", calculate));
