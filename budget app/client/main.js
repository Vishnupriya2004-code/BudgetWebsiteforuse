// YOUR JAVASCRIPT CODE FOR INDEX.HTML GOES HERE
var budget_bnt = document.getElementById("budget-btn");
var budget=document.getElementById("budget");
var t_budget=document.getElementById("total-budget");
var product_btn=document.getElementById("product-btn");
var title=document.getElementById("title");
var cost=document.getElementById("cost");
var expence_list=document.getElementById("expence-list");
var expence=document.getElementById("expence");
var balance=document.getElementById("balance");



budget_bnt.onclick=function(e){
    e.preventDefault();
    if(budget.value !=""){
        localStorage.setItem("budget",budget.value);
        location.href=location.href;

    }
    else{
        alert("Budget is empty!");

    }
}

product_btn.onclick=function(e){
    e.preventDefault();
    if(title.value!= "" && cost.value !=""){
        var p_title=title.value;
        var p_cost=cost.value;
        var data ={p_cost:p_cost,p_title:p_title};
        var string=JSON.stringify(data);
        localStorage.setItem("budget_"+title.value,string);
        location.href=location.href;
    }
    else{
        alert("Field is empty!");
    }
}

function all_data(){
    var i;
    for(i=0;i<localStorage.length;i++){
        var all_keys=localStorage.key(i);
        if (all_keys.match("budget_")){
            var json_data=localStorage.getItem(all_keys);
            var json_parse=JSON.parse(json_data);
            // expence_list.innerHTML='<div class="row mt-3 mb-3 b-border"><div class="col-md-6 mt-3 d-flex justify-content-between"><h5>'+json_parse.p_title+'</h5> <h5>'+json_parse.p_cost+'</h5></div><div class="col-md-6 mt-3 d-flex justify-content-end"><i class="fa fa-edit"></i>&nbsp;&nbsp;&nbsp; <i class="fa fa-trash" style="font-size: 25px;"></i></div></div>';
            var newRow = `
                <div class="row mt-3 mb-3 b-border">
                    <div class="col-md-6 mt-3 d-flex justify-content-between">
                        <h5>${json_parse.p_title}</h5> 
                        <h5 class="price">${json_parse.p_cost}</h5>
                    </div>
                    <div class="col-md-6 mt-3 d-flex justify-content-end">
                        <i class="fa fa-edit edit-btn"></i>&nbsp;&nbsp;&nbsp; 
                        <i class="fa fa-trash delete-btn" style="font-size: 25px;"></i>
                    </div>
                </div>`;
            
            // Append the new row to the list
            expence_list.innerHTML += newRow;
        }
    }

    var price_tag=document.getElementsByClassName("price");
    var price=[];
    for(i=0;i<price_tag.length;i++){
        price[i]=price_tag[i].innerHTML;
    }
    var price_int=[];
    for(i=0;i<price.length;i++){
        price_int.push(parseInt(price[i]));
    }
     
    var final_price=0;
    for(i=0;i<price_int.length;i++){
       final_price+=price_int[i];
    }
    expence.innerHTML=final_price;
    t_budget.innerHTML=localStorage.getItem("budget");
    var t_bgt=t_budget.innerHTML;
    var t_expenence=expence.innerHTML;
    balance.innerHTML=t_bgt-t_expenence;


    var delete_btn = document.getElementsByClassName("delete-btn");
for (i = 0; i < delete_btn.length; i++) {
    delete_btn[i].onclick = function () {
        var cnf = window.confirm("Do you want to delete it?");
        if (cnf) {
            // Correctly navigate to the title element
            var div_parent = this.closest('.row'); // Use closest to find the parent row
            var h5 = div_parent.querySelector('h5').innerText; // Get the title
            localStorage.removeItem("budget_" + h5);
            location.href = location.href; // Reload the page to reflect changes
        } else {
            alert("Your data is safe");
        }
    };
}


var edit_btn = document.getElementsByClassName("edit-btn");
for (i = 0; i < edit_btn.length; i++) {
    edit_btn[i].onclick = function () {
        var cnf = window.confirm("Do you want to update it?");
        if (cnf === true) {
            // Correctly navigate to the title and price elements
            var col_parent = this.closest('.row');
            var h5_data = col_parent.querySelector('h5').innerText;
            var h5_price = col_parent.querySelector('.price').innerText;

            // Set the form values
            title.value = h5_data;
            cost.value = h5_price;
            title.focus();
            product_btn.innerHTML = "Update your data";
            product_btn.style.background = "red";

            // Update logic on button click
            product_btn.onclick = function (e) {
                e.preventDefault();
                localStorage.removeItem("budget_" + h5_data);
                var p_title = title.value;
                var p_cost = cost.value;
                var data = { p_cost: p_cost, p_title: p_title };
                var string = JSON.stringify(data);
                localStorage.setItem("budget_" + title.value, string);
                location.href = location.href; // Reload the page
            };
        } else {
            alert("Your data is safe");
        }
    };
}

           // Clear All Data Button
     var clear_btn = document.getElementById("clear-btn");
     clear_btn.onclick = function () {
     var cnf = window.confirm("Are you sure you want to clear all data?");
     if (cnf) {
        localStorage.clear(); // Clear all localStorage
        location.href = location.href; // Reload the page
    }
};



}
    
all_data();