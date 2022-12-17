/**
* listItemTemp is used to get the listItems section
* todosJson will hold the todos which will read from json file and is used to perform of all operations
*/
let listItemTemp = document.getElementById('listItems');
let todosJson = null;
let count = generateId();

/**  
 * This method used to generate a new id for new todo
 * @public */ 
function generateId(){
    if(todosJson && todosJson.length>0)
        return todosJson.length+1;
    else
        return 0;
}

/**  
 * This method used to create a todo item and set the status
 * @public */ 
function addTodoItem(todo){
    createListItem(todo.id,todo.title);
    if(todo.status === 'open')
        setCompleteAndResetStatus(todo.id, false);
    else
        setCompleteAndResetStatus(todo.id, true);
}

/**  
 * This method used to create the elements on the page and set event listeners for the buttons
 * @public 
 * @param {event} is used to get the target response*/ 
const load = (event) => {
    const target = event.target;
    if(target.status === 200){
        const responseText = target.responseText;
        todosJson = JSON.parse(responseText);
        todosJson.forEach(todo => addTodoItem(todo));
    }
    document.getElementById('All').addEventListener('change',completeAndResetAll);
    document.getElementById('clear').addEventListener('click', clearCompleted);
    let filters = document.getElementsByClassName('filterItem');
    for(let elem of filters)
        elem.addEventListener('click',this.setFilterStatus);
    document.getElementById('add').addEventListener('click', openPopup);
    document.getElementsByClassName('overlay')[0].addEventListener('click', closePopup);
    document.getElementById('save').addEventListener('click', addTask);
    document.getElementById('cancel').addEventListener('click', closePopup);
    document.getElementsByClassName('close')[0].addEventListener('click', closePopup);
}
/** this method is used to close the popup 
 * @public */ 
function closePopup()
{
    document.getElementsByTagName('body')[0].classList.remove('active-modal');
    document.getElementsByClassName('add-view-modal-container')[0].classList.remove('modal-show');
    document.getElementsByClassName('container-title')[0].getElementsByTagName('input')[0].value = '';
    document.getElementsByClassName('container-desc')[0].getElementsByTagName('input')[0].value = '';
    document.getElementsByClassName('container-date')[0].getElementsByTagName('input')[0].value = '';
    document.getElementsByClassName('container-time')[0].getElementsByTagName('input')[0].value = '';
    document.getElementsByClassName('container-status')[0].getElementsByTagName('select')[0].value = '';
    const inputNodes = document.getElementsByTagName('input');
    for(let i=0;i<inputNodes.length;i++){ 
        inputNodes[i].removeAttribute('disabled');
    }
    document.getElementsByTagName('select')[0].removeAttribute('disabled');
}
/** this method is used to open the popup 
 * @public */ 
function openPopup()
{
    document.getElementsByTagName('body')[0].classList.add('active-modal');
    document.getElementsByClassName('add-view-modal-container')[0].classList.add('modal-show');
    document.getElementsByClassName('buttonsSection')[0].setAttribute('style','display:block');
    document.querySelector('.add-view-modal h2').innerHTML = 'Add Task';
}

/** this method is used to set the filter status to active or completed or all 
 * @public */ 
function setFilterStatus(){
    let filters = document.getElementsByClassName('filterItem');
    for(let filter of filters)
        filter.classList.remove('selected');
    this.classList.add('selected');
    let elems = document.getElementById('list').getElementsByTagName('li');
    for(let i=0;i<elems.length;i++)
    {
        if(this.id == 'activeFilter' && !(elems[i].getAttribute('class')==null || elems[i].getAttribute('class')=="")) 
            elems[i].style.display = 'none';
        else if(this.id == 'completedFilter' && (elems[i].getAttribute('class')==null || elems[i].getAttribute('class')=="")) 
            elems[i].style.display = 'none';
        else
            elems[i].style.display = 'list-item';
    }
}

/** this method is used to create a new list Item by cloning the existing html node
 * @public 
 * @param {String} id is  used to set the id's of few elements in list item
 * @param {String} name is used to set the title of the list item */ 

