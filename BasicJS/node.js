/**
* A Node represents an HTML Element. A node can have a tag name,
* a list of CSS classes and a list of children nodes.
*/
class Node {

  constructor(tag, id, children, classes) {
    // Tag name of the node.
    this.tag = tag;
    // id of the node.
    this.id = id;
    // Array of child nodes.
    this.children = children; // All children are of type Node
    // Array of CSS class names (string) on this element.
    this.classes = classes;
  }
  
  /**
  * Returns descendent nodes matching the selector. Selector can be 
  * a tag name or a CSS class name.
  * 
  * For example: 
  * 
  * 1.
  * <div> 
  *   <span id="span-1"></span>
  *   <span id="span-2"></span>
  *   <div>
  *     <span id="span-3"></span>
  *   </div>
  * </div>
  * Selector `span` should return 3 span nodes in this order
  * span-1 -> span-2 -> span-3.
  *
  * 2.
  * <div> 
  *   <span id="span-1" class="note"></span>
  *   <span id="span-2"></span>
  *   <div>
  *     <span id="span-3"></span>
  *   </div>
  * </div>
  * Selector `.note` should return one span node with `note` class.
  *
  * 3.
  * <div> 
  *   <span id="span-1" class="note></span>
  *   <span id="span-2"></span>
  *   <span id="span-3"></span>
  *   <article>
  *     <div>
  *       <span id="span-3"></span>
  *     </div>
  *   </article>
  * </div>
  * Selector `.note ~ span` should return two span nodes.
  * span-1 -> span-2.
  * 
  * @param {string} the selector string.
  * @returns {Array} Array of descendent nodes.
  * @public
  */
  search(selector) {
    let descedents = [];
    const node = this;
    try {
      // const myArray = selector.split(" ");
      // myArray.forEach(function (item) {
          node.getChildren(node, selector, descedents);
      // });
     }
     catch{
       console.log("Invalid Input")
     }
    return descedents;
  }

  /** 
  * prints all the test case results with some background
  * @public
  */
  testSearch(){
    const span1 = new Node("span","span-1",[],["note"]);
    const span2 = new Node("span","span-2",[],[]);
    const span3 = new Node("span","span-3",[],["sub1-span3"]);
    const p1 = new Node("p","para-1",[],["sub1-p1","note"]);
    const divNode2 = new Node("div","div-2", [span3, p1],["subContainer1"]);
    const label = new Node("label","lbl-1",[],[]);
    const section = new Node("section","sec-1",[label],[]);
    const divNode3 = new Node("div","div-3",[section],[]);
    const span4 = new Node("span","span-4",[],["mania"]);
    const span5 = new Node("span","span-5",[],["note","mania"]);
    const divNode4 = new Node("div","div-4",[span4, span5],[]);
    const mainContainer = new Node("div","div-1",[span1, span2, divNode2, divNode3, divNode4],["mainContainer"]);
    const span6 = new Node("span","span-6",[],["randomSpan"])
    const body = new Node("body","content",[mainContainer, span6],[]);

    
    // const descedents = divNode2.search('.subContainer1');
    // descedents.forEach(item => console.log(item));

    // Testing
    console.log("Started...");
    // Test case 1 -
    console.log("get All span elements under main Container");
    console.log(mainContainer.search("span"));
    // Test case 2 -
    console.log("get All elements with class Name note under main Container")
    console.log(mainContainer.search(".note"));
    // Test case 3 -
    console.log("get All label elements under main Container")
    console.log(mainContainer.search("label"));
    // Test case 4 -
    console.log("get All elements with class Name note under p1")
    console.log(p1.search(".note"));
    // Test case 5 -
    console.log("get All div elements under main Container")
    console.log(mainContainer.search("div"));
    // Test case 6 -
    console.log("get All div elements under sixth span")
    console.log(span6.search("div"));
    // Test case 7 -
    console.log("get All section elements under second div with id div-2")
    console.log(divNode2.search("section"));
    // Test case 8 -
    console.log("Invalid Output handling validation")
    console.log(body.search());
    // Test case 9 -
    console.log("get All section elements under body")
    console.log(body.search("section"));
    // Test case 10 -
    console.log("get random span element under body")
    console.log(mainContainer.search(".randomSpan"));
  }

  /** 
   * This method returns all the descedents of the node in a recursive way
  * @param {Node} the parent node.
  * @param {string} the selector string.
  * @param {Array} Array of descendent nodes.
  * @returns {Array} Array of descendent nodes.
  * @public
  */
  getChildren(node, selector, descedents){
    let childNodes = node.children;
        childNodes.forEach(function (item) {
          if(selector.includes(".") && item.classes && item.classes.indexOf(selector.slice(1, selector.length)) != -1)
          descedents.push(item);
    else if(item.tag === selector)
          descedents.push(item);
    if(item.children && item.children.length > 0)
          node.getChildren(item, selector, descedents);
        });
   return descedents;
  }
}

// creating a node object to call the test method
const test = new Node();
test.testSearch();
