const inputBtn = document.getElementById("input-btn");
const deleteBtn = document.getElementById("delete-btn");
const inputEl = document.getElementById("input-el");
let myLeads = [];
const ulEl = document.getElementById("ul-el");
const tabBtn = document.getElementById("tab-btn");
const leadsFromStorage = JSON.parse(localStorage.getItem("myLeads"));


if(leadsFromStorage)
{
    myLeads = leadsFromStorage;
    render(myLeads);
}

function render(leads) {
    let listItems = "";
    for (let i = 0; i < leads.length; i++) 
    {
       listItems += `
       <li>
       <a target='_blank' href='${leads[i]}'>
       ${leads[i]}
       </a>
       </li>
       `       
    }
        ulEl.innerHTML = listItems;
}

inputBtn.addEventListener("click", function()
{
    myLeads.push(inputEl.value);
    render(myLeads);
    inputEl.value = '';
    localStorage.setItem("myLeads", JSON.stringify(myLeads));
    
})

deleteBtn.addEventListener("dblclick", function()
{
    localStorage.clear();
    myLeads = [];
    render(myLeads);
    
})


tabBtn.addEventListener("click", function()
{
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs)
    {
        myLeads.push(tabs[0].url);
        localStorage.setItem("myLeads", JSON.stringify(myLeads));
        render(myLeads);

    }) 
   

})