function createListItem(id, name){
    let listItem = listItemTemp.cloneNode(true);
    listItem = listItem.innerHTML.replaceAll('ITEM_NAME',name).replaceAll('ITEM_ID',id);
    document.getElementById('list').innerHTML = document.getElementById('list').innerHTML + listItem;
    document.getElementById("AllLabel").style.display='inline-block';
    setFooter();
    document.getElementById('allFilter').classList.add('selected');
    setEventListeners();
}
/** this method is used to set the event listeners for the select, view and delete buttons of the list items
 * @public 
 */

function setEventListeners(){
    const selectNodes = document.querySelectorAll('.remove:not(#remove_ITEM_ID)');
    selectNodes.forEach(node => { node.addEventListener("click", function(){removeItem(node.parentElement.parentElement.getAttribute('id'));});} );
    const removeNodes = document.querySelectorAll('.round input:not(#checkbox_ITEM_ID)');
    removeNodes.forEach(node => { node.addEventListener("click", function(){completeAndResetItem(node.parentElement.parentElement.parentElement.getAttribute('id'), this.checked)}, false);} );
    const viewNodes = document.querySelectorAll('.viewIcon:not(#view_ITEM_ID)');
    viewNodes.forEach(node => { node.addEventListener("click", function(){viewTask(node.parentElement.parentElement.getAttribute('id'));});} );
}

/** this method is used to view the details of a list Item
 * @public 
 * @param {String} id is  used to get the listItem from the todosJson */
function viewTask(id){
    let todo = getTodoItem(parseInt(id));
    openPopup();
    document.getElementsByClassName('buttonsSection')[0].setAttribute('style','display:none');
    document.querySelector('.add-view-modal h2').innerHTML = 'View Task';
    document.getElementsByClassName('container-title')[0].getElementsByTagName('input')[0].value = todo.title;
    document.getElementsByClassName('container-desc')[0].getElementsByTagName('input')[0].value = todo.description;
    document.getElementsByClassName('container-date')[0].getElementsByTagName('input')[0].value = todo.due_date;
    document.getElementsByClassName('container-time')[0].getElementsByTagName('input')[0].value = todo.due_time;
    document.getElementsByClassName('container-status')[0].getElementsByTagName('select')[0].value = todo.status;
    const inputNodes = document.getElementsByTagName('input');
    for(let i=0;i<inputNodes.length;i++){ 
        inputNodes[i].setAttribute('disabled','disabled');
    }
    document.getElementsByTagName('select')[0].setAttribute('disabled','disabled');
}

/** this method is used to add a new Item to the todosJSON and also in the UI
 * @public 
 */

function addTask(){
    let close = true;
    let title = document.getElementsByClassName('container-title')[0].getElementsByTagName('input')[0].value;
    let description = document.getElementsByClassName('container-desc')[0].getElementsByTagName('input')[0].value;
    let date = document.getElementsByClassName('container-date')[0].getElementsByTagName('input')[0].value;
    let time = document.getElementsByClassName('container-time')[0].getElementsByTagName('input')[0].value;
    let status = document.getElementsByClassName('container-status')[0].getElementsByTagName('select')[0].value;
    if(!(title.length>=2 && title.length<=60)){
        alert("invalid Title, length should be between 2 and 60 characters")
        close = false;
    }
    if((status!='open' && status!='completed')){
        alert("invalid Status, please select the status")
        close = false;
    }
    if(!(description.length>=2 && description.length<=60)){
        alert("invalid Description, length should be between 2 and 60 characters")
        close = false;
    }
    if(time < '12:00' || time > '18:00'){
        alert("invalid Time, Time should be between 12 and 18 PM")
        close = false;
    }
    let id = generateId();
    if(close){
        let todo = `{"id": ${id}, "title": "${title}", "description": "${description}", "due_date": "${date}", "due_time": "${time}", "status": "${status}"}`;
        todosJson.push(JSON.parse(todo));
        addTodoItem(JSON.parse(todo));
        closePopup();
    }
}

/** this method is used to complete and set the status of the list item in the todosJSON and also update the footer
 * @public 
 * @param {String} id is used to get the listItem from the todosJson
 * @param {String} status is used to set the status of the listItem */

function completeAndResetItem(id, status){
    setCompleteAndResetStatus(id, status);
    let listItem = getTodoItem(parseInt(id));
    if(status == true)
        listItem.status = "completed";
    else
        listItem.status = "open";
    setTodoItem(listItem);
    setFooter();
}

/** this method is used to complete and set the status of the list item only to the specific list item
 * @public 
 * @param {String} id is used to get the listItem from the todosJson
 * @param {String} isCompleted is used to set the status of the listItem */
function setCompleteAndResetStatus(id, isCompleted){
    let listItem = document.getElementById(id);
    if(isCompleted){
        listItem.setAttribute('class','completed');
        listItem.getElementsByClassName('round')[0].getElementsByTagName('input')[0].setAttribute("checked", "checked");
    }
    else{
        listItem.setAttribute('class','');
        listItem.getElementsByClassName('round')[0].getElementsByTagName('input')[0].removeAttribute("checked");
    }   
}

/** this method is used to complete and reset the status of the all the list items
 * @public 
 */
function completeAndResetAll(){
    todosJson.forEach(todo => {
        if(this.checked)
            todo.status = "completed";
        else
            todo.status = "open";
        setCompleteAndResetStatus(todo.id, this.checked);
    });
    setFooter();
}
/** this method is used to delete all the list items with the complete status
 * @public 
 */
function clearCompleted()
{
    todosJson.forEach(todo => {
        if(todo.status === "completed"){
            removeItem(todo.id);
        }
    });
    setFooter();
}

/** this method is used to delete an individual item
 * @public 
 */
function removeItem(name)
{
    let listItem = document.getElementById(name);
    document.getElementById('list').removeChild(listItem);
    for(let i=0;i<todosJson.length;i++){
        if(todosJson[i].id === parseInt(listItem.id)){
            todosJson.splice(i, 1);
        }
    }
    setFooter();
}

/** this method is used to set the footer with filters and count of remianing todos to complete
 * @public 
 */
function setFooter(){
    let listSection = document.getElementsByClassName('listSection')[0];
    if(todosJson.length==0){
        document.getElementsByClassName('todoFooter')[0].setAttribute('style','display:none');
        document.getElementById("AllLabel").style.display='none';
        listSection.classList.remove('stack');
    }
    else{
        document.getElementsByClassName('todoFooter')[0].setAttribute('style','display:block');
        listSection.classList.add('stack');
    }
    setCount();
    setOpacityForAllCheckbox();
    setClearCompletedButton();
}

/** this method is used to set the count of remianing todos to complete
 * @public 
 */
function setCount()
{
    let count = getActiveItemsCount();
    if(count == 1)
        document.getElementById('count').innerHTML = '1 item left';
    else
        document.getElementById('count').innerHTML = count+' item left';
}

/** this method is used to set the clear completed button in footer based on the no.of completed items in the list
 * @public 
 */
function setClearCompletedButton(){
    let hasCompleted = false;
    todosJson.forEach(todo => {
        if(todo.status === "completed"){
            document.getElementsByClassName('clear')[0].style.display = 'block';
            hasCompleted = true;
        }
    });
    if(!hasCompleted)
        document.getElementsByClassName('clear')[0].style.display = 'none';
    }

/** this method is used to highlist the all checkbox based on the status of list items
 * @public 
 */
function setOpacityForAllCheckbox(){
    if(getActiveItemsCount()==0)
        document.getElementById("AllLabel").style.opacity='0.8';
    else
        document.getElementById("AllLabel").style.opacity='0.2';
}

/** this method is used to get the count of active/open list items
 * @public 
 */
function getActiveItemsCount(){
    let activeCount=0;
        todosJson.forEach(todo => {
            if(todo.status === "open")
                activeCount++;
        });
    return activeCount;
}

/** this method is used to get a todo item from the todosJson
 * @public 
 * @param {String} id is used to get the listItem from the todosJson
 */
function getTodoItem(id){
    let todoItem = null;
    todosJson.forEach(todo => {
        if(todo.id === id)
            todoItem = todo;
    });
    return todoItem;
}

/** this method is used to set a todo item from the todosJson
 * @public 
 * @param {JSON} listItem is used to set the listItem from the todosJson
 */
function setTodoItem(listItem){
    todosJson.forEach(todo => {
        if(todo.id === listItem.id){
            todo = listItem;
        }
    });
}

const xhr = new XMLHttpRequest();
xhr.open('GET','data/todos.json');
xhr.addEventListener('load', load);
xhr.send();
